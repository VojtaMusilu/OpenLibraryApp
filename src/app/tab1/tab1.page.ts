import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchBooksService } from '../api/search-books.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

import { DataService } from "../services/data.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  KEY_HISTORY = "search_history";

  subscription: Subscription;
  inputAuthor: string = ""
  inputBook: string = ""
  bookOutput: number = 0
  booksArray: Array<any> = []
  booksArrayString: string = ""
  loadingDialog: any
  isShow = false
  constructor(
    private searchBooksService: SearchBooksService,
    public loadingController: LoadingController,
    private serviceData: DataService,
    private route: ActivatedRoute,
     private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(params)
        this.inputAuthor = params.author
        this.inputBook = params.book
        this.btnSearchClicked()
      }
    });
  }
  
  ngOnInit() {
    this.subscription = this.serviceData.currentMessage.subscribe(message => this.booksArrayString = message)
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public setBook(book:string){
    this.inputBook = book;
  }

  public setAuthor(author:string){
    this.inputAuthor = author;
  }

  public btnSearchClicked(): void {
    if (this.inputBook.length >= 3 || this.inputAuthor.length >= 3) {
      this.presentLoading();
      this.searchBooksService.getBooks(this.inputBook, this.inputAuthor).subscribe((data) => {
        console.log(data);
        this.bookOutput = data['numFound'];
        this.booksArray = data['docs'];
        this.loadingDialog.dismiss();
        console.log(this.booksArray);
        this.isShow = true;
        this.onInput();
      })
      
    }

  }

  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Retrieving books ...',
      });
    await this.loadingDialog.present();
  }

  async onInput() {
    var entry = { "author": this.inputAuthor, "book": this.inputBook, "output": this.bookOutput };
    var history = JSON.parse((await Storage.get({ key: this.KEY_HISTORY })).value);

    if (history === null) {
      var def = [{ "author": "author", "book": "book", "output": 0 }];

      def.unshift(entry)
      await Storage.set({
        key: this.KEY_HISTORY,
        value: JSON.stringify(def),
      });
    }
    else {
      history.unshift(entry)
      await Storage.set({
        key: this.KEY_HISTORY,
        value: JSON.stringify(history),
      });
    }


  }

  sendMessage(key: string) {
    
    this.booksArrayString = this.booksArray.find(i => i.key === key)
    console.log(this.booksArrayString);
    this.serviceData.changeMessage(this.booksArrayString);

  }

}




