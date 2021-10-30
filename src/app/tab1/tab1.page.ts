import { Component } from '@angular/core';
import { SearchBooksService } from '../api/search-books.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputBook: String
  bookOutput: String = ''
  constructor(private searchBooksService: SearchBooksService) {
  }

  public btnSearchClicked(): void {
    this.searchBooksService.getBooks(this.inputBook).subscribe((data)=> {
      console.log(data);
      this.bookOutput = data['numFound'];
    })
  }

  

}


