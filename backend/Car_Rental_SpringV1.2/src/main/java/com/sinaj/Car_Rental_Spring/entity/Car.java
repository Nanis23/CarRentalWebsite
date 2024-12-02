package com.sinaj.Car_Rental_Spring.entity;

import com.sinaj.Car_Rental_Spring.dto.CarDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String color;
    private String name;
    private String type;
    private String transmission;
    private String description;
    private Long price;
    private int year;

    @Column( columnDefinition = "longblob")
    private byte[] image;

    public CarDTO getCarDto(){
        CarDTO carDto = new CarDTO();
        carDto.setId(id);
        carDto.setName(name);
        carDto.setBrand(brand);
        carDto.setColor(color);
        carDto.setPrice(price);
        carDto.setYear(year);
        carDto.setTransmission(transmission);
        carDto.setDescription(description);
        carDto.setType(type);
        carDto.setReturnedImage(image);

        return carDto;

    }
}
