package com.MyFacture.MyFacture.Repository;

import com.MyFacture.MyFacture.Entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {

}
