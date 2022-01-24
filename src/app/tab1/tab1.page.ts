import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchBooksService } from '../api/search-books.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

import { DataService } from "../services/data.service";
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastFavoriteComponent } from '../toast-favorite/toast-favorite.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  KEY_HISTORY = "search_history";
  KEY_LIBRARY = "my_library";

  page: number = 1;
  inputAuthor: string = ""
  inputBook: string = ""

  prevAuthor: string = ""
  prevBook: string = ""

  booksArray: Array<any> = []
  booksArrayString: string = ""
  bookCount: number

  loadingDialog: any
  errorDialog: any

  books: Observable<any>;
  subscription: Subscription;


  constructor(
    private searchBooksService: SearchBooksService,
    public loadingController: LoadingController,
    private serviceData: DataService,
    private route: ActivatedRoute,
    public toastController: ToastController,
    public location: Location,
    public toast: ToastFavoriteComponent
  ) {

  }

  ngOnInit() {
    this.subscription = this.serviceData.currentMessage.subscribe(message => this.booksArrayString = message)
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(params)
        if (params.author != null || params.book != null) {
          console.log("params not null");
          console.log("author: " + this.inputAuthor + ",   book:" + this.inputBook);

          if (params.author != this.prevAuthor || params.book != this.prevBook) {
            console.log("params not same");
            this.inputAuthor = params.author
            this.inputBook = params.book
            this.prevAuthor = params.author
            this.prevBook = params.book
            if (this.inputAuthor.length >= 3 || this.inputBook.length >= 3) {
              this.btnSearchClicked()
            }
          }
        }
      }
    });
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

  public  btnSearchClicked() {

    var searchBtn = document.getElementById("searchButton");
    searchBtn.setAttribute("disabled", "true");

    if (this.inputBook.length >= 3 || this.inputAuthor.length >= 3) {
      this.presentLoading();
      this.books =  this.searchBooksService.getBooks(this.inputBook, this.inputAuthor);
       this.books.subscribe(data => {
        this.bookCount = data['numFound'];
        this.booksArray = data['docs'];
        this.saveHistory();
        this.loadingDialog.dismiss();
        searchBtn.setAttribute("disabled", "false");

      },

        error => {
          console.log("EE:", error);
          this.presentError().then(() => {
            this.loadingDialog.dismiss()
            searchBtn.setAttribute("disabled", "false");
          });

        }
      )
    }


  }

  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Looking for books ...',
      });
    await this.loadingDialog.present();
  }

  async presentError() {
    this.errorDialog = await this.loadingController.create(
      {
        message: 'Sorry! There was an error while searching for books. Try again later.',
        spinner: null,
        duration: 5000
      });
    await this.errorDialog.present();
  }

  async saveHistory() {
    
    var entry = { "author": this.inputAuthor, "book": this.inputBook, "output": this.bookCount };
    var history = JSON.parse((await Storage.get({ key: this.KEY_HISTORY })).value);

    if (history === null) {
      history = [];
      history.unshift(entry);
      await Storage.set({
        key: this.KEY_HISTORY,
        value: JSON.stringify(history),
      });
      return;
    }

    if (history.length === 0 || history[0].author !== entry.author || history[0].book !== entry.book) {
      history.unshift(entry)
      await Storage.set({
        key: this.KEY_HISTORY,
        value: JSON.stringify(history),
      });

    }

  }

  sendMessage(key: string) {
    this.booksArrayString = this.booksArray.find(i => i.key === key)
    this.serviceData.changeMessage(this.booksArrayString);
  }

  async onClick(bookKey: string, name: string, author: string, coverKey: string) {
    var entry = { "key": bookKey, "name": name, "author": author, "coverKey": coverKey };

    var libraryString = (await Storage.get({ key: this.KEY_LIBRARY })).value;

    var library = JSON.parse(libraryString);

    if (library === null) {
      library = []
    }

    if (libraryString === null) {
      libraryString = "";
    }

    if (!libraryString.includes(JSON.stringify(entry))) {
      library.unshift(entry)
      await Storage.set({
        key: this.KEY_LIBRARY,
        value: JSON.stringify(library),
      });
      this.toast.presentToastFavorite();
    }
    else {
      this.toast.presentToastFavoriteFail();
    }

  }


  loadData(event) {

    this.page++;

    this.books = this.searchBooksService.getBooks(this.inputBook, this.inputAuthor, this.page);
    this.books.subscribe((data) => {
      this.booksArray = this.booksArray.concat(data['docs']);
      event.target.complete();
    });

    if (this.booksArray.length + 100 > this.bookCount) {
      event.target.disabled = true;
      this.presentToastLoaded();
    }

  }


  async presentToastLoaded() {
    const toast = await this.toastController.create({
      message: 'All books found based on your search are loaded.',
      duration: 3000,
    });
    toast.present();
  }





}
