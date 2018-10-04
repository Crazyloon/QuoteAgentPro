import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuoteService } from '../quote.service';
import { Quote } from '../../data/models/domain/quote';

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
    private location: Location
  ) { }

  ngOnInit() {
    this.getQuote();
    setTimeout(() =>{
      console.log(this.quote);
    }, 1500);
  }

  getQuote(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quoteService.getQuote(id)
      .subscribe(quote => this.quote = quote);
  }

  isDiscount(val: number): boolean {
    return val < 0;
  }
}
