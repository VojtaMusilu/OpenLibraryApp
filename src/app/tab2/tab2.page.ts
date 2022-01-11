import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  historyArray: []
  KEY_HISTORY = "search_history";

  constructor(private router: Router) {}

  async ionViewWillEnter() {
    console.log('Method ionViewWillEnter was called.');

    this.historyArray = JSON.parse((await Storage.get({key: this.KEY_HISTORY})).value);
    console.log(this.historyArray);

  }

  public searchHistory(book:string, author:string): void {
    console.log("hissssssssss")
    //var params = "?book="+book+"&author=" +author
    var params = {
      authorSearch: author,
      bookSearch: book
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        author: author,
        book: book
      }
    };
    this.router.navigate(['tabs/tab1'],navigationExtras )
  }

}
