import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';
import { UserActions } from './user.actions';

interface UserState {
    users: User[];
    filter: string;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    filter: '',
    loading: false,
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
        on(UserActions.loadUsersSuccess, (state, { users }) => ({
            ...state,
            users,
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
        }))
    ),
});