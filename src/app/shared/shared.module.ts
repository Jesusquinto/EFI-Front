import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {TooltipModule} from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    TooltipModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[ConfirmationService],
  exports: [
    DynamicDialogModule,
    ConfirmDialogModule,
    TooltipModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
