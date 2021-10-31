import { Component } from '@angular/core';
import { SearchBooksService } from '../api/search-books.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputBook: String = ''
  bookOutput: String = ''
  loadingDialog: any
  constructor(private searchBooksService: SearchBooksService, public loadingController: LoadingController) {
  }

  public btnSearchClicked(): void {
    this.presentLoading();
    this.searchBooksService.getBooks(this.inputBook).subscribe((data) => {
      console.log(data);
      this.bookOutput = data['numFound'];
      this.loadingDialog.dismiss();
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


