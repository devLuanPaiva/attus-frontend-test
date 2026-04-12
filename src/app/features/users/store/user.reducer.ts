import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';
import { UserActions } from './user.actions';

interface UserState {
    users: User[];
    filter: string;
    loading: boolean;
    saving: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    filter: '',
    loading: false,
    saving: false,
    error: null,
};

export const userFeature = createFeature({
    name: 'users',
    reducer: createReducer(
        initialState,

        on(UserActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
        on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
        on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),


        on(UserActions.setFilter, (state, { filter }) => ({ ...state, filter })),


        on(UserActions.createUser, (state) => ({ ...state, saving: true, error: null })),
        on(UserActions.createUserSuccess, (state, { user }) => ({
            ...state,
            saving: false,
            users: [...state.users, user],
        })),
        on(UserActions.createUserFailure, (state, { error }) => ({ ...state, saving: false, error })),

        on(UserActions.updateUser, (state) => ({ ...state, saving: true, error: null })),
        on(UserActions.updateUserSuccess, (state, { user }) => ({
            ...state,
            saving: false,
            users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),
        on(UserActions.updateUserFailure, (state, { error }) => ({ ...state, saving: false, error })),
    ),
});