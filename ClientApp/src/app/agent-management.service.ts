import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Agent } from '../data/models/domain/agent';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AgentStatusDictionary } from '../data/models/domain/agentStatusDictionary';
import { PromotionDictionary } from '../data/models/domain/promotionDictionary';

@Injectable({
  providedIn: 'root'
})
export class AgentManagementService {
  private accountBaseUrl: string;
  private serviceName: string = 'Agent Management Service';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.accountBaseUrl = 'api/management';
  }

  getAllAccounts(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.accountBaseUrl).pipe(
      tap(user => this.log(`${this.serviceName}: Got All Agents`)),
      catchError(this.handleError('GetAll', []))
    );
  }

  getPendingAccounts(): Observable<Agent[]> {
    const url = `${this.accountBaseUrl}/pending`;
    return this.http.get<Agent[]>(url).pipe(
      tap((user) => {
        this.log(`${this.serviceName}: Got Pending Agents!`);
      }),
      catchError(this.handleError('GetPending', []))
    );
  }

  getAgentAccounts(): Observable<Agent[]> {
    const url = `${this.accountBaseUrl}/agents`;
    return this.http.get<Agent[]>(url).pipe(
      tap(user => this.log(`${this.serviceName}: Got Active Agents!`)),
      catchError(this.handleError('GetActiveAgents', []))
    );
  }

  getManagerAccounts(): Observable<Agent[]> {
    const url = `${this.accountBaseUrl}/managers`;
    return this.http.get<Agent[]>(url).pipe(
      tap(manager => this.log(`${this.serviceName}: Got Managers!`)),
      catchError(this.handleError('GetManagers', []))
    );
  }

  setAgentStatusAll(agentStatuses: AgentStatusDictionary): Observable<boolean> {
    const url = `${this.accountBaseUrl}/agents/status`;
    return this.http.put<boolean>(url, agentStatuses).pipe(
      tap(_ => this.log(`${this.serviceName}: Set Agent Statuses!`)),
      catchError(this.handleError('Enable Users', false))
    );
  }

  setAccessLevel(agents: PromotionDictionary): Observable<boolean> {
    const url = `${this.accountBaseUrl}/agents/promote`;
    return this.http.put<boolean>(url, agents).pipe(
      tap(_ => this.log(`${this.serviceName}: Promoted Agents!`)),
      catchError(this.handleError('Promote Agents', false))
    );
  }

  activateAgents(agentIds: string[]): Observable<boolean> {
    const url = `${this.accountBaseUrl}/agents/activate`;
    return this.http.put<boolean>(url, agentIds).pipe(
      tap(_ => this.log(`${this.serviceName}: Activated Agents!`)),
      catchError(this.handleError('Promote Agents', false))
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
    this.messageService.add(`AccountService: ${message}`);
  }
}
