import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../Item';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ItemService } from '../shared/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../shared/helper.service';

@Component({
  selector: 'item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  @Input() item: Item;
  @Output() itemChanged = new EventEmitter<boolean>();
  hasAuthor = false;
  id: any;

  itemForm = this.fb.group({
    id: [''],
    author: this.fb.group({
      account: [''],
      fio: [''],
      post: [''],
    }),
    docCode: [''],
    docDate: [''],
    docName: ['', Validators.required],
    docType: [''],
    address: [''],
    status: [''],
    isSpecial: [''],
  })

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private itemService: ItemService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('itemId');
    this.getItem();
  }

  getItem(): void {
    this.itemService.getItemById(this.id).subscribe(item => {
      this.item = item;
      if (item.author) {
        this.hasAuthor = true;
      }
      this.fillForm();
    })
  }

  fillForm(): void {
    this.itemForm.patchValue({
      id: this.item.id,
      docCode: this.item.docCode,
      docDate: this.item.docDate,
      docName: this.item.docName,
      docType: this.item.docType,
      address: this.item.address,
      status: this.item["status"],
      isSpecial: this.item.isSpecial,
    });
    if (this.hasAuthor) {
      this.itemForm.patchValue({
        author: {
          account: this.item.author?.account,
          fio: this.item.author?.fio,
          post: this.item.author?.post
        },
      });
    }
  }

  addAuthor(): void {
    this.hasAuthor = true;
    this.itemForm.addControl("author", this.fb.group({
      account: [''],
      fio: [''],
      post: ['']
    }));
  }

  cancel(): void {
    if (!this.item.author) {
      this.hasAuthor = false;
      this.itemForm.removeControl("author");
    }
    this.fillForm();
  }

  save(): void {
    if (this.itemForm.get(['author']) && this.itemForm.get(['author', 'fio']).value != "") {
      this.itemForm.patchValue({
        author: {
          account: this.helper.accountCreate(this.itemForm.get(['author', 'fio']).value)
        }
      })
    };
    this.itemService.updateItem(this.itemForm.value)
      .subscribe(() => {
        this.itemChanged.emit(true);
        this.getItem();
      });
  }

}
