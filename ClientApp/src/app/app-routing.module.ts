import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { NewQuotePageComponent } from './new-quote-page/new-quote-page.component';
import { MetricsPageComponent } from './metrics-page/metrics-page.component';
import { SearchResultsPageComponent } from './search-results-page/search-results-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: LandingPageComponent },
  { path: 'quote/new', component: NewQuotePageComponent },
  { path: 'quote/search', component: SearchResultsPageComponent },
  { path: 'quote/details/:id', component: QuoteSummaryComponent },
  { path: 'metrics', component: MetricsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
