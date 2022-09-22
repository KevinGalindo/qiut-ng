import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produc-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produc-form.component.html',
  styleUrls: ['./produc-form.component.scss']
})
export class ProducFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
