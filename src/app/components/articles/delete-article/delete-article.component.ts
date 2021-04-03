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
  @Output() articleIsDeleted: EventEmitter<number> = new EventEmitter();
  @Input() id: number;
  isDeleted: boolean = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  //* open Modal
  public openModal() {
    const dialogRef = this.dialog.open(ModalDelete, {
      height: '250px',
      width: '450px',
      data: { id: this.id, isDeleted: this.isDeleted },
    });
    //* after Modal been closed
    dialogRef.afterClosed().subscribe((result) => {
      // ! if article is deleted emit this event to parent
      this.isDeleted = result;
      this.isDeleted ? this.articleIsDeleted.emit(this.id) : '';
    });
  }
}
//
//******************* ! Delete Modal component  ******************
//
//
@Component({
  selector: 'delete-modal',
  templateUrl: 'delete.modal.html',
})
export class ModalDelete {
  isError: string = null;

  constructor(
    public dialogRef: MatDialogRef<ModalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private articleServices: ArticlesService,
    private router: Router
  ) {}
  //* on close modal
  public onNoClick(): void {
    this.dialogRef.close();
  }
  //* clicking yes button delete article
  public onDelete() {
    this.isError = null;

    this.articleServices.deleteArticle(this.data.id).subscribe(
      (data: any) => {
        //* if data status faild show error
        if (data.status === 'failed') {
          this.isError = data.reason;
        } else {
          //* if data status success
          this.dialogRef.close();
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        this.isError = err;
      }
    );
  }
}
