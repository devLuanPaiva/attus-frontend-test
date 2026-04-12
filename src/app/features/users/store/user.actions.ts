import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserFormData, UserPageResult } from '../../../shared/models/user.model';

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'Load Users': emptyProps(),
        'Load Users Success': props<UserPageResult>(),
        'Load Users Failure': props<{ error: string }>(),
        'Set Filter': props<{ filter: string }>(),
        'Set Page': props<{ page: number }>(),

        'Create User': props<{ data: UserFormData }>(),
        'Create User Success': props<{ user: User }>(),
        'Create User Failure': props<{ error: string }>(),

     
        'Update User': props<{ id: number; data: UserFormData }>(),
        'Update User Success': props<{ user: User }>(),
        'Update User Failure': props<{ error: string }>(),
    },
});