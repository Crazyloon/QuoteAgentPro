import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, take, filter } from 'rxjs/operators';
import { LoginCredentials } from '../data/models/domain/accountCredentials';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loginUrl: string;
  private registerUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) {
      this.loginUrl = 'api/account/login';
      this.registerUrl = 'api/account/register';
   }

  login(creds: LoginCredentials): Observable<string> {
    return this.http.post<string>(this.loginUrl, creds, httpOptions).pipe(
      tap((key: string) => this.log(`Account Service: ${creds.username} logged in.`)),
      catchError(this.handleError<string>('addLoginCredentials'))
    );
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
    console.log(`QuoteService: ${message}`);
    this.messageService.add(`QuoteService: ${message}`);
  }
}
