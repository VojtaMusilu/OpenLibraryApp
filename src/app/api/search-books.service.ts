import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  search : string = ""
  constructor(private http: HttpClient) { }
  public getBooks(book: String, author: String, page:number = 1) {
    if (book.length >= 3 && author.length < 3) {
      this.search = ('http://openlibrary.org/search.json?title=' + book);
    }
    else if (book.length < 3 && author.length >= 3) {
      this.search = ('http://openlibrary.org/search.json?author=' + author);
    }
    else {
      this.search = 'http://openlibrary.org/search.json?author=' + author + '&title=' + book;
    }

    if(page > 0){
      this.search = this.search + "&page=" + page;
    }

    return this.http.get(this.search)


  }
}
