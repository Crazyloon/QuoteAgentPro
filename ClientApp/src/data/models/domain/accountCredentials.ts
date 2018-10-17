import { AccessLevel } from "../../constants/enumerations/accessLevel";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface AccessCredentials {
  [key: string]: AccessLevel;
}
