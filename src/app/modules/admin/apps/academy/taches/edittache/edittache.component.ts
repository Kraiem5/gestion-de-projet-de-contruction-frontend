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
    this.modifierTacheForm = this.formBuilder.group({

      name: ['', Validators.required],
      timeslot: ['', Validators.required],
      pourcentage: ['', Validators.required]
    });
    this.tache = this.data
    console.log("tache", this.tache._id);

    this.getInfoProjet()
    console.log("projet", this.projet?._id);
  }
  getInfoProjet() {

    this.service.getInfoProjet().subscribe(
      (res: any) => {
        if (res.status) {
          this.projet = res.result
          console.log('projet', this.projet);
          this.cd.detectChanges()
        }
        else
          console.log('false');
      }
    )
  }
  modifierTache(id_projet: string, id_tache: string) {
    this.service.updateTache(id_projet, id_tache, this.tache).subscribe(
      (p: any) => {
        console.log(p);
        this.dialogRef.close({ status: 'success', data: p });
      },
      (err: string) => {
        console.error(err);
        this.dialogRef.close({ status: 'error', data: err });
      }
    );
  }

}
