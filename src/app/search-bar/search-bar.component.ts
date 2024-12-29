import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, DashboardComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchQuery: string = '';
  apiKey: string = '232b3ae7e2e331ec2f3bf646019421ae'; // Replace with your OpenWeatherMap API Key
  cities: any[] = []; // Array to store matching cities
  selectedCity: any = null; // Track selected city
  showSuggestions: boolean = false; // Control visibility of suggestions

  constructor(private http: HttpClient) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log(`Searching for: ${this.searchQuery}`);
      this.searchCity(this.searchQuery);
    } else {
      this.cities = []; // Clear cities if search is empty
      this.showSuggestions = false; // Hide suggestions when search is empty
    }
  }
  searchCity(query: string) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log('City search results:', response);
        this.cities = response; // Store matching cities in the array
        this.showSuggestions = this.cities.length > 0; // Show suggestions if there are results
      },
      (error) => {
        console.error('Error fetching city data:', error);
      }
    );
  }
  selectCity(city: any) {
    this.selectedCity = city; // Set the selected city
    this.searchQuery = city.name; // Update the search input with the selected city name
    this.cities = []; // Clear the suggestions
    this.showSuggestions = false; // Hide the suggestions
  }
}
