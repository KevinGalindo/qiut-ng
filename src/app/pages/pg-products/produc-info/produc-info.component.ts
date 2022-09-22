import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produc-info',
  standalone: true,
  templateUrl: './produc-info.component.html',
  styleUrls: ['./produc-info.component.scss'],
  imports: [CommonModule],
})
export class ProducInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
