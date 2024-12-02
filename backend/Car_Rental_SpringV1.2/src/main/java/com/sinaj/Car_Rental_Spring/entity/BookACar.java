package com.sinaj.Car_Rental_Spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sinaj.Car_Rental_Spring.dto.BookCarDto;
import com.sinaj.Car_Rental_Spring.enums.BookCarStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
public class BookACar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE) // Ensures only the date part is stored in the database
    private Date fromDate;

    @Temporal(TemporalType.DATE) // Ensures only the date part is stored in the database
    private Date toDate;


    private Long days;

    private Long price;

    private BookCarStatus bookCarStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "car_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Car car;

    public BookCarDto getBookCarDto() {
        BookCarDto bookCarDto = new BookCarDto();
        bookCarDto.setId(id);
        bookCarDto.setDays(days);
        bookCarDto.setBookCarStatus(bookCarStatus);
        bookCarDto.setPrice(price);
        bookCarDto.setFromDate(fromDate);
        bookCarDto.setToDate(toDate);
        bookCarDto.setEmail(user.getEmail());
        bookCarDto.setUsername(user.getName());
        bookCarDto.setUserId(user.getId());
        bookCarDto.setCarId(car.getId());

        return bookCarDto;
    }

}
