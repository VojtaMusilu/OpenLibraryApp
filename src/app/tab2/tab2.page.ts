import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  historyArray:any[] = []
  KEY_HISTORY = "search_history";

  constructor(private router: Router,public alertController: AlertController) {}

  async ionViewWillEnter() {
    console.log('Method ionViewWillEnter was called.');

    this.historyArray = JSON.parse((await Storage.get({key: this.KEY_HISTORY})).value);
    console.log(this.historyArray);

  }

  searchHistory(book:string, author:string): void {
    let navigationExtras: NavigationExtras = {
      replaceUrl: true,
      queryParams: {
        author: author,
        book: book
      }
      
    };
    this.router.navigate(['tabs/tab1'],navigationExtras, )
  }


  async deleteHistoryItem(index:number){
    this.historyArray.splice(index,1);
    await Storage.set({
      key: this.KEY_HISTORY,
      value: JSON.stringify(this.historyArray)
    });
  }


  async deleteHistoryAll() {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete your entire search history? This action cannot be undone.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          },
        },
        {
          text: 'Yes',
          handler: () => {

            this.historyArray = []
             Storage.set({
              key: this.KEY_HISTORY,
              value: JSON.stringify(this.historyArray)
            });
          },
        },
      ],
    });

    await alert.present();

  }
}
