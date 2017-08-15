// base angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import angular material components
import {
  MdCardModule,
  MdMenuModule,
  MdInputModule,
  MdButtonModule,
  MdListModule,
  MdIconModule,
  MdTableModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdSortModule,
  MdToolbarModule,
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// hammer js is required by some angular components
import 'hammerjs';

// import covalent
import {
  CovalentLayoutModule,
  CovalentMenuModule,
  CovalentSearchModule
} from '@covalent/core';

// import internal modules and components
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// import my services
import { AnalyticsService } from './services/analytics.service';
import { ProductService } from './services/product.service';
import { WindowService } from './services/window.service';
import { SearchComService } from './services/search-com.service';

// reusable components
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';

// import primary app component
import { AppComponent } from './app.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { AnalyticsDetailComponent } from './pages/analytics-detail/analytics-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HomeComponent,
    NotFoundComponent,
    AnalyticsComponent,
    ProductPreviewComponent,
    SearchFilterPipe,
    AnalyticsDetailComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CovalentLayoutModule,
    CovalentMenuModule,
    CovalentSearchModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    MdMenuModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdTableModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdSortModule,
    MdToolbarModule,
  ],
  providers: [ ProductService, AnalyticsService, WindowService, SearchComService, SearchFilterPipe ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
