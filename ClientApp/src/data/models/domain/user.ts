import decode from 'jwt-decode';

export class User {
  constructor(userName: string, token: any) {
    this.userName = userName;
    this.token = token;
    let decoded = decode(token);
    this.role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  userName: string;
  token: any;
  role: string;
}
