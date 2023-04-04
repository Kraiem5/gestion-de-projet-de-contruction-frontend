import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../service/projet.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'forms-layouts',
  templateUrl: './layouts.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FormsLayoutsComponent implements OnInit {
  project = [];
  formFieldHelpers: string[] = [''];
  minDate: Date
  selectedBeginDate: Date;
  selectedEndDate: Date;
  axeProject: FormGroup
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private serv: ProjetService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef

  ) {
    this.minDate = new Date
    this.selectedBeginDate = new Date();
    this.selectedEndDate = new Date();
  }
  ngOnInit(): void {
    this.axeProject = this._formBuilder.group({
      name: ['', Validators.required],
      projet: ['', Validators.required],
    });
    this.getNameProjet()

  }
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
  filterByCategory(change: MatSelectChange): void {
    this.axeProject.patchValue({ axe: change.value })
    console.log(change.value);

  }
  submit() {
    const { id_projet, name } = this.axeProject.value;
    this.serv.ajouterAxe(id_projet, name).subscribe(
      () => {
        console.log('Axe ajouté avec succès');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'axe', error);
      }
    );
  }
  getNameProjet() {
    this.serv.getInfoProjet().subscribe(
      (res: any) => {
        if (res.status) {
          this.project = res.result

          this.cd.detectChanges()
        }
        else
          console.log('false');
      }
    )
  }


}
