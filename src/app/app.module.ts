import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/in-memory-data.service';

import { AppRoutingModule } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemViewComponent } from './item-view/item-view.component';
import { SortableHeader } from './table/sortable-header.directive';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemNewComponent } from './item-new/item-new.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ItemViewComponent,
    SortableHeader,
    ItemEditComponent,
    ItemNewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
