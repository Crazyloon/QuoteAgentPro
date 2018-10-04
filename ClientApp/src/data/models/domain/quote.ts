import { Driver } from "./driver";
import { Vehicle } from "./vehicle";

export class Quote {
  constructor() {}
  // constructor(user: number, fName: string, lName: string, dob: string,
  //             addr: string, city: string, state: string, zip: string){
  //               this.userId = user;
  //               this.firstName = fName;
  //               this.lastName = lName;
  //               this.dateOfBirth = dob;
  //               this.address = addr;
  //               this.city = city;
  //               this.state = state;
  //               this.zip = zip;
  // }

  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  ssn: string;
  price: number;
  dateQuoted: Date;
  sold: boolean;
  dateSold: Date;
  discarded: boolean;
  dateDiscarded: Date;
  previousCarrier: string;
  pastClaims: boolean;
  pastClaimsDiscount: number;
  movingViolations: boolean;
  movingViolationsDiscount: number;
  newDriver: boolean;
  newDriverDiscount: number;
  multiCar: boolean;
  multiCarDiscount: number;
  previousCarrierLizard: boolean;
  previousCarrierLizardDiscount: number;
  previousCarrierPervasive: boolean;
  previousCarrierPervasiveDiscount: number;
  drivers: Driver[];
  vehicles: Vehicle[];

  addDriver(driver: Driver): void {
    this.drivers.push(driver);
  }
  
  updateDriver(driver: Driver): void {
    let driverToUpdate = this.drivers.find(d => d.id == driver.id);
    if(!driverToUpdate) return;

    let updated = Object.assign(driverToUpdate, driver);
    debugger; // double check that the correct driver in the list is updated
  }

  deleteDriver(driver: Driver): void {
    this.drivers.filter(d => d.id != driver.id);
  }

  addVehicle(vehicle: Vehicle): void {
    this.vehicles.push(vehicle);
  }

  updateVehicle(vehicle: Vehicle): void {
    let vehicleToUpdate = this.vehicles.find(v => v.id == vehicle.id);
    if(!vehicleToUpdate) return;

    let updated = Object.assign(vehicleToUpdate, vehicle);
    debugger;
  }

  deleteVehicle(vehicle: Vehicle): void {
    this.vehicles.filter(v => v.id != vehicle.id);
  }

}
