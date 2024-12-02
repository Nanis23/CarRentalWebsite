package com.sinaj.Car_Rental_Spring.controller;

import com.sinaj.Car_Rental_Spring.dto.BookCarDto;
import com.sinaj.Car_Rental_Spring.dto.CarDTO;
import com.sinaj.Car_Rental_Spring.services.Admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.function.LongConsumer;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;


    @PostMapping("/car")
    public ResponseEntity<?> postCar(@ModelAttribute CarDTO carDTO){

        boolean success= adminService.postCar(carDTO);

        if (success){
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/cars")
    public  ResponseEntity<?> getAllCars(){
        return ResponseEntity.ok(adminService.getAllCars());
    }

    @DeleteMapping("car/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id){
        adminService.deleteCar(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/car/{id}")
    public  ResponseEntity<CarDTO> getCarById(@PathVariable Long id){
        CarDTO carDto = adminService.getCarById(id);
        
        return ResponseEntity.ok(carDto);
    }

    @PutMapping("/car/{carId}")
    public ResponseEntity<Void> uodateCar(@PathVariable Long carId, @ModelAttribute CarDTO carDTO) throws IOException {
        boolean success=  adminService.updateCar(carId, carDTO);
        try {
            if (success) return ResponseEntity.status(HttpStatus.OK).build();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @GetMapping("/car/bookings")
    public  ResponseEntity<List<BookCarDto>> getBookings(){
        return ResponseEntity.ok(adminService.getBookings());
    }

    @GetMapping("/car/booking/{bookingId}/{status}")
    public ResponseEntity<?> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status){
        boolean success= adminService.changeBookingStatus(bookingId, status);
        if(success) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();

    }
}

















