import { createSelector } from '@ngrx/store';
import { userFeature } from './user.reducer';

export const {
    selectUsers,
    selectFilter,
    selectLoading,
    selectError,
    selectSaving,
} = userFeature;

export const selectFilteredUsers = createSelector(
    selectUsers,
    selectFilter,
    (users, filter) => {
        if (!filter.trim()) return users;
        const lowerFilter = filter.toLowerCase();
        return users.filter((user) =>
            user.name.toLowerCase().includes(lowerFilter)
        );
    }
);