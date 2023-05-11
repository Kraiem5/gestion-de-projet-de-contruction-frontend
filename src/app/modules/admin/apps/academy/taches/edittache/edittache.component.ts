import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjetService } from '../../service/projet.service';
import { Project } from '../../project.interface';
import { result } from 'lodash';

@Component({
  selector: 'app-edittache',
  templateUrl: './edittache.component.html',

})
export class EdittacheComponent implements OnInit {
  modifierTacheForm: FormGroup
  tache: any
  id_tache: string;
  projetService: any;
  axes: any;
  projet: Project;
  constructor(
    public dialogRef: MatDialogRef<EdittacheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjetService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.modifierTacheForm = this.formBuilder.group({

      _id: [this.data.tache._id],
      name: [this.data.tache.name, Validators.required],
      timeslot: [this.data.tache.timeslot, Validators.required],
      pourcentage: [this.data.tache.pourcentage, Validators.required]
    });
    this.tache = this.data.tache
    console.log("tache", this.tache._id);



  }

  modifierTache() {
    console.log(this.modifierTacheForm.value)
    let indexAxe = this.data.projet.axes.findIndex(a => a._id=== this.data.axeId)
    console.log("indexAxe",indexAxe)
    let indexTache = this.data.projet.axes[indexAxe].tache.findIndex(t=> t._id === this.tache._id)
    this.data.projet.axes[indexAxe].tache[indexTache]= this.modifierTacheForm.value
    console.log("indexTache",indexTache)

    this.service.updateTache(this.data.projet._id, this.data.projet ).subscribe(
      (p: any) => {
        console.log(p);
        this.dialogRef.close({ status: true, data: p });
      },
      (err: string) => {
        console.error(err);
        this.dialogRef.close({ status: false, data: err });
      }
    );
  }

}
