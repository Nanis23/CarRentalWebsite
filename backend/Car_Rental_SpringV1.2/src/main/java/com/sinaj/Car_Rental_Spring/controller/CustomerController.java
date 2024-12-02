package com.sinaj.Car_Rental_Spring.controller;

import com.sinaj.Car_Rental_Spring.dto.BookCarDto;
import com.sinaj.Car_Rental_Spring.dto.CarDTO;
import com.sinaj.Car_Rental_Spring.services.Customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    public final CustomerService customerService;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCars(){
        List<CarDTO> carsDtoList = customerService.getAllCars();
        return ResponseEntity.ok(carsDtoList);
    }

    @PostMapping("/car/book")
    public ResponseEntity<Void> bookACar(@RequestBody BookCarDto bookCarDto) {
        System.out.println("Received From Date: " + bookCarDto.getFromDate());
        System.out.println("Received To Date: " + bookCarDto.getToDate());

        boolean success = customerService.bookACar(bookCarDto);

        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


    @GetMapping("/car/{carId}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable Long carId) {
        CarDTO carDTO = customerService.getCarByID(carId);

        if (carDTO == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(carDTO);
    }

    @GetMapping("/car/bookings/{userId}")
    public ResponseEntity<List<BookCarDto>> getBookingsByUserId(@PathVariable Long userId){
        return  ResponseEntity.ok(customerService.getBookingsByUserId(userId));
    }
}
