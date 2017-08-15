// import angular 2 components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import page components
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AnalyticsDetailComponent } from './pages/analytics-detail/analytics-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'analytics/:sessionId', component: AnalyticsDetailComponent },
  { path: 'detail/:productId', component: DetailComponent },
  { path: 'home', component: HomeComponent },
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
