import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expanding-card',
  templateUrl: './expanding-card.component.html',
  styleUrls: ['./expanding-card.component.scss']
})
export class ExpandingCardComponent implements OnInit {
  isOpen = true;
  @Input() title: string;
  @Input() completionPercentage: number;
  @Input() cardBody: string;

  constructor() {
  }

  ngOnInit() {
  }

  onToggleClicked() {
    this.isOpen = !this.isOpen;
  }

}
