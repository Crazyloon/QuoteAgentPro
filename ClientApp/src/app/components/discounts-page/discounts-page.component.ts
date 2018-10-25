import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Discount } from '../../../data/models/domain/discount';
import { DiscountService } from 'src/app/services/discount.service';
import { FormBuilder, Validators } from '@angular/forms';
import { stateOptions, setStateOptions } from '../../../data/constants/stateOptions';
import { DiscountNames } from '../../../data/constants/enumerations/discountNames';

@Component({
  selector: 'app-discounts-page',
  templateUrl: './discounts-page.component.html',
  styleUrls: ['./discounts-page.component.scss']
})
export class DiscountsPageComponent implements OnInit {
  discounts: Discount[] = [];
  states: string[] = stateOptions;
  isStateLookedup: boolean = false;
  isAddStateShown: boolean = false;
  isAddStateSuccess: boolean = false;
  addStateErrorMessage: string;
  
  @ViewChild('txtAddState') txtAddState: ElementRef;

  constructor(private discountService: DiscountService, private fb: FormBuilder) { }

  ngOnInit() {
    this.discountService.getStatesOfOperation()
      .subscribe(states => {
        setStateOptions(states);
      });
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

  onAddState() {
    let state: string = (<string>this.txtAddState.nativeElement.value).toUpperCase();
    if (state.length == 2) {
      let matchedState = this.discounts.filter(d => d.state == state);
      if (matchedState.length == 0) {
        let discounts = [];
        discounts.push(
          {
            name: DiscountNames.daytimeLights,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.antilockBrakes,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.annualMilage,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.passiveRestraints,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.antiTheft,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.daysDriven,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.milesToWork,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.reducedUsed,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.garageDiffers,
            scope: "Vehicle",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.newDriver,
            scope: "Quote",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.previousCarrierLizard,
            scope: "Quote",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.previousCarrierPervasive,
            scope: "Quote",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.movingViolations,
            scope: "Quote",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.pastClaims,
            scope: "Quote",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.multiCar,
            scope: "Quote",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.youngDriver,
            scope: "Person",
            amount: 0,
            state: state
          },
          {
            name: DiscountNames.safeDriver,
            scope: "Person",
            amount: 0,
            state: state
          });
        this.discountService.addDiscounts(discounts).subscribe(() => {
          this.discountService.getStatesOfOperation().subscribe(states => {
            this.states = setStateOptions(states);
          });
        }, (error) => console.error(error));
      } else {
        this.isAddStateSuccess = false;
        this.addStateErrorMessage = `${state} already exists`;
      }
    } else {
      this.isAddStateSuccess = false;
      this.addStateErrorMessage = "States must be entered as a two letter code";
    }
    this.txtAddState.nativeElement.value = "";
  }

  showAddState() {
    this.isAddStateShown = true;
  }

  private updateDiscounts($event): void {
    this.discounts = Object.assign({}, $event);
  }
}
