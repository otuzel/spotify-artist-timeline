import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private albums = new Subject<any>();

  constructor( private http: HttpClient) { }
  searchArtist(term: string): Observable<any> {
      if (!term.trim()) {
        return of(null);
      }
      return this.http.get(`api/search?term=${term}`);
  }
  getAlbums(artistId: string): Observable<any> {
    return this.http.get(`api/artists/${artistId}/albums`);
  }
  // getAlbums(artistId: string) {
  //   this.albums.next(() = {artistId});
  //   return this.http.get(`api/artists/${artistId}/albums`);
  // }
  publishAlbums(): Observable<any> {
    return this.albums.asObservable();
  }
}
