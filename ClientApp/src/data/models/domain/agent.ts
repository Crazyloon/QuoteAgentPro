import { AccountStatus } from "../../constants/enumerations/accountStatus";

export class Agent {
  constructor() {
  }

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accountStatus: AccountStatus;
  registrationDate: Date;
}
