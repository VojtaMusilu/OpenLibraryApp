import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  constructor(private http: HttpClient) { }
  public getBooks(book: String, author: String) {
    if (book.length >= 3 && author.length < 3) {
      return this.http.get('http://openlibrary.org/search.json?title=' + book);
    }
    else if (book.length < 3 && author.length >= 3) {
      return this.http.get('http://openlibrary.org/search.json?title=' + book);
    }
    else {
      return this.http.get('http://openlibrary.org/search.json?author=' + author + '&title=' + book);
    }
  }
}
