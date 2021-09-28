package com.prodoc.payload.request;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class ClientSignupRequest {

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    private String clinicName;

    private String clinicPhone;

    private String clinicAddress;

    private String clinicEmail;

    private Set<Integer> microApps;
}
