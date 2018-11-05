import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Discount } from '../../../data/models/domain/discount';
import { DiscountService } from 'src/app/services/discount.service';
import { FormBuilder, Validators } from '@angular/forms';
import { stateOptions, setStateOptions } from '../../../data/constants/stateOptions';
import { DiscountNames } from '../../../data/constants/enumerations/discountNames';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subscribable, Observable, fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { flatMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-discounts-page',
  templateUrl: './discounts-page.component.html',
  styleUrls: ['./discounts-page.component.scss']
})
export class DiscountsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  discounts: Discount[] = [];
  states: string[] = stateOptions;
  selectedState: string;
  isStateLookedup: boolean = false;
  isAddStateShown: boolean = false;
  isAddStateSuccess: boolean = false;
  addStateErrorMessage: string;

  apiSubscriptions: Subscription[] = [];
  stateCodeSub: Subscription;

  @ViewChild('txtAddState') txtAddState: ElementRef;

  constructor(private discountService: DiscountService, private fb: FormBuilder) { }

  ngOnInit() {
    const sub = this.discountService.getStatesOfOperation()
      .subscribe(states => {
        this.states = setStateOptions(states);
      }, (error) => console.error(error));
  }

  ngOnDestroy() {
    this.apiSubscriptions.forEach(sub => sub.unsubscribe());
    this.stateCodeSub.unsubscribe();
  }

  onStateSelected(state: string): void {
    this.isStateLookedup = true;
    this.selectedState = state;

    this.discountService.getDiscountsByState(state).subscribe(discounts => {
      this.discounts = discounts;
    }, (error) => {
      console.error(error);
    });
  }

  onAddState() {
    let state: string = (this.txtAddState.nativeElement as HTMLInputElement).value.toUpperCase();
    if (state.length == 2) {
      let existingStates = this.discounts.filter(d => d.state == state);
      if (existingStates.length == 0) {
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

        //this.discountService.addDiscounts(discounts).subscribe(() => {
        //  this.discountService.getStatesOfOperation().subscribe(states => {
        //    this.states = setStateOptions(states);
        //  }, (error) => console.error(error));
        //}, (error) => console.error(error));

        this.discountService.addDiscounts(discounts).pipe(
          flatMap(disc => {
            if (disc) {
              return this.discountService.getStatesOfOperation();
            }
            else {
              return Observable.create() as Observable<string[]>;
            }
          })
        ).subscribe(st => this.states = setStateOptions(st), (error) => console.error(error));
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

  updateDiscounts($event): void {
    let discounts = Object.assign([], this.discounts);
    Object.keys($event).forEach((k, i) => {
      const key = k.toString();
      const scope = this.getDiscountScope(key);
      const id = this.discounts[i].discountId;
      discounts[i] = new Discount(this.getDiscountName(k), scope, $event[k], this.selectedState);
      discounts[i].discountId = id;
    });
    this.discounts = Object.assign([], discounts);
    this.discountService.updateDiscounts(discounts)
      .subscribe(d => this.discounts = d);
  }

  private getDiscountName(name) {
    return DiscountNames[name];
  }

  private getDiscountScope(name): string {
    let scope = 'Vehicle';
    if (name == 'daytimeLights' ||
      name == 'antilockBrakes' ||
      name == 'annualMilage' ||
      name == 'passiveRestraints' ||
      name == 'antiTheft' ||
      name == 'daysDriven' ||
      name == 'milesToWork' ||
      name == 'reducedUsed' ||
      name == 'garageDiffers') {
      scope = 'Vehicle'
    } else {
      if (name == 'newDriver' ||
        name == 'previousCarrierLizard' ||
        name == 'previousCarrierPervasive' ||
        name == 'movingViolations' ||
        name == 'pastClaims' ||
        name == 'multiCar') {
        scope = 'Quote';
      } else {
        if (name == 'youngDriver' ||
          name == 'safeDriver') {
          scope = 'Person';
        }
      }
    }
    return scope;
  }

  txtAddStateValue = '';
  ngAfterViewInit() {
    const txtAddState = this.txtAddState.nativeElement as HTMLInputElement;
    const onKeyUp$ = fromEvent<KeyboardEvent>(txtAddState, 'keyup');
    const onStateCodeKeyUp$ = onKeyUp$.pipe(
      map((event, index) => {
        if (event.keyCode >= 65 && event.keyCode <= 90) { // Keys A-Z
          return event.key.toUpperCase();
        }
        if (event.keyCode == 8 || event.keyCode == 46) {
          return -1;
        }
      })
    )
    this.stateCodeSub = onStateCodeKeyUp$.subscribe(
      (input) => {
        if (input == -1) {
          this.txtAddStateValue = '';
          txtAddState.value = '';
          return;
        }
        txtAddState.value = this.txtAddStateValue;
        if (input) {
          this.txtAddStateValue = this.txtAddStateValue.concat(input);
          if (this.txtAddStateValue.length > 2) {
            this.txtAddStateValue = this.txtAddStateValue.slice(this.txtAddStateValue.length - 2);
          }
          txtAddState.value = this.txtAddStateValue;
        }
      }
    );
  }
}
