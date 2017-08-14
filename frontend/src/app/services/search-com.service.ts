// import core libraries
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SearchComService {

  // Observable string sources
  private searchTermSource = new Subject<string>();

  // Observable string streams
  searchTermSource$ = this.searchTermSource.asObservable();
  
  constructor() { }
  
  // Service message commands
  searchChange(searchTerm: string) {
    this.searchTermSource.next(searchTerm);
  }

}
