import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: string }>(),
        'Set Filter': props<{ filter: string }>(),
    },
});