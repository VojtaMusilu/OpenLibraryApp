import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class GetWorkService {

  constructor(private http: HttpClient) { }
  public getWork(work: String) {

    return this.http.get('http://openlibrary.org' + work + ".json");

  }
}
