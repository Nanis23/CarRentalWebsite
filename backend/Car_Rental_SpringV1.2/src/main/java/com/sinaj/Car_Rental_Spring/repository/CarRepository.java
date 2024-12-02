package com.sinaj.Car_Rental_Spring.repository;

import com.sinaj.Car_Rental_Spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
}
