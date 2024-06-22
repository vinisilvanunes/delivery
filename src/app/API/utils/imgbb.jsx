import axios from 'axios';





export async function imgbbUmaImagem(file) {
    return new Promise<Foto>((resolve, reject) => {
      const url = 'https://api.imgbb.com/1/upload';
      const apiKey = '676c0bd4e17dba1ee3c06b04c599f085';
  
      const formData = new FormData();
      formData.append('image', file);
  
      const params = new URLSearchParams({
        key: apiKey,
      });
  
      axios
        .post(`${url}?${params.toString()}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;

            // const imagemReceita: Foto = {
            //     imagem_grande: data.image,
            //     imagem_media: data.medium,
            //     imagem_pequena: data.thumb,
            //     excluir: data.delete_url,
            // };
  
            resolve(imagemReceita);
          } else {
            console.log('Erro ao enviar a imagem para o ImgBB.');
            reject(new Error('Erro ao enviar a imagem para o ImgBB.'));
          }
        })
        .catch((error) => {
          console.error('Erro de rede: ' + error);
          reject(error);
        });
    });
  }