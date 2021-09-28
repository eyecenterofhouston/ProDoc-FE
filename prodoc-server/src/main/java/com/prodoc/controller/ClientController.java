package com.prodoc.controller;

import com.prodoc.payload.request.ClientSignupRequest;
import com.prodoc.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    @PostMapping("/signup")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerClient(@Valid @RequestBody ClientSignupRequest signUpRequest) {
        return  clientService.addClient(signUpRequest);
    }

    @PostMapping("/updateClientInfo")
    public ResponseEntity<?> updateClientIfo(@Valid @RequestBody ClientSignupRequest signUpRequest) {
       return null;
    }


    @GetMapping("/recentReg")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> getRecentRegistration() {
        return ResponseEntity.ok(clientService.getRecentRegistered());
    }
}
