package com.MyFacture.MyFacture.Repository;

import com.MyFacture.MyFacture.Entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Integer> {
}
