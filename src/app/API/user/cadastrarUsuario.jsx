import axios from 'axios';
import Swal from 'sweetalert2';



export const cadastraUsuario = async (dados) => {
  try {
    const response = await axios.post('https://backend5semestre.onrender.com/user', dados);
    return response.data; // Retorna apenas os dados da resposta

  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);

    // Verifica se error.response e error.response.data existem antes de acessar error.response.data.message
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;

    Swal.fire({
      icon: "warning",
      title: errorMessage,
      showConfirmButton: false,
      timer: 5000
    });

    throw new Error(errorMessage); // Lança o erro para ser tratado pelo código que chama cadastraUsuario
  }
};
