import { Component } from '@angular/core';
import { SearchBooksService } from '../api/search-books.service';
import { LoadingController } from '@ionic/angular';
import { HistoryRecord } from '../models/history-record.model';
import { HistoryService } from '../api/history.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputAuthor: String = ''
  inputBook: String = ''
  bookOutput: String = ''
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
      let record = new HistoryRecord(this.inputBook, this.inputAuthor, this.bookOutput);
      this.historyService.saveRecord(record);
      this.loadingDialog.dismiss();
      console.log(this.booksArray);
      this.isShow = true;
    })
  }

  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Retrieving books ...',
      });
    await this.loadingDialog.present();
  }

}


