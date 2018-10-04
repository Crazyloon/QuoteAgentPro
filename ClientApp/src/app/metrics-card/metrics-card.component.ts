import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-metrics-card',
  templateUrl: './metrics-card.component.html',
  styleUrls: ['./metrics-card.component.scss']
})
export class MetricsCardComponent implements OnInit {
  @Input('graphURL') graphURL: string = '../../assets/images/placeholder.png';

  constructor() { }

  ngOnInit() {
  }

}
