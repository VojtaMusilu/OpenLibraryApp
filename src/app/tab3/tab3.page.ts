import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  KEY_LIBRARY = "my_library";
  myLibrary: Array<any> = [];

  constructor(public alertController: AlertController) {
    this.loadLibrary();
  }


  private async loadLibrary() {
    const { value } = await Storage.get({
      key: this.KEY_LIBRARY
    });

    this.myLibrary = JSON.parse(value);
  }

  async deleteItem(bookKey: string) {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this book from your library?',
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

            var index = this.myLibrary.findIndex(function (item) {
              return item.key === bookKey
            });

            this.myLibrary.splice(index, 1);

            Storage.set({
              key: this.KEY_LIBRARY,
              value: JSON.stringify(this.myLibrary)

            })
          },
        },
      ],
    });

    await alert.present();

  }

  async deleteLibrary() {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete your entire library? This action cannot be undone.',
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

            this.myLibrary = []
             Storage.set({
              key: this.KEY_LIBRARY,
              value: JSON.stringify(this.myLibrary)
            });
          },
        },
      ],
    });

    await alert.present();

  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadLibrary();
      event.target.complete();
    }, 1500);
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index '+ ev.detail.from + ' to ' + ev.detail.to);

    const draggedItem = this.myLibrary.splice(ev.detail.from, 1)[0];
    this.myLibrary.splice(ev.detail.to, 0, draggedItem);

    Storage.set({
      key: this.KEY_LIBRARY,
      value: JSON.stringify(this.myLibrary)

    })

    ev.detail.complete();
  }


}
