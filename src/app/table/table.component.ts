import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../shared/item.service';
import { SortableHeader } from './sortable-header.directive';
import { SortEvent } from './SortEvent';
import { Router } from '@angular/router';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  items: Item[];
  ITEMS: Item[];

  page = 1;
  pageSize = 4;

  collectionSize: number;

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  constructor(
    private itemService: ItemService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(item => {
      this.items = item;
      this.ITEMS = item;
      this.collectionSize = item.length;
    })
  }

  onClickMe(item: Item): void {
    this.router.navigate([`/items/${item.id}`])
  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.items = this.ITEMS;
    } else {
      this.items = [...this.ITEMS].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
