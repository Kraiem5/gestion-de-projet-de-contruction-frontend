import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjetService } from '../service/projet.service';

@Component({
  selector: 'forms-fields',
  templateUrl: './fields.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditFormsComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  minDate: Date
  selectedBeginDate: Date;
  selectedEndDate: Date;
  projetForm: FormGroup
  contrat = null;
  fct: any;
  contratUrl: string
  @ViewChild('singleInput', { static: false }) singleInput: ElementRef
  error: boolean = false;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private service: ProjetService,
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EditFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.minDate = new Date
    this.selectedBeginDate = new Date();
    this.selectedEndDate = new Date();

  }

  ngOnInit(): void {

    this.projetForm = this._formBuilder.group({
      _id: [this.data._id, Validators.required],
      nom_projet: [this.data.nom_projet, Validators.required],
      client: [this.data.client, Validators.required],
      description: [this.data.description, Validators.required],
      begin: [this.data.begin, Validators.required],
      end: [this.data.end, Validators.required],
      user: [this.data.user, Validators.required],
      code_postal: [this.data.code_postal, Validators.required],
      contrat: [this.data.contrat]


    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the form field helpers as string
   */
  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }
  onDateSelect(selectedDate: Date) {
    if (selectedDate < this.minDate) {
      this.minDate = selectedDate;
    }
  }
  onBeginDateSelect(event: MatDatepickerInputEvent<Date>) {
    this.selectedBeginDate = event.value;
    this.selectedEndDate = this.selectedBeginDate;
  }

  updateProjet() {
    if (this.projetForm.invalid) {
      alert('Le formulaire est invalide')
      return;
    }



    this.service.updateProject(this.projetForm.value).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      err => {
        console.log("errrrror")
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000)

      }
    )
  }
  selectedContrat(event) {
    this.fct = event.target.files[0]
    console.log(event);
  }
  getPersonalInformation() {
    this.service.getPersonelInfo().subscribe(
      (res: any) => {
        if (res.status) {
          if (res.result.contrat)
            this.contrat = "http://localhost:3000/contrat/" + res.result.contrat
          // console.log(this.profileImage);
          this.cd.detectChanges()
        }
      }
    )
  }
  saveContrat() {
    const file = new FormData()
    file.set('contrat', this.fct)
    console.log(file)
    // post request to express backend
    this.service.saveContrat(file)
      .subscribe((res: any) => {
        console.log(res)
        this.contratUrl = res.result
        //console.log(this.contrat);
        alert("contrat saved ")


      }, err => {
        console.log(err);

      })
  }

}
