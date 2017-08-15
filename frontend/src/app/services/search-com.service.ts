// import core libraries
import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchComService {

  // Observable string sources
  private searchTermSource = new BehaviorSubject<string>('');

  // Observable string streams
  searchTermSource$ = this.searchTermSource.asObservable();
  
  constructor() { }
  
  // Service message commands
  searchChange(searchTerm: string) {
    this.searchTermSource.next(searchTerm);
  }

}
