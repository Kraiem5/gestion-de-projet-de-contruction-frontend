import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AcademyService } from 'app/modules/admin/apps/academy/academy.service';
import { Category, Course } from 'app/modules/admin/apps/academy/academy.types';
import { ProjetService } from 'app/modules/admin/ui/forms/service/projet.service';
import { result } from 'lodash';
import { EditFormsComponent } from '../editProjet/fields.component';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../project.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Component({
    selector: 'academy-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AcademyListComponent implements OnInit, OnDestroy {
    role: any
    proj: any
    projet = []
    nomProjet: string = ''
    searchTerm: string = ''
    filteredProjets = []
    isDisabled = true;
    categories: Category[];
    courses: Course[];
    filteredCourses: Course[];
    filters: {
        categorySlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
    } = {
            categorySlug$: new BehaviorSubject('all'),
            query$: new BehaviorSubject(''),
            hideCompleted$: new BehaviorSubject(false)
        };

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    changebackgroundProject: any;
    project: any;


    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _academyService: AcademyService,
        private service: ProjetService,
        private cd: ChangeDetectorRef,
        private router: Router,
        public dialog: MatDialog,
        private http: HttpClient

    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init 
     */
    ngOnInit(): void {
        this.role = AuthUtils._decodeToken(localStorage.getItem('accessToken')).user.role
        console.log("role", this.role);

        //Get the categories
        this._academyService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories: Category[]) => {
                this.categories = categories;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        //Get the courses
        this._academyService.courses$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((courses: Course[]) => {
                this.courses = this.filteredCourses = courses;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        //Filter the courses
        combineLatest([this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$])
            .subscribe(([categorySlug, query, hideCompleted]) => {

                // Reset the filtered courses
                this.filteredCourses = this.courses;

                // Filter by category
                if (categorySlug !== 'all') {
                    this.filteredCourses = this.filteredCourses.filter(course => course.category === categorySlug);
                }

                // Filter by search query
                if (query !== '') {
                    this.filteredCourses = this.filteredCourses.filter(course => course.title.toLowerCase().includes(query.toLowerCase())
                        || course.description.toLowerCase().includes(query.toLowerCase())
                        || course.category.toLowerCase().includes(query.toLowerCase()));
                }

                // Filter by completed
                if (hideCompleted) {
                    this.filteredCourses = this.filteredCourses.filter(course => course.progress.completed === 0);
                }
            });


        this.getInfoProjet()
        //this.project = /* Fetch or initialize the project */
        //this.updateTaskPercentage(this.taskIndex, this.newPercentage)
        this.calculateMeanPourcentageAxes()

    }

    calculateMeanPourcentageAxes() {
        // Call the service to update the project
        this.service.updateTaskPercentage().subscribe(
            updatedProject => {

                this.project = updatedProject.result;
                console.log("pour", updatedProject);
                this.cd.detectChanges();
                return this.getInfoProjet()
                // Handle success
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
                    this.projet = res.result
                    //this.updateTaskPercentage(this.taskIndex, this.newPercentage)
                    this.cd.detectChanges()
                }
                else
                    console.log('false');
            }
        )
    }
    axes() {
        this.router.navigate(['/ui/forms/layouts'])
    }
    details() {
        this.router.navigate(['/apps/academy/list'])
    }
    onClick(): void {
        this.service.setIsInterfaceObservable(true);
    }
    searchProjet(searchTerm: string): void {
        this.service.searchProjet(searchTerm)
            .subscribe((data: Project[]) => {
                this.projet = data;
            });
    }
    supprimerProjet(id) {
        if (confirm("Voulez-vous vraiment supprimer ce projet?")) {
            this.service.deleteProject(id).subscribe(projet => {
                this.projet = projet
            })
            return this.getInfoProjet()
        }
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
        this.filters.query$.next(query);
    }

    /**
     * Filter by category
     *
     * @param change
     */
    filterByCategory(change: MatSelectChange): void {
        this.filters.categorySlug$.next(change.value);
    }

    /**
     * Show/hide completed courses
     *
     * @param change
     */
    toggleCompleted(change: MatSlideToggleChange): void {
        this.filters.hideCompleted$.next(change.checked);
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
                let i = this.projet.indexOf(p)
                console.log('iii', i)
                this.projet[i] = result.data
                console.log(this.projet);
                this.changebackgroundProject = p._id
                setTimeout(() => {
                    this.changebackgroundProject = null
                    this.cd.detectChanges()
                }, 2000)
                this.cd.detectChanges()
            }
        });
    }
}
