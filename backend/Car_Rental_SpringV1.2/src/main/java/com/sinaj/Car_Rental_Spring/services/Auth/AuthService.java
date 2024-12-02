package com.sinaj.Car_Rental_Spring.services.Auth;

import com.sinaj.Car_Rental_Spring.dto.SignupRequest;
import com.sinaj.Car_Rental_Spring.dto.UserDTO;

public interface AuthService {

    UserDTO createCustomer(SignupRequest signupRequest);

    boolean customerEmailExists(String email);
}
