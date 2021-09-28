package com.prodoc.controller;

import javax.validation.Valid;

import com.prodoc.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.prodoc.payload.request.UserSignupRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENT')")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserSignupRequest signUpRequest) {
      return  userService.userSignUp(signUpRequest);
    }
    @PostMapping("/signupAdmin")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody UserSignupRequest signUpRequest) {
        return  userService.userSignUp(signUpRequest);
    }

    @PostMapping("/updateUserInfo")
    public ResponseEntity<?> updateUserIfo(@Valid @RequestBody UserSignupRequest signUpRequest) {
        return  userService.updateUserInfo(signUpRequest);
    }

}