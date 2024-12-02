package com.MyFacture.MyFacture.Controller;

import com.MyFacture.MyFacture.Entity.Client;
import com.MyFacture.MyFacture.Repository.ClientRepository;
import com.MyFacture.MyFacture.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;


    @PostMapping
    public ResponseEntity<Client> createOrUpdateClient(@RequestBody Client client) {
        try {
            Client savedClient = clientRepository.save(client);
            return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> createClients(@RequestBody List<Client> clients) {
        try {
            // Validate that each client has a user (company) associated
            for (Client client : clients) {
                if (client.getUser() == null || client.getUser().getId() == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Each client must have a valid User (company) associated.");
                }
            }

            // Save all clients
            List<Client> savedClients = clientRepository.saveAll(clients);

            return new ResponseEntity<>(savedClients, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding clients: " + e.getMessage());
        }
    }



    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        try {
            List<Client> clients = clientRepository.findAll();
            return new ResponseEntity<>(clients, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientname(@PathVariable Long id) {
        try {
            Optional<Client> client = clientRepository.findById(Math.toIntExact(id));
            return client.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete Client by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        try {
            clientRepository.deleteById(Math.toIntExact(id));
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
