import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../../data/models/domain/quote';
import { CalculationEngineService } from '../../services/calculation-engine.service';

@Component({
  selector: 'app-quote-summary',
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.scss']
})
export class QuoteSummaryComponent implements OnInit {
  quote: Quote;

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private location: Location,
    private calcEngine: CalculationEngineService
  ) { }

  ngOnInit() {
    this.getQuote();
  }

  getQuote(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quoteService.getQuote(id)
      .subscribe(quote => {
        this.quote = quote;
        this.quote.vehicles.forEach(v => {
          const primaryDriver = this.quote.drivers.find(d => d.id == v.primaryDriverId);
          v.primaryDriver = `${primaryDriver.firstName} ${primaryDriver.lastName}`;
        });
      });
  }

  isDiscount(val: number): boolean {
    return val < 0;
  }

  recalculateQuote(quote: Quote) {
    this.calcEngine.calculateQuote(quote)
      .subscribe(price => this.quote.price = price);
  }

  printSummary() {
    window.print();
  }
}
