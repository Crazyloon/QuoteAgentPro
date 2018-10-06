import { Vehicle } from './vehicle';

export class Driver {
  constructor() {

  }

  id: number;
  quoteId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  ssn: string;
  driversLicenseNumber: string;
  issuingState: string;
  safeDrivingSchool: boolean;
  safeDrivingSchoolDiscount: number;
  under23YearsOld: boolean;
  under23YearsOldDiscount: number;
  quoteMultiplier: number;  
}
