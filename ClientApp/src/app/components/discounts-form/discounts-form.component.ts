import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Discount } from '../../../data/models/domain/discount';
import { DiscountNames } from '../../../data/constants/enumerations/discountNames';

@Component({
  selector: 'app-discounts-form',
  templateUrl: './discounts-form.component.html',
  styleUrls: ['./discounts-form.component.scss']
})
export class DiscountsFormComponent implements OnInit {
  isDiscountsAvailable = false;

  @Output() discountsUpdated = new EventEmitter<Discount>();
  @Input() isAddStateShown = false;
  @Input() isStateLookedup = false;
  @Input() 
  set discounts(val: Discount[]) {
    if (val.length > 0) {
      let formValues = {
        'movingViolations': val.find(d => d.name == DiscountNames.movingViolations).amount,
        'multiCar': val.find(d => d.name == DiscountNames.multiCar).amount,
        'newDriver': val.find(d => d.name == DiscountNames.newDriver).amount,
        'pastClaims': val.find(d => d.name == DiscountNames.pastClaims).amount,
        'previousCarrierLizard': val.find(d => d.name == DiscountNames.previousCarrierLizard).amount,
        'previousCarrierPervasive': val.find(d => d.name == DiscountNames.previousCarrierPervasive).amount,
        'youngDriver': val.find(d => d.name == DiscountNames.youngDriver).amount,
        'safeDriver': val.find(d => d.name == DiscountNames.safeDriver).amount,
        'daytimeLights': val.find(d => d.name == DiscountNames.daytimeLights).amount,
        'antilockBrakes': val.find(d => d.name == DiscountNames.antilockBrakes).amount,
        'annualMilage': val.find(d => d.name == DiscountNames.annualMilage).amount,
        'passiveRestraints': val.find(d => d.name == DiscountNames.passiveRestraints).amount,
        'antiTheft': val.find(d => d.name == DiscountNames.antiTheft).amount,
        'daysDriven': val.find(d => d.name == DiscountNames.daysDriven).amount,
        'milesToWork': val.find(d => d.name == DiscountNames.milesToWork).amount,
        'reducedUsed': val.find(d => d.name == DiscountNames.reducedUsed).amount,
        'garageDiffers': val.find(d => d.name == DiscountNames.garageDiffers).amount
      }
      this.discountsForm.patchValue(formValues);
      this.isDiscountsAvailable = true;
    } else {
      this.discountsForm.reset();
      this.isDiscountsAvailable = false;
    }
  }

  validators = [Validators.required, Validators.min(-0.99), Validators.max(1)];
  discountsForm = this.fb.group({
    movingViolations: ['', this.validators],
    multiCar: ['', this.validators],
    newDriver: ['', this.validators],
    pastClaims: ['', this.validators],
    previousCarrierLizard: ['', this.validators],
    previousCarrierPervasive: ['', this.validators],
    youngDriver: ['', this.validators],
    safeDriver: ['', this.validators],
    daytimeLights: ['', this.validators],
    antilockBrakes: ['', this.validators],
    annualMilage: ['', this.validators],
    passiveRestraints: ['', this.validators],
    antiTheft: ['', this.validators],
    daysDriven: ['', this.validators],
    milesToWork: ['', this.validators],
    reducedUsed: ['', this.validators],
    garageDiffers: ['', this.validators]
  });

  get movingViolations() { return this.discountsForm.get('movingViolations'); }
  get multiCar() { return this.discountsForm.get('multiCar'); }
  get newDriver() { return this.discountsForm.get('newDriver'); }
  get pastClaims() { return this.discountsForm.get('pastClaims'); }
  get previousCarrierLizard() { return this.discountsForm.get('previousCarrierLizard'); }
  get previousCarrierPervasive() { return this.discountsForm.get('previousCarrierPervasive'); }
  get youngDriver() { return this.discountsForm.get('youngDriver'); }
  get safeDriver() { return this.discountsForm.get('safeDriver'); }
  get daytimeLights() { return this.discountsForm.get('daytimeLights'); }
  get antilockBrakes() { return this.discountsForm.get('antilockBrakes'); }
  get annualMilage() { return this.discountsForm.get('annualMilage'); }
  get passiveRestraints() { return this.discountsForm.get('passiveRestraints'); }
  get antiTheft() { return this.discountsForm.get('antiTheft'); }
  get daysDriven() { return this.discountsForm.get('daysDriven'); }
  get milesToWork() { return this.discountsForm.get('milesToWork'); }
  get reducedUsed() { return this.discountsForm.get('reducedUsed'); }
  get garageDiffers() { return this.discountsForm.get('garageDiffers');}

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.discountsUpdated.emit(this.discountsForm.value);
  }
}
