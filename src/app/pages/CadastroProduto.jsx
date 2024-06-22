import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { cadastraProduto } from '../API/product/CadastraProduto';
import { imgbbUmaImagem } from '../API/utils/imgbb';
import { ChamaNome } from '../API/store/chamaDadosPessoalStore';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../../assets/styles/base/utilities/variables';

const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [tags, setTags] = useState([]);
  const [dadosLoja, setDadosLoja] = useState(null);
  const { authData } = useAuth();


  const handleSubmit = async () => {
    let fotoImgbb;

    if (foto) {
      fotoImgbb = await imgbbUmaImagem(foto);
    } else {
      console.error('Arquivo não selecionado na criação do produto');
    }

    const data = {
      nome,
      preco: Number(preco),
      descricao,
      foto: fotoImgbb?.imagem_grande.url,
      quantidade: Number(quantidade),
      tags,
    };


    const respostaDoCadastramento = await cadastraProduto("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRFU1RFQG1jRG9uYWxkcy5jb20iLCJpZCI6IjY2NzY0Mzc0NjZmMmY0NGFiNzExYzU0OSIsImlhdCI6MTcxOTAyNjU1NCwiZXhwIjoxNzE5MTEyOTU0fQ.XIg7YK4N3vOR4z8-2B-igcwdfypNmqQVyiQs4d4sxPk", data);

    Alert.alert('Cadastro', "respostaDoCadastramento.message", [{ text: 'OK' }]);

    console
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoto(result.uri);
    }
  };

  const handleTagsChange = (text) => {
    const tagsArray = text.split(',').map(tag => tag.trim());
    setTags(tagsArray);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do Produto"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
        required
      />

      <TouchableOpacity style={styles.buttonIrEmpresa} onPress={pickImage}>
        <Text style={styles.buttonText}>Escolher Foto</Text>
      </TouchableOpacity>
      {foto && <Text style={styles.photoText}>Foto selecionada</Text>}



      <TextInput
        style={styles.input}
        placeholder="Quantidade em Estoque"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Tags (separadas por vírgula)"
        value={tags.join(', ')}
        onChangeText={handleTagsChange}
        required
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Cadastrar Produto!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.primary, // Cor de fundo do botão
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto',
    marginTop: 25,
  },

  buttonIrEmpresa: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.secondary, // Cor de fundo do botão
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  buttonCadastrar: {
    marginTop: 25,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto',
    textDecorationLine: 'underline',
  },
  buttonText: {
    color: Colors.text, // Cor do texto do botão
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto thin',
  },
  input: {
    color:Colors.text,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily: 'Roboto',
  },
  error: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    color: Colors.error,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
  },
});


export default CadastroProduto;
