import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { imgbbUmaImagem } from '../API/utils/imgbb';
import { cadastraUsuario } from '../API/user/cadastrarUsuario';
import { ChamaNome } from '../API/store/chamaDadosPessoalStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../../assets/styles/base/utilities/variables';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState(null);
  const [dataNasc, setDataNasc] = useState(new Date());
  const [endereco, setEndereco] = useState('');
  const [tags, setTags] = useState([]);
  const [dadosLoja, setDadosLoja] = useState(null);
  const { authData } = useAuth();



  const fotoPadrao = "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"


  const handleSubmit = async () => {
    let fotoImgbb;

    // if (foto) {
    //   fotoImgbb = await imgbbUmaImagem(foto);
    // } else {
    //   console.error('Arquivo não selecionado na criação do produto');
    // }

    const data = {
      nome,
      email,
      senha,
      telefone,
      foto: foto,
      data_nasc: dataNasc.toISOString().split('T')[0],
      endereco,
      tags,
    };

    // const respostaDoCadastramento = await cadastraUsuario(data);
    console.log('data', data);
    Alert.alert('Cadastro', respostaDoCadastramento.message, [{ text: 'OK' }]);
  };


  const handleChoosePhoto = async () => {
    try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permissão negada', 'É necessário permitir o acesso à galeria para escolher uma foto.');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!pickerResult.cancelled) {
            console.log('Foto escolhida:', pickerResult);

            setUser({ ...user, foto: pickerResult.assets[0].uri });
        }
    } catch (error) {
        console.error('Erro ao escolher a foto:', error);
    }
};

  const PegaNomeDaLoja = async () => {
    try {
      const Armazena = await ChamaNome(authData);
      setDadosLoja(Armazena);
    } catch (error) {
      console.error('Erro ao buscar nome da loja:', error);
    }
  };




  useEffect(() => {
    PegaNomeDaLoja();
  }, []);

  const handleTagsChange = (text) => {
    const tagsArray = text.split(',').map(tag => tag.trim());
    setTags(tagsArray);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setFoto(result.assets[0].uri );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        required
      />
      <TouchableOpacity onPress={handleChoosePhoto}>
          <Image source={{ uri: fotoPadrao }} style={styles.profilePicture} />
      </TouchableOpacity>

      <DateTimePicker
        value={dataNasc}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setDataNasc(selectedDate || dataNasc)}
      />


      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
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
        <Text style={styles.buttonText}>Criar conta!</Text>
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

export default CadastroUsuario;
