import axios from 'axios';

export const APIloginLoja = async (email, senha) => {
  try {
    const response = await axios.post('https://backend5semestre.onrender.com/auth-store/login', {
      email: email,
      senha: senha
    });

    return response.data; // Retorna os dados da resposta se necessário
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Erro ao fazer login. Por favor, verifique suas credenciais.'); // Lança o erro para ser tratado pelo código que chama APIlogin
  }
};
