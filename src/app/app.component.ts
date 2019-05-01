import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotify-artist-timeline';
  artistId: string;
  setArtistId(id: string) {
    this.artistId = id;
  }
}
