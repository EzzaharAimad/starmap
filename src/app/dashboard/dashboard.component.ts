import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @Input() city: any; // City object passed from the search bar
  weatherData: any; // Weather data to display
  apiKey: string = '232b3ae7e2e331ec2f3bf646019421ae'; // Replace with your OpenWeatherMap API key

  currentDate: Date = new Date();
  currentTime: Date = new Date();

  constructor(private http: HttpClient) {
    this.currentTime = new Date();
  }

  ngOnChanges() {
    if (this.city) {
      this.getWeatherData();
    }
  }

  getWeatherData() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.city.lat}&lon=${this.city.lon}&appid=${this.apiKey}&units=metric`;

    this.http.get(apiUrl).subscribe(
      (data) => {
        this.weatherData = data; // Store the weather data
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
