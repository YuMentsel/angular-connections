import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar } from '../../constants/enums';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openOK(type: string) {
    this.snackBar.open(type, SnackBar.closeAction, { duration: 2000 });
  }

  openError(type: string, message: string) {
    this.snackBar.open(type + (message || SnackBar.errorMessage), SnackBar.closeAction, {
      duration: 3500,
    });
  }
}
