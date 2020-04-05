import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryDataService } from './shared/in-memory-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BootStrTest';

  constructor(
    private router: Router,
  ) { }

  goHome(): void {
    this.router.navigate(['']);
  }

  createItem(): void {
    this.router.navigate(['newitem']);
  }

}
