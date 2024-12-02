package com.sinaj.Car_Rental_Spring.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CarDTO {

    private Long id;

    private String brand;
    private String color;
    private String name;
    private String type;
    private String transmission;
    private String description;
    private Long price;
    private int year;

    private MultipartFile image;

    private byte[]  returnedImage;
}
