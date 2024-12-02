package com.sinaj.Car_Rental_Spring.services.Admin;

import com.sinaj.Car_Rental_Spring.dto.BookCarDto;
import com.sinaj.Car_Rental_Spring.dto.CarDTO;
import org.w3c.dom.stylesheets.LinkStyle;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    boolean postCar(CarDTO carDTO);

    List<CarDTO> getAllCars();

    void deleteCar(Long id);

    CarDTO getCarById(Long id);

    boolean updateCar(Long carId, CarDTO carDTO) throws IOException;

    List<BookCarDto> getBookings();

    boolean changeBookingStatus ( Long bookingId, String status);
}
