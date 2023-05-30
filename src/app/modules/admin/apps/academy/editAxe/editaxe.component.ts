import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { result } from 'lodash';
import { Project } from '../project.interface';
import { ProjetService } from '../service/projet.service';

@Component({
  selector: 'app-editaxe',
  templateUrl: './editaxe.component.html',

})
export class EditaxeComponent implements OnInit {
  modifierAxeForm: FormGroup
  tache: any
  id_tache: string;
  projetService: any;
  axes: any;
  projet: Project;
  constructor(
    public dialogRef: MatDialogRef<EditaxeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProjetService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.modifierAxeForm = this.formBuilder.group({
      name: [this.data.p.axes.find(a => a._id === this.data.id_axe)?.name || '', Validators.required],
    });
  }
  modifierAxe() {
    const updatedAxe = {
      name: this.modifierAxeForm.value.name
    };
    this.service.updateAxe(this.data.p._id, this.data.id_axe, updatedAxe).subscribe(
      (p: any) => {
        this.dialogRef.close({ status: true, data: p });
      },
      (err: any) => {
        console.error(err);
        this.dialogRef.close({ status: false, data: err });
      }
    );
  }
  // modifierAxe() {
  //   console.log(this.modifierAxeForm.value)
  //   let indexAxe = this.data.p.axes.findIndex(a => a._id === this.data.id_axe)
  //   console.log("indexAxe", indexAxe)
  //   this.service.updateAxe(this.data.p._id, this.data.id_axe, this.data.p).subscribe(
  //     (p: any) => {
  //       console.log(p);
  //       this.dialogRef.close({ status: true, data: p });
  //     },
  //     (err: string) => {
  //       console.error(err);
  //       this.dialogRef.close({ status: false, data: err });
  //     }
  //   );
  // }

}
