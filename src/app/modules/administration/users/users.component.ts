import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AdministrationService } from '../administration.service';
import { RoleDialog } from '../roles/roles.component';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { mode } from 'crypto-js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  roles = []
  users: [] = []
  constructor(
    private service: AdministrationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.recupererUsers()
  }
  recupererUsers() {
    this.service.getUser().subscribe(user => {
      this.users = user
    })
  }


  openDialogSignUP(mode, role): void {
    const dialogRef = this.dialog.open(SignupDialogue, {
      width: '400px',
      data: { mode: mode, role: role }
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

}
@Component({
  selector: 'role-dialog',
  templateUrl: 'sign-upDialogue.html',
})
export class SignupDialogue implements OnInit {

  @ViewChild('signUpNgForm') signUpNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  signUpForm: FormGroup;
  showAlert: boolean = false;
  roles: [] = [];


  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private service: AdministrationService,
    public dialogRef: MatDialogRef<SignupDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      nom: ['abid', Validators.required],
      prenom: ['kraiem', Validators.required],
      email: ['kraiemabid300@gmail.com', [Validators.required, Validators.email]],
      role: ['ADMIN', Validators.required],
      password: ['123456789', Validators.required],
      cin: ['14026475'],
      agreements: [true, Validators.requiredTrue]
    }
    );
    this.getNameRole()

  }

  getNameRole() {
    this.service.getRole().subscribe((data: any) => {
      this.roles = data
      console.log("daata", data);

    })
  }
  filterByCategory(change: MatSelectChange): void {
    this.signUpForm.patchValue({ role: change.value })
    console.log(change.value);

  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign up
   */
  signUp(): void {
    console.log(this.signUpForm.value);

    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign up
    this._authService.signUp(this.signUpForm.value)
      .subscribe(
        (response) => {

          // Navigate to the confirmation required page
          this._router.navigateByUrl('/sign-in');
        },
        (response) => {

          // Re-enable the form
          this.signUpForm.enable();

          // Reset the form
          this.signUpNgForm.resetForm();

          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Something went wrong, please try again.'
          };

          // Show the alert
          this.showAlert = true;
        }
      );
  }

}