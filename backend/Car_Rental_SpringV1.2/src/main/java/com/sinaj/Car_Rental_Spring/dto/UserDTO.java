package com.sinaj.Car_Rental_Spring.dto;

import com.sinaj.Car_Rental_Spring.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String email;

    private UserRole userRole;
}
