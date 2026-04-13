import { Component, OnInit, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, switchMap, map } from 'rxjs/operators';


@Injectable()
class PessoaService {
    buscarPorId(id: number) {
        return of({ id, nome: 'João' }).pipe(delay(500));
    }

    buscarQuantidadeFamiliares(id: number) {
        return of(3).pipe(delay(300));
    }
}


@Component({
    selector: 'app-root',
    providers: [PessoaService],
    template: `<h1>{{ texto }}</h1>`,
})
export class AppComponent implements OnInit {
    texto!: string;

    constructor(private readonly pessoaService: PessoaService) { }

    ngOnInit(): void {
        const pessoaId = 1;

        this.pessoaService.buscarPorId(pessoaId)
            .pipe(
                switchMap(pessoa =>
                    this.pessoaService.buscarQuantidadeFamiliares(pessoaId).pipe(
                        map(qtd => ({ pessoa, qtd }))
                    )
                )
            )
            .subscribe(({ pessoa, qtd }) => {
                this.texto = `Nome: ${pessoa.nome} | familiares: ${qtd}`;
            });
    }
}

