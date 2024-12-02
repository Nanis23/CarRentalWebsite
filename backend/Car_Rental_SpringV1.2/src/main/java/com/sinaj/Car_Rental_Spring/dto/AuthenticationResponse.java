package com.sinaj.Car_Rental_Spring.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;

    private String userRole;

    private Long userId;
}
