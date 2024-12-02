import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseurl='http://localhost:9090/invoices';


  constructor(private http:HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http
      .get<Invoice[]>(this.baseurl)
      .pipe(catchError(this.handleError)); 
  }

  // Get a specific invoice by ID
  getInvoice(id: number): Observable<Invoice> {
    return this.http
      .get<Invoice>(`${this.baseurl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Create a new invoice
  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http
      .post<Invoice>(`${this.baseurl}/add`, invoice)
      .pipe(catchError(this.handleError));
  }

  // Update an existing invoice
  updateInvoice(id: number, invoice: Invoice): Observable<Invoice> {
    return this.http
      .put<Invoice>(`${this.baseurl}/${id}`, invoice)
      .pipe(catchError(this.handleError));
  }

  // Delete an invoice
  deleteInvoice(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseurl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
