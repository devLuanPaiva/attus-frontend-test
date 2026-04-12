import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserCardComponent } from '../../components/user-card/user-card';
import { UserFormDialogComponent } from '../../components/user-form-dialog/user-form-dialog';
import { UserActions } from '../../store/user.actions';
import {
  selectFilteredUsers,
  selectLoading,
  selectError,
} from '../../store/user.selectors';
import { User, UserDialogData } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    UserCardComponent,
  ],
  templateUrl: './user-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  readonly users$ = this.store.select(selectFilteredUsers);
  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);

  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((filter) => {
        this.store.dispatch(UserActions.setFilter({ filter }));
      });
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  openCreateDialog(): void {
    const data: UserDialogData = { user: null };
    this.dialog.open(UserFormDialogComponent, {
      data,
      width: '580px',
      disableClose: false,
    });
  }

  onEdit(user: User): void {
    const data: UserDialogData = { user };
    this.dialog.open(UserFormDialogComponent, {
      data,
      width: '580px',
      disableClose: false,
    });
  }

  retry(): void {
    this.store.dispatch(UserActions.loadUsers());
  }
}