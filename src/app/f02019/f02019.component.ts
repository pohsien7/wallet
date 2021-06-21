import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { F02019child1Component } from './f02019child1/f02019child1.component';
import { F02019child2Component } from './f02019child2/f02019child2.component';
import { F02019child3Component } from './f02019child3/f02019child3.component';

@Component({
  selector: 'app-f02019',
  templateUrl: './f02019.component.html',
  styleUrls: ['./f02019.component.css', '../../assets/css/f02.css']
})
export class F02019Component implements OnInit {

  chooseForm: string;
  myInjector: Injector;
  mapping = new Map<string, any>(
    [
      ['A', F02019child1Component],
      ['B', F02019child2Component],
      ['C', F02019child3Component]
    ]
  );
  constructor() { }

  ngOnInit() {
    this.chooseForm = 'A';
  }

  set(which: string) {
    this.chooseForm = which;
     console.log(which);
  }

}
