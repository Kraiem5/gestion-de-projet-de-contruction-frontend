import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RoleDialog } from '../roles/roles.component';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  roles = []
  users: any[] = []
  totalCount: any;
  adminCount: any;
  ingenieurCount: any;
  technicienCount: any;

  constructor(
    private service: AdminService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.recupererUsers()
    this.getRole()
    this.getStatUser()

  }
  getRole() {
    this.service.getRole().subscribe((data: any) => {
      this.roles = data
      console.log("data", data);
    })
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
      if (result) {
        this.recupererUsers()
      }

    });
  }
  openDialogEdit(mode, user): void {
    const dialogRef = this.dialog.open(SignupDialogue, {
      width: '500px',
      data: { mode: mode, user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recupererUsers()
      }

    });
  }
  supprimerUser(user) {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.service.deleteUSer(user._id)
        .subscribe(() => {
          this.users = this.users.filter(u => u !== user);
          this.recupererUsers();
        });
    }
  }
  getStatUser() {
    this.service.statistique().subscribe(
      res => {
        this.totalCount = res.totalUsers
        this.adminCount = res.adminCount
        this.ingenieurCount = res.engineerCount
        this.technicienCount = res.technicianCount
        console.log("stat", this.adminCount);
        this.cd.detectChanges()
      }
    )
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
  roles: any[];
  users: any[] = [];
  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private service: AdminService,
    public dialogRef: MatDialogRef<SignupDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  /**
   * On init
  */
  ngOnInit(): void {
    // Create the form
    if (this.data.mode == 'edit') {
      {
        this.signUpForm = this._formBuilder.group({
          nom: [this.data.user.nom, Validators.required],
          prenom: [this.data.user.prenom, Validators.required],
          email: [this.data.user.email, [Validators.required, Validators.email]],
          role: ['', Validators.required],
          cin: [""],
          agreements: [true, Validators.requiredTrue]
        }
        );
      }
    }
    else {
      {
        this.signUpForm = this._formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['@gmail.com', [Validators.required, Validators.email]],
          role: ['', Validators.required],
          password: ['', Validators.required],
          cin: [''],
          agreements: [true, Validators.requiredTrue]
        }
        );
      }
    }
    this.recupererUsers()
    this.getNameRole()
  }
  getNameRole() {
    this.service.getRole().subscribe((data: any) => {
      this.roles = data
    })
  }
  filterByCategory(change: MatSelectChange): void {
    this.signUpForm.patchValue({ role: change.value })
    console.log(change.value);

  }

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
      .then(
        (response) => {
          this.signUpForm.enable();

          // Navigate to the confirmation required page
          this.dialogRef.close(true);
        })
      .catch((error) => {
        console.log(error)
        // Re-enable the form
        this.signUpForm.enable();

        // Reset the form
        this.signUpForm.reset();

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
  recupererUsers() {
    this.service.getUser().subscribe(user => {
      this.users = user
    })
  }
  modifierUser(user) {
    console.log("us", user);

    if (this.signUpForm.valid) {
      let form = this.signUpForm.value
      console.log("form", form);
      console.log("user", user._id);
      console.log("uss", this.users);
      this.service.modifiereUser(user._id, form).subscribe((response: any) => {
        console.log(response);
        this.dialogRef.close(true);
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
