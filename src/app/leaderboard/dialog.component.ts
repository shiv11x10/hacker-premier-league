import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
    selector: 'app-dialog',
    template: `
  <div mat-dialog-content>
    <p>Team Name</p>
    <mat-form-field>
      <mat-label>Team</mat-label>
      <input matInput [(ngModel)]="team_name">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button (click)="addTeam()" cdkFocusInitial>Add</button>
  </div>`
})
export class DialogComponent implements OnInit {

    team_name:string;
    constructor(private dataservice: DataService, public dialogRef: MatDialogRef<DialogComponent>) { }

    addTeam() {
        this.dataservice.addData(this.team_name);
        console.log(this.team_name, "added")
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
      }

    ngOnInit() { 

    }

}