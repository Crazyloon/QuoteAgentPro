import { Component, OnInit } from '@angular/core';
import { Discount } from '../../../data/models/domain/discount';
import { DiscountService } from 'src/app/services/discount.service';
import { FormBuilder, Validators } from '@angular/forms';
import { stateOptions } from '../../../data/constants/stateOptions';

@Component({
  selector: 'app-discounts-page',
  templateUrl: './discounts-page.component.html',
  styleUrls: ['./discounts-page.component.scss']
})
export class DiscountsPageComponent implements OnInit {
  discounts: Discount[] = [];
  states: string[] = stateOptions;
  isStateLookedup: boolean = false;

  constructor(private discountService: DiscountService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onStateSelected(state: string): void {
    this.isStateLookedup = true;
    this.discountService.getDiscountsByState(state)
      .subscribe(discs => {
        this.discounts = discs;
      },
      (error) => {
        console.error(error);
      });
  }

  private updateDiscounts($event): void {
    this.discounts = Object.assign({}, $event);
  }
}
