import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GUID } from '../app.type';

@Component({
    selector: 'lookup-page',
    templateUrl: 'lookup-page.html',
    styleUrls: ['lookup-page.css'],
})
export class LookupPage {
    dataSource: any;
    displayedColumns: any;
    clickedRow?: GUID;
    pageHeader?: string;

    constructor(
        public dialogRef: MatDialogRef<LookupPage>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.dataSource = data.dataSource;
        this.displayedColumns = data.displayedColumns;
        this.pageHeader = data.pageHeader;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
