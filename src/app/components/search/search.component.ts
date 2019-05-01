import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() artistIdChange = new EventEmitter<string>();
  artists$: Observable<any>;
  // albums$: Observable<any>;
  private searchTerms = new Subject<string>();
  // private albums = new Subject<string>();

  constructor(private spotifyService: SpotifyService) { }
  searchArtist(term: string): void {
    this.searchTerms.next(term);
  }
  artistIdChanged(artistId: string): void {
    this.artistIdChange.emit(artistId);
  }
  // getAlbums(artistId: string): void {
  //   this.albums.next(artistId);
  // }
  // getAlbums(artistId: string): void {
  //   this.spotifyService.getAlbums(artistId);
  // }
  ngOnInit() {
    this.artists$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.spotifyService.searchArtist(term)),
      map((data) => {
        if (!data) {
          return [];
        }
        return data.artists.items.map(item => {
          return {
              id: item.id,
              name: item.name
            };
        });
      })
    );
    // this.albums$ = this.albums.pipe(
    //   switchMap((artistId: string) => this.spotifyService.getAlbums(artistId)),
    //   map(data => data.items)
    // );
  }
}
