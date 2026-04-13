class Produto {
    constructor(
        public id: number,
        public descricao: string,
        public quantidadeEstoque: number
    ) { }

}

class Verdureira {

    private readonly produtos: Produto[] = [
        new Produto(1, 'Maçã', 20),
        new Produto(2, 'Laranja', 0),
        new Produto(3, 'Limão', 20),

    ];

    private buscarProdutoPorId(produtoId: number): Produto | undefined {
        return this.produtos.find(p => p.id === produtoId);

    }

    getDescricaoProduto(produtoId: number): string {

        const produto = this.buscarProdutoPorId(produtoId);

        if (!produto) {
            throw new Error('Produto não encontrado');

        }

        return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;

    }

    hasEstoqueProduto(produtoId: number): boolean {
        const produto = this.buscarProdutoPorId(produtoId);
        return produto ? produto.quantidadeEstoque > 0 : false;

    }

} 