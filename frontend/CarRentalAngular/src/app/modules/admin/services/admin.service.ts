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


export class AdminService {

  constructor(private http: HttpClient) {}

  postCar(carDto: any): Observable<any> {
    return this.http.post(`${BASE_URL}/api/admin/car`, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCar(carId: number, carDto: any): Observable<any>{
    return this.http.put(BASE_URL+ "/api/admin/car/"+ carId, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCars(): Observable<any>{
    return this.http.get(BASE_URL+'/api/admin/cars', {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCarBookings(): Observable<any>{
    return this.http.get(BASE_URL+'/api/admin/car/bookings', {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any>{
    return this.http.get(BASE_URL+`/api/admin/car/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(id: number):Observable<any>{
    return this.http.delete(BASE_URL+"/api/admin/car/"+ id, {
      headers: this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
    
  }


  getCarById(id: number): Observable<any>{
    return this.http.get(BASE_URL+"/api/admin/car/"+ id, {
      headers: this.createAuthorizationHeader()
    });
  }
}

