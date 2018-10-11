import { Injectable } from '@angular/core';
import { Quote } from '../data/models/domain/quote';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, take, filter } from 'rxjs/operators';
import { Driver } from '../data/models/domain/driver';
import { Vehicle } from '../data/models/domain/vehicle';
import { AccountService } from './account.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quotesUrl: string;
  private driversUrl: string;
  private vehiclesUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private accountService: AccountService,
  ) {
    this.quotesUrl = 'api/quotes';
    this.driversUrl = 'api/drivers';
    this.vehiclesUrl = 'api/vehicles';
   }


  private log(message: string) {
    //console.log(`QuoteService: ${message}`);
    this.messageService.add(`QuoteService: ${message}`);
  }

  getQuotes(): Observable<Quote[]> {
    const options = {...httpOptions, params: { 'userId': this.accountService.getUserId() }}
    return this.http.get<Quote[]>(this.quotesUrl, options).pipe(
        tap(quotes => this.log('Quote Service: got quotes!')),
        catchError(this.handleError('getQuotes', []))
      );
  }
  /** GET quote by id. Will 404 if id not found */
  getQuote(id: number): Observable<Quote> {
    const url = `${this.quotesUrl}/${id}`;
    return this.http.get<Quote>(url).pipe(
      tap(_ => this.log(`Quote Service: got quote id: ${id}`)),
      catchError(this.handleError<Quote>(`getQuote id: ${id}`))
    );
  }


  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.quotesUrl, quote, httpOptions).pipe(
      tap((q: Quote) => this.log(`Quote Service: quote: ${q.id} added!`)),
      catchError(this.handleError<Quote>('addQuote'))
    );
  }

  deleteQuote (quote: Quote | number): Observable<Quote> {
    const id = typeof quote === 'number' ? quote : quote.id;
    const url = `${this.quotesUrl}/${id}`;

    return this.http.delete<Quote>(url, httpOptions).pipe(
      tap(_ => this.log(`Quote Service: ${id} deleted!`)),
      catchError(this.handleError<Quote>('deleteQuote'))
    );
  }

  updateQuote (quote: Quote): Observable<any> {
    const url = `${this.quotesUrl}/${quote.id}`;
    return this.http.put<Quote>(url, quote, httpOptions).pipe(
      tap(_ => this.log(`Quote Service: Quote - ${quote.id} updated!`)),
      catchError(this.handleError<Quote>('updateQuote'))
    );
  }

  
  getDrivers(quoteId: number): Observable<Driver[]> {
    const url = `${this.driversUrl}`;
    return this.http.get<Driver[]>(url).pipe(
      tap(_ => this.log(`Quote Service: got drivers list`)),
      catchError(this.handleError<Driver[]>(`getDrivers in Quote: ${quoteId}`))
    );
  }

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.driversUrl, driver, httpOptions).pipe(
      tap((d: Driver) => this.log(`Quote Service: Driver - ${d.id} added!`)),
      catchError(this.handleError<Driver>('addDriver'))
    );
  }

  updateDriver(driver: Driver): Observable<any> {
    const url = `${this.driversUrl}/${driver.id}`;
    return this.http.put(url, driver, httpOptions).pipe(
      tap(_ => this.log(`Quote Service: Driver - ${driver.id} updated!`)),
      catchError(this.handleError<Driver>(`updateDriver`))
    );
  }

  getVehicles(quoteId: number): Observable<Vehicle[]> {
    const url = `${this.vehiclesUrl}`;
    return this.http.get<Vehicle[]>(url).pipe(
      tap(_ => this.log(`Quote Service: got vehicles list`)),
      catchError(this.handleError<Vehicle[]>(`getVehicles in Quote: ${quoteId}`))
    );
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const url = `${this.vehiclesUrl}`;
    return this.http.post<Vehicle>(url, vehicle, httpOptions).pipe(
      tap((v: Vehicle) => this.log(`Quote Service: Vehicle - ${v.id} added!`)),
      catchError(this.handleError<Vehicle>('addVehicle'))
    );
  }

  updateVehicle(vehicle: Vehicle): Observable<any> {
    const url = `${this.vehiclesUrl}/${vehicle.id}`;
    return this.http.put(url, vehicle, httpOptions).pipe(
      tap(_ => this.log(`Quote Service: Vehicle - ${vehicle.id} updated!`)),
      catchError(this.handleError<Vehicle>(`updateVehicle`))
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
}
