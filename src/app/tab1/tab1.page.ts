import { Component } from '@angular/core';
import { SearchBooksService } from '../api/search-books.service';
import { LoadingController } from '@ionic/angular';
import { HistoryRecord } from '../models/history-record.model';
import { HistoryService } from '../api/history.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  KEY_HISTORY = "search_history";

  inputAuthor: string = ""
  inputBook: string = ""
  bookOutput: number = 0
  booksArray: Array<any> = []
  loadingDialog: any
  isShow = false
  constructor(
    private searchBooksService: SearchBooksService,
    public loadingController: LoadingController,
    private historyService: HistoryService
  ) {
  }

  public btnSearchClicked(): void {
    this.presentLoading();
    this.searchBooksService.getBooks(this.inputBook, this.inputAuthor).subscribe((data) => {
      console.log(data);
      this.bookOutput = data['numFound'];
      this.booksArray = data['docs'];
      //let record = new HistoryRecord(this.inputBook, this.inputAuthor, this.bookOutput);
      //this.historyService.saveRecord(record);
      this.loadingDialog.dismiss();
      console.log(this.booksArray);
      this.isShow = true;
      this.onInput();
    })

  }

  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Retrieving books ...',
      });
    await this.loadingDialog.present();
  }

  async onInput() {
    //let numba = await this.btnSearchClicked();
    //console.log("numba: " + numba);
    //console.log(event.target.value);
    var entry = {"author" : this.inputAuthor, "book" : this.inputBook, "output" : this.bookOutput};
    
    // console.log("entry");
    // console.log(entry);
//    console.log(JSON.stringify(entry));
   
    // console.log("storage get");
    // console.log(await Storage.get({key: this.KEY_HISTORY}));
    
    // console.log("storage get JSON parse");
    var history = JSON.parse((await Storage.get({key: this.KEY_HISTORY})).value);
    // console.log(history);

    

    
    
    if(history === null)
    {
      var def = [{"author" : "author", "book" : "book", "output" : 0}];

      def.unshift(entry)
      await Storage.set({
        key: this.KEY_HISTORY,
        value: JSON.stringify(def),
      });
    }
    else{
      history.unshift(entry)
      await Storage.set({
        key: this.KEY_HISTORY,
        value: JSON.stringify(history),
      });
    }
    

  }

}




