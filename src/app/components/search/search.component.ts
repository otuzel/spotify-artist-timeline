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
  // search(term: string): void {
  //   this.searchService.searchArtist();
  // }
  searchArtist() {
    this.searchService.searchArtist()
      .subscribe(data => this.artists = data.artists.items.map( item => item.name ));
  }
  ngOnInit() {
  }
}
