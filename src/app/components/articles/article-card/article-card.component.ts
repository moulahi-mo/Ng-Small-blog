import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/interfaces';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  @Input() buttons: string[] = [];
  @Output() onDeleteArticle: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  public onDelete() {
    this.onDeleteArticle.emit(this.article.id);
  }
}
