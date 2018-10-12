import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';
import { QuoteService } from '../quote.service';
import { FilterType } from '../../data/constants/enumerations/filtertype';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNumber, isDate } from 'util';

interface filterObject {
  type: string,
  symbol: string,
  value: any,
  func: (quote: Quote, value: any) => boolean
}
@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss']
})
export class SearchResultsPageComponent implements OnInit {
  stateOptions: string[] = ["Select State", "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
  _quotes: Quote[]; // original quote list filled on ngOnInit() - Never Changes
  quotes: Quote[]; // quote list that gets filtered and displayed - Changes Frequently
  filters: filterObject[];
  @ViewChild('txtQuoteId') txtQuoteId: ElementRef;
  @ViewChild('dateStart') dateStart: ElementRef;
  @ViewChild('dateEnd') dateEnd: ElementRef;
  @ViewChild('priceMin') priceMin: ElementRef;
  @ViewChild('priceMax') priceMax: ElementRef;
  @ViewChild('txtFirstName') txtFirstName: ElementRef;
  @ViewChild('txtLastName') txtLastName: ElementRef;
  @ViewChild('txtPhoneNo') txtPhoneNo: ElementRef;
  @ViewChild('txtEmail') txtEmail: ElementRef;
  @ViewChild('txtCity') txtCity: ElementRef;
  @ViewChild('cboState') cboState: ElementRef;
  @ViewChild('txtZip') txtZip: ElementRef;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuotes()
      .subscribe((allQuotes: Quote[]) => {
        this._quotes = allQuotes;
        this.quotes = allQuotes
      });
      this.filters = [];
  }


  onRemoveFilterClick(filterType: string){
    // TODO A OR B:
    // A.
    this.filters = this.filters.filter((f: any) => f.type !== filterType);
    // B.
    //this.filters = Object.assign([], ...this.filters.filter((f: any) => f.type !== filterType));

    this.clearFilterInput(filterType);
    this.applySearchFilters();
  }

  byQuoteId(quote: Quote, value: number){
    return quote.id == value;
  }
  byAfterDate(quote: Quote, value: Date){
    const quoteDate = new Date(quote.dateQuoted);
    return quoteDate >= value;
  }
  byBeforeDate(quote: Quote, value: Date){
    const quoteDate = new Date(quote.dateQuoted);
    return quoteDate <= value;
  }
  byMinPrice(quote: Quote, value: number){
    return quote.price >= value;
  }
  byMaxPrice(quote: Quote, value: number){
    return quote.price <= value;
  }
  byFirstName(quote: Quote, value: string){
    return quote.firstName.toLowerCase().includes(value.toLowerCase());
  }
  byLastName(quote: Quote, value: string){
    return quote.lastName.toLowerCase().includes(value.toLowerCase());
  }
  byPhoneNo(quote: Quote, value: string){
    return quote.phone.toLowerCase().includes(value.toLowerCase());
  }
  byEmail(quote: Quote, value: string){
    return quote.email.toLowerCase().includes(value.toLowerCase());
  }
  byCity(quote: Quote, value: string){
    return quote.city.toLowerCase().includes(value.toLowerCase());
  }
  byState(quote: Quote, value: string){
    return quote.state.toLowerCase().includes(value.toLowerCase());
  }
  byZip(quote: Quote, value: string){
    return quote.zip.toLowerCase().includes(value.toLowerCase());;
  }

  onQuoteIdInput(value: string){
    const id = parseInt(value);
    const filter = { type: FilterType.QuoteId, symbol: "", value: id, func: this.byQuoteId };
    const shouldFilter = isNumber(id) && id >= 0;
    this.addSearchFilter(shouldFilter, FilterType.QuoteId, filter);
    this.applySearchFilters();
  }

  onDateAfterInput(startDate: string){
    const firstHyphen = startDate.indexOf('-');
    const stringPartMonthDay = startDate.substring(firstHyphen + 1);
    const secondHyphen = stringPartMonthDay.indexOf('-') + firstHyphen + 1;
    const year = +startDate.substring(0, firstHyphen);
    const month = +startDate.substring(firstHyphen + 1, secondHyphen);
    const day = +startDate.substring(secondHyphen + 1);

    let start = new Date(year, month -1, day);
    const filter = { type: FilterType.QuotedAfterDate, symbol: '', value: start, func: this.byAfterDate };
    const shouldFilter = year != 0;
    this.addSearchFilter(shouldFilter, FilterType.QuotedAfterDate, filter);
    this.applySearchFilters();
  }

  onDateBeforeInput(endDate: string){
    const firstHyphen = endDate.indexOf('-');
    const stringPartMonthDay = endDate.substring(firstHyphen + 1);
    const secondHyphen = stringPartMonthDay.indexOf('-') + firstHyphen + 1;
    const year = +endDate.substring(0, firstHyphen);
    const month = +endDate.substring(firstHyphen + 1, secondHyphen);
    const day = +endDate.substring(secondHyphen + 1);

    let end = new Date(year, month - 1, day);
    const filter = { type: FilterType.QuotedBeforeDate, symbol: '', value: end, func: this.byBeforeDate };
    const shouldFilter = year != 0;
    this.addSearchFilter(shouldFilter, FilterType.QuotedBeforeDate, filter);
    this.applySearchFilters();
  }

