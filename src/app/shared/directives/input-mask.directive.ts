import { Directive, HostListener, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';

type MaskType = 'cpf' | 'phone';

@Directive({
    selector: '[appInputMask]',
    standalone: true,
})
export class InputMaskDirective {
    appInputMask = input.required<MaskType>();

    private readonly ngControl = inject(NgControl);

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const value = (event.target as HTMLInputElement)?.value || '';
        const masked = this.applyMask(value);
        this.ngControl.control?.setValue(masked, { emitEvent: true });
    }

    private applyMask(value: string): string {
        const digits = value.replaceAll(/\D/g, '');

        if (this.appInputMask() === 'cpf') {
            return digits
                .slice(0, 11)
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        if (this.appInputMask() === 'phone') {
            const d = digits.slice(0, 11);
            if (d.length <= 10) {
                return d
                    .replace(/(\d{2})(\d)/, '($1) $2')
                    .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
            }
            return d
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
        }

        return value;
    }
}