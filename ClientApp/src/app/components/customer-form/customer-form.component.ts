import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Quote } from '../../../data/models/domain/quote';
import { QuoteService } from '../../services/quote.service';
import { AccountService } from '../../services/account.service';
import { stateOptions } from '../../../data/constants/stateOptions';
import { carrierOptions } from '../../../data/constants/carrierOptions';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  previousCarrierOptions: string[] = carrierOptions; // Select these from database OnInit in the future.
  stateOptions: string[] = stateOptions;
  isOpen = true;
  isFormUpdating = false;
  @Input() quote: Quote;
  @Output() quoteChange = new EventEmitter<Quote>();
  @Output() driverData = new EventEmitter<any>();

  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['Select State', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    ssn: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    previousCarrier: ['Other', Validators.required],
    pastClaims: [false],
    movingViolations: [false],
    newDriver: [false],
    multiCar: [false]
  });

  constructor(private fb: FormBuilder, private quoteService: QuoteService, private accountService: AccountService) { }

  ngOnInit() {
  }

  get fName() { return this.customerForm.get('firstName'); }
  get lName() { return this.customerForm.get('lastName'); }
  get dateOfBirth() { return this.customerForm.get('dateOfBirth'); }
  get email() { return this.customerForm.get('email'); }
  get phone() { return this.customerForm.get('phone'); }
  get address() { return this.customerForm.get('address'); }
  get city() { return this.customerForm.get('city'); }
  get state() { return this.customerForm.get('state'); }
  get zip() { return this.customerForm.get('zip'); }
  get ssn() { return this.customerForm.get('ssn'); }
  get previousCarrier() { return this.customerForm.get('previousCarrier'); }
  get pastClaims() { return this.customerForm.get('pastClaims'); }
  get movingViolations() { return this.customerForm.get('movingViolations'); }
  get newDriver() { return this.customerForm.get('newDriver'); }
  get multiCar() { return this.customerForm.get('multiCar'); }

  onToggleClicked(): void {
    this.isOpen = !this.isOpen;
  }
  
  onSubmit(): void {
    if(!this.isFormUpdating){
      this.isFormUpdating = true;
      if(this.quote.id){
        this.updateQuote();
      }
      else{
        this.addQuote();
      }
    }
  }

  onCopyToDriver(): void {
    this.driverData.emit({
      'firstName': this.fName.value,
      'lastName': this.lName.value,
      'dateOfBirth': this.dateOfBirth.value,
      'ssn': this.ssn.value
    });
  }
  
  addQuote(): void {
    Object.assign(this.quote, this.customerForm.value);
    this.quote.dateQuoted = new Date(Date.now());
    this.quote.userId = this.accountService.getUserId();
    this.quote.previousCarrierLizard = this.quote.previousCarrier == "Lizard";
    this.quote.previousCarrierPervasive = this.quote.previousCarrier == "Pervasive";
    this.quoteService.addQuote(this.quote)
      .subscribe(quote => {
        this.quote.id = quote.id;
        this.quoteChange.emit(this.quote);
        this.isFormUpdating = false;
      }, (error) => {
        console.error(error);
        this.isFormUpdating = false;
      });    
  }

  updateQuote(): void {
    Object.assign(this.quote, this.customerForm.value);
    this.quoteService.updateQuote(this.quote)
      .subscribe(quote => {
        this.quoteChange.emit(this.quote);
        this.isFormUpdating = false;
      }, (error) => {
        console.error(error);
        this.isFormUpdating = false;
      });
  }
}
