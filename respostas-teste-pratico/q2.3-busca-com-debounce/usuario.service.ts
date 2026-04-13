import { Injectable } from "@angular/core";
import { delay, map, Observable, of } from "rxjs";

export interface Usuario {
    id: number;
    nome: string;
    email: string;

}


@Injectable({ providedIn: 'root' })

export class UsuarioService {

    private readonly usuarios: Usuario[] = [
        { id: 1, nome: 'Ana', email: 'ana@email.com' },
        { id: 2, nome: 'João', email: 'joao@email.com' },
        { id: 3, nome: 'Maria', email: 'maria@email.com' },
        { id: 4, nome: 'Pedro', email: 'pedro@email.com' },

    ];

    buscarUsuarios(termo: string): Observable<Usuario[]> {
        return of(this.usuarios).pipe(
            delay(500),
            map(users =>
                users.filter(u =>
                    u.nome.toLowerCase().includes(termo.toLowerCase())

                )
            )
        );
    }
}
