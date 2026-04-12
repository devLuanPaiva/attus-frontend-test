import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserFormData } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/users';

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    createUser(data: UserFormData): Observable<User> {
        return this.http.post<User>(this.apiUrl, data);
    }

    updateUser(id: number, data: UserFormData): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, { ...data, id });
    }
}