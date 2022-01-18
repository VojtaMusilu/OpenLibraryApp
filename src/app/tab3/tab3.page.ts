import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

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


  private async loadLibrary(){
    const {value} = await Storage.get({
      key: this.KEY_LIBRARY
    });

    this.myLibrary = JSON.parse(value);
    console.log(this.myLibrary);
  }

  async onClick(bookKey:string){

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

            console.log("bookKey: " + bookKey)
            var index = this.myLibrary.findIndex(function(item){
              return item.key === bookKey
            });
        
            console.log(index)
        
            console.log(this.myLibrary)
            //delete this.myLibrary[index];
            this.myLibrary.splice(index,1);
            console.log(this.myLibrary)
        
        
            
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
}
