
import { Component } from '@angular/core';

interface Item {
    id: number;
    nome: string;
}

@Component({
    selector: 'app-performace',
    templateUrl: './performace..component.html',
})
export class PerformaceComponent {
    lista: Item[] = [
        { id: 1, nome: 'Ana' },
        { id: 2, nome: 'Bruno' },
        { id: 3, nome: 'Carlos' },
    ];

    trackById(index: number, item: Item): number {
        return item.id;
    }

}