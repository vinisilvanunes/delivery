import axios from 'axios';
import { Alert } from 'react-native';

export const ChamaTodasLojas = async (token) => {
  try {
    const response = await axios.get('https://backend5semestre.onrender.com/store/todos', {
      headers: {
        Authorization: `Bearer ${token}`, // Utiliza o token recebido como parâmetro
      },
    });
    return response.data; // Retorna apenas os dados da resposta

  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    Alert.alert('Erro', 'Não foi possível buscar o nome da loja.');
    throw new Error(error); // Lança o erro para ser tratado pelo código que chama ChamaNome
  }
};
