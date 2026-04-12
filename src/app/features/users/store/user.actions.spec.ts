import { describe, it, expect } from 'vitest';
import { UserActions } from './user.actions';
import { UserFormData } from '../../../shared/models/user.model';

const mockFormData: UserFormData = {
    email: 'test@test.com',
    name: 'Test User',
    cpf: '529.982.247-25',
    phone: '(51) 99999-0000',
    phoneType: 'CELULAR',
};

describe('UserActions', () => {
    it('should create loadUsers action', () => {
        expect(UserActions.loadUsers().type).toBe('[Users] Load Users');
    });

    it('should create loadUsersSuccess with users and total', () => {
        const action = UserActions.loadUsersSuccess({ users: [], total: 0 });
        expect(action.type).toBe('[Users] Load Users Success');
        expect(action.users).toEqual([]);
        expect(action.total).toBe(0);
    });

    it('should create loadUsersFailure with error message', () => {
        const action = UserActions.loadUsersFailure({ error: 'Network error' });
        expect(action.error).toBe('Network error');
    });

    it('should create setFilter with filter string', () => {
        const action = UserActions.setFilter({ filter: 'Giana' });
        expect(action.filter).toBe('Giana');
    });

    it('should create setPage with page number', () => {
        const action = UserActions.setPage({ page: 3 });
        expect(action.page).toBe(3);
    });

    it('should create createUser with form data', () => {
        const action = UserActions.createUser({ data: mockFormData });
        expect(action.data).toEqual(mockFormData);
    });

    it('should create updateUser with id and form data', () => {
        const action = UserActions.updateUser({ id: 1, data: mockFormData });
        expect(action.id).toBe(1);
        expect(action.data).toEqual(mockFormData);
    });
});