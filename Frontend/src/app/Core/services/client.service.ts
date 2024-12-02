import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:9090/clients';  

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Replace with your token retrieval logic
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add JWT token
    });
  }
  UpdateClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  createClients(clients: Client[]): Observable<Client[]> {
    return this.http.post<Client[]>(`${this.apiUrl}/add`, clients);
  }

  // Get all clients
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Get a single client by ID
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  // Delete a client by ID
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
