import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';


const BASE_URL = "http://localhost:8080";

export interface Car {
  id: number;
  brand: string;
  color: string;
  name: string;
  type: string;
  transmission: string;
  description: string;
  price: number;
  year: number;
  returnedImage: string;
  processedImage?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    return this.http.get(BASE_URL + '/api/customer/cars', {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(BASE_URL + '/api/customer/car/' + carId, {
      headers: this.createAuthorizationHeader()
    });

  }

  getBookingsByUserId(): Observable<any> {
    return this.http.get(BASE_URL + '/api/customer/car/bookings/' + StorageService.getUserId(), {
      headers: this.createAuthorizationHeader()
    });

  }

  bookACar(bookACarDto: any): Observable<any> {
    return this.http.post(
      BASE_URL + '/api/customer/car/book', // Correct endpoint URL
      bookACarDto, // Payload should be sent here
      {
        headers: this.createAuthorizationHeader() // Headers passed as the third parameter
      }
    );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );

  }
}
