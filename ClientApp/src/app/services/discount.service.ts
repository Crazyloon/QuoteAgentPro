import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Discount } from '../../data/models/domain/discount';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discountUrl: string;
  constructor(private messageService: MessageService, private http: HttpClient) {
    this.discountUrl = 'api/discounts';
  }

  getDiscountsByState(state: string): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.discountUrl}/states/${state}`).pipe(
      tap(discounts => this.log('Discount Service: got discounts!')),
      catchError(this.handleError<Discount[]>('getDiscountsByState', []))
    );
  }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(this.discountUrl, httpOptions).pipe(
      tap(discounts => this.log('Discount Service: got discounts!')),
      catchError(this.handleError<Discount[]>('getDiscounts', []))
    );
  }

  getDiscount(id: number): Observable<Discount> {
    const url = `${this.discountUrl}/${id}`;
    return this.http.get<Discount>(url).pipe(
      tap(_ => this.log(`Discount Service: got discount. Id: ${id}`)),
      catchError(this.handleError<Discount>(`getDiscount id: ${id}`))
    );
  }

  addDiscount(discount: Discount): Observable<Discount> {
    return this.http.post<Discount>(this.discountUrl, discount, httpOptions).pipe(
      tap((q: Discount) => this.log(`Discount Service: discount: ${q.id} added!`)),
      catchError(this.handleError<Discount>('addQuote'))
    );
  }

  deleteDiscount(discount: Discount | number): Observable<Discount> {
    const id = typeof discount === 'number' ? discount : discount.id;
    const url = `${this.discountUrl}/${id}`;

    return this.http.delete<Discount>(url, httpOptions).pipe(
      tap(_ => this.log(`Discount Service: ${id} deleted!`)),
      catchError(this.handleError<Discount>('deleteQuote'))
    );
  }

  updateDiscount(discount: Discount): Observable<any> {
    const url = `${this.discountUrl}/${discount.id}`;
    return this.http.put<Discount>(url, discount, httpOptions).pipe(
      tap(_ => this.log(`Discount Service: Discount - ${discount.id} updated!`)),
      catchError(this.handleError<Discount>('updateQuote'))
    );
  }

  getStatesOfOperation(): Observable<string[]> {
    const url = `${this.discountUrl}/states`;
    return this.http.get<string[]>(url).pipe(
      tap(_ => this.log(`Discount Service: Got states list`)),
      catchError(this.handleError<string[]>('getStatesOfOperation'))
    );
  }

  addDiscounts(discounts: Discount[]): Observable<Discount[]> {
    const url = `${this.discountUrl}/addmany`;
    return this.http.post<Discount[]>(url, discounts, httpOptions).pipe(
      tap(_ => this.log(`Discount Service: Added list of discounts`)),
      catchError(this.handleError<Discount[]>(`addDiscounts`, []))
    );
  }

  private log(message: string) {
    this.messageService.add(`QuoteService: ${message}`);
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
