import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  chars = "abcdefghijklmnopqrstuvwxyz0123456789";

  ru = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
  }

  constructor() { }

  getRandom(array) {
    return array[Math.floor(Math.random() * Math.floor(array.length))];
  }

  getRandomForId(): string {
    let str = "";
    for (let i = 0; i < 16; i++) {
      str += this.getRandom(this.chars);
    }
    return str;
  }

  getRandomForDocCode(): string {
    let str = "";
    for (let i = 0; i < 32; i++) {
      str += this.getRandom(this.chars);
    }
    return str;
  }

  translit(str: string): string {
    let tempStr: string[] = [];
    for (let i = 0; i < str.length; i++) {
      tempStr.push(this.ru[str[i]]
        || this.ru[str[i].toLowerCase()] == undefined && str[i]
        || this.ru[str[i].toLowerCase()].replace(/^(.)/, function (match) { return match.toUpperCase() }))
    }
    return tempStr.join('');
  }

  accountCreate(fio: string): string {
    fio = fio.replace(/[ъь]+/g, '').replace(/й/g, 'i');
    let FULLNAME: string[] = fio.split(' ');
    let firstName = FULLNAME[1].toLowerCase();
    let lastName = FULLNAME[0].toLowerCase();
    let patronymic = FULLNAME.length > 2 ? FULLNAME[2].toLowerCase() : '';
    return this.translit(lastName) + "_" + this.translit(firstName[0]) + this.translit(patronymic[0] || '');
  }
}
