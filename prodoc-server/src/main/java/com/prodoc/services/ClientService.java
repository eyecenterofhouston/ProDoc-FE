package com.prodoc.services;

import com.prodoc.models.*;
import com.prodoc.payload.request.ClientSignupRequest;
import com.prodoc.payload.request.UserSignupRequest;
import com.prodoc.payload.response.Response;
import com.prodoc.repository.ClientRepository;
import com.prodoc.repository.MicroAppRepository;
import com.prodoc.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepo;

    @Autowired
    MicroAppRepository microAppRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserService userService;

    final Integer CLIENT_ROLE=4;

    @Transactional
    public ResponseEntity<?> addClient(ClientSignupRequest signUpRequest) {
        Optional<Client> clinicExist = clientRepo.findByClinicEmail(signUpRequest.getClinicEmail());
        if (clinicExist.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Response("error", "Client Already exist", clinicExist.get()));
        }
        Client client = new Client(signUpRequest);
        client = addRoles(client);
        Set<MicroApp> apps = new HashSet<>();
        client = addMicroApps(client, signUpRequest.getMicroApps());
        client = clientRepo.save(client);
        userService.userSignUp(signupClientLogin(client,signUpRequest.getMicroApps()));
        return ResponseEntity
                .ok()
                .body(new Response("success", "Client registered successfully", client));
    }

    UserSignupRequest signupClientLogin(Client client,Set<Integer> userApps){

        UserSignupRequest signUp = new UserSignupRequest();
        signUp.setEmail(client.getClinicEmail());
        signUp.setFirstName(client.getClinicName());
        signUp.setPassword(client.getClinicPhone());
        signUp.setMicroApps(userApps);
        Set<Integer> clientRole =  new HashSet<>();
        clientRole.add(CLIENT_ROLE);
        signUp.setRole(clientRole);
        signUp.setUsername(client.getClinicEmail());
        signUp.setPassword(client.getClinicPhone());

        return signUp;
    }

    Client addMicroApps(Client client, Set<Integer> userApps) {
        Set<MicroApp> appList = new HashSet<>();
        for (Integer appId : userApps) {
            MicroApp microApp = microAppRepository.findById(appId).orElseThrow(() -> new RuntimeException("Error: App not found."));
            appList.add(microApp);
        }
        client.setApps(appList);
        return client;
    }

    Client addRoles(Client client) {
        Set<Role> roles = new HashSet<>();
        // currently in DB 4 id is of client role
        Role role = roleRepository.findById(CLIENT_ROLE).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        client.setRoles(roles);
        return client;
    }

    public List<Client> getRecentRegistered(){
        return clientRepo.findAll();
    }

}
