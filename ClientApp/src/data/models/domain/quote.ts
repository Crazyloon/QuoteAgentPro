import { Driver } from "./driver";
import { Vehicle } from "./vehicle";

export class Quote {
  constructor() {}

  id: number;
  userId: string;
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
  submitted: boolean;
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
  quoteMultiplier: number;

  addDriver(driver: Driver): void {
    this.drivers.push(driver);
  }
  
  updateDriver(driver: Driver): void {
    let driverToUpdate = this.drivers.find(d => d.id == driver.id);
    if(!driverToUpdate) return;

    let updated = Object.assign(driverToUpdate, driver);
  }

  deleteDriver(driver: Driver | number): void {
    const id = typeof driver === 'number' ? driver : driver.id;
    this.drivers = this.drivers.filter(d => d.id != id);
  }

  addVehicle(vehicle: Vehicle): void {
    this.vehicles.push(vehicle);
  }

  updateVehicle(vehicle: Vehicle): void {
    let vehicleToUpdate = this.vehicles.find(v => v.id == vehicle.id);
    if(!vehicleToUpdate) return;

    let updated = Object.assign(vehicleToUpdate, vehicle);
  }

  deleteVehicle(vehicle: Vehicle | number): void {
    const id = typeof vehicle === 'number' ? vehicle : vehicle.id;
    this.vehicles = this.vehicles.filter(v => v.id != id);
  }

}
