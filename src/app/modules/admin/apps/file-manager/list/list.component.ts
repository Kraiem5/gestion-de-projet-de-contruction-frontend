import { Inject, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FileManagerService } from 'app/modules/admin/apps/file-manager/file-manager.service';
import { Item, Items } from 'app/modules/admin/apps/file-manager/file-manager.types';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'file-manager-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerListComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  selectedItem: Item;
  items: Items;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  parent = 0
  ajouterDocument: FormGroup;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _fileManagerService: FileManagerService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    public dialog: MatDialog,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    /// recuperer parent 0 f=de l'url
    //this.parent =  yekhou 0 mel url

    // Get the items
    this._fileManagerService.items$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((items: Items) => {
        this.items = items;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the item
    this._fileManagerService.item$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((item: Item) => {
        this.selectedItem = item;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to media query change
    this._fuseMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((state) => {
        console.log(state)
        // Calculate the drawer mode
        this.drawerMode = state.matches ? 'side' : 'over';

        // Mark for check
        this._changeDetectorRef.markForCheck();
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On backdrop clicked
   */
  onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });

    // Mark for check
    this._changeDetectorRef.markForCheck();
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
  addDocument() {

    const dialogRef = this.dialog.open(AddDocumentDialog, {
      data: { parent: this.parent },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

    });

  }
}
@Component({
  selector: 'addDoc',
  templateUrl: 'addFile.html',
})
export class AddDocumentDialog implements OnInit {
  ajouterDocument: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddDocumentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.ajouterDocument = this.formBuilder.group({
      name: ['', Validators.required], // Champ de sélection de l'axe
      description: ['', Validators.required],
      type: ['', Validators.required],
      file: ['', Validators.required],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
