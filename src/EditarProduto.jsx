import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/EditarProduto.css';

export default function EditarProduto() {
        const navigate = useNavigate();

    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/produtos/${id}`);
                const produto = response.data;
                setNome(produto.nome);
                setPreco(produto.preco);
                setDescricao(produto.descricao);
                setImagem(produto.imagem);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
                alert('Erro ao buscar produto. Tente novamente.');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        buscarProduto();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/produtos/${id}`, {
                nome: nome,
                preco: parseFloat(preco),
                descricao: descricao,
                imagem: imagem
            });
            alert('Produto atualizado com sucesso!');
            navigate('/');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto. Tente novamente.');
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="editar-produto">
            <h2>Editar Produto</h2>
            <form onSubmit={handleSubmit} className="editar-produto-form">
                <input type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do Produto" />
                <input type="text" name="preco" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço do Produto" />
                <textarea name="descricao" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição do Produto"></textarea>
                <input type="text" name="imagem" id="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} placeholder="URL da Imagem" />
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}
