package com.prodoc.repository;

import com.prodoc.models.PatientReferral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientReferralRepository extends JpaRepository<PatientReferral,Long> {
}
