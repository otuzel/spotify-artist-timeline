import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  private albums = new Subject<string>();
  private clickedArtistId = new Subject<string>();
  albums$: Observable<any>;
  _artistId = '';
  
  @Input()
  set artistId(id: string) {
    if (id) {
      this._artistId = id;
      this.clickedArtistId.next(this._artistId);
    }
  }
  get artistId(): string {
    return this._artistId;
  }
  // albums: Observable<any>;
  constructor(private spotifyService: SpotifyService) {
    // this.spotifyService.publishAlbums().subscribe(artistId => this.artistId = artistId);
  }

  ngOnInit() {
    this.albums$ = this.clickedArtistId.pipe(
      switchMap((artistId: string) => this.spotifyService.getAlbums(artistId)),
      map(data => data.items)
    );
  }


}
