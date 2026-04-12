import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, UserFormData, UserPageParams, UserPageResult } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/users';

    getUsersPaginated(params: UserPageParams): Observable<UserPageResult> {
        let httpParams = new HttpParams()
            .set('_page', params.page)
            .set('_limit', params.limit)

        if (params.filter.trim()) {
            httpParams = httpParams.set('name_like', params.filter.trim());
        }

        return this.http
            .get<User[]>(this.apiUrl, {
                params: httpParams,
                observe: 'response',
            })
            .pipe(
                map((response: HttpResponse<User[]>) => ({
                    users: response.body ?? [],
                    total: Number(response.headers.get('X-Total-Count') ?? 0),
                }))
            );
    }

    createUser(data: UserFormData): Observable<User> {
        return this.http.post<User>(this.apiUrl, data);
    }

    updateUser(id: number, data: UserFormData): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, { ...data, id });
    }
}