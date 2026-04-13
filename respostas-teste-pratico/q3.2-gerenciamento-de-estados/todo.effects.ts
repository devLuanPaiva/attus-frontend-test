import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { Todo } from './todo.model';

@Injectable()
export class TodoEffects {

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.loadTodos),
            switchMap(() =>
                this.http.get<Todo[]>('https://api.fake.com/todos').pipe(
                    map(todos => TodoActions.loadTodosSuccess({ todos })),
                    catchError(() =>
                        of(TodoActions.loadTodosError({ error: 'Erro ao carregar todos' }))

                    )

                )

            )

        )

    );

    constructor(
        private readonly actions$: Actions,
        private readonly http: HttpClient
    ) { }

} 