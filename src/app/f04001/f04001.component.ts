import { Component, OnInit } from '@angular/core';
import { F04001Service } from './f04001.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f04001',
  templateUrl: './f04001.component.html',
  styleUrls: ['./f04001.component.css']
})
export class F04001Component implements OnInit {

  constructor(private f04001Service: F04001Service) { }

  ngOnInit(): void {
  }

  selectedValue: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

}
