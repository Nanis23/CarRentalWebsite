package com.sinaj.Car_Rental_Spring.services.Customer;

import com.sinaj.Car_Rental_Spring.dto.BookCarDto;
import com.sinaj.Car_Rental_Spring.dto.CarDTO;
import com.sinaj.Car_Rental_Spring.entity.BookACar;
import com.sinaj.Car_Rental_Spring.entity.Car;
import com.sinaj.Car_Rental_Spring.entity.User;
import com.sinaj.Car_Rental_Spring.enums.BookCarStatus;
import com.sinaj.Car_Rental_Spring.repository.BookACarRepository;
import com.sinaj.Car_Rental_Spring.repository.CarRepository;
import com.sinaj.Car_Rental_Spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    public final CarRepository carRepository;
    private final UserRepository userRepository;
    private final BookACarRepository bookCarRepository;

    @Override
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }


    @Override
    public boolean bookACar(BookCarDto bookCarDto) {
        Optional<Car> optionalCar = carRepository.findById(bookCarDto.getCarId());
        Optional<User> optionalUser = userRepository.findById(bookCarDto.getUserId());

        if (optionalCar.isPresent() && optionalUser.isPresent()) {
            BookACar bookCar = new BookACar();
            Car existingCar = optionalCar.get();

            bookCar.setUser(optionalUser.get());
            bookCar.setCar(existingCar);
            bookCar.setBookCarStatus(BookCarStatus.PENDING);

            // Explicitly set dates
            bookCar.setFromDate(bookCarDto.getFromDate());
            bookCar.setToDate(bookCarDto.getToDate());

            // Calculate days
            long diffInMilliSeconds = bookCarDto.getToDate().getTime() - bookCarDto.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds);
            bookCar.setDays(days);

            // Calculate price
            bookCar.setPrice(existingCar.getPrice() * days);

            // Save booking
            bookCarRepository.save(bookCar);

            return true;
        }

        return false;
    }

    @Override
    public CarDTO getCarByID(Long carId) {
        Optional<Car> optionalCar = carRepository.findById(carId);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }

    @Override
    public List<BookCarDto> getBookingsByUserId(Long userId) {

        return bookCarRepository.findAllByUserId(userId).stream()
                .map(BookACar::getBookCarDto)
                .collect(Collectors.toList());
    }
}
