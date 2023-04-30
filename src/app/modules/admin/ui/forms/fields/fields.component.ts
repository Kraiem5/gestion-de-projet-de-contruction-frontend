import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ProjetService } from '../service/projet.service';

@Component({
  selector: 'forms-fields',
  templateUrl: './fields.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FormsFieldsComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  minDate: Date
  selectedBeginDate: Date;
  selectedEndDate: Date;
  projetForm: FormGroup
  contrat = null;
  fct: any;
  contratUrl: string
  @ViewChild('singleInput', { static: false }) singleInput: ElementRef
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private service: ProjetService,
    private cd: ChangeDetectorRef
  ) {
    this.minDate = new Date
    this.selectedBeginDate = new Date();
    this.selectedEndDate = new Date();
    this.getPersonalInformation()
  }

  ngOnInit(): void {
    this.projetForm = this._formBuilder.group({
      nom_projet: ['construction maison', Validators.required],
      client: ['kraiem', Validators.required],
      short_description: ['exte rieur et interieur', Validators.required],
      description: ['', Validators.required],
      begin: ['', Validators.required],
      end: ['', Validators.required],
      user: ['kraiem', Validators.required],
      code_postal: ['5020', Validators.required],
      contrat: ['']


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

  enregistrementProjet() {
    if (this.projetForm.invalid) {
      alert('Le formulaire est invalide')
      return;
    }
    this.projetForm.patchValue({ contrat: this.contratUrl })
    console.log(this.projetForm.value);



    this.service.enregistrement(this.projetForm.value).subscribe(
      res => {
        alert('enregistreé avec success')
        console.log('enregistreé avec success', res);
      },
      err => {
        alert('Une erreur est survenue lors de l\'enregistrement du projet')
        console.log('Une erreur est survenue lors de l\'enregistrement du projet', err);

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
