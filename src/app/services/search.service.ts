import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor( private http: HttpClient) { }
  searchArtist() {
    return this.http.get<any>('api/search');
  }
  // searchArtist(term: string): void {
  //   let url = this.artistSearchUrl + term;
  //   console.log(url);
  // }
}
