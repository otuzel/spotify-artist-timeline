import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor( private http: HttpClient) { }
  searchArtist(term: string): Observable<any> {
      return this.http.get(`api/search?term=${term}`);
  }
}
