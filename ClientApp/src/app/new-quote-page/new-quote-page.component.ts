import { Component, OnInit } from '@angular/core';
import { Quote } from '../../data/models/domain/quote';

@Component({
  selector: 'app-new-quote-page',
  templateUrl: './new-quote-page.component.html',
  styleUrls: ['./new-quote-page.component.scss']
})
export class NewQuotePageComponent implements OnInit {
  public quote: Quote;
  public driverSelection: {id: number, name: string};
  public driverOptions: {id: number, name: string}[] = [];
  public driverData: {};

  constructor() { }

  ngOnInit() {
    this.quote = new Quote();
    this.quote.drivers = [];
    this.quote.vehicles = [];
  }

  onQuoteUpdated(quote: Quote) {
    this.quote = Object.assign(new Quote(), quote);
  }

  onCustomerIsDriver(driverData: any) {
    this.driverData = Object.assign({}, driverData);
  }
}
