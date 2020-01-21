import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { AppComfirmComponent } from './app-confirm.component';

interface confirmData {
  title?: string,
  message?: string,
  firstname?: string,
  username?: string,
  email?: string,
  website?: string
  checkbox?: string
  radiobutton?: string
}

@Injectable()
export class AppConfirmService {

  constructor(private dialog: MatDialog) { }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.message = data.message || 'Are you sure?';
    let dialogRef: MatDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {
      width: '380px',
      disableClose: true,
      panelClass: 'my-class',
      data: {title: data.title, message: data.message,firstname:data.firstname,
      username:data.username,email:data.email,website:data.website,
      checkbox:data.checkbox,radiobutton:data.checkbox}
    });
    return dialogRef.afterClosed();
  }

  
}