import { WeatherService } from './../services/weather.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public errorDetails: string;
  public isError: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
    this.errorInitilization(false, undefined);
  }

  public sendToAPIXU(formValues: any): void {
    this.weatherService
      .getWeather(formValues.location)
      .subscribe((data: any) => {
        this.errorInitilization(false, undefined);
        this.weatherData = data;
      }, (error: any) => {
        this.errorInitilization(true, 'Unable to fetch the weather information');
      });
  }

  public findMe(): void {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((pos: any) => {
        console.log(pos);
        this.weatherService
          .getWeatherOnLatLong(pos.coords.latitude , pos.coords.longitude)
          .subscribe((data: any) => {
            this.errorInitilization(false, undefined);
            this.weatherData = data;
          }, (error: any) => {
            this.errorInitilization(true, 'Unable to fetch the weather information');
          });
      });
    }
  }

  public errorInitilization(isError: boolean, error: string): void {
    this.isError = isError;
    this.weatherData = undefined;
    this.errorDetails = error;
  }

}
