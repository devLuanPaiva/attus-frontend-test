import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User, UserFormData } from '../../shared/models/user.model';

const API = 'http://localhost:3000/users';

const mockUser: User = {
    id: 1,
    name: 'Giana Sandrini',
    email: 'giana@test.com',
    cpf: '529.982.247-25',
    phone: '(51) 99999-0001',
    phoneType: 'CELULAR',
};

const mockFormData: UserFormData = {
    email: 'novo@test.com',
    name: 'Novo Usuário',
    cpf: '529.982.247-25',
    phone: '(51) 99999-0002',
    phoneType: 'CELULAR',
};

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    describe('getUsersPaginated', () => {
        it('should send correct query params for page and limit', () => {
            service.getUsersPaginated({ page: 2, limit: 20, filter: '' }).subscribe();
            const req = httpMock.expectOne((r) => r.url === API);
            expect(req.request.params.get('_page')).toBe('2');
            expect(req.request.params.get('_limit')).toBe('20');
            req.flush([], { headers: { 'X-Total-Count': '0' } });
        });

        it('should send name_like param when filter is provided', () => {
            service.getUsersPaginated({ page: 1, limit: 20, filter: 'Giana' }).subscribe();
            const req = httpMock.expectOne((r) => r.url === API);
            expect(req.request.params.get('name_like')).toBe('Giana');
            req.flush([], { headers: { 'X-Total-Count': '0' } });
        });

        it('should NOT send name_like when filter is empty', () => {
            service.getUsersPaginated({ page: 1, limit: 20, filter: '' }).subscribe();
            const req = httpMock.expectOne((r) => r.url === API);
            expect(req.request.params.has('name_like')).toBe(false);
            req.flush([], { headers: { 'X-Total-Count': '0' } });
        });

        it('should parse X-Total-Count header into total', () => {
            let result: { users: User[]; total: number } | undefined;
            service.getUsersPaginated({ page: 1, limit: 20, filter: '' }).subscribe((r) => (result = r));
            const req = httpMock.expectOne((r) => r.url === API);
            req.flush([mockUser], { headers: { 'X-Total-Count': '87' } });
            expect(result?.total).toBe(87);
            expect(result?.users).toEqual([mockUser]);
        });

        it('should default total to 0 when header is missing', () => {
            let result: { users: User[]; total: number } | undefined;
            service.getUsersPaginated({ page: 1, limit: 20, filter: '' }).subscribe((r) => (result = r));
            const req = httpMock.expectOne((r) => r.url === API);
            req.flush([]);
            expect(result?.total).toBe(0);
        });
    });

    describe('createUser', () => {
        it('should POST form data and return created user', () => {
            let result: User | undefined;
            service.createUser(mockFormData).subscribe((u) => (result = u));
            const req = httpMock.expectOne(API);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(mockFormData);
            req.flush({ ...mockFormData, id: 10 });
            expect(result?.id).toBe(10);
        });
    });

    describe('updateUser', () => {
        it('should PUT with id in body and return updated user', () => {
            let result: User | undefined;
            service.updateUser(1, mockFormData).subscribe((u) => (result = u));
            const req = httpMock.expectOne(`${API}/1`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toMatchObject({ ...mockFormData, id: 1 });
            req.flush({ ...mockFormData, id: 1 });
            expect(result?.id).toBe(1);
        });
    });
});