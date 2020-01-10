import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { BasicFormComponent  } from '../../../../app/views/forms/basic-form/basic-form.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-confirm',
  template: `<h1 matDialogTitle class="mb-05">Titel  :{{ data.title }}</h1>
    <div mat-dialog-content class="mb-1">Message  :{{ data.message }}</div>
    <div mat-dialog-content class="mb-1">Firstname  :{{ data.firstname }}</div>
    <div mat-dialog-content class="mb-1">Username  :{{ data.username }}</div>
    <div mat-dialog-content class="mb-1">Email  :{{ data.email }}</div>
    <div mat-dialog-content class="mb-1">Website :{{ data.website }}</div>
    <div mat-dialog-actions>
    <button 
    type="button" 
    mat-raised-button
    color="primary" 
    (click)="dialogRef.close(true);">OK</button>
    <button 
    type="button" 
    mat-raised-button
    color="primary" 
    (click)="generatePdf(data);">PDF</button>
    &nbsp;
    <span fxFlex></span>
    <button 
    type="button"
    color="accent"
    mat-raised-button 
    (click)="dialogRef.close(false)">Cancel</button>
    </div>`,
})
export class AppComfirmComponent {

  generatePdf(data){
    const documentDefinition = this.getDocumentDefinition(data);
    pdfMake.createPdf(documentDefinition).open();
   }
  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  getDocumentDefinition(data) {
    // return {
    //   content: 'This is a sample PDF'
    // };
    return {
      content: [
        {
          text: 'Basic From',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text:  'Firstname : '+this.data.firstname,
            },
            {
              text: 'Username : '+this.data.username
            },
            {
              text: 'Email : ' + this.data.email,
            },
            {
              text: 'website : ' + this.data.website,
            },
            ],
            [
              // Document definition for Profile pic
            ]
          ]
        }],
        styles: {
          name: {
            fontSize: 16,
            bold: true
          }
        }
    };
  }

  
}