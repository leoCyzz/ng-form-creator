import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';

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
          { path: ':id', component: EditComponent }
        ]
      }
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
