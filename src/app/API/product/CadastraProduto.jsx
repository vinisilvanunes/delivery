import axios from 'axios';

export const cadastraProduto = async (token, dados) => {
  try {
    const response = await axios.post(
      'https://backend5semestre.onrender.com/product/create',
      dados,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Utiliza o token recebido como parâmetro
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
      }
    );
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message); // Lança o erro para ser tratado pelo código que chama cadastraProduto
  }
};
