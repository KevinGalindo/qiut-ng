import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-content',
  standalone: true,
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  imports: [CommonModule],
})
export class HomeContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
