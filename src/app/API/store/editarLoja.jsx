import axios from 'axios';
import Swal from 'sweetalert2'; // Note que o Swal pode não ser totalmente compatível com React Native, considere usar outra biblioteca para modais

export const EditarUsuario = async (token) => {
  try {
    const response = await axios.put('https://backend5semestre.onrender.com/store/update', {
      headers: {
        Authorization: `Bearer ${token}`, // Utiliza o token recebido como parâmetro
      },
    });
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw new Error(error); // Lança o erro para ser tratado pelo código que chama produtosRecomendados
  }
};
