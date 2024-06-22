import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Importe o hook useAuth aqui
import { APIloginUsuario } from '../API/user/loginUsuario';
import { useNavigation } from '@react-navigation/native'; // Use useNavigation em vez de useNavigate
import { Colors } from '../../../assets/styles/base/utilities/variables';

const LoginUsuario = () => {
  const { setAuthData } = useAuth(); // Obtenha setAuthData do contexto de autenticação
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para armazenar erros de login
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const resposta = await APIloginUsuario(username, password); // Faça a chamada para a API de login

      setAuthData(resposta.token); // Atualize os dados de autenticação com a resposta da API
      console.log('Dados de autenticação definidos globalmente:', resposta);

      if (resposta.token) {
        navigation.navigate('Home');
      }
    } catch (error) {
      setError('Usuário ou senha inválidos');
      console.error('Erro ao fazer login:', error);
    }
  };

  const LoginLoja = () => {
    navigation.navigate('loginLoja');
  }

  const CadastrarUsuario = () => {
    navigation.navigate('cadastroUsuario');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login de usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>} {/* Exibe mensagem de erro, se houver */}
      
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.buttonIrEmpresa} onPress={LoginLoja}>
        <Text style={styles.buttonText}>Logar como empresa</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.buttonCadastrar} onPress={CadastrarUsuario}>
        <Text style={styles.buttonText}>Cadastre-se</Text>
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
    marginTop: 25,
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
    backgroundColor: Colors.secondary,
    color: Colors.text,
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

export default LoginUsuario;
