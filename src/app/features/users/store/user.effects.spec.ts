import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of, throwError, firstValueFrom } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { UserActions } from './user.actions';
import { UserService } from '../../../core/services/user.service';
import { selectPage, selectFilter } from './user.selectors';
import { User, UserFormData } from '../../../shared/models/user.model';


const mockUser: User = {
    id: 1, name: 'Test', email: 't@t.com',
    cpf: '529.982.247-25', phone: '(51) 99999-0001', phoneType: 'CELULAR',
};

const mockFormData: UserFormData = {
    email: 't@t.com', name: 'Test', cpf: '529.982.247-25',
    phone: '(51) 99999-0001', phoneType: 'CELULAR',
};

describe('UserEffects', () => {
    let actions$: Observable<Action>;
    let effects: UserEffects;
    let store: MockStore;
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserEffects,
                provideMockActions(() => actions$),
                provideMockStore({
                    selectors: [
                        { selector: selectPage, value: 1 },
                        { selector: selectFilter, value: '' },
                    ],
                }),
                {
                    provide: UserService,
                    useValue: {
                        getUsersPaginated: vi.fn(),
                        createUser: vi.fn(),
                        updateUser: vi.fn(),
                    },
                },
            ],
        });

        effects = TestBed.inject(UserEffects);
        store = TestBed.inject(MockStore);
        userService = TestBed.inject(UserService);
    });

    describe('loadUsers$', () => {
        it('should dispatch loadUsersSuccess on success', () => {
            vi.spyOn(userService, 'getUsersPaginated').mockReturnValue(
                of({ users: [mockUser], total: 1 })
            );
            actions$ = of(UserActions.loadUsers());

            return firstValueFrom(effects.loadUsers$).then((action) => {
                expect(action).toEqual(UserActions.loadUsersSuccess({ users: [mockUser], total: 1 }));
            });
        });

        it('should dispatch loadUsersFailure on HTTP error', () => {
            vi.spyOn(userService, 'getUsersPaginated').mockReturnValue(
                throwError(() => new Error('Timeout'))
            );
            actions$ = of(UserActions.loadUsers());

            return firstValueFrom(effects.loadUsers$).then((action) => {
                expect(action).toEqual(UserActions.loadUsersFailure({ error: 'Timeout' }));
            });
        });

        it('should use fallback message when error is not an Error instance', () => {
            vi.spyOn(userService, 'getUsersPaginated').mockReturnValue(
                throwError(() => 'string error')
            );
            actions$ = of(UserActions.loadUsers());

            return firstValueFrom(effects.loadUsers$).then((action) => {
                expect((action as ReturnType<typeof UserActions.loadUsersFailure>).error)
                    .toBe('Erro ao carregar usuários');
            });
        });
    });

    describe('reloadOnPageChange$', () => {
        it('should dispatch loadUsers when setPage is dispatched', () => {
            actions$ = of(UserActions.setPage({ page: 2 }));
            return firstValueFrom(effects.reloadOnPageChange$).then((action) => {
                expect(action).toEqual(UserActions.loadUsers());
            });
        });

        it('should dispatch loadUsers when setFilter is dispatched', () => {
            actions$ = of(UserActions.setFilter({ filter: 'test' }));
            return firstValueFrom(effects.reloadOnPageChange$).then((action) => {
                expect(action).toEqual(UserActions.loadUsers());
            });
        });
    });

    describe('createUser$', () => {
        it('should dispatch createUserSuccess on success', () => {
            vi.spyOn(userService, 'createUser').mockReturnValue(of(mockUser));
            actions$ = of(UserActions.createUser({ data: mockFormData }));

            return firstValueFrom(effects.createUser$).then((action) => {
                expect(action).toEqual(UserActions.createUserSuccess({ user: mockUser }));
            });
        });

        it('should dispatch createUserFailure on error', () => {
            vi.spyOn(userService, 'createUser').mockReturnValue(
                throwError(() => new Error('Create failed'))
            );
            actions$ = of(UserActions.createUser({ data: mockFormData }));

            return firstValueFrom(effects.createUser$).then((action) => {
                expect(action).toEqual(UserActions.createUserFailure({ error: 'Create failed' }));
            });
        });
    });

    describe('updateUser$', () => {
        it('should dispatch updateUserSuccess on success', () => {
            vi.spyOn(userService, 'updateUser').mockReturnValue(of(mockUser));
            actions$ = of(UserActions.updateUser({ id: 1, data: mockFormData }));

            return firstValueFrom(effects.updateUser$).then((action) => {
                expect(action).toEqual(UserActions.updateUserSuccess({ user: mockUser }));
            });
        });

        it('should dispatch updateUserFailure on error', () => {
            vi.spyOn(userService, 'updateUser').mockReturnValue(
                throwError(() => new Error('Update failed'))
            );
            actions$ = of(UserActions.updateUser({ id: 1, data: mockFormData }));

            return firstValueFrom(effects.updateUser$).then((action) => {
                expect(action).toEqual(UserActions.updateUserFailure({ error: 'Update failed' }));
            });
        });
    });
});