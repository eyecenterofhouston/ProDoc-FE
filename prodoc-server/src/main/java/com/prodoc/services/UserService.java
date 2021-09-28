package com.prodoc.services;

import com.prodoc.models.MicroApp;
import com.prodoc.models.Role;
import com.prodoc.models.User;
import com.prodoc.payload.request.UserSignupRequest;
import com.prodoc.repository.MicroAppRepository;
import com.prodoc.repository.RoleRepository;
import com.prodoc.repository.UserRepository;
import com.prodoc.payload.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    MicroAppRepository microAppRepository;

    @Autowired
    PasswordEncoder encoder;

    public ResponseEntity<?> userSignUp(UserSignupRequest signUpRequest) {
        Optional<User> userExist = userRepository.findByEmail(signUpRequest.getUsername());
        if (userExist.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Response("error", "User Already exist", userExist.get()));
        }

        User user = new User(signUpRequest.getFirstName(),signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<Integer> strRoles = signUpRequest.getRole();
        user = addRoles(user, strRoles);
        Set<MicroApp> apps = new HashSet<>();
        user = addMicroApps(user, signUpRequest.getMicroApps());
        user = userRepository.save(user);
        return ResponseEntity
                .ok()
                .body(new Response("success", "User registered successfully", user));
    }

    public ResponseEntity<?> updateUserInfo(UserSignupRequest signUpRequest) {
        User user = userRepository.findByEmail(signUpRequest.getEmail()).orElseThrow(() -> new RuntimeException("Error: User not found."));

        Set<Integer> strRoles = signUpRequest.getRole();
        user = addRoles(user, strRoles);
        Set<MicroApp> apps = new HashSet<>();
        user = addMicroApps(user, signUpRequest.getMicroApps());
        user = userRepository.save(user);
        return ResponseEntity
                .ok()
                .body(new Response("success", "Updated successfully", user));
    }

    User addMicroApps(User user, Set<Integer> userApps) {
        Set<MicroApp> appList = new HashSet<>();
        for (Integer appId : userApps) {
            MicroApp microApp = microAppRepository.findById(appId).orElseThrow(() -> new RuntimeException("Error: App not found."));
            appList.add(microApp);
        }
        user.setApps(appList);
        return user;
    }

    User addRoles(User user, Set<Integer> strRoles) {
        Set<Role> roles = new HashSet<>();
        for (Integer roleId : strRoles) {
            Role role = roleRepository.findById(roleId).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(role);
        }
        user.setRoles(roles);
        return user;
    }
}
