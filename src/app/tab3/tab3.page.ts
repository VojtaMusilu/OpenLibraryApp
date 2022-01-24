import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  KEY_LIBRARY = "my_library";
  myLibrary: Array<any> = [];

  constructor(public alertController: AlertController) { 
    }
  
    ngOnInit() {
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

  doRefresh(event) {  
    console.log('Pull Event Triggered!');  
    setTimeout(() => {
      this.loadLibrary();
      event.target.complete();
    }, 1500); 
  }  

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    const draggedItem = this.myLibrary.splice(ev.detail.from, 1)[0];  
     this.myLibrary.splice(ev.detail.to, 0, draggedItem); 
     
     Storage.set({
      key: this.KEY_LIBRARY,
      value: JSON.stringify(this.myLibrary)
      
    })
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }


}
