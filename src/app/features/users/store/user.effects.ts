import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { UserActions } from './user.actions';
import { Store } from '@ngrx/store';
import { selectFilter, selectPage } from './user.selectors';
import { PAGE_SIZE } from './user.reducer';

@Injectable()
export class UserEffects {
    private readonly store = inject(Store);
    private readonly actions$ = inject(Actions);
    private readonly userService = inject(UserService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            withLatestFrom(
                this.store.select(selectPage),
                this.store.select(selectFilter)
            ),
            switchMap(([, page, filter]) =>
                this.userService.getUsersPaginated({ page, limit: PAGE_SIZE, filter }).pipe(
                    map(({ users, total }) => UserActions.loadUsersSuccess({ users, total })),
                    catchError((err: unknown) => {
                        const message = err instanceof Error ? err.message : 'Erro ao carregar usuários';
                        return of(UserActions.loadUsersFailure({ error: message }));
                    })
                )
            )
        )
    );

    reloadOnPageChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.setPage, UserActions.setFilter),
            map(() => UserActions.loadUsers())
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.createUser),
            switchMap(({ data }) =>
                this.userService.createUser(data).pipe(
                    map((user) => UserActions.createUserSuccess({ user })),
                    catchError((err: unknown) => {
                        const message = err instanceof Error ? err.message : 'Erro ao criar usuário';
                        return of(UserActions.createUserFailure({ error: message }));
                    })
                )
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            switchMap(({ id, data }) =>
                this.userService.updateUser(id, data).pipe(
                    map((user) => UserActions.updateUserSuccess({ user })),
                    catchError((err: unknown) => {
                        const message = err instanceof Error ? err.message : 'Erro ao atualizar usuário';
                        return of(UserActions.updateUserFailure({ error: message }));
                    })
                )
            )
        )
    );
}