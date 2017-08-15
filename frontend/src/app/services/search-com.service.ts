// import core libraries
import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchComService {

  // observable string sources
  private searchTermSource = new BehaviorSubject<string>('');

  // observable string streams
  searchTermSource$ = this.searchTermSource.asObservable();
  
  constructor() { }
  
  // post a search term change to broadcast out to observers
  searchChange(searchTerm: string) {
    this.searchTermSource.next(searchTerm);
  }

}
