import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/TelaListagem.css';
import EditarProduto from './EditarProduto';
import { useNavigate } from 'react-router-dom';



const TelaListagem = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
        const navigate = useNavigate();


    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/produtos');
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            } finally {
                setLoading(false);
            }
        };
        buscarProdutos();
    }, []);       

    const handleDelete = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await axios.delete(`http://localhost:3001/produtos/${id}`);
                setProdutos(produtos.filter((produto) => produto.id !== id));
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
            }
    }
    };
    const getImagemReal = (url) => {
        switch(url) {
            case "https://exemplo.com/notebook-dell.jpg":
                return "https://via.placeholder.com/150?text=Notebook+Dell";
            case "https://exemplo.com/mouse-logitech.jpg":
                return "https://via.placeholder.com/150?text=Mouse+Logitech";
            case "https://exemplo.com/teclado-rgb.jpg":
                return "https://via.placeholder.com/150?text=Teclado+RGB";
            default:
                return url;
        }
    
    };
    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1 className='titulo'>Lista de Produtos</h1>

        <div className='lista-produtos'>
           
            {produtos.map(produto => (
                <div key={produto.id} className="produto-card">
                    <h2>{produto.nome}</h2>
                    <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                    <p>Descrição: {produto.descricao}</p>
                    <img className="card-image" src={getImagemReal(produto.imagem)} alt={produto.nome}
                     />
                    <button onClick={() => navigate(`/editar/${produto.id}`)}>Editar</button>
                    <button onClick={() => handleDelete(produto.id)}>Excluir</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default TelaListagem;

