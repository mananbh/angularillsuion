import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ModalService } from '../../../../app/modal.service';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {
  formData = {}
  console = console;
  basicForm: FormGroup;
  dataSource :any;
  department :any;

  customer:[];
  searchTerm : FormControl = new FormControl();
  FromDate : FormControl = new FormControl();
  ToDate : FormControl = new FormControl();

  myCustomer = <any>[];
  constructor(private modalService: ModalService,
    public confirmService: AppConfirmService,
    private cdr: ChangeDetectorRef,
    private getdata: GetcommdataService,
    private datePipe: DatePipe) { 

    // this.basicForm = JSON.parse(sessionStorage.getItem('basicForm')) || new BasicFormComponent();
  }
  
  ngOnInit() {
    //this.bodyText = 'This text can be updated in modal 1';

    
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.getdata.search(term).subscribe(
            data => {
              this.myCustomer = data as any[];
              //console.log(data[0].BookName);
          })
        }
    })
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
      }),
      // FromDate: new FormControl['', [Validators.required]],
      // ToDate: ['', [Validators.required]],
      FromDate: new FormControl('', [
        Validators.required
      ]),
      ToDate: new FormControl('', [
        Validators.required
      ]),
      DepartmentID: new FormControl('', [
        Validators.required
      ]),
      
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

   getemployeedata(){
   
    this.getdata.getserachautocomplete().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.customer =   this.dataSource.Data;
      
       }
    );
  }


   openDialog() {
    this.confirmService.confirm({title: 'PDF Preview', 
      message: 'Please Conform.. ',
      firstname: this.basicForm.value.firstname,
      username: this.basicForm.value.username,
      email: this.basicForm.value.email,
      website: this.basicForm.value.website,
      checkbox: this.basicForm.value.agreed,
      radiobutton: this.basicForm.value.gender})
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
            {
              text: 'gender : ' + this.basicForm.value.gender,
            },
            {
              text: 'agreed : ' + this.basicForm.value.agreed,
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


  getdepartmentdata(){
       this.department  =[
        { Description: 'Acrylic' },  { ID: 'AU' },
        { Description: 'Captek' }, { ID: 'BM' },
        { Description: 'Ceramic'}, { ID: 'CA'} ,
        {Description: 'Composite'}, { ID: 'CM'} ,
        {Description: 'Correction'}, { ID: 'DK' },
        {Description: 'Managment'},  { ID:'FR'} 
    ];
  }
}