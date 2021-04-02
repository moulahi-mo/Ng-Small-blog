import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/interfaces';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  @Input() buttons: string[] = [];
  constructor() {}

  ngOnInit(): void {}
}
