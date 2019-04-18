import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  artists: []
  constructor(private searchService: SearchService) { }
  searchArtist(term: string): void {
    this.searchService.searchArtist(term)
        .subscribe(data => this.artists = data.artists.items.map(item => item.name));
  }
  // searchArtist2() {
  //   this.searchService.searchArtist2()
  //     .subscribe(data => this.artists = data.artists.items.map( item => item.name ));
  // }
  ngOnInit() {
  }
}
