import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/interfaces';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Output() articleIsDeleted: EventEmitter<number> = new EventEmitter();
  @Input() article: Article;
  @Input() buttons: string[] = [];

  constructor() {}

  ngOnInit(): void {}
  // !  article is deleted emit this event to parent
  public onArticleIsDeleted(id: number) {
    this.articleIsDeleted.emit(id);
  }
}
