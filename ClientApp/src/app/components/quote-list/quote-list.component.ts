import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../../../data/models/domain/quote';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  @Input() quotes: Quote[];
  constructor() { }

  ngOnInit() {
  }
}
