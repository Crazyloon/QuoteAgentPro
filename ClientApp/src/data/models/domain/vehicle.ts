export class Vehicle{
  constructor() {

  }

  id: number;
  quoteId: number;
  primaryDriver: string;
  primaryDriverId: number;
  vin: string;
  make: string;
  model: string;
  year: number;
  currentValue: number;
  milesToWork: number;
  annualMileage: number;
  daysDrivenPerWeek: number;
  antiTheft: boolean;
  antiTheftDiscount: number;
  antilockBrakes: boolean;
  antilockBrakesDiscount: number;
  daytimeLights: boolean;
  daytimeLightsDiscount: number;
  nonResidenceGarage: boolean;
  nonResidenceGarageDiscount: number;
  passiveRestraints: boolean;
  passiveRestraintsDiscount: number;
  reducedUsed: boolean;
  reducedUsedDiscount: number;
  annualMileageUnder6k: boolean;
  annualMileageDiscount: number;
  daysDrivenPerWeekOver4: boolean;
  daysDrivenPerWeekOver4Discount: number;
  milesToWorkUnder26: boolean;
  milesToWorkUnder26Discount: number;
  quoteMultiplier: number;
}
