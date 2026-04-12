import { describe, it, expect } from 'vitest';
import { selectPaginationVm, selectTotalPages } from './user.selectors';
import { User } from '../../../shared/models/user.model';
import { PAGE_SIZE } from './user.reducer';

const mockUser: User = {
    id: 1,
    name: 'Giana',
    email: 'g@test.com',
    cpf: '529.982.247-25',
    phone: '(51) 99999-0001',
    phoneType: 'CELULAR',
};

const buildState = (overrides: Partial<{
    users: User[];
    total: number;
    page: number;
    filter: string;
    loading: boolean;
    saving: boolean;
    error: string | null;
}> = {}) => ({
    users: { users: [], total: 0, page: 1, filter: '', loading: false, saving: false, error: null, ...overrides },
});

describe('selectTotalPages', () => {
    it('should return 0 when total is 0', () => {
        expect(selectTotalPages.projector(0)).toBe(0);
    });

    it('should return 1 when total equals PAGE_SIZE', () => {
        expect(selectTotalPages.projector(PAGE_SIZE)).toBe(1);
    });

    it('should return correct page count when total is not multiple of PAGE_SIZE', () => {
        expect(selectTotalPages.projector(PAGE_SIZE + 1)).toBe(2);
    });

    it('should handle large totals correctly', () => {
        expect(selectTotalPages.projector(PAGE_SIZE * 5)).toBe(5);
    });
});

describe('selectPaginationVm', () => {
    it('should compose pagination view model correctly', () => {
        const vm = selectPaginationVm.projector(2, 45, 3);
        expect(vm).toEqual({ page: 2, total: 45, totalPages: 3, pageSize: PAGE_SIZE });
    });

    it('should expose correct pageSize constant', () => {
        const vm = selectPaginationVm.projector(1, 0, 0);
        expect(vm.pageSize).toBe(PAGE_SIZE);
    });
});

describe('selectUsers (state slice)', () => {
    it('should select users array from state', () => {
        const state = buildState({ users: [mockUser] });
        expect(state.users.users).toEqual([mockUser]);
    });
});