package com.sinaj.Car_Rental_Spring.services.Admin;

import com.sinaj.Car_Rental_Spring.dto.BookCarDto;
import com.sinaj.Car_Rental_Spring.dto.CarDTO;
import com.sinaj.Car_Rental_Spring.entity.BookACar;
import com.sinaj.Car_Rental_Spring.entity.Car;
import com.sinaj.Car_Rental_Spring.enums.BookCarStatus;
import com.sinaj.Car_Rental_Spring.repository.BookACarRepository;
import com.sinaj.Car_Rental_Spring.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CarRepository carRepository;

    private final BookACarRepository bookACarRepository;

    @Override
    public boolean postCar(CarDTO carDTO) {
        try {
            Car car = new Car();
            car.setName(carDTO.getName());
            car.setBrand(carDTO.getBrand());
            car.setColor(carDTO.getColor());
            car.setPrice(carDTO.getPrice());
            car.setYear(carDTO.getYear());
            car.setType(carDTO.getType());
            car.setDescription(carDTO.getDescription());
            car.setTransmission(carDTO.getTransmission());
            car.setImage(carDTO.getImage().getBytes());

            carRepository.save(car);

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCar(Long id) {


        carRepository.deleteById(id);
    }

    @Override
    public CarDTO getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);

        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public boolean updateCar(Long carId, CarDTO carDTO) throws IOException {

        Optional<Car> optionalCar = carRepository.findById(carId);
        if (optionalCar.isPresent()) {
            Car existingCar = optionalCar.get();
            if (carDTO.getImage() != null) existingCar.setImage(carDTO.getImage().getBytes());
            existingCar.setBrand(carDTO.getBrand());
            existingCar.setColor(carDTO.getColor());
            existingCar.setName(carDTO.getName());
            existingCar.setType(carDTO.getType());
            existingCar.setTransmission(carDTO.getTransmission());
            existingCar.setDescription(carDTO.getDescription());
            existingCar.setPrice(carDTO.getPrice());
            existingCar.setYear(carDTO.getYear());

            carRepository.save(existingCar);

            return true;

        } else {
            return false;
        }
    }

    @Override
    public List<BookCarDto> getBookings() {
        return bookACarRepository.findAll().stream().map(BookACar:: getBookCarDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long bookingId, String status) {

        Optional< BookACar> optionalBookACar= bookACarRepository.findById(bookingId);

        if (optionalBookACar.isPresent()) {
            BookACar existingCarBooking = optionalBookACar.get();
            if(Objects.equals(status, "Approve")){
                existingCarBooking.setBookCarStatus(BookCarStatus.APPROVED);
            }
            else {
                existingCarBooking.setBookCarStatus(BookCarStatus.REJECTED);
            }

            bookACarRepository.save(existingCarBooking);
            return true;
        }
        return false;
    }

}