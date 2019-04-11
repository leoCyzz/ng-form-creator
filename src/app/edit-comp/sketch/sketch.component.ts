import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone, Input, Renderer2, OnChanges,
  SimpleChanges, ViewChildren, QueryList, ComponentFactoryResolver, ComponentRef, ViewContainerRef,
  Output, EventEmitter} from '@angular/core';
import { fromEvent } from 'rxjs';
import { IPage } from 'app/model/page';
import { IComponent, ILayoutComponent, ButtonComp, ContainerComp, InputComp, CheckboxComp,
  SelectComp, RadioComp, InputNumberComp, DatepickerComp, TableComp, ScaleComp, PrintComp,
  UploadComp } from 'app/model/component';
import { SketchHoverComponent, SketchDragComponent, SketchSelectComponent } from '.';
import { SketchService } from 'app/edit-comp/service/sketch.service';
import { RawPosition, ItemDimension } from 'app/model/dynamic';

const SELECTOR_LIST = [
  { type: 'button', text: 'button' },
  { type: 'checkbox', text: 'checkbox' },
  { type: 'container', text: 'container' },
  { type: 'datepicker', text: 'datepicker' },
  { type: 'input', text: 'input' },
  { type: 'inputnumber', text: 'inputnumber' },
  { type: 'print', text: 'print' },
  { type: 'radio', text: 'radio' },
  { type: 'scale', text: 'scale' },
  { type: 'select', text: 'select' },
  { type: 'table', text: 'table' },
  { type: 'upload', text: 'upload' }
];

