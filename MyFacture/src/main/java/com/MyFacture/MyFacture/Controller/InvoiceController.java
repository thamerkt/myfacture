package com.MyFacture.MyFacture.Controller;


import com.MyFacture.MyFacture.Entity.Invoice;
import com.MyFacture.MyFacture.Repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceRepository invrep;

    private List<Invoice> invoices = new ArrayList<>(); // Temporary in-memory storage

    // Create an Invoice
    @PostMapping("/add")
    public ResponseEntity<?> createInvoice(@RequestBody Invoice invoice) {
        try {
            invrep.save(invoice);
            return ResponseEntity.status(HttpStatus.CREATED).body(invoice);
        } catch (Exception e) {
            // Returning a BAD_REQUEST error in case of exception
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating invoice: " + e.getMessage());
        }
    }

    // Get All Invoices
    @GetMapping
    public ResponseEntity<?> getAllInvoices() {
        try {
            invoices=invrep.findAll();
            return ResponseEntity.ok(invoices);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving invoices: " + e.getMessage());
        }
    }

    // Get Invoice by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Long id) {
        try {
            Optional<Invoice> invoice=invrep.findById(Math.toIntExact(id));
            if(invoice.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: invoice not found");

            }
            Invoice invoice1=invoice.get();
            return ResponseEntity.ok("invoice" + invoice1);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    // Update an Invoice
    @PutMapping("/{id}")
    public ResponseEntity<?> updateInvoice(@PathVariable Integer id, @RequestBody Invoice updatedInvoice) {
        try {

            Optional<Invoice> invoices=invrep.findById(id);
            Invoice invoice=invoices.get();



            invoice.setCompanyName(updatedInvoice.getCompanyName());
            invoice.setIssueDate(updatedInvoice.getIssueDate());
            invoice.setDueDate(updatedInvoice.getDueDate());
            invoice.setAmount(updatedInvoice.getAmount());
            invoice.setStatus(updatedInvoice.getStatus());
            return ResponseEntity.ok(invoice);



        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    // Delete an Invoice
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable Long id) {
        try {
            if (invrep.existsById(Math.toIntExact(id))) {
                invrep.deleteById(Math.toIntExact(id)); // Deletes the invoice
                return ResponseEntity.ok("Invoice deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Invoice not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

}
