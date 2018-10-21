import { BaseRequestOptions } from "@angular/http";
import { TOKEN } from "./services/account.service";

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {

  constructor() {
    super();

    const token = localStorage.getItem(TOKEN);
    if (token) {
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
  }

}
