import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/users';

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}