import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert,TouchableOpacity } from 'react-native';
import { imgbbUmaImagem } from '../API/utils/imgbb';
import { ChamaNome } from '../API/store/chamaDadosPessoalStore';
import { cadastraLoja } from '../API/store/CadastrarLoja';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../../../assets/styles/base/utilities/variables';

const CadastroLoja = () => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState(null); // Para upload de foto, use um estado de arquivo
  const [horAbertura, setHorAbertura] = useState('');
  const [horEncerramento, setHorEncerramento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dadosLoja, setDadosLoja] = useState(null);
  const { authData } = useAuth();

  const handleSubmit = async () => {
    // Lógica de envio do formulário
    console.log('Dados do Produto:', { nome, cnpj, senha, descricao, email, foto, horAbertura, horEncerramento, telefone, endereco });
    
    let fotoImgbb;

    if (foto) {
      fotoImgbb = await imgbbUmaImagem(foto);
    } else {
      console.error('Arquivo não selecionado na criação do produto');
    }

    const data = {
      nome: nome,
      CNPJ: cnpj,
      senha: senha,
      descricao: descricao,
      email: email,
      foto: fotoImgbb?.imagem_grande.url,
      hor_abertura: horAbertura,
      hor_encerramento: horEncerramento,
      telefone: telefone,
      endereco: endereco
    }

    const respostaDoCadastramento = await cadastraLoja(data);

    console.log(respostaDoCadastramento.message);

    Alert.alert("Sucesso", respostaDoCadastramento.message, [{ text: "OK" }]);
  };

  const PegaNomeDaLoja = async () => {
    try {
      const Armazena = await ChamaNome(authData);
      setDadosLoja(Armazena);
    } catch (error) {
      console.error('Erro ao buscar nome da loja:', error);
    }
  }

  useEffect(() => {
    PegaNomeDaLoja();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Loja {dadosLoja?.store?.nome}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Loja"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da Loja"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.buttonIrEmpresa} onPress={pickImage}>
        <Text style={styles.buttonText}>Escolher Foto</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="Horário de Abertura"
        value={horAbertura}
        onChangeText={setHorAbertura}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário de Encerramento"
        value={horEncerramento}
        onChangeText={setHorEncerramento}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Criar conta!</Text>
      </TouchableOpacity>
    </ScrollView>
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
    backgroundColor: Colors.secondary, // Cor de fundo do botão
    padding: 25,
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
    color: Colors.text,
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

export default CadastroLoja;
