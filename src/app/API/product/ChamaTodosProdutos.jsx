import axios from 'axios';

export const todosOsProduct = async (token) => {
  try {
    const response = await axios.get('https://backend5semestre.onrender.com/product/todos', {
      headers: {
        Authorization: `Bearer ${token}`, // Utiliza o token recebido como parâmetro
      },
    });
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw new Error(error); // Lança o erro para ser tratado pelo código que chama todosOsProduct
  }
};

