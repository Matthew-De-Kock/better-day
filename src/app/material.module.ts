import { NgModule } from "@angular/core";

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';








@NgModule({
imports:[MatButtonModule,MatIconModule,MatInputModule,MatGridListModule,MatFormFieldModule,MatCardModule,MatToolbarModule,MatCheckboxModule,
         MatProgressSpinnerModule,MatMenuModule,MatSidenavModule,MatListModule,MatTableModule,MatDividerModule,MatSortModule,MatSelectModule,
         MatSnackBarModule,MatExpansionModule,MatDialogModule,MatDatepickerModule,MatNativeDateModule,FormsModule,ReactiveFormsModule,MatBadgeModule
        ,MatSlideToggleModule,MatProgressBarModule,MatTabsModule],
exports:[MatButtonModule,MatIconModule,MatInputModule,MatGridListModule,MatFormFieldModule,MatCardModule,MatToolbarModule,MatCheckboxModule,
         MatProgressSpinnerModule,MatMenuModule,MatSidenavModule,MatListModule,MatTableModule,MatDividerModule,MatSortModule,MatSelectModule,
         MatSnackBarModule,MatExpansionModule,MatDialogModule,MatDatepickerModule,MatNativeDateModule,FormsModule,ReactiveFormsModule,MatBadgeModule
        ,MatSlideToggleModule,MatProgressBarModule,MatTabsModule]


})
export class MaterialModule{

}
