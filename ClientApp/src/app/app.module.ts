import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ExpandingCardComponent } from './components/expanding-card/expanding-card.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteSummaryComponent } from './components/quote-summary/quote-summary.component';
import { DriverFormComponent } from './components/driver-form/driver-form.component';
import { NewQuotePageComponent } from './components/new-quote-page/new-quote-page.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { PluralLabelPipe } from './pipes/plural-label.pipe';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MetricsCardComponent } from './components/metrics-card/metrics-card.component';
import { MetricsPageComponent } from './components/metrics-page/metrics-page.component';
import { FilterOptionComponent } from './components/filter-option/filter-option.component';
import { SearchResultsPageComponent } from './components/search-results-page/search-results-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TokenInterceptor } from './services/token-interceptor';
import { AgentManagementPageComponent } from './components/agent-management-page/agent-management-page.component';
import { PendingAgentsListComponent } from './components/pending-agents-list/pending-agents-list.component';
import { AgentManagementListComponent } from './components/agent-management-list/agent-management-list.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DiscountsFormComponent } from './components/discounts-form/discounts-form.component';
import { DiscountsPageComponent } from './components/discounts-page/discounts-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    ExpandingCardComponent,
    CustomerFormComponent,
    QuoteListComponent,
    QuoteSummaryComponent,
    DriverFormComponent,
    NewQuotePageComponent,
    VehicleFormComponent,
    PluralLabelPipe,
    RegistrationFormComponent,
    LoginFormComponent,
    MetricsCardComponent,
    MetricsPageComponent,
    FilterOptionComponent,
    SearchResultsPageComponent,
    LoginPageComponent,
    AgentManagementPageComponent,
    PendingAgentsListComponent,
    AgentManagementListComponent,
    RegistrationPageComponent,
    HeaderMenuComponent,
    DiscountsFormComponent,
    DiscountsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
