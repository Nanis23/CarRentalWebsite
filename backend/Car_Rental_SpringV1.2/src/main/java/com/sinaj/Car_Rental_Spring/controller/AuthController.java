package com.sinaj.Car_Rental_Spring.controller;


import com.sinaj.Car_Rental_Spring.dto.AuthenticationRequest;
import com.sinaj.Car_Rental_Spring.dto.AuthenticationResponse;
import com.sinaj.Car_Rental_Spring.dto.SignupRequest;
import com.sinaj.Car_Rental_Spring.dto.UserDTO;
import com.sinaj.Car_Rental_Spring.entity.User;
import com.sinaj.Car_Rental_Spring.repository.UserRepository;
import com.sinaj.Car_Rental_Spring.services.Auth.AuthService;
import com.sinaj.Car_Rental_Spring.services.Jwt.UserService;
import com.sinaj.Car_Rental_Spring.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final JWTUtil jwtUtil;

    private final UserRepository userRepository;

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws BadCredentialsException, DisabledException, UsernameNotFoundException{

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Incorrect username or password!");
        }

        final UserDetails userDetails= userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser= userRepository.findFirstByEmail(userDetails.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);
            AuthenticationResponse authenticationResponse= new AuthenticationResponse();
            if (optionalUser.isPresent()){
                authenticationResponse.setJwt(jwt);
                authenticationResponse.setUserId(optionalUser.get().getId());
                authenticationResponse.setUserRole(optionalUser.get().getUserRole().name());
            }

            return authenticationResponse;

    }

    @PostMapping("/register")
    public ResponseEntity<?> signUpRequest(@RequestBody SignupRequest signupRequest){

        if (authService.customerEmailExists(signupRequest.getEmail())){
            return new ResponseEntity<>("Email already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDTO createdCustomerDTO = authService.createCustomer(signupRequest);

        if(createdCustomerDTO== null){
            return new ResponseEntity<>("Customer not created! Please try again!", HttpStatus.BAD_REQUEST);

        }

        return new ResponseEntity<>(createdCustomerDTO, HttpStatus.CREATED);
    }

}
