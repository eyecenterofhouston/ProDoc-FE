package com.prodoc.controller;

import com.prodoc.models.Patient;
import com.prodoc.models.PatientReferral;
import com.prodoc.payload.request.LoginRequest;
import com.prodoc.payload.response.MessageResponse;
import com.prodoc.services.ShareForCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/s4c")
public class ShareForCareController {

    @Autowired
    ShareForCareService shareForCareService;

    @PostMapping("/registerPatient")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Object> registerPatient(@Valid @RequestBody Patient patient) {
        return ResponseEntity.ok(shareForCareService.registerPatient(patient));
    }

    @GetMapping("/qrcode/{code}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Object> getPatientDetails(@PathVariable String code) {
        return ResponseEntity.ok(shareForCareService.getPatienByQRCode(code));
    }

    @PostMapping("/patientReferral")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Object> patientReferral(@Valid @RequestBody PatientReferral referal) {
        return ResponseEntity.ok(shareForCareService.claimPatientReferral(referal));
    }

    @GetMapping("/recentReg")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Object> getRecentRegistration() {
        return ResponseEntity.ok(shareForCareService.getRecentReggistered());
    }

}
