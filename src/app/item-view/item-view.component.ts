import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../Item';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  item: Item;
  itemId: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['itemId'];
    this.getItem();
  }

  getItem(): void {
    this.itemService.getItemById(this.itemId).subscribe(item => this.item = item);
  }

  onItemChange(chng) {
    if (chng) this.getItem()
  }

}
