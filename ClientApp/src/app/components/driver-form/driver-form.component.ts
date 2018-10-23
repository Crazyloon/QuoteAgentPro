import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../../../data/models/domain/quote';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Driver } from '../../../data/models/domain/driver';
import { stateOptions } from '../../../data/constants/stateOptions';
import { Vehicle } from '../../../data/models/domain/vehicle';

const submitButtonText_Save = "Save Driver";
const submitButtonText_Edit = "Edit Driver";

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss']
})
export class DriverFormComponent implements OnInit {
  stateOptions: string[] = stateOptions;
  driver: Driver;
  submitButtonText = submitButtonText_Save;
  isOpen = true; // Controls the accordion
  isRequestInProgress = false; // prevents multiple form submission
  isEditMode = false; // Modifies the View to show driverId and change the main action to edit instead of save
  @Input() quote: Quote;
  @Input() 
  set driverData(driverData: any) {
    if (driverData) {
      this.driverForm.setValue({
        'firstName': driverData['firstName'],
        'lastName': driverData['lastName'],
        'dateOfBirth': driverData['dateOfBirth'],
        'ssn': driverData['ssn'],
        'driversLicenseNumber': this.driverForm.get('driversLicenseNumber').value,
        'issuingState': this.driverForm.get('issuingState').value,
        'safeDrivingSchool': this.driverForm.get('safeDrivingSchool').value,
        'under23YearsOld': this.driverForm.get('under23YearsOld').value,
      });
    }
  }
  @Output() quoteChange = new EventEmitter<Quote>();

  driverForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    ssn: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    driversLicenseNumber: ['', Validators.required],
    issuingState: ['Select State', [Validators.required, Validators.maxLength(2)]],
    safeDrivingSchool: [false],
    under23YearsOld: [false]
  });

  constructor(private fb: FormBuilder, private quoteService: QuoteService) { }

  ngOnInit() {
    this.driver = new Driver();
  }

  get driverId() { return this.driverForm.get('driverId'); }
  get fName() { return this.driverForm.get('firstName'); }
  get lName() { return this.driverForm.get('lastName'); }
  get dateOfBirth() { return this.driverForm.get('dateOfBirth'); }
  get ssn() { return this.driverForm.get('ssn'); }
  get driversLicenseNumber() { return this.driverForm.get('driversLicenseNumber'); }
  get issuingState() { return this.driverForm.get('issuingState'); }
  get safeDrivingSchool() { return this.driverForm.get('safeDrivingSchool'); }
  get under23YearsOld() { return this.driverForm.get('under23YearsOld'); }

  onToggleClicked(): void {
    this.isOpen = !this.isOpen;
  }

  onSubmit(): void {
    if(!this.isRequestInProgress){
      this.isRequestInProgress = true;

      this.driver = Object.assign({}, this.driverForm.value);
      this.driver.quoteId = this.quote.id;
      this.driver.under23YearsOld = this.calculateAge(this.driver.dateOfBirth) < 23;

      if (!this.driver.id) {
        this.addDriver();    
      }
      else {
        this.updateDriver();
      }
    }
  }

  addDriver(): void {
    this.quoteService.addDriver(this.driver)
      .subscribe(d => {
        this.driver = d;
        this.quote.addDriver(this.driver);
        this.quoteChange.emit(this.quote);
        // reset data to prepare for next driver inputs
        this.driver = new Driver();
        this.driverForm.reset();
        this.resetForm();
        this.isRequestInProgress = false;
        //this.updateQuote();
      }, (error) => {
        console.error(error);
        this.isRequestInProgress = false;
      });
  }

  updateDriver(): void {
    this.quoteService.updateDriver(this.driver)
      .subscribe(d => {
        this.driver = d;
        this.quote.updateDriver(this.driver);
        this.quoteChange.emit(this.quote);

        this.driver = new Driver();
        this.driverForm.reset();
        this.resetForm();
        this.isRequestInProgress = false;
        this.exitEditMode();
      });
  }

  onEditDriver(driverId: number) {
    this.enterEditMode(driverId);
  }

  onDeleteDriver(driverId: number) {
    if (!this.isEditMode) {
      this.exitEditMode();
    }
    if (this.confirmDelete()) {
      let vehiclesWithDriver = this.quote.vehicles.filter(v => v.primaryDriverId == driverId);
      vehiclesWithDriver.forEach((v, i) => {
        v.primaryDriverId = null;
        this.quoteService.updateVehicle(v).subscribe(
          (vehicle: Vehicle) => {
            this.quote.updateVehicle(vehicle);
          },
          (error) => {
            console.error(error);
          },
          () => {
            if (i == vehiclesWithDriver.length - 1) {
              this.quoteService.deleteDriver(driverId)
                .subscribe(_ => {
                  this.quote.deleteDriver(driverId);
                  this.resetForm();
                  this.quoteChange.emit(this.quote);
                });
            }
          })
      });
    }
  }

  exitEditMode(): void {
    this.driver.id = undefined;
    this.driverForm.removeControl('id');
    this.submitButtonText = submitButtonText_Save;
    this.isEditMode = false;
    this.driverForm.reset();
  }
  
  private enterEditMode(driverId: number): void {
    this.quoteService.getDriver(driverId).subscribe(d => {
      this.driver = d;
      this.driverForm.addControl('id', new FormControl(driverId, Validators.required));
      this.submitButtonText = submitButtonText_Edit;
      this.isEditMode = true;
      let driverDob = new Date(this.driver.dateOfBirth);
      let formattedDate = new Date(driverDob.getTime() - (driverDob.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
      this.driverForm.setValue({
        'id': this.driver.id,
        'firstName': this.driver.firstName,
        'lastName': this.driver.lastName,
        'dateOfBirth': formattedDate,
        'ssn': this.driver.ssn,
        'driversLicenseNumber': this.driver.driversLicenseNumber,
        'issuingState': this.driver.issuingState,
        'safeDrivingSchool': this.driver.safeDrivingSchool,
        'under23YearsOld': this.driver.under23YearsOld,
      });
    }, error => {
      console.error(error);
    });
  }

  private confirmDelete(): boolean {
    return confirm("Deleting this driver will also remove them as the primary driver for any vehciles");
  }

  private resetForm(): void {
    this.driverForm.controls['safeDrivingSchool'].setValue(false);
  }

  private calculateAge(birthDate: Date): number {
    const dob = new Date(birthDate);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}
