import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {Observable, of, tap} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import {Member} from "../../model/member";
import {MessageService} from "../../message.service";
import {CommonModel} from "../../model/CommonModel";

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
  private baseUrl: string;
  //this.baseUrl = 'http://localhost:8081';
  private addMembersUrl = 'https://plurielles-backend.herokuapp.com/api/member/w/insert/new';  // URL to web api
  private membersListUrl = 'https://plurielles-backend.herokuapp.com/api/member/r/list/all';
  private sngleMemberUrl = 'https://plurielles-backend.herokuapp.com/api/member/r/single/entry/';
  private categoriesListUrl = 'https://plurielles-backend.herokuapp.com/api/category/r/list/all';
  private formulasListUrl = 'https://plurielles-backend.herokuapp.com/api/formula/r/list/all';
  private secteursListUrl = 'https://plurielles-backend.herokuapp.com/api/secteur/r/list/all';

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

  /** GET bourses from the server */
  getAllCategories(): Observable<CommonModel[]> {
    return this.http.get<CommonModel[]>(this.categoriesListUrl, httpOptions)
        .pipe(
            tap(_ => console.log('fetched Categories')),
            catchError(this.handleError<CommonModel[]>('getAllCategorie', []))
        );
  }

  /** GET bourses from the server */
  getAllFormulas(): Observable<CommonModel[]> {
    return this.http.get<CommonModel[]>(this.formulasListUrl, httpOptions)
        .pipe(
            tap(_ => console.log('fetched Formulas')),
            catchError(this.handleError<CommonModel[]>('getAllFormulas', []))
        );
  }

  /** GET bourses from the server */
  getAllSecteurs(): Observable<CommonModel[]> {
    return this.http.get<CommonModel[]>(this.secteursListUrl, httpOptions)
        .pipe(
            tap(_ => console.log('fetched Secteurs')),
            catchError(this.handleError<CommonModel[]>('getAllSecteurs', []))
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

