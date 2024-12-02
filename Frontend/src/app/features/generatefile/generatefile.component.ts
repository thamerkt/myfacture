import { Component } from '@angular/core';
import { InvoiceService } from 'src/app/Core/services/invoice.service';
import { Invoice } from 'src/app/Core/models/invoice.model';

@Component({
  selector: 'app-generatefile',
  templateUrl: './generatefile.component.html',
  styleUrls: ['./generatefile.component.scss'],
})
export class GeneratefileComponent {
  invoice: Invoice = {
    companyName: '',
    issueDate: '',
    dueDate: '',
    amount: 0.0,
    status: '',
    client: {
      id: 20,
      email: '',
      phone: '',
      name: '',
      address: '',
      company_id: 0,
    },
  };

  constructor(private invoiceService: InvoiceService) {}

  // Function to create an invoice
  createInvoice(): void {
    this.invoiceService.createInvoice(this.invoice).subscribe(
      (response) => {
        console.log('Invoice created successfully:', response);
        this.generateTxtFile(response); // Generate .txt file after successful creation
      },
      (error) => {
        console.error('Error creating invoice:', error);
      }
    );
  }

  // Function to generate .txt file
  generateTxtFile(invoice: any): void {
    const content = `
Invoice Details:
-----------------
ID: ${invoice.id || 'N/A'}
User ID: ${invoice.client?.id || 'N/A'}
Status: ${invoice.status || 'N/A'}
Created At: ${invoice.created_at || new Date().toISOString()}
Updated At: ${invoice.updated_at || new Date().toISOString()}
Amount: ${invoice.amount || 'N/A'}
Client Name: ${invoice.client.name || 'N/A'}
Client Email: ${invoice.client.email || 'N/A'}
Company Name: ${invoice.companyName || 'N/A'}
Due Date: ${invoice.dueDate || 'N/A'}
Issue Date: ${invoice.issueDate || 'N/A'}
    `;

    const blob = new Blob([content.trim()], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `invoice_${invoice.id || 'unknown'}.txt`;
    link.click();

    window.URL.revokeObjectURL(link.href);
  }
}
