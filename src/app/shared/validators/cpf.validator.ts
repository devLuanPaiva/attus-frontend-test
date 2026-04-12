import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
    const raw = (control.value as string)?.replaceAll(/\D/g, '');

    if (raw?.length !== 11) return { cpfInvalid: true };
    if (/^(\d)\1{10}$/.test(raw)) return { cpfInvalid: true };

    const calc = (mod: number): number => {
        let sum = 0;
        for (let i = 0; i < mod - 1; i++) {
            sum += Number.parseInt(raw[i]) * (mod - i);
        }
        const rest = (sum * 10) % 11;
        return rest >= 10 ? 0 : rest;
    };

    if (calc(10) !== Number.parseInt(raw[9]) || calc(11) !== Number.parseInt(raw[10])) {
        return { cpfInvalid: true };
    }

    return null;
}