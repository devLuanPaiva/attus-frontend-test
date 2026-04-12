import { createSelector } from '@ngrx/store';
import { PAGE_SIZE, userFeature } from './user.reducer';

export const {
    selectUsers,
    selectFilter,
    selectLoading,
    selectError,
    selectSaving,
    selectTotal,
    selectPage,
} = userFeature;

export const selectTotalPages = createSelector(
    selectTotal,
    (total) => Math.ceil(total / PAGE_SIZE)
);

export const selectPaginationVm = createSelector(
    selectPage,
    selectTotal,
    selectTotalPages,
    (page, total, totalPages) => ({ page, total, totalPages, pageSize: PAGE_SIZE })
);

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