import { Component, OnInit } from '@angular/core';
import { Quote } from '../../../data/models/domain/quote';
import { CalculationEngineService } from '../../services/calculation-engine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-new-quote-page',
  templateUrl: './new-quote-page.component.html',
  styleUrls: ['./new-quote-page.component.scss']
})
export class NewQuotePageComponent implements OnInit {
  public title = 'New Quote';
  public quote: Quote;
  public driverSelection: {id: number, name: string};
  public driverOptions: {id: number, name: string}[] = [];
  public driverData: {};
  public isDriverModalActive: boolean = false; //true;
  public isValidQuote: boolean = false;

  constructor(private calcEngine: CalculationEngineService, private router: Router, private quoteService: QuoteService) { }

  ngOnInit() {
    this.quote = new Quote();
    this.quote.drivers = [];
    this.quote.vehicles = [];
    if(this.router.url.includes('edit')){
      this.title = 'Edit Quote';
    }
  }

  onQuoteUpdated(quote: Quote) {
    this.quote = Object.assign(new Quote(), quote);
    if (this.quote.id && this.quote.drivers.length > 0 && this.quote.vehicles.length > 0) {
      this.isValidQuote = true;
    }
  }

  onCustomerIsDriver(driverData: any) {
    this.driverData = Object.assign({}, driverData);
  }

  calculateQuote(){
    this.calcEngine.calculateQuote(this.quote)
      .subscribe(price => {
        this.quote.price = price;
        this.router.navigate([`quote/details/${this.quote.id}`]);
      });
  }

  onDriverModalActivated(driverId: string) {
    this.isDriverModalActive = true;
  }

  onDriverModalDeactivated() {
    this.isDriverModalActive = false;
  }
}
