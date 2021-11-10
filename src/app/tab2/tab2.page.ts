import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  historyArray: []
  KEY_HISTORY = "search_history";

  async ionViewWillEnter() {
    console.log('Method ionViewWillEnter was called.');

    this.historyArray = JSON.parse((await Storage.get({key: this.KEY_HISTORY})).value);
    console.log(this.historyArray);

  }

  public searchHistory(): void {

    
  }

}
