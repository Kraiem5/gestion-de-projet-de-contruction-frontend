import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Category, Course } from 'app/modules/admin/apps/academy/academy.types';
import { AcademyService } from 'app/modules/admin/apps/academy/academy.service';
import { Project } from '../project.interface';
import { ProjetService } from '../service/projet.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AjouterTacheComponent } from '../taches/tache.component';
import { EdittacheComponent } from '../taches/edittache/edittache.component';


@Component({
    selector: 'academy-details',
    templateUrl: './details.component.html',

    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademyDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
    axes: any[] = []
    id_axe: string;
    name: string;
    timeslot: string;
    projet: Project
    changebackgroundProject: any;
    currentStep: number = 0;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    currentAxe: any
    pourcentage: string;
    tache: string;
    x: any;
    showProject=false
    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private projetService: ProjetService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public cd: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getProjet()


    }
    getProjet(){
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.projetService.getIdProjet(id).subscribe(res => {
                console.log(res)
                if (res.status) {
                    this.projet = res.result
                  //if(!this.currentAxe)
                //   this.currentAxe = this.projet.axes[0]
                    this.cd.detectChanges()
                }
            });
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    calculateMeanPercentage(axe:any): number {
        console.log(axe)
        let tache = (axe.tache && axe.tache.length ) ? axe.tache : null
        let totalPercentage = 0;
        if(tache)
        {
            for (let tach of tache) {
            totalPercentage += parseInt(tach.pourcentage);
             }
          return totalPercentage / tache.length;
       }else
        return 0
    }

    // supposons que vos tâches sont stockées dans un tableau 'taches'


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    ajouterTache(): void {
        this.projetService.ajouterTache(this.id_axe, this.name, this.timeslot, this.pourcentage)
            .subscribe(
                response => {
                    console.log(response);
                    // Traiter la réponse de l'API
                },
                error => {
                    console.error(error);
                    // Traiter l'erreur de l'API
                }
            );
    }
    buttonAjouterTache(axe): void {
        const dialogRef = this.dialog.open(AjouterTacheComponent, {
            data: axe,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
           // if (result && result.status) {
                this.getProjet()

                    this.cd.detectChanges()

           // }
        });
    }

    buttonModifierTache(t: any): void {
        const dialogRef = this.dialog.open(EdittacheComponent, {
            data:{tache: t,projet:this.projet,axeId:this.currentAxe._id},
            disableClose: true,

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.status) {
                this.getProjet()
                // this.projet = result.data;
                this.cd.detectChanges()

            }
        });
    }




    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Scrolls the current step element from
     * sidenav into the view. This only happens when
     * previous/next buttons pressed as we don't want
     * to change the scroll position of the sidebar
     * when the user actually clicks around the sidebar.
     *
     * @private
     */
    private _scrollCurrentStepElementIntoView(): void {
        // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
        setTimeout(() => {
            // Get the current step element and scroll it into view
            const currentStepElement = this._document.getElementsByClassName('current-step')[0];
            if (currentStepElement) {
                currentStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}
