import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserData } from '../data.model';
import { DataService } from '../data.service';
import { DialogComponent } from './dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import { ResultDialogComponent } from './result-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  displayedColumns: string[] = ['select', 'team_name', 'wins', 'losses', 'ties', 'score'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataservice: DataService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    // Assign the data to the data source for the table to render
    dataservice.getData()
    dataservice.getDataObservable().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(res)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.dataservice.getDataObservable().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
    // console.log("fired again")
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    
    return numSelected === numRows;
  }

  isSelectedTwo(row: UserData) {
    const num = this.selection.selected.length; 
    
    if(num >= 2 && !this.selection.isSelected(row)) {
      this.openResultDialog();
    } else {
      this.selection.toggle(row)
    }

    // console.log(this.selection.selected)

  }

  openResultDialog() {
    if(this.selection.selected.length === 2) {
      const dialogRef = this.dialog.open(ResultDialogComponent, {
        width: '250px',
        data: {teams: this.selection.selected}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.selection.clear()
        this.dataservice.getData()
      });
    }
    else {
      this.openSnackBar("Please select 2 teams", "close");
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: UserData): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.team_name}`;
  // }

}