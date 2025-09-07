
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        constresponse = await axios.post('http://localhost:3001/produtos', {
            nome: nome,
            preco: parseFloat(preco),
            descricao: descricao,
            imagemUrl: imagemUrl
        });
        setSuccess('Produto cadastrado com sucesso!');
        setError(null);
        } catch (err) {
        setError('Erro ao cadastrar produto. Tente novamente.');
        setSuccess(null);
        }
};

return (
    <div>
        <h1>Cadastro de Produto</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor={handleSubmit}>
                Nome do produto:
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </label>
            <br />
            <label htmlFor="preco">
                Preço:
                <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
            </label>
            <br />
            <label htmlFor="descricao">
                Descricao:
                <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </label>
            <br />
            <label htmlFor="imagemUrl">
                Imagem URL:
                <input
                    type="text"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Cadastrar</button>
        </form>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
);
}