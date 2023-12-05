import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  exports: [MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class SharedModule {}
