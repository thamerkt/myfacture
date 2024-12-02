import { Component } from '@angular/core';
import { Invoice } from 'src/app/Core/models/invoice.model';
import { InvoiceService } from 'src/app/Core/services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
  invoices:Invoice[] =[];
  
  constructor(private invoiceService:InvoiceService ){}

  ngOnInit(): void {
    this.loadInvoices();
  }

  // Load invoices
  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe(
      (data) => {
        this.invoices = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Delete an invoice
  deleteInvoice(id: number): void {
    this.invoiceService.deleteInvoice(id).subscribe(
      () => {
        this.invoices = this.invoices.filter((invoice) => invoice.id !== id);
      },
      (error) => {
        console.error('Error deleting invoice!', error);
      }
    );
  }

}
