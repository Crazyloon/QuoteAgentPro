import { Injectable } from '@angular/core';
import { Driver } from '../../data/models/domain/Driver';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, take } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private driversUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.driversUrl = 'api/drivers';
   }


  private log(message: string) {
    this.messageService.add(`DriverService: ${message}`);
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driversUrl)
    .pipe(
      tap(drivers => this.log('Driver Service: got Drivers!')),
      catchError(this.handleError('getDrivers', []))
    );
  }
  /** GET Driver by id. Will 404 if id not found */
  getDriver(id: number): Observable<Driver> {
    const url = `${this.driversUrl}/${id}`;
    return this.http.get<Driver>(url).pipe(
      tap(_ => this.log(`Driver Service: got Driver id: ${id}`)),
      catchError(this.handleError<Driver>(`getDriver id: ${id}`))
    );
  }

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.driversUrl, driver, httpOptions).pipe(
      tap((d: Driver) => this.log(`Driver Service: ${d.id} added!`)),
      catchError(this.handleError<Driver>('addDriver'))
    );
  }

  deleteDriver (driver: Driver | number): Observable<Driver> {
    const id = typeof driver === 'number' ? driver : driver.id;
    const url = `${this.driversUrl}/${id}`;

    return this.http.delete<Driver>(url, httpOptions).pipe(
      tap(_ => this.log(`Driver Service: ${id} deleted!`)),
      catchError(this.handleError<Driver>('deleteDriver'))
    );
  }

  /** PUT: update the Driver on the server */
  updateDriver (driver: Driver): Observable<any> {
    return this.http.put(this.driversUrl, driver, httpOptions).pipe(
      tap(_ => this.log(`Driver Service: ${driver.id} updated!`)),
      catchError(this.handleError<any>('updateDriver'))
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
