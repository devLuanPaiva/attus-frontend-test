import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';
import { UserActions } from './user.actions';

export const PAGE_SIZE = 10;

interface UserState {
    users: User[];
    total: number;
    page: number;
    filter: string;
    loading: boolean;
    saving: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    total: 0,
    page: 1,
    filter: '',
    loading: false,
    saving: false,
    error: null,
};

export const userFeature = createFeature({
    name: 'users',
    reducer: createReducer(
        initialState,

        on(UserActions.loadUsers, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(UserActions.loadUsersSuccess, (state, { users, total }) => ({
            ...state,
            users,
            total,
            loading: false,
        })),
        on(UserActions.loadUsersFailure, (state, { error }) => ({
            ...state,
            error,
            loading: false,
        })),

      
        on(UserActions.setFilter, (state, { filter }) => ({
            ...state,
            filter,
            page: 1,
        })),

       
        on(UserActions.setPage, (state, { page }) => ({
            ...state,
            page,
        })),

       
        on(UserActions.createUser, (state) => ({
            ...state,
            saving: true,
            error: null,
        })),
        on(UserActions.createUserSuccess, (state, { user }) => ({
            ...state,
            saving: false,
            total: state.total + 1,
            users:
                state.users.length < PAGE_SIZE
                    ? [...state.users, user]
                    : state.users,
        })),
        on(UserActions.createUserFailure, (state, { error }) => ({
            ...state,
            saving: false,
            error,
        })),

        on(UserActions.updateUser, (state) => ({
            ...state,
            saving: true,
            error: null,
        })),
        on(UserActions.updateUserSuccess, (state, { user }) => ({
            ...state,
            saving: false,
            users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),
        on(UserActions.updateUserFailure, (state, { error }) => ({
            ...state,
            saving: false,
            error,
        }))
    ),
});