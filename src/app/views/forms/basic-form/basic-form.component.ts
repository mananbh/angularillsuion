import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ModalService } from '../../../../app/modal.service';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';



@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {
  formData = {}
  console = console;
  basicForm: FormGroup;
  
  constructor(private modalService: ModalService,
    public confirmService: AppConfirmService,
    private cdr: ChangeDetectorRef) { 

    // this.basicForm = JSON.parse(sessionStorage.getItem('basicForm')) || new BasicFormComponent();
  }
  
  ngOnInit() {
    //this.bodyText = 'This text can be updated in modal 1';
    let password = new FormControl('', Validators.required);
    let confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.basicForm = new FormGroup({
      username: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      firstname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      website: new FormControl('', CustomValidators.url),
      date: new FormControl(),
      cardno: new FormControl('', [
        CustomValidators.creditCard
      ]),
      phone: new FormControl('', CustomValidators.phone('BD')),
      password: password,
      confirmPassword: confirmPassword,
      gender: new FormControl('', [
        Validators.required
      ]),
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }
  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}
  generatePdf(){
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
   }


   openDialog() {
    this.confirmService.confirm({title: 'PDF Preview', 
      message: 'Please Conform.. ',
      firstname: this.basicForm.value.firstname,
      username: this.basicForm.value.username,
      email: this.basicForm.value.email,
      website: this.basicForm.value.website})
      .subscribe((result) => {
        // this.basicForm.value.website = result;
        
        this.cdr.markForCheck();
      });
  }



   getDocumentDefinition() {
    sessionStorage.setItem('basicForm', JSON.stringify(this.formData));
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
              text:  'Firstname : '+this.basicForm.value.firstname,
            },
            {
              text: 'Username : '+this.basicForm.value.username
            },
            {
              text: 'Email : ' + this.basicForm.value.email,
            },
            {
              text: 'website : ' + this.basicForm.value.website,
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