import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { ItemNewComponent } from './item-new/item-new.component';


const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'items/:itemId', component: ItemViewComponent },
  { path: 'newitem', component: ItemNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
