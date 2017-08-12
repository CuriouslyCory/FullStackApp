// angular 2 components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// route components
import { HomeComponent } from './pages/home.component';
import { DetailComponent } from './pages/detail.component';
import { NotFoundComponent } from './pages/not-found.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detail/:productId', component: DetailComponent },
  { path: '',  redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(
    appRoutes,
    { enableTracing: false }
  )],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
