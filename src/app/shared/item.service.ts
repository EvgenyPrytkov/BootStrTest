import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../Item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  getItemById(itemId: string): Observable<Item> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(map(items => <Item>items.find(item => item.id === itemId)));
  }

  updateItem(item: Item): Observable<any> {
    if (item.author?.account == "" && item.author?.fio == "" && item.author?.post == "") {
      item.author = null;
    }
    return this.http.put(this.itemsUrl, item, this.httpOptions);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions);
  }
}