  onPriceMinInput(min: string){
    const minPrice = parseInt(min);
    const filter = { type: FilterType.MinimumPrice, symbol: '', value: min, func: this.byMinPrice };
    const shouldFilter = !isNaN(minPrice) && minPrice >= 0;
    this.addSearchFilter(shouldFilter, FilterType.MinimumPrice, filter);
    this.applySearchFilters();
  }
  
  onPriceMaxInput(max: string){
    const maxPrice = parseInt(max);
    const filter = { type: FilterType.MaximumPrice, symbol: '', value: max, func: this.byMaxPrice };
    const shouldFilter = !isNaN(maxPrice) && maxPrice >= 0;
    this.addSearchFilter(shouldFilter, FilterType.MaximumPrice, filter);
    this.applySearchFilters();
  }

  onFirstNameInput(fname: string){
    const filter = { type: FilterType.FirstName, symbol: '', value: fname, func: this.byFirstName };
    const shouldFilter = fname.length > 0;
    this.addSearchFilter(shouldFilter, FilterType.FirstName, filter);
    this.applySearchFilters();
  }

  onLastNameInput(lname: string){
    const filter = { type: FilterType.LastName, symbol: '', value: lname, func: this.byLastName };
    const shouldFilter = lname.length > 0;
    this.addSearchFilter(shouldFilter, FilterType.LastName, filter);
    this.applySearchFilters();
  }
  onPhoneNoInput(phone: string){
    const filter = { type: FilterType.Phone, symbol: '', value: phone, func: this.byPhoneNo };
    const shouldFilter = phone.length > 0;
    this.addSearchFilter(shouldFilter, FilterType.Phone, filter);
    this.applySearchFilters();
  }
  onEmailInput(email: string){
    const filter = { type: FilterType.Email, symbol: '', value: email, func: this.byEmail };
    const shouldFilter = email.length > 0;
    this.addSearchFilter(shouldFilter, FilterType.Email, filter);
    this.applySearchFilters();
  }
  onCityInput(city: string){
    const filter = { type: FilterType.City, symbol: '', value: city, func: this.byCity };
    const shouldFilter = city.length > 0;
    this.addSearchFilter(shouldFilter, FilterType.City, filter);
    this.applySearchFilters();
  }
  
  onStateSelected(selectedIndex: number, state: string){
    const filter = { type: FilterType.State, symbol: '', value: state, func: this.byState };
    const shouldFilter = selectedIndex > 0;
    this.addSearchFilter(shouldFilter, FilterType.State, filter);
    this.applySearchFilters();
  }
  
  onZipInput(zip: string){
    const filter = { type: FilterType.Zip, symbol: '', value: zip, func: this.byZip };
    const shouldFilter = zip.length > 0;
    this.addSearchFilter(shouldFilter, FilterType.Zip, filter);
    this.applySearchFilters();
  }

  /**
   * Adds a search filter to the filters list
   * 
   * @param shouldFilter A condition determining whether the input is valid to filter on
   * @param filterType A filterType enum that determines the type of filter to add
   * @param filter An object that contains information about the filter (type, symbol, value, function)
   */
  private addSearchFilter(shouldFilter: boolean, filterType: FilterType, filter: any) {
    if (shouldFilter) {
      let filterIndex = this.filters.findIndex(filter => filter.type == filterType);
      if (filterIndex < 0) {
        this.filters.push(filter);
      }
      this.filters[filterIndex] = filter;
    }
    else {
      this.filters = this.filters.filter((f: any) => f.type !== filterType);
    }
  }

/**
 * Resets the quote array and applies all currently active filters to it
 */
  private applySearchFilters(){
    this.quotes = this._quotes;
    this.filters.forEach(searchFilter => this.quotes = this.quotes.filter((q: Quote) => searchFilter.func(q, searchFilter.value)));
  }
/**
 * Clears the input field related to (controlling) the FilterType
 * @param filterType A FilterType enum
 */
  private clearFilterInput(filterType: string) {
    switch (filterType) {
      case FilterType.QuoteId:
        this.txtQuoteId.nativeElement.value = '';
        return;
      case FilterType.QuotedAfterDate:
        this.dateStart.nativeElement.value = '';
        return;
      case FilterType.QuotedBeforeDate:
        this.dateEnd.nativeElement.value = '';
        return;
      case FilterType.MinimumPrice:
        this.priceMin.nativeElement.value = '';
        return;
      case FilterType.MaximumPrice:
        this.priceMax.nativeElement.value = '';
        return;
      case FilterType.FirstName:
        this.txtFirstName.nativeElement.value = '';
        return;
      case FilterType.LastName:
        this.txtLastName.nativeElement.value = '';
        return;
      case FilterType.Phone:
        this.txtPhoneNo.nativeElement.value = '';
        return;
      case FilterType.Email:
        this.txtEmail.nativeElement.value = '';
        return;
      case FilterType.City:
        this.txtCity.nativeElement.value = '';
        return;
      case FilterType.State:
        this.cboState.nativeElement.selectedIndex = 0;
        return;
      case FilterType.Zip:
        this.txtZip.nativeElement.value = '';
        return;
      default:
        console.error('Strange filterType encountered');
    }
  }
}
