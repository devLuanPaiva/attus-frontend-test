import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
    private readonly actions$ = inject(Actions);
    private readonly userService = inject(UserService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() =>
                this.userService.getUsers().pipe(
                    map((users) => UserActions.loadUsersSuccess({ users })),
                    catchError((err: unknown) => {
                        const message =
                            err instanceof Error ? err.message : 'Erro ao carregar usuários';
                        return of(UserActions.loadUsersFailure({ error: message }));
                    })
                )
            )
        )
    );
}