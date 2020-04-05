import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../Item';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../shared/item.service';
import { InMemoryDataService } from '../shared/in-memory-data.service';
import { HelperService } from '../shared/helper.service';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  itemForm = this.fb.group({
    author: this.fb.group({
      account: [''],
      fio: [''],
      post: [''],
    }),
    docDate: [''],
    docName: ['', Validators.required],
    docType: [''],
    address: [''],
    status: [''],
    isSpecial: [''],
  })

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  save(): void {
    this.itemForm.addControl("docCode", new FormControl(this.helper.getRandomForDocCode()));
    const authorFio = this.itemForm.get(['author', 'fio']).value;
    const authorPost = this.itemForm.get(['author', 'post']).value;
    if (authorFio == "") {
      this.itemForm.removeControl("author");
    } else {
      this.itemForm.patchValue({
        author: {
          account: this.helper.accountCreate(authorFio)
        }
      });
    }
    this.itemService.addItem(this.itemForm.value)
      .subscribe(item => {
        this.router.navigate(['']);
      });
  }

}
