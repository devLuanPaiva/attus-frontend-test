import { describe, it, expect } from 'vitest';
import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf.validator';

const control = (value: string) => new FormControl(value);

describe('cpfValidator', () => {
    it('should return null for a valid CPF', () => {
        expect(cpfValidator(control('529.982.247-25'))).toBeNull();
    });

    it('should return null for a valid CPF without mask', () => {
        expect(cpfValidator(control('52998224725'))).toBeNull();
    });

    it('should return error for CPF with all repeated digits', () => {
        expect(cpfValidator(control('111.111.111-11'))).toEqual({ cpfInvalid: true });
    });

    it('should return error for CPF with less than 11 digits', () => {
        expect(cpfValidator(control('123.456.789'))).toEqual({ cpfInvalid: true });
    });

    it('should return error for CPF with wrong check digits', () => {
        expect(cpfValidator(control('529.982.247-26'))).toEqual({ cpfInvalid: true });
    });

    it('should return error for empty value', () => {
        expect(cpfValidator(control(''))).toEqual({ cpfInvalid: true });
    });

    it('should return error for CPF with all zeros', () => {
        expect(cpfValidator(control('000.000.000-00'))).toEqual({ cpfInvalid: true });
    });
});