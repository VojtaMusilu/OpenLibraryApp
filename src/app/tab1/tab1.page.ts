import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchBooksService } from '../api/search-books.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

import { DataService } from "../services/data.service";
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  KEY_HISTORY = "search_history";
  KEY_LIBRARY = "my_library";

  page: number = 1;
  books: Observable<any>;
  subscription: Subscription;
  inputAuthor: string = ""
  inputBook: string = ""
  bookCount: number = 0
  booksArray: Array<any> = []
  booksArrayString: string = ""
  loadingDialog: any
  isShow = false
  constructor(
    private searchBooksService: SearchBooksService,
    public loadingController: LoadingController,
    private serviceData: DataService,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(params)
        if (params.author != null || params.book != null) {
          this.inputAuthor = params.author
          this.inputBook = params.book
          if (this.inputAuthor.length >= 3 || this.inputBook.length >= 3) {
            this.btnSearchClicked()
          }
        }
      }
    });
  }

  ngOnInit() {
    this.subscription = this.serviceData.currentMessage.subscribe(message => this.booksArrayString = message)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public setBook(book: string) {
    this.inputBook = book;
  }

  public setAuthor(author: string) {
    this.inputAuthor = author;
  }

  public btnSearchClicked(): void {
    if (this.inputBook.length >= 3 || this.inputAuthor.length >= 3) {
      this.presentLoading();
      this.books = this.searchBooksService.getBooks(this.inputBook, this.inputAuthor);
      this.books.subscribe((data) => {
        console.log(data);
        this.bookCount = data['numFound'];
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
    var entry = { "author": this.inputAuthor, "book": this.inputBook, "output": this.bookCount };
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

  async onClick(bookKey: string, name: string, author: string, coverKey: string) {
    var entry = { "key": bookKey, "name": name, "author": author, "coverKey": coverKey };

    var libraryString = (await Storage.get({ key: this.KEY_LIBRARY })).value;
    if(!libraryString.includes(JSON.stringify(entry))){
      var library = JSON.parse(libraryString);

      if (library === null) {
        var def = [{ "key": "key", "name": "name", "author": "author", "coverKey": "coverKey" }];
  
        def.unshift(entry)
        await Storage.set({
          key: this.KEY_LIBRARY,
          value: JSON.stringify(def),
        });
      }
      else {
        library.unshift(entry)
        await Storage.set({
          key: this.KEY_LIBRARY,
          value: JSON.stringify(library),
        });
      }
    }


  }


  loadData(event) {



    this.page++;


    this.books = this.searchBooksService.getBooks(this.inputBook, this.inputAuthor, this.page);
    this.books.subscribe((data) => {

      this.booksArray = this.booksArray.concat(data['docs']);
      console.log(this.booksArray);
      event.target.complete();
    });

    if (this.booksArray.length + 100 > this.bookCount) {
      event.target.disabled = true;
      this.presentToast();
    }

  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'All books found based on your search are loaded.',
      duration: 2000,
    });
    toast.present();
  }


}
