import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside-articles',
  templateUrl: './aside-articles.component.html',
  styleUrls: ['./aside-articles.component.scss'],
})
export class AsideArticlesComponent implements OnInit {
  @Input() months: string[];
  @Input() years: number[];
  constructor() {}

  ngOnInit(): void {}
}
