import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
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
  exports: [
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
  declarations: []
})
export class MaterialComponentsModule { }
