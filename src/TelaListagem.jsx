import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/TelaListagem.css';

const Produto = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/produtos')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    }, []);

    return (
        <div>
            {produtos.map(produto => (
                <div key={produto.id} className="card">
                            <h2>{produto.nome}</h2>
                            <p>Preço: R$ {produto.preco}</p>
                            <p>Descrição: {produto.descricao}</p>
                            <img src={produto.imagemUrl} alt={produto.nome} />
                            <button>Editar</button>
                            <button>Excluir</button>
                        </div>
                    ))}
        </div>
    );
};

export default Produto;

