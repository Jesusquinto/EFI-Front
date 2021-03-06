import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { PlanCuentaFormComponent } from './plan-cuenta-form/plan-cuenta-form.component';
import { AppService } from 'src/app/services/app.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-cuenta',
  templateUrl: './plan-cuenta.component.html',
  styleUrls: ['./plan-cuenta.component.scss']
})

export class PlanCuentaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'codigo', 'descripcion', 'entidad', 'nivel', 'tipo', 'tipoPlan', 'estado'];
  public dataSource: any;
  public itemSelected: any;



  public tipo: any;
  public tipos:  Array<any>;
  public tipoFilterCtrl: any;

  public tiposPlan: Array<any>;
  public tipoPlan : any;
  public tipoPlanFilterCtrl: any;

  public tiposEntidad: Array<any>;
  public tipoEntidad : any;
  public tipoEntidadFilterCtrl: any;




  constructor(
    public dialog: MatDialog,
    private appService: AppService) {this.tipoEntidadFilterCtrl = '', this.tipoFilterCtrl = '', this.tipoPlanFilterCtrl = '' }

  ngOnInit() {
    this.getTipos();
  }

  public getPlanCuentas() {
    this.appService.openSpinner();
    this.appService.get('planCuentas/filter/'+this.tipoPlan+'/'+this.tipo+'/'+this.tipoEntidad).subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.appService.closeSpinner();
      },
      error => { this.appService.closeSpinner();}
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
      width: '60%', height: 'auto', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getPlanCuentas()}});
  }

  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere Cambiar el Estado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-info',
      confirmButtonText: 'Si, Cambiar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('planCuentas/estado', data).subscribe(
          (r: any) => {
            console.log(r),
            this.appService.closeSpinner();
            Swal.fire({
              type: 'success', text: 'el estado de la Cuenta #:' + data.idCuenta + 'ha sido Editada!',
              showConfirmButton: false, timer: 3000
             });
            this.getPlanCuentas();
          }, error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  getTipos(){
    this.appService.openSpinner();
    this.appService.get('planCuentas/tipos').subscribe(
      (result: any) => {console.log(result); this.tipos = result; this.appService.closeSpinner(); this.getTiposPlan()},
      error => {console.log(error); this.appService.closeSpinner();}
    )
  }


  getTiposPlan(){
    this.appService.openSpinner();
    this.appService.get('planCuentas/tiposCuentas').subscribe(
      (result : any) => {console.log(result); this.tiposPlan = result; this.appService.closeSpinner(); this.getTiposEntidades()},
      error => {console.log(error); this.appService.closeSpinner();}
    )
  }


  getTiposEntidades(){
    this.appService.openSpinner();
    this.appService.get('planCuentas/entidades').subscribe(
      (result : any) => {console.log(result); this.tiposEntidad = result; this.appService.closeSpinner()},
      error => {console.log(error); this.appService.closeSpinner();}
    )
  }


  




}
