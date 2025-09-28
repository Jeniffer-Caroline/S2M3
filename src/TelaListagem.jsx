import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/TelaListagem.css';

const Produto = () => {
    const [produtos, setProdutos] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/produtos')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    }, []);

    const handleDelete = (id) => {
        if(window.confirm('Tem certeza que deseja excluir este produto?')) {
        axios.delete(`http://localhost:3001/produtos/${id}`)
            .then(() => {
                setProdutos(produtos.filter(produto => produto.id !== id));
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
            });
    }
    };
    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(filtro.toLowerCase())
    ) || produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        
        <div>
            <h1 className='titulo'>Lista de Produtos</h1> 
            <div className="pesquisa">
            <input type="text" placeholder="Pesquisar" value={filtro} onChange={e => setFiltro(e.target.value)} />
            </div>
            {produtosFiltrados.map(produto => (
                <div key={produto.id} className="card">
                    <h2>{produto.nome}</h2>
                    <p>Preço: R$ {produto.preco}</p>
                            <p>Descrição: {produto.descricao}</p>
                            <img src={produto.imagemUrl} alt={produto.nome} />
                            <button onClick={() => ondeviceorientationabsolute(produto)}>Editar</button>
                            <button onClick={() => handleDelete(produto.id)}>Excluir</button>
                        </div>
                    ))}
        </div>
    );
};

export default Produto;

