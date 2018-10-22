import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { QuoteSummaryComponent } from './components/quote-summary/quote-summary.component';
import { NewQuotePageComponent } from './components/new-quote-page/new-quote-page.component';
import { MetricsPageComponent } from './components/metrics-page/metrics-page.component';
import { SearchResultsPageComponent } from './components/search-results-page/search-results-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { AgentManagementPageComponent } from './components/agent-management-page/agent-management-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'dashboard', component: LandingPageComponent, canActivate: [AuthGuard] },
  { path: 'quote/new', component: NewQuotePageComponent, canActivate: [AuthGuard] },
  { path: 'quote/edit/:id', component: NewQuotePageComponent, canActivate: [AuthGuard] },
  { path: 'quote/search', component: SearchResultsPageComponent, canActivate: [AuthGuard] },
  { path: 'quote/details/:id', component: QuoteSummaryComponent, canActivate: [AuthGuard] },
  { path: 'metrics', component: MetricsPageComponent, canActivate: [AuthGuard] },
  { path: 'agents/manage', component: AgentManagementPageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
