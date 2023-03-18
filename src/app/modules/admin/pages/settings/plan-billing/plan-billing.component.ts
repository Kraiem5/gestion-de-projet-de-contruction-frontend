import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
import { ProfileService } from '../service/profile.service';

@Component({
    selector       : 'settings-plan-billing',
    templateUrl    : './plan-billing.component.html',
    styleUrls       : ['./plan-billing.component.css'],
    encapsulation  : ViewEncapsulation.None,
     changeDetection: ChangeDetectionStrategy.Default
})
export class SettingsPlanBillingComponent implements OnInit
{
    @ViewChild('singleInput',{static:false}) singleInput:ElementRef
    planBillingForm: FormGroup;
    plans: any[];

    image:any
    imageUrl:string
    profileImage=null;
    cv=null;
    fcv: any;

    constructor(
        private _formBuilder: FormBuilder,
        private serv: ProfileService,
        private cd : ChangeDetectorRef
    )
    {
        this.getPersonalInformation()
    }


    getPersonalInformation(){
        this.serv.getPersonelInfo().subscribe(
           ( res : any) =>{
              if(res.status){
               if(res.result.avatar)
               this.profileImage= "http://localhost:3000/upload/"+res.result.avatar
               if(res.result.cv)
               this.cv="http://localhost:3000/cv/"+res.result.cv
          console.log(this.profileImage);
              this.cd.detectChanges()
              }
            }
        )
    }

    selectImage(event){

       this.image = event.target.files[0]
        console.log(event);


    }
    selectedCv(event){

       this.fcv = event.target.files[0]
        console.log(event);


    }

      onSubmit() {
        const file = new FormData()
        file.set('myFile',this.image)
       console.log(file)
        // post request to express backend
      this.serv.saveImageProfile(file)
        .subscribe((res:any)=>{
            console.log(res)
            this.imageUrl=res.result.avatar
            console.log(this.profileImage);
            alert(this.profileImage)
            this.getPersonalInformation()

        },err =>{
            console.log(err);

        })
      }
      saveCv(){
        const file = new FormData()
        file.set('cv',this.fcv)
       console.log(file)
        // post request to express backend
      this.serv.saveCv(file)
        .subscribe((res:any)=>{
            console.log(res)
            this.imageUrl=res.result.cv
            console.log(this.cv);
            alert(this.cv)
            this.getPersonalInformation()

        },err =>{
            console.log(err);

        })
      }

    ngOnInit(): void
    {


        // Create the form
        this.planBillingForm = this._formBuilder.group({
            plan          : ['team'],
            cardHolder    : ['Brian Hughes'],
            cardNumber    : [''],
            cardExpiration: [''],
            cardCVC       : [''],
            country       : ['usa'],
            zip           : ['']
        });

        // Setup the plans
        this.plans = [
            {
                value  : 'basic',
                label  : 'BASIC',
                details: 'Starter plan for individuals.',
                price  : '10'
            },
            {
                value  : 'team',
                label  : 'TEAM',
                details: 'Collaborate up to 10 people.',
                price  : '20'
            },
            {
                value  : 'enterprise',
                label  : 'ENTERPRISE',
                details: 'For bigger businesses.',
                price  : '40'
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }


}
