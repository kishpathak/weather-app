import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public getWeather(location: string): any {
    return this.http.get(
      'https://api.apixu.com/v1/current.json?key=a498e370676c4a0996953447190706&q=' + location
    );
  }

  public getWeatherOnLatLong(latitude: any, longitude: any): any {
    return this.http.get(
      'https://api.apixu.com/v1/current.json?key=a498e370676c4a0996953447190706&q=' + latitude + ',' + longitude
    );
  }
}