@Component({
  selector: 'fc-sketch',
  templateUrl: './sketch.component.html'
})
export class SketchComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() pageConfig: IPage;
  @ViewChild('sketchpad') sketchpad: ElementRef;
  @ViewChild('sketchBody') sketchBody: ElementRef;
  @ViewChild('sketchContainer') sketchContainer: ElementRef;
  @ViewChild('selectorContainer') selectorContainer: ElementRef;
  @ViewChildren('selectorElement') selectElements: QueryList<ElementRef>;
  @ViewChild('hoverTpl', { read: ViewContainerRef }) hoverTpl: ViewContainerRef;
  @ViewChild('mouseTpl', { read: ViewContainerRef }) mouseTpl: ViewContainerRef;
  @Output()selectorCompChange: EventEmitter<any> = new EventEmitter<any>();
  selectorList = SELECTOR_LIST;

  dragReady = false;
  isDraging = false;
  currentDragConfig: IComponent = null;
  currentDragItemPos: any;
  currentDragFrom: string;
  currentHoverItemId: string;
  originDragPos = { parentId: null, index: -1 };
  tempDragPos = { parentId: null, index: -1 };
  currentSelectItem: any = null;

  private hoverPlaceholderRef: ComponentRef<SketchHoverComponent> = null;
  private hoverItem = null;
  private mousePlaceholderRef: ComponentRef<SketchDragComponent> = null;
  private selectPlaceholderRef: ComponentRef<SketchSelectComponent> = null;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private sketchService: SketchService
  ) {}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.sketchpad.nativeElement, 'mousemove').subscribe((e: MouseEvent) => this.handleMouseMove(e));
      fromEvent(this.sketchpad.nativeElement, 'mousedown').subscribe((e: MouseEvent) => this.handleMouseDown(e));
      fromEvent(this.sketchpad.nativeElement, 'mouseup').subscribe((e: MouseEvent) => this.handleMouseUp(e));
    });
  }

  handleMouseMove(e: MouseEvent) {
    this.ngZone.run(() => {
      if (!this.dragReady && !this.isDraging) {
        // 在container内部时 生成hoverPlaceholder
        if (this.isInnerComponent(e, this.sketchBody)) {
          const hoverComp = this.getSketchComponent(e);
          if (hoverComp === null) {
            this.hoverItem = null;
            this.removeHoverPlaceholder();
          } else {
            if (this.hoverItem !== hoverComp) {
              // 更改hoverPlaceholder
              this.hoverItem = hoverComp;
              this.removeHoverPlaceholder();
              if (this.currentSelectItem !== hoverComp && !this.isInnerSelectorRemove(e)) {
                this.createHoverPlaceholder(hoverComp);
              }
            }
          }
        } else {
          this.removeHoverPlaceholder();
        }
        return;
      }

      if (this.dragReady) {
        this.dragStartEvent(e);
        e.preventDefault();
        return;
      }

      if (this.isDraging) {
        this.updateMousePlaceholder(e);
        if (this.isInnerComponent(e, this.sketchBody)) {
          // update 页面
          const hoverComp = this.getSketchComponent(e);
          if (hoverComp === null) {
            // 判断是不是在container内
            if (this.isInnerComponent(e, this.sketchContainer)) {
              // 鼠标在页面的空白处
              this.currentHoverItemId = this.pageConfig.id;
              this.updateDraggingPlace(e, this.pageConfig, true);
            } else {
              // 鼠标在页面的灰色margin处
              this.removeTempPlaceholder(this.pageConfig);
              this.currentHoverItemId = '';
              this.tempDragPos = { parentId: null, index: -1 };
            }
          } else {
            if (hoverComp.config.id !== this.currentDragConfig.id && hoverComp.config.id !== this.currentHoverItemId) {
              this.currentHoverItemId = hoverComp.config.id;
              // 如果 this.currentDragConfig 是页面存在组件并且type 为container时
              if (this.currentDragFrom === 'sketch' && this.currentDragConfig.type === 'container'
                && this.isChildComp(this.currentDragConfig as ILayoutComponent, hoverComp.config.id)) {
                // 判断hoverComp 是否为this.currentDragConfig 的子组件
                // 如果是子组件  那么不做任何处理
                return;
              }
              // 如果不是 且hoverComp的type 为container时 wrapper为hoverComp
              // 如果不是 且hoverComp的type 不为container时 wrapper为hoverComp的parent
              // 计算鼠标在wrapper中的大概位置
              // 遍历wrapper第一级子组件 获取位置
              const wrapper = hoverComp.config.type === 'container'
                            ? hoverComp
                            : this.sketchService.editComps.get(hoverComp.parentId);
              if (wrapper) {
                this.updateDraggingPlace(e, wrapper.config);
              }
            }
          }
        } else {
          this.removeTempPlaceholder(this.pageConfig);
          this.tempDragPos = { parentId: null, index: -1 };
        }
      }
    });
  }

  handleMouseDown(e: MouseEvent) {
    this.ngZone.run(() => {
      // find component or selector
      if (!this.isInnerSelectorRemove(e)) {
        if (this.isInnerComponent(e, this.sketchBody)) {
          const sketchComp = this.getSketchComponent(e);
          if (sketchComp !== null && sketchComp.config.id !== this.pageConfig.id) {
            this.currentDragConfig = sketchComp.config;
            this.currentDragFrom = 'sketch';
            this.currentDragItemPos = sketchComp.component.location.nativeElement.parentElement.getBoundingClientRect();
            this.dragReady = true;
          }
        } else if (this.isInnerComponent(e, this.selectorContainer)) {
          const selectorComp = this.getSelectorComponent(e);
          if (selectorComp !== null) {
            this.currentDragConfig = this.createTempSelector(selectorComp.nativeElement.dataset.type);
            this.currentDragFrom = 'selector';
            this.currentDragItemPos = selectorComp.nativeElement.getBoundingClientRect();
            this.dragReady = true;
          }
        }
        // 获取currentDragItem 所在位置
        this.updateCurrentConfigPos();
      }
    });
  }

  handleMouseUp(e: MouseEvent) {
    // 判断是否在外面 如果在外面 还原
    // 清空dragplaceholder hoverplaceholder
    // 创建selectplaceholder
    this.ngZone.run(() => {
      if (!this.isInnerSelectorRemove(e)) {
        if (this.isDraging) {
          if (!this.isInnerComponent(e, this.sketchContainer)) {
            this.removeTempPlaceholder(this.pageConfig);
            this.createTempPlaceholder(this.pageConfig, this.originDragPos);
          }
          this.removeMousePlaceholder();
          // this.createSelectPlaceholder();
          this.currentHoverItemId = null;
        }
        // 鼠标点击select 组件
        if (this.currentDragConfig !== null) {
          this.componentSelect(this.currentDragConfig, this.tempDragPos);
        } else {
          // Event 触发
          this.removeSelectPlaceholder();
          if (this.isInnerComponent(e, this.sketchContainer)) {
            this.selectorCompChange.emit({selectorId: this.pageConfig.id, parentId: ''});
          }
        }
        // 初始化
        this.removeHoverPlaceholder();
        this.currentDragConfig = null;
        this.currentDragFrom = null;
        this.currentDragItemPos = null;
        this.originDragPos = { parentId: null, index: -1 };
        this.tempDragPos = { parentId: null, index: -1 };
        this.dragReady = false;
        this.isDraging = false;
      }
    });
  }

  // 组件选择
  componentSelect(compConfig: IComponent, pos: any) {
    if (compConfig !== null) {
      const compDirective = this.sketchService.editComps.get(compConfig.id);
      if (compDirective) {
        this.removeSelectPlaceholder();
        this.createSelectPlaceholder(compDirective, pos);
        this.currentSelectItem = compDirective;
        // Event 触发
        this.selectorCompChange.emit({selectorId: compDirective.config.id, parentId: compDirective.parentId});
      }
    }
  }

  dragStartEvent(e: MouseEvent) {
    this.dragReady = false;
    this.isDraging = true;
    // 移除hoverPlaceholder 和 selectorPlaceholder
    this.removeHoverPlaceholder();
    this.removeSelectPlaceholder();
    // 设置mousePlaceholder
    this.removeMousePlaceholder();
    this.createMousePlaceholder(e);
  }

  isInnerComponent(e: MouseEvent, comp: ElementRef) {
    const containerPos = comp.nativeElement.getBoundingClientRect();
    return (e.clientX >= containerPos.left && e.clientX <= (containerPos.left + containerPos.width)
    && e.clientY >= containerPos.top && e.clientY <= (containerPos.top + containerPos.height));
  }

  isInnerSelectorRemove(e: MouseEvent) {
    let res = false;
    if (this.selectPlaceholderRef !== null) {
      const removePos = this.selectPlaceholderRef.location.nativeElement.firstChild
                        .firstElementChild.getBoundingClientRect();
      res = e.clientX >= removePos.left && e.clientX <= (removePos.left + removePos.width)
      && e.clientY >= removePos.top && e.clientY <= (removePos.top + removePos.height);
    }
    return res;
  }

  // 获取sketchcontainer内部的控件
  getSketchComponent(e: MouseEvent) {
    const compSize = { width: 0, height: 0 };
    let res = null;
    this.sketchService.editComps.forEach((val) => {
      const tempPos = val.component.location.nativeElement.parentElement.getBoundingClientRect();
      const tempOffsetLeftX = e.clientX - tempPos.left;
      const tempOffsetLeftY = e.clientY - tempPos.top;
      const tempOffsetRightX = tempPos.left + tempPos.width - e.clientX;
      const tempOffsetRightY = tempPos.top + tempPos.height - e.clientY;

      if (tempOffsetLeftX >= 0 && tempOffsetLeftY >= 0 && tempOffsetRightX >= 0 && tempOffsetRightY >= 0) {
        if (res === null || (tempPos.width <= compSize.width && tempPos.height <= compSize.height)) {
          compSize.width = tempPos.width;
          compSize.height = tempPos.height;
          res = val;
        }
      }
    });
    return res;
  }

  // 获取selector所选的组件名称
  getSelectorComponent(e: MouseEvent) {
    let comp = null;
    const selectElements = this.selectElements.toArray();
    selectElements.forEach((selectEl) => {
      const pos = selectEl.nativeElement.getBoundingClientRect();
      if (e.clientX >= pos.left && e.clientX <= (pos.left + pos.width) &&
      e.clientY >= pos.top && e.clientY <= (pos.top + pos.height)) {
        comp = selectEl;
      }
    });
    return comp;
  }

  // 创建selector对应comp的config
  createTempSelector(type: string) {
    let compConfig = null;
    switch (type) {
      case 'button':
        compConfig = new ButtonComp();
        break;
      case 'container':
        compConfig = new ContainerComp();
        break;
      case 'input':
        compConfig = new InputComp();
        break;
      case 'checkbox':
        compConfig = new CheckboxComp();
        break;
      case 'select':
        compConfig = new SelectComp();
        break;
      case 'radio':
        compConfig = new RadioComp();
        break;
      case 'inputnumber':
        compConfig = new InputNumberComp();
        break;
      case 'datepicker':
        compConfig = new DatepickerComp();
        break;
      case 'table':
        compConfig = new TableComp();
        break;
      case 'scale':
        compConfig = new ScaleComp();
        break;
      case 'print':
        compConfig = new PrintComp();
        break;
      case 'upload':
        compConfig = new UploadComp();
        break;
      default:
        break;
    }
    return compConfig;
  }

  // 创建鼠标在组件上时的hover控件
  createHoverPlaceholder(component: any) {
    const pos: RawPosition = this.getPosition(component);
    const dim: ItemDimension = this.getDimension(component);
    const factory = this.resolver.resolveComponentFactory(SketchHoverComponent);
    const componentRef: ComponentRef<SketchHoverComponent> = this.hoverTpl.createComponent(factory);
    this.hoverPlaceholderRef = componentRef;
    componentRef.instance.setPosition(pos);
    componentRef.instance.setDimension(dim);
  }

  // 移除hover控件
  removeHoverPlaceholder() {
    if (this.hoverPlaceholderRef !== null) {
      this.hoverPlaceholderRef.destroy();
    }
  }

  // 创建鼠标移动时的镜像
  createMousePlaceholder(e: MouseEvent) {
    const pos: RawPosition = this.getMousePosition(e);
    const dim: ItemDimension = this.getMouseDimension(e);
    const factory = this.resolver.resolveComponentFactory(SketchDragComponent);
    const componentRef: ComponentRef<SketchDragComponent> = this.mouseTpl.createComponent(factory);
    this.mousePlaceholderRef = componentRef;

    componentRef.instance.setPosition(pos);
    componentRef.instance.setDimension(dim);

    if (this.currentDragFrom === 'sketch') {
      // sketch comp
      // pos dim type config
      componentRef.instance.type = 'drag';
      componentRef.instance.config = this.currentDragConfig;
    } else if (this.currentDragFrom === 'selector') {
      // selector comp
      // pos dim type selectorType
      componentRef.instance.type = 'selector';
      componentRef.instance.selectorType = this.currentDragConfig.type;
    }

  }

  // 更新鼠标移动时镜像的位置
  updateMousePlaceholder(e: MouseEvent) {
    const pos: RawPosition = this.getMousePosition(e);
    if (this.mousePlaceholderRef !== null) {
      this.mousePlaceholderRef.instance.setPosition(pos);
    }
  }

  // 移除镜像
  removeMousePlaceholder() {
    if (this.mousePlaceholderRef !== null) {
      this.mousePlaceholderRef.destroy();
    }
  }

  // 判断鼠标hover的comp是不是dragComp的子组件
  isChildComp(compConfig: ILayoutComponent, compId: string) {
    let res = false;
    for (const childConfig of compConfig.children) {
      if (childConfig.id === compId) {
        res = true;
        break;
      }
      if (childConfig.type === 'container') {
        res = this.isChildComp(childConfig as ILayoutComponent, compId);
        if (res) { break; }
      }
    }
    return res;
  }

  updateDraggingPlace(e: MouseEvent, wrapperConfig: ILayoutComponent | IPage, isPage: boolean = false) {
    const dropPos = this.getDropPos(e, wrapperConfig, isPage);
    if (dropPos.parentId !== null && dropPos.index >= 0
      && (dropPos.parentId !== this.tempDragPos.parentId || dropPos.index !== this.tempDragPos.index)) {
        this.removeTempPlaceholder(this.pageConfig);
        this.createTempPlaceholder(this.pageConfig, dropPos);
        this.tempDragPos.parentId = dropPos.parentId;
        this.tempDragPos.index = dropPos.index;
    }
  }

  getDropPos(e: MouseEvent, wrapperConfig: ILayoutComponent | IPage, isPage: boolean = false) {
    const offset = { x: null, y: null };
    const dropPos = { index: -1, parentId: null };
    if (wrapperConfig) {
      dropPos.parentId = wrapperConfig.id;
      if (wrapperConfig.children.length > 0) {
        let isDragInWrapper = false;
        wrapperConfig.children.forEach((childConfig, i) => {
          if (childConfig.id !== this.currentDragConfig.id) {
            const childDirective = this.sketchService.editComps.get(childConfig.id);
            if (childDirective) {
              const childPos = childDirective.component.location.nativeElement.parentElement.getBoundingClientRect();
              if (isPage || (wrapperConfig as ILayoutComponent).layout === 'vertical') {
                const offsetY = Math.abs(childPos.top - e.clientY);
                if (offset.y === null || offsetY <= offset.y) {
                  offset.y = offsetY;
                  dropPos.index = (e.clientY <= childPos.top + childPos.height / 2) ? i : i + 1;
                  dropPos.index = (isDragInWrapper && dropPos.index !== -1) ? dropPos.index - 1 : dropPos.index;
                }
              } else {
                const offsetX = e.clientX - (childPos.left + childPos.width / 2);
                const offsetY = e.clientY - (childPos.top + childPos.height / 2);
                if (offset.y === null || Math.abs(offsetY) < offset.y
                  || (offset.y === Math.abs(offsetY) && Math.abs(offsetX) <= offset.x)) {
                    offset.y = Math.abs(offsetY);
                    offset.x = Math.abs(offsetX);
                    dropPos.index = offsetX > 0 ? i + 1 : i;
                    dropPos.index = (isDragInWrapper && dropPos.index !== -1) ? dropPos.index - 1 : dropPos.index;
                }
              }
            }
          } else {
            isDragInWrapper = true;
          }
        });
      } else {
        dropPos.index = 0;
      }
    }
    return dropPos;
  }

  // 更新currentDragItem 在container位置
  updateCurrentConfigPos() {
    if (this.currentDragFrom === 'sketch') {
      const currentDragDirective = this.sketchService.editComps.get(this.currentDragConfig.id);
      const parentConfig = (currentDragDirective.parentId === this.pageConfig.id)
                          ? this.pageConfig
                          : this.sketchService.editComps.get(currentDragDirective.parentId).config;

      const index = parentConfig.children.findIndex(child => child.id === this.currentDragConfig.id);
      this.originDragPos = { parentId: parentConfig.id, index };
      this.tempDragPos = { parentId: parentConfig.id, index };
    } else {
      this.originDragPos = { parentId: null, index: -1 };
      this.tempDragPos = { parentId: null, index: -1 };
    }
  }

  createTempPlaceholder(pageConfig: IComponent | IPage, pos: any) {
    if (pageConfig.id === pos.parentId) {
      pageConfig.children.splice(pos.index, 0, this.currentDragConfig);
    } else {
      pageConfig.children.forEach(childConfig => {
        if (childConfig.type === 'container') {
          this.createTempPlaceholder(childConfig, pos);
        }
      });
    }
  }

  removeTempPlaceholder(pageConfig: IComponent | IPage) {
    if (pageConfig.id === this.tempDragPos.parentId) {
      pageConfig.children.splice(this.tempDragPos.index, 1);
    } else {
      pageConfig.children.forEach(childConfig => {
        if (childConfig.type === 'container') {
          this.removeTempPlaceholder(childConfig);
        }
      });
    }
  }

  createSelectPlaceholder(component: any, relativePos: any) {
    const pos: RawPosition = this.getPosition(component);
    const dim: ItemDimension = this.getDimension(component);
    const factory = this.resolver.resolveComponentFactory(SketchSelectComponent);
    const componentRef: ComponentRef<SketchSelectComponent> = this.hoverTpl.createComponent(factory);
    this.selectPlaceholderRef = componentRef;
    componentRef.instance.compParams = {
      selectorId: component.config.id,
      parentId: relativePos.parentId,
      index: relativePos.index
    };
    componentRef.instance.compClose.subscribe((compParams: any) => { this.onCompClose(compParams); });
    componentRef.instance.setPosition(pos);
    componentRef.instance.setDimension(dim);
  }

  removeSelectPlaceholder() {
    if (this.selectPlaceholderRef !== null) {
      this.selectPlaceholderRef.destroy();
      this.currentSelectItem = null;
    }
  }

  getPosition(comp: any) {
    const containerPos = this.sketchContainer.nativeElement.getBoundingClientRect();
    const pos = comp.component.location.nativeElement.parentElement.getBoundingClientRect();
    return { top: pos.top - containerPos.top + 20, left: pos.left - containerPos.left + 20 };
  }

  getDimension(comp: any) {
    const pos = comp.component.location.nativeElement.parentElement.getBoundingClientRect();
    return { width: pos.width, height: pos.height };
  }

  getMousePosition(e: MouseEvent) {
    const sketchPadPos = this.sketchpad.nativeElement.getBoundingClientRect();
    let pos = null;
    if (this.currentDragItemPos !== null) {
      pos = {
        left: e.clientX - this.currentDragItemPos.width / 2 - sketchPadPos.left,
        top: e.clientY - this.currentDragItemPos.height / 2 - sketchPadPos.top
      };
    }
    return pos;
  }

  getMouseDimension(e: MouseEvent) {
    let dim = null;
    if (this.currentDragItemPos !== null) {
      dim =  { width: this.currentDragItemPos.width, height: this.currentDragItemPos.height };
    }
    return dim;
  }

  onCompClose(compParams: any) {
    this.compDelete(this.pageConfig, compParams);
    this.removeSelectPlaceholder();
    this.sketchService.removeComponent(compParams.selectorId);
    // 组件change事件
    this.selectorCompChange.emit({selectorId: this.pageConfig.id, parentId: ''});
  }

  compDelete(pageConfig: IComponent | IPage, compParams: any) {
    if (pageConfig.id === compParams.parentId) {
      pageConfig.children.splice(compParams.index, 1);
    } else {
      pageConfig.children.forEach(childConfig => {
        if (childConfig.type === 'container') {
          this.compDelete(childConfig, compParams);
        }
      });
    }
  }

  // config保存
  onPageConfigSave() {
    console.log(this.pageConfig);
  }
}
