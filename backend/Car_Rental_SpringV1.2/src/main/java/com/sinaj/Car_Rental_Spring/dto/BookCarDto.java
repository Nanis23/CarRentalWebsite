package com.sinaj.Car_Rental_Spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sinaj.Car_Rental_Spring.enums.BookCarStatus;
import lombok.Data;

import java.util.Date;

@Data
public class BookCarDto {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd") // Matches frontend format
    private Date fromDate;

    @JsonFormat(pattern = "yyyy-MM-dd") // Matches frontend format
    private Date toDate;


    private Long days;

    private Long price;

    private BookCarStatus bookCarStatus;

    private Long carId;

    private Long userId;

    private String username;

    private String email;
}
