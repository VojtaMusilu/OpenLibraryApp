import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchBooksService {

  constructor(private http: HttpClient) { }
  public getBooks(text: String) {
    return this.http.get('http://openlibrary.org/search.json?title=' + text);
  }
}
