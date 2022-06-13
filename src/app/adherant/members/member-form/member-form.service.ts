import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../../http-error-handler.service';
import {Member} from "../../../model/member";

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
  heroesUrl = 'http://localhost:8081/api/member/w/insert/new';  // URL to web api
  private handleError: HandleError;

  constructor(
      private http: HttpClient,
      httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  /** GET heroes from the server */
  getHeroes(): Observable<Member[]> {
    return this.http.get<Member[]>(this.heroesUrl)
        .pipe(
            catchError(this.handleError('getHeroes', []))
        );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Member[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
        { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Member[]>(this.heroesUrl, options)
        .pipe(
            catchError(this.handleError<Member[]>('searchHeroes', []))
        );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addHero(hero: Member): Observable<Member> {
    return this.http.post<Member>(this.heroesUrl, hero, httpOptions)
        .pipe(
            catchError(this.handleError('addHero', hero))
        );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<unknown> {
    const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
        .pipe(
            catchError(this.handleError('deleteHero'))
        );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateHero(hero: Member): Observable<Member> {
    httpOptions.headers =
        httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Member>(this.heroesUrl, hero, httpOptions)
        .pipe(
            catchError(this.handleError('updateHero', hero))
        );
  }
}

