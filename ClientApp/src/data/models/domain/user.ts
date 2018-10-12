import decode from 'jwt-decode';
import * as claims from '../../constants/claims';

export class User {
  constructor(userName: string, token: any) {
    this.userName = userName;
    this.token = token;
    let decoded = decode(token);
    this.role = decoded[claims.roleIdentifier];
  }

  userName: string;
  token: any;
  role: string;
}
