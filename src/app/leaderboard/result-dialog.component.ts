import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../data.model';
import { DataService } from '../data.service';

@Component({
    selector: 'app-resultdialog',
    template: `
    <div mat-dialog-content>
      <p>Pick the winner</p>
      <mat-selection-list #team [multiple]="false">
      <mat-list-option *ngFor="let team of data.teams" [value]="team">
        {{team.team_name}}
      </mat-list-option>
    </mat-selection-list>
    </div>
    <hr>
    <p>Winner is: {{team.selectedOptions.selected[0]?.value.team_name}}</p>
    <hr>
    <p><button mat-raised-button color="accent" (click)="tie()">Tie</button></p>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button (click)="saveWinner(team.selectedOptions.selected[0]?.value)">Ok</button>
    </div>`
})
export class ResultDialogComponent implements OnInit {

    constructor(private dataservice:DataService, public dialogRef: MatDialogRef<ResultDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }

      saveWinner(winner) {
          if(winner) {
            this.dataservice.updateWinner(winner);
            let index = this.data.teams.findIndex(x => x._id === winner._id);
            index = index === 1 ? 0 : 1
            this.dataservice.updateLoser(this.data.teams[index])
            console.log("Loser is", index === 1 ? 0 : 1);
          }
        this.dialogRef.close();
      }

      tie() {
          this.dataservice.updateTie(this.data.teams[0])
          this.dataservice.updateTie(this.data.teams[1])
          this.dialogRef.close();
      }

    ngOnInit() { 

    }

}