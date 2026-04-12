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
import { UserCardComponent } from '../../components/user-card/user-card';

import {
  selectFilteredUsers,
  selectLoading,
  selectError,
} from '../../store/user.selectors';
import { User } from '../../../../shared/models/user.model';
import { UserActions } from '../../store/user.actions';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    UserCardComponent,
  ],
  templateUrl: './user-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectFilteredUsers);
  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);

  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((filter) => {
        this.store.dispatch(UserActions.setFilter({ filter }));
      });
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onEdit(user: User): void {
    console.log('Editar usuário:', user);
  }

  retry(): void {
    this.store.dispatch(UserActions.loadUsers());
  }
}