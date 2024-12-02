import { Component } from '@angular/core';
import { Client } from 'src/app/Core/models/client.model';
import { ClientService } from 'src/app/Core/services/client.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-xlreader',
  templateUrl: './xlreader.component.html',
  styleUrls: ['./xlreader.component.scss'],
})
export class XlreaderComponent {
  data: any[] = []; 
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients(); // Load clients on component initialization
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (response) => {
        this.clients = response;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readExcel(file);
    }
  }

  readExcel(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;

      // Read Excel file using XLSX
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Select the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Format the JSON data to match the backend structure
      this.data = jsonData.map((row: any) => ({
        email: row['Email'],
        phone: row['Phone'],
        name: row['Name'],
        address: row['Address'],
        user: {
          id: row['User ID'],
        },
      }));

      this.createClients(); 
    };
    reader.readAsBinaryString(file);
  }

  createClients(): void {
    this.clientService.createClients(this.data).subscribe(
      (response) => {
        console.log('Clients created successfully:', response);
        this.loadClients(); 
      },
      (error) => {
        console.error('Error creating clients:', error);
      }
    );
  }

  // Delete a client and reload clients list after success
  delete(id: number): void {
    this.clientService.deleteClient(id).subscribe(
      (response) => {
        console.log('Client deleted successfully:', response);
        this.loadClients(); // Reload the clients list after successful deletion
      },
      (error) => {
        console.error('Error deleting client:', error);
      }
    );
  }
}
