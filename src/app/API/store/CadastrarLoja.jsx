import axios from 'axios';
import { Alert } from 'react-native';

export const cadastraLoja = async (dados) => {
  try {
    const response = await axios.post('https://backend5semestre.onrender.com/store/create', dados);
    return response.data; // Retorna apenas os dados da resposta

  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.response ? error.response.data : error.message);
    Alert.alert('Erro', error.response ? error.response.data.message : error.message);
    throw new Error(error.response ? error.response.data : error.message); // Lança o erro para ser tratado pelo código que chama cadastraLoja
  }
};
