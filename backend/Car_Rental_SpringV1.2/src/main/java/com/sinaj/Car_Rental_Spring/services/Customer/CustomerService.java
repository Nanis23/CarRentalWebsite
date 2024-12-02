package com.sinaj.Car_Rental_Spring.services.Customer;

import com.sinaj.Car_Rental_Spring.dto.BookCarDto;
import com.sinaj.Car_Rental_Spring.dto.CarDTO;

import java.util.List;

public interface CustomerService {

    List<CarDTO> getAllCars();

    boolean bookACar(BookCarDto bookCarDto);

    CarDTO getCarByID(Long carId);

    List<BookCarDto> getBookingsByUserId(Long userId);
}
