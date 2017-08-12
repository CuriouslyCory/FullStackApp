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
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

// angular material components
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
import { HomeComponent } from './pages/home.component';
import { DetailComponent } from './pages/detail.component';
import { NotFoundComponent } from './pages/not-found.component';

// import my services
import { AnalyticsService } from './services/analytics.service';
import { ProductService } from './services/product.service';

// reusable components
import { AnalyticsComponent } from './pages/analytics.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';

// import primary app component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HomeComponent,
    NotFoundComponent,
    AnalyticsComponent,
    ProductPreviewComponent,
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
    MdSidenavModule,
    MdToolbarModule,
  ],
  providers: [ ProductService, AnalyticsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
