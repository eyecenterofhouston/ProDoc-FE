package com.prodoc.repository;

import com.prodoc.models.Patient;
import com.prodoc.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Patient findByPhone(String phone);
    Patient findByQrCode(String qrCode);
}
