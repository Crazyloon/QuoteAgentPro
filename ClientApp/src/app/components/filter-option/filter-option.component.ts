import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isDate, isNumber } from 'util';

@Component({
  selector: 'app-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss']
})
export class FilterOptionComponent implements OnInit {
  private _value: any;
  @Input() type: string;
  @Input() symbol: string;
  @Input()
  set value(value: any){
    this._value = value;
    if(isDate(value)){
      this._value = new Date(value);
      this._value = this._value.toLocaleDateString();
    }
  }
  @Output() filterRemoved = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onRemoveFilter(filterType: string){
    this.filterRemoved.emit(filterType);
  }

}
