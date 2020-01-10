import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title = 'Confirm dialog';
  text = 'Just click a button!';
  firstname='';
  username='';
  email='';
  website='';

  selectedOption;
  constructor(
    public confirmService: AppConfirmService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }
  openDialog() {
    this.confirmService.confirm({title: this.title, message: this.text,
      firstname:this.firstname,username:this.username,email:this.email,website:this.website })
      .subscribe((result) => {
        this.selectedOption = result;
        
        this.cdr.markForCheck();
      });
  }
}
