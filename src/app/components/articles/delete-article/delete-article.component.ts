import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.scss'],
})
export class DeleteArticleComponent implements OnInit {
  @Input() id: number;
  item: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public openModal() {
    const dialogRef = this.dialog.open(ModalDelete, {
      height: '250px',
      width: '450px',
      data: { id: this.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.item = result;
    });
  }
}

@Component({
  selector: 'delete-modal',
  templateUrl: 'delete.modal.html',
})
export class ModalDelete {
  isError: string = null;
  @Output() onDeleteArticle: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<ModalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private articleServices: ArticlesService,
    private router: Router
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onDelete() {
    this.isError = null;
    console.log(this.data.id);

    this.articleServices.deleteArticle(this.data.id).subscribe(
      (data: any) => {
        if (data.status === 'failed') {
          this.isError = data.reason;
        } else {
          console.log(data, 'is deleted');
          this.onDeleteArticle.emit();
          this.router.navigate(['/']);
          this.dialogRef.close();
        }
      },
      (err) => {
        this.isError = err;
      }
    );
  }
}
