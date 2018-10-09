import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { NewQuotePageComponent } from './new-quote-page/new-quote-page.component';
import { MetricsPageComponent } from './metrics-page/metrics-page.component';
import { SearchResultsPageComponent } from './search-results-page/search-results-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'dashboard', component: LandingPageComponent, canActivate: [AuthGuard] },
  { path: 'quote/new', component: NewQuotePageComponent, canActivate: [AuthGuard] },
  { path: 'quote/search', component: SearchResultsPageComponent, canActivate: [AuthGuard] },
  { path: 'quote/details/:id', component: QuoteSummaryComponent, canActivate: [AuthGuard] },
  { path: 'metrics', component: MetricsPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
