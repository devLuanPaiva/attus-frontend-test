import { describe, it, expect } from 'vitest';
import { userFeature, PAGE_SIZE } from './user.reducer';
import { UserActions } from './user.actions';
import { User } from '../../../shared/models/user.model';

const reducer = userFeature.reducer;

const mockUser: User = {
    id: 1,
    name: 'Giana Sandrini',
    email: 'giana@test.com',
    cpf: '529.982.247-25',
    phone: '(51) 99999-0001',
    phoneType: 'CELULAR',
};

const initialState = reducer(undefined, { type: '@@init' });

describe('userReducer', () => {
    describe('loadUsers', () => {
        it('should set loading true and clear error', () => {
            const state = reducer({ ...initialState, error: 'old error' }, UserActions.loadUsers());
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });
    });

    describe('loadUsersSuccess', () => {
        it('should populate users, set total and stop loading', () => {
            const state = reducer(
                { ...initialState, loading: true },
                UserActions.loadUsersSuccess({ users: [mockUser], total: 42 })
            );
            expect(state.users).toEqual([mockUser]);
            expect(state.total).toBe(42);
            expect(state.loading).toBe(false);
        });
    });

    describe('loadUsersFailure', () => {
        it('should set error and stop loading', () => {
            const state = reducer(
                { ...initialState, loading: true },
                UserActions.loadUsersFailure({ error: 'Network error' })
            );
            expect(state.error).toBe('Network error');
            expect(state.loading).toBe(false);
        });
    });

    describe('setFilter', () => {
        it('should update filter and reset page to 1', () => {
            const state = reducer(
                { ...initialState, page: 5, filter: 'old' },
                UserActions.setFilter({ filter: 'Giana' })
            );
            expect(state.filter).toBe('Giana');
            expect(state.page).toBe(1);
        });
    });

    describe('setPage', () => {
        it('should update page number', () => {
            const state = reducer(initialState, UserActions.setPage({ page: 4 }));
            expect(state.page).toBe(4);
        });
    });

    describe('createUser', () => {
        it('should set saving true', () => {
            const state = reducer(initialState, UserActions.createUser({ data: {} as never }));
            expect(state.saving).toBe(true);
        });

        it('should append user when current page is not full', () => {
            const state = reducer(
                { ...initialState, users: [mockUser], total: 1 },
                UserActions.createUserSuccess({ user: { ...mockUser, id: 2 } })
            );
            expect(state.users).toHaveLength(2);
            expect(state.total).toBe(2);
            expect(state.saving).toBe(false);
        });

        it('should not append user when page is full (already at PAGE_SIZE)', () => {
            const fullPage: User[] = Array.from({ length: PAGE_SIZE }, (_, i) => ({
                ...mockUser,
                id: i + 1,
            }));
            const state = reducer(
                { ...initialState, users: fullPage, total: PAGE_SIZE },
                UserActions.createUserSuccess({ user: { ...mockUser, id: 999 } })
            );
            expect(state.users).toHaveLength(PAGE_SIZE);
            expect(state.total).toBe(PAGE_SIZE + 1);
        });

        it('should set error on createUserFailure', () => {
            const state = reducer(
                { ...initialState, saving: true },
                UserActions.createUserFailure({ error: 'Create failed' })
            );
            expect(state.error).toBe('Create failed');
            expect(state.saving).toBe(false);
        });
    });

    describe('updateUser', () => {
        it('should replace updated user in list', () => {
            const updated = { ...mockUser, name: 'Novo Nome' };
            const state = reducer(
                { ...initialState, users: [mockUser], saving: true },
                UserActions.updateUserSuccess({ user: updated })
            );
            expect(state.users[0].name).toBe('Novo Nome');
            expect(state.saving).toBe(false);
        });

        it('should set error on updateUserFailure', () => {
            const state = reducer(
                { ...initialState, saving: true },
                UserActions.updateUserFailure({ error: 'Update failed' })
            );
            expect(state.error).toBe('Update failed');
            expect(state.saving).toBe(false);
        });
    });
});