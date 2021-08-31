package com.prodoc.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="patient_referral")
public class PatientReferral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String name;
    String phone;
    String qrCodeClaimed;

}
