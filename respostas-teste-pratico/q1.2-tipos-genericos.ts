interface PageParams {
    page: number;
    pageSize: number;

}

interface Page<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;

}



function filterAndPaginate<T>(data: T[], filterFn: (item: T) => boolean, params: PageParams): Page<T> {
    const { page, pageSize } = params;
    const filteredData = data.filter(filterFn);
    const total = filteredData.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredData.slice(start, end);

    return {
        data: paginatedData,
        total,
        page,
        pageSize

    };

}

interface User {
    id: number;
    name: string;
    email: string;

}


const users: User[] = [
    { id: 1, name: 'Ana', email: 'ana@email.com' },
    { id: 2, name: 'João', email: 'joao@email.com' },
    { id: 3, name: 'Maria', email: 'maria@email.com' },
    { id: 4, name: 'Pedro', email: 'pedro@email.com' },
    { id: 5, name: 'Alice', email: 'alice@email.com' }

];


const result = filterAndPaginate<User>(
    users,
    user => user.name.toLocaleLowerCase().startsWith('a'),
    {
        page: 1,
        pageSize: 2

    }

);
console.log(result); 
