import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina o contexto de autenticação
const AuthContext = createContext();

// Provedor de contexto para autenticação
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // Estado para dados de autenticação
  // Efeito para carregar dados de autenticação ao inicializar
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const storedAuthData = await AsyncStorage.getItem('authData');
        
        if (storedAuthData) {
          setAuthData(JSON.parse(storedAuthData));
        }
      } catch (error) {
        console.error('Erro ao recuperar dados de autenticação:', error);
      }
    };

    fetchAuthData();
  }, []);

  // Efeito para salvar dados de autenticação sempre que forem atualizados
  useEffect(() => {
    const saveAuthData = async () => {
      try {
        await AsyncStorage.setItem('authData', JSON.stringify(authData));
      } catch (error) {
        console.error('Erro ao salvar dados de autenticação:', error);
      }
    };

    saveAuthData();
  }, [authData]);

  // Função customizada para utilizar o contexto de autenticação
  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
    }
    return context;
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporte o hook useAuth para uso externo
export const useAuth = () => useContext(AuthContext);

export default AuthContext; // Exporte o contexto para uso externo, se necessário
