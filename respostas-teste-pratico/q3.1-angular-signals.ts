import {
    Component,
    computed,
    effect,
    output,
    signal
} from '@angular/core';

import { CurrencyPipe } from '@angular/common';


interface ItemCarrinho {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;

}

@Component({
    selector: 'app-carrinho',
    standalone: true,
    imports: [CurrencyPipe],
    template: ` 

    <h2>Total: {{ total() | currency:'BRL' }}</h2> 


    <button (click)="adicionarItem()"> 
      Adicionar item 
    </button> 

    <ul> 
      @for (item of itens(); track item.id) { 
        <li> 

          {{ item.nome }} - {{ item.quantidade }}x 

          <button (click)="removerItem(item.id)">Remover</button> 

        </li> 

      } 

    </ul> 

  `,

})

export class CarrinhoComponent {
    itens = signal<ItemCarrinho[]>([]);

    total = computed(() =>
        this.itens().reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0

        )

    );


    totalChange = output<number>();

    constructor() {
        effect(() => {
            this.totalChange.emit(this.total());

        });

    }

    adicionarItem(): void {
        const novoItem: ItemCarrinho = {
            id: Date.now(),
            nome: 'Produto',
            preco: 10,
            quantidade: 1,

        };
        this.itens.update(itens => [...itens, novoItem]);

    }

    removerItem(id: number): void {
        this.itens.update(itens => itens.filter(item => item.id !== id));

    }

} 