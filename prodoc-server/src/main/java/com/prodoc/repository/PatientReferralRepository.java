package com.prodoc.repository;

import com.prodoc.models.PatientReferral;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientReferralRepository extends JpaRepository<PatientReferral,Long> {
}
