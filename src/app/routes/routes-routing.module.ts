import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { EditResolverService } from './edit/edit-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      {
        path: 'edit',
        children: [
          { path: '', component: EditComponent },
          { path: ':id', component: EditComponent, resolve: {config: EditResolverService} }
        ]
      },
      { path: 'exception', loadChildren: './exception/exception.module#ExceptionModule' },
    ]
  },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash
      }
    )],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
