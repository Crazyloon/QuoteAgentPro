import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap, take, filter } from 'rxjs/operators';
import * as jwt_decode from '../../node_modules/jwt-decode';
import { LoginCredentials, RegisterCredentials } from '../data/models/domain/accountCredentials';
import * as claims from '../data/constants/claims';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export const JWT_TOKEN_KEY: string = "token";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loginUrl: string;
  private registerUrl: string;
  private userIdUrl: string;
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) {
      this.loginUrl = 'api/account/login';
      this.registerUrl = 'api/account/register';
      this.userIdUrl = 'api/account/User';
   }

  login(creds: LoginCredentials): Observable<string> {
    return this.http.post(this.loginUrl, creds, { ...httpOptions, responseType: 'text' }).pipe(
      tap((key) => {
        this.log(`login: ${creds.email} logged in.`);
      }),
      catchError(this.handleError<string>('LoginCredentials'))
    );
  }

  register(creds: RegisterCredentials): Observable<string> {
    return this.http.post(this.registerUrl, creds, { ...httpOptions, responseType: 'text' }).pipe(
      tap((url) => this.log(`register: ${creds.email} registered.`)),
      catchError(this.handleError<string>('RegisterCredentials'))
    );
  }

  getToken(): string {
    return localStorage.getItem(JWT_TOKEN_KEY)
  }

  setToken(token: string) {
    localStorage.setItem(JWT_TOKEN_KEY, `Bearer ${token}`);
  }

  getUserId(token?: string): string {
    if (!token) token = this.getToken();
    if (!token) return null;

    const decoded = jwt_decode(token);
    const nameIdentifier = decoded[claims.nameIdentifier];

    if (nameIdentifier === undefined) {
      return null;
    }
    return nameIdentifier;
  }

  getUserRole(token?: string): string {
    if (!token) token = this.getToken();
    if (!token) return null;

    const decoded = jwt_decode(token);
    const roleIdentifier = decoded[claims.roleIdentifier];

    if (roleIdentifier === undefined) {
      return null;
    }
    return roleIdentifier;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  private log(message: string) {
    //console.log(`AccountService: ${message}`);
    this.messageService.add(`AccountService: ${message}`);
  }
}
