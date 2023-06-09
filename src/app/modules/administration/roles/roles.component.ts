import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { valid } from 'chroma-js';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../role.interface';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  ajoutRole: FormGroup
  roles: Role[] = [];
  role: Role
  employeeData: any;
  showAdd: boolean;
  showUpdate: boolean;
  edit: string;
  constructor(
    private service: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog


  ) { }

  ngOnInit(): void {

    this.getRole()
  }

  openDialog(mode, role): void {
    const dialogRef = this.dialog.open(RoleDialog, {
      width: '400px',
      data: { mode: mode, role: role }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.getRole()
    });
  }

  getRole() {
    this.service.getRole().subscribe((data: any) => {
      this.roles = data
      console.log("data", data);
    })
  }



  deleteRole(role: Role): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Êtes-vous sûr(e) de vouloir supprimer cet role ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.suprrimeRole(role._id)
          .subscribe(() => {
            this.roles = this.roles.filter(r => r !== role);
          });
      }
    });
  }
}
@Component({
  selector: 'role-dialog',
  templateUrl: 'roledialogue.html',
  styleUrls: ['./roles.component.scss']
})
export class RoleDialog implements OnInit {
  ajoutRole: FormGroup
  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    if (this.data.mode == 'ajout') {
      this.ajoutRole = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      })
    } else {
      this.ajoutRole = this.fb.group({
        name: [this.data.role.name, Validators.required],
        description: [this.data.role.description, Validators.required],
      })
    }

  }
  ajouterRoleFunction(): void {
    if (this.ajoutRole.valid) {
      const data = {
        name: this.ajoutRole.get('name').value,
        description: this.ajoutRole.get('description').value
      };
      this.service.ajouterRole(data).subscribe((response: any) => {
        this.dialogRef.close(true);
      });
    }
  }
  editRole(): void {
    if (this.ajoutRole.valid) {
      let form = {
        name: this.ajoutRole.get('name').value,
        description: this.ajoutRole.get('description').value
      };
      this.service.modifierRole(this.data.role._id, form).subscribe((response: any) => {
        console.log(response);
        this.dialogRef.close(true);
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
