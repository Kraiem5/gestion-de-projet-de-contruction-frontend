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
  items: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  parent = 0
  ajouterDocument: FormGroup;
  folders: any;
  files: any;
  historique = [{ folderid: 0, name: 'home' }]
  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private actRouter: ActivatedRoute,
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
    this.actRouter.params.subscribe(params => {
      // Use the params object to access the parameters
      this.parent = params['id'];
      this.drawerMode = 'over'
    });
    // Get the items
    this.getAll()

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
  getAll() {
    this._fileManagerService.getDocument(this.parent)
      .subscribe((items: any) => {
        this.items = items.data;
        this._fileManagerService.items$ = this.items
        this.folders = this.items.filter(i => i.type == 'dossier')
        this.files = this.items.filter(i => i.type !== 'dossier')
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
    this.drawerMode = 'over'
    // Go back to the list
    // this._router.navigate(['./'], { relativeTo: this._activatedRoute });

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
      data: { parentId: this.parent },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === true)
        this.getAll()
    });

  }
  openFolder(folderid, folderName) {
    this.historique.push({ folderid: folderid, name: folderName })
    this.parent = folderid;
    this.getAll()
  }
  openFolderFromShema(folderid) {
    let i = this.historique.findIndex(f => f.folderid == folderid)
    this.historique = this.historique.slice(0, i + 1)
    this.parent = folderid;
    this.getAll()
  }
}
@Component({
  selector: 'addDoc',
  templateUrl: 'addFile.html',
})
export class AddDocumentDialog implements OnInit {
  ajouterDocument: FormGroup;
  file: any;
  constructor(
    public dialogRef: MatDialogRef<AddDocumentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _fileManagerService: FileManagerService,
  ) { }
  ngOnInit(): void {
    this.ajouterDocument = this.formBuilder.group({
      name: ['', Validators.required], // Champ de sélection de l'axe
      description: ['', Validators.required],
      type: ['', Validators.required],
      file: []
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  selectedFile(event) {
    this.file = event.target.files[0]
    console.log(event);

    const file = new FormData()
    file.set('myFile', this.file)
    console.log(file)
    // post request to express backend
    this._fileManagerService.saveFile(file)
      .subscribe((res: any) => {
        this.ajouterDocument.get("file").setValue(res)

      }, err => {
        console.log(err);

      })
  }

  saveDoc() {
    console.log(this.ajouterDocument.value)
    this._fileManagerService.saveDocument(this.data.parentId, this.ajouterDocument.value).subscribe(res => {
      console.log(res)
      if (res.status)
        this.dialogRef.close(true)
    })
  }
}
