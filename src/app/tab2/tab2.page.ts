import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  historyArray:any[] = []
  KEY_HISTORY = "search_history";

  constructor(private router: Router) {}

  async ionViewWillEnter() {
    console.log('Method ionViewWillEnter was called.');

    this.historyArray = JSON.parse((await Storage.get({key: this.KEY_HISTORY})).value);
    console.log(this.historyArray);

  }

  public searchHistory(book:string, author:string): void {
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      queryParams: {
        author: author,
        book: book
      }
      
    };
    this.router.navigate(['tabs/tab1'],navigationExtras, )
  }


  async deleteHistory(index:number){
    this.historyArray.splice(index,1);
    await Storage.set({
      key: this.KEY_HISTORY,
      value: JSON.stringify(this.historyArray),
    });
  }

}
