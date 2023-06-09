import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjetService } from 'app/modules/admin/ui/forms/service/projet.service';
import { Project } from '../project.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditFormsComponent } from '../editProjet/fields.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthUtils } from 'app/core/auth/auth.utils';
import Swal from 'sweetalert2'

@Component({
    selector: 'academy-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AcademyListComponent implements OnInit, OnDestroy {
    role: any;
    projet: Project[] = [];
    nomProjet: string = '';
    searchTerm: string = '';
    filteredProjets: Project[] = [];
    showCompletedProjects: boolean = false;
    changebackgroundProject: any;
    project: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private service: ProjetService,
        private cd: ChangeDetectorRef,
        private router: Router,
        public dialog: MatDialog,
        private http: HttpClient
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init 
     */
    ngOnInit(): void {
        this.role = AuthUtils._decodeToken(localStorage.getItem('accessToken')).user.role;
        console.log("role", this.role);

        this.getInfoProjet();
        this.calculateMeanPourcentageAxes();
    }

    calculateMeanPourcentageAxes() {
        this.service.updateTaskPercentage().subscribe(
            updatedProject => {
                this.project = updatedProject.result;
                console.log("pour", updatedProject);
                this.cd.detectChanges();
                this.getInfoProjet();
            },
            error => {
                // Handle error
            }
        );
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getInfoProjet() {
        this.service.getInfoProjet().subscribe(
            (res: any) => {
                if (res.status) {
                    this.projet = res.result;
                    this.cd.detectChanges();
                } else {
                    console.log('false');
                }
            }
        );
    }

    axes() {
        this.router.navigate(['/ui/forms/layouts']);
    }

    details() {
        this.router.navigate(['/apps/academy/list']);
    }

    onClick(): void {
        this.service.setIsInterfaceObservable(true);
    }

    searchProjet(searchTerm: string): void {
        this.service.searchProjet(searchTerm).subscribe((data: Project[]) => {
            this.projet = data;
        });
    }

    supprimerProjet(id) {
        Swal.fire({
            title: 'Êtes-vous sûr(e) ?',
            text: 'Êtes-vous sûr(e) de vouloir supprimer ce projet ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.deleteProject(id).subscribe(projet => {
                    this.projet = projet;
                });
                return this.getInfoProjet();
            }
        })
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter by search query
     *
     * @param query
     */
    filterByQuery(query: string): void {
        this.searchTerm = query;
        this.filteredProjets = this.projet.filter(projet =>
            projet.nom_projet.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    /**
     * Filter by category
     *
     * @param change
     */
    filterByCategory(change: MatSelectChange): void {
        // Implement your category filter logic here
    }

    /**
     * Show/hide completed projects
     *
     * @param change
     */
    toggleCompleted(event: MatSlideToggleChange) {
        this.showCompletedProjects = event.checked;
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

    editProjet(p): void {
        const dialogRef = this.dialog.open(EditFormsComponent, {
            data: p,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.status) {
                let i = this.projet.indexOf(p);
                console.log('iii', i);
                this.projet[i] = result.data;
                console.log(this.projet);
                this.changebackgroundProject = p._id;
                setTimeout(() => {
                    this.changebackgroundProject = null;
                    this.cd.detectChanges();
                }, 2000);
                this.cd.detectChanges();
            }
        });
    }
}
