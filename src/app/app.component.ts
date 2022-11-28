import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineShoppingApp_UI';
  ngOnInit(): void {
    sessionStorage.setItem("isLoggedIn", "no");
  }
}
