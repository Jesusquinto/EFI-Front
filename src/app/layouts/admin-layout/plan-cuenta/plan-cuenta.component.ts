import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { PlanCuentaFormComponent } from './plan-cuenta-form/plan-cuenta-form.component';
import { AppService } from 'src/app/services/app-service';

@Component({
  selector: 'app-plan-cuenta',
  templateUrl: './plan-cuenta.component.html',
  styleUrls: ['./plan-cuenta.component.scss']
})

export class PlanCuentaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombre'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getPlanCuentas();
  }

  public getPlanCuentas() {
    this.appService.get('planCuentas').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {  }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage()}
  }

  public nuevo() { this.itemSelected = null; this.openForm(0)}

  public editar(item: any) { this.itemSelected = item;this.openForm(1)}

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(PlanCuentaFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', height: 'auto', disableClose: true, backdropClass: 'dark',
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getPlanCuentas()}});
  }
}
