import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Vehicle } from '../../data/models/domain/vehicle';
import { Quote } from '../../data/models/domain/quote';
import { QuoteService } from '../quote.service';
import { DriverSelect } from '../../data/models/shared/driverselect';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
  primaryDriverOptions: DriverSelect[] = [];
  inputsComplete = 0;
  isOpen = true;
  isFormUpdating = false;
  vehicle: Vehicle;
  private _quote: Quote;
  @Input() 
  set quote(quote: Quote){
    this._quote = quote;
    this.primaryDriverOptions = [];
    this._quote.drivers.forEach(d => this.primaryDriverOptions.push({id: d.id, fName: d.firstName, lName: d.lastName})); // d.id returns null because drivers are not added via quoteService or driverService
  }

  @Output() quoteChange = new EventEmitter<Quote>();

  vehicleForm = this.fb.group({
    primaryDriverId: [],
    vin: ['AIBJRUEJ73827UENS', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
    make: ['Toyota', Validators.required],
    model: ['Corolla', Validators.required],
    year: ['2017', Validators.required],
    currentValue: ['10988', Validators.required],
    milesToWork: ['24'],
    annualMileage: [10200, Validators.required],
    daysDrivenPerWeek: ['5', Validators.required],
    antiTheft: [false],
    antilockBrakes: [false],
    daytimeLights: [false],
    nonResidenceGarage: [false],
    passiveRestraints: [false],
    reducedUsed: [false],
  });

  constructor(private fb: FormBuilder, private quoteService: QuoteService) {   }

  ngOnInit() {
    this.vehicle = new Vehicle();
  }

  get primaryDriverId() { return this.vehicleForm.get('primaryDriverId'); }
  get vin() { return this.vehicleForm.get('vin'); }
  get make() { return this.vehicleForm.get('make'); }
  get model() { return this.vehicleForm.get('model'); }
  get year() { return this.vehicleForm.get('year'); }
  get currentValue() { return this.vehicleForm.get('currentValue'); }
  get milesToWork() { return this.vehicleForm.get('milesToWork'); }
  get annualMileage() { return this.vehicleForm.get('annualMileage'); }
  get daysDrivenPerWeek() { return this.vehicleForm.get('daysDrivenPerWeek'); }
  get antiTheft() { return this.vehicleForm.get('antiTheft'); }
  get antilockBrakes() { return this.vehicleForm.get('antilockBrakes'); }
  get daytimeLights() { return this.vehicleForm.get('daytimeLights'); }
  get nonResidenceGarage() { return this.vehicleForm.get('nonResidenceGarage'); }
  get passiveRestraints() { return this.vehicleForm.get('passiveRestraints'); }

  onToggleClicked() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    if(!this.isFormUpdating){
      this.isFormUpdating = true;
      
      this.vehicle = Object.assign({}, this.vehicleForm.value);
      this.vehicle.quoteId = this._quote.id
      this.vehicle.annualMileageUnder6k = this.vehicle.annualMileage < 6000;
      this.vehicle.daysDrivenPerWeekOver4 = this.vehicle.daysDrivenPerWeek > 4;
      this.vehicle.milesToWorkUnder26 = this.vehicle.milesToWork < 26;

      console.log(this.vehicle);

      if (!this.vehicle.id) {
        this.addVehicle();
      }
      else {
        this.updateVehicle();
      }
    }
  }

  addVehicle(): void {
    this.quoteService.addVehicle(this.vehicle)
      .subscribe(v => {
        this.vehicle = v;
        const driver = this.primaryDriverOptions.find(d => d.id == this.vehicle.primaryDriverId);
        this.vehicle.primaryDriver = `${driver.fName} ${driver.lName}`;
        this._quote.addVehicle(this.vehicle);
        this.quoteChange.emit(this._quote);

        this.vehicle = new Vehicle();
        this.vehicleForm.reset();
        this.isFormUpdating = false;
        //this.updateQuote();      
      }, (error) => {
        console.error(error);
        this.isFormUpdating = false;
      });
  }

  updateVehicle(): void {
    this.quoteService.updateVehicle(this.vehicle)
      .subscribe(v => {
        this.vehicle = v;
        this._quote.updateVehicle(this.vehicle);
        this.quoteChange.emit(this._quote);
        this.vehicle = new Vehicle();
        this.vehicleForm.reset();
        this.isFormUpdating = false;
        ///this.updateQuote();
      });
  }

  updateQuote(): void {
    this.quoteService.updateQuote(this._quote)
      .subscribe(q => {
        this.quoteChange.emit(this._quote);
      });
  }

  getPrimaryDrivers(){
    this.quoteService.getDrivers(this._quote.id)
      .subscribe(d => {
        this.primaryDriverOptions = [];    
        d.forEach(d => this.primaryDriverOptions.push({id: d.id, fName: d.firstName, lName: d.lastName}));
      });
  }
}
