import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    switchMap,
    tap,
    catchError,
    startWith
} from 'rxjs/operators';

import { Usuario, UsuarioService } from './usuario.service';

@Component({
    selector: 'app-busca',
    templateUrl: './busca.component.html',

})

export class BuscaComponent {
    searchControl = new FormControl<string>('', { nonNullable: true });
    usuarios$: Observable<Usuario[]>;
    loading = false;

    constructor(private readonly usuarioService: UsuarioService) {
        this.usuarios$ = this.searchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => (this.loading = true)),
            switchMap(termo =>
                this.usuarioService.buscarUsuarios(termo).pipe(
                    catchError(() => of([]))
                )

            ),

            tap(() => (this.loading = false))

        );

    }

}