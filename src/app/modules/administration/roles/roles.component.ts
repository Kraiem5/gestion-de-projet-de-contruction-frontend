import { Component, Inject, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { valid } from 'chroma-js';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../role.interface';

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
    private service: AdministrationService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.ajoutRole = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.getRole()
  }
  ajouterRole(): void {
    const data = {
      name: this.ajoutRole.get('name').value,
      description: this.ajoutRole.get('description').value
    };
    this.service.ajouterRole(data).subscribe((response: any) => {
      console.log(response);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RolesComponent, {
      width: '500px',
      data: { form: this.ajoutRole }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getRole() {
    this.service.getRole().subscribe((data: any) => {
      this.roles = data
    })
  }

  // modifierRole(role: Role): void {
  //   const dialogRef = this.dialog.open(RolesComponent, {
  //     data: role,
  //     disableClose: true
  //   });

  //   dialogRef.afterClosed().subscribe((result: { status: boolean, data: Role }) => {
  //     if (result && result.status && result.data) {
  //       this.service.modifierRole(role._id, result.data).subscribe((updatedRole: Role) => {
  //         // Mettre à jour la liste des rôles avec le rôle modifié
  //         const index = this.roles.findIndex(r => r._id === updatedRole._id);
  //         this.roles.splice(index, 1, updatedRole);
  //         // Afficher un message de confirmation
  //         this.fuseAlertService.show('Le rôle a été modifié avec succès.', { type: 'success' });
  //       }, error => {
  //         console.error(error);
  //         this.fuseAlertService.show('Une erreur est survenue lors de la modification du rôle.', { type: 'error' });
  //       });
  //     }
  //   });
  // }

  deleteRole(role: Role): void {
    if (confirm("Are you sure you want to delete this role?")) {
      this.service.suprrimeRole(role._id)
        .subscribe(() => {
          this.roles = this.roles.filter(r => r !== role);
        });
    }
  }
  // modifierRole(role: Role): void {
  //   const dialogRef = this.dialog.open(RolesComponent, {
  //     data: role,
  //     disableClose: true
  //   });

  //   dialogRef.afterClosed().subscribe((result: { status: boolean, data: Role }) => {
  //     if (result && result.status && result.data) {
  //       this.service.modifierRole(role._id, result.data).subscribe((updatedRole: Role) => {
  //         // Mettre à jour la liste des rôles avec le rôle modifié
  //         const index = this.roles.findIndex(r => r._id === updatedRole._id);
  //         this.roles.splice(index, 1, updatedRole);
  //         // Afficher un message de confirmation
  //         this.fuseAlertService.show('Le rôle a été modifié avec succès.', { type: 'success' });
  //       }, error => {
  //         console.error(error);
  //         this.fuseAlertService.show('Une erreur est survenue lors de la modification du rôle.', { type: 'error' });
  //       });
  //     }
  //   });
  // }


  //   buttonAjouterTache(axe): void {
  //     const dialogRef = this.dialog.open(RolesComponent, {
  //         data: axe,
  //         disableClose: true
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //         if (result && result.status) {
  //             let i = this.axes.indexOf(axe)
  //             this.axes[i] = result.data
  //             console.log("axs", this.axes);
  //             this.changebackgroundProject = axe._id
  //             setTimeout(() => {
  //                 this.changebackgroundProject = null
  //                 this.cd.detectChanges()
  //             }, 2000)
  //             this.cd.detectChanges()
  //         }
  //     });
  // }
}
