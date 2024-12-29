import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import L, { tileLayer, latLng, marker, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() lat: number = 0;
  @Input() lon: number = 0;
  map!: Map;

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lat'] || changes['lon']) {
      this.updateMap();
    }
  }

  initMap(): void {
    this.map = new Map('map', {
      center: latLng(this.lat, this.lon),
      zoom: 13,
    });

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);

    this.addMarker();
  }

  updateMap(): void {
    if (this.map) {
      this.map.setView(latLng(this.lat, this.lon), 13); // Update the map view to the new coordinates
      this.addMarker(); // Optionally update or add a marker
    }
  }

  addMarker(): void {
    // Remove existing markers before adding a new one
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    marker([this.lat, this.lon])
      .addTo(this.map)
      .bindPopup('Selected City')
      .openPopup();
  }
}
