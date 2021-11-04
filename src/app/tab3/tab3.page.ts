import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  KEY_FIRST_NAME = "first_name";
  firstName = "";

  constructor() { 
    this.getName();
  }


  private async getName(){
    const {value} = await Storage.get({
      key: this.KEY_FIRST_NAME
    });

    this.firstName = JSON.parse(value);
  }

  async onInput(event: any) {
    //console.log(event.target.value);

    await Storage.set({
      key: this.KEY_FIRST_NAME,
      value: JSON.stringify(event.target.value),
    });

  }
}
