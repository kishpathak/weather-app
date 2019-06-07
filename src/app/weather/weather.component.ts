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
  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  public sendToAPIXU(formValues: any): void {
    this.weatherService
      .getWeather(formValues.location)
      .subscribe((data: any) => {
        this.weatherData = data;
      });
  }

  public findMe(): void {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((pos: any) => {
        console.log(pos);
        this.weatherService
          .getWeatherOnLatLong(pos.coords.latitude , pos.coords.longitude)
          .subscribe((data: any) => {
            console.log(data);
            this.weatherData = data;
          });
      });
    }
  }

}
