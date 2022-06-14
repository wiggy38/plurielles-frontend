import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {Observable, of, tap} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import {Member} from "../../model/member";
import {MessageService} from "../../message.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MemberFormService {
  private addMembersUrl = 'http://localhost:8081/api/member/w/insert/new';  // URL to web api
  private membersListUrl = 'http://localhost:8081/api/member/r/list/all';
  private sngleMemberUrl = 'http://localhost:8081/api/member/r/single/entry/';

  constructor(
      private http: HttpClient,
      private messageService: MessageService) {}


  /** GET bourses from the server */
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersListUrl, httpOptions)
        .pipe(
            tap(_ => console.log('fetched members')),
            catchError(this.handleError<Member[]>('getAllMembers', []))
        );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Member[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
        { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Member[]>(this.addMembersUrl, options)
        .pipe(
            catchError(this.handleError<Member[]>('searchHeroes', []))
        );
  }

  /** GET heroes from the server */
  getMemberDetail(memberId: number): Observable<Member> {
    return this.http.get<Member>(this.sngleMemberUrl+memberId, httpOptions)
        .pipe(
            tap(_ => console.log('fetched members')),
            catchError(this.handleError<Member>('getMemberDetail', []))
        );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  /** Créer une bourse */
  addMember(member: any): Observable<any> {
    return this.http.post<any>(this.addMembersUrl, member, httpOptions);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result? - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any[]) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as unknown as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}

