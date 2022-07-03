import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DataService {

  private subject = new Subject<any>();
  setBack(type: any) {
    this.subject.next(type);
  }

  getBack(): Observable<any> {
    return this.subject.asObservable();
  }
  getProductById(id: any) {
    console.log(environment.GET_PRODUCT_BY_ID + '/' + id);

    return this.http
      .get<any>(environment.GET_PRODUCT_BY_ID + '/' + id, {
        observe: 'response',
      })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  constructor(private http: HttpClient) {}
  getSliders(): Observable<any> {
    return this.http
      .get<any>(environment.GET_SLIDER, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getOffers(): Observable<any> {
    return this.http
      .get<any>(environment.GET_OFFERS, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getMeals(): Observable<any> {
    return this.http
      .get<any>(environment.GET_MEALS, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getDrinks(): Observable<any> {
    return this.http
      .get<any>(environment.GET_DRINKS, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getServices(): Observable<any> {
    return this.http
      .get<any>(environment.GET_SERVICE, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getTestimonials(): Observable<any> {
    return this.http
      .get<any>(environment.GET_TESTIMONIAL, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  getBurgers(): Observable<any> {
    return this.http
      .get<any>(environment.GET_BURGERS, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
