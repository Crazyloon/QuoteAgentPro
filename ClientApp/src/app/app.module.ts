import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ExpandingCardComponent } from './expanding-card/expanding-card.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { NewQuotePageComponent } from './new-quote-page/new-quote-page.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { PluralLabelPipe } from './pipes/plural-label.pipe';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MetricsCardComponent } from './metrics-card/metrics-card.component';
import { MetricsPageComponent } from './metrics-page/metrics-page.component';
import { FilterOptionComponent } from './filter-option/filter-option.component';
import { SearchResultsPageComponent } from './search-results-page/search-results-page.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
