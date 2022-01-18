import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  KEY_FIRST_NAME = "first_name";
  KEY_LIBRARY = "my_library";
  firstName = "";
  myLibrary: Array<any> = [];

  constructor() { 
    this.getName();
  }


  private async getName(){
    const {value} = await Storage.get({
      key: this.KEY_LIBRARY
    });

    this.myLibrary = JSON.parse(value);
    console.log(this.myLibrary);
  }

  async onInput(event: any) {
    //console.log(event.target.value);

    await Storage.set({
      key: this.KEY_FIRST_NAME,
      value: JSON.stringify(event.target.value),
    });

  }

  async onClick(bookKey:string){

    console.log("bookKey: " + bookKey)
    var index = this.myLibrary.findIndex(function(item){
      return item.key === bookKey
    });

    console.log(index)

    console.log(this.myLibrary)
    //delete this.myLibrary[index];
    this.myLibrary.splice(index,1);
    console.log(this.myLibrary)


    
    await Storage.set({
      key: this.KEY_LIBRARY,
      value: JSON.stringify(this.myLibrary)
      
    })
    
  }
}
