export interface User {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    phoneType: PhoneType;
}

export type PhoneType = 'CELULAR' | 'RESIDENCIAL' | 'COMERCIAL';

export interface UserFormData {
    email: string;
    name: string;
    cpf: string;
    phone: string;
    phoneType: PhoneType;
}

export interface UserDialogData {
    user: User | null;
}

export interface UserPageParams {
    page: number;
    limit: number;
    filter: string;
}

export interface UserPageResult {
    users: User[];
    total: number;
}