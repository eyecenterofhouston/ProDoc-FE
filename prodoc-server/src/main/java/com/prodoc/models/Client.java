package com.prodoc.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prodoc.payload.request.ClientSignupRequest;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 20)
    private String clinicName;

    @Column(length=20)
    private String clinicPhone;

    @Column(length=50)
    private String clinicAddress;

    @Column(length=50)
    private String clinicEmail;

    @Column(length = 20)
    private String firstName;

    @Column(length = 20)
    private String lastName;

    @Column(length=20)
    private String phone;

    @Column(length=50)
    private String address;

    @Column(length=50)
    private String email;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdTime;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "client_roles",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "client_apps",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "app_id"))
    private Set<MicroApp> apps = new HashSet<>();

    public Client() {
    }
    public Client(ClientSignupRequest signupRequest){
        this.firstName=signupRequest.getFirstName();
        this.lastName=signupRequest.getLastName();
        this.phone=signupRequest.getPhone();
        this.address=signupRequest.getAddress();
        this.email=signupRequest.getAddress();
        this.clinicName=signupRequest.getClinicName();
        this.clinicEmail=signupRequest.getClinicEmail();
        this.clinicAddress=signupRequest.getClinicAddress();
        this.clinicPhone=signupRequest.getClinicPhone();
    }
}
