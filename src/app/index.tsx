import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import RestaturanteScreen from './pages/RestaturanteScreen';
import ProdutoScreen from './pages/ProdutoScreen';
import CarrinhoScreen from './pages/CarrinhoScreen';
import CompraScreen from './pages/CompraScreen'
import {CartProvider} from '../../scripts/CartContext'
import CadastroUsuario from "./pages/CadastroUsuario";
import LoginStore from "./pages/loginStore";
import LoginUsuario from "./pages/loginUsuario";
import CadastroProduto from "./pages/CadastroProduto";
import CadastroLoja from "./pages/CadastroLoja";
import { AuthProvider,useAuth } from "./context/AuthContext";
import LojaScreen from "./pages/LojaScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PerfilScreen from "./pages/PerfilScreen";





const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
};

function HomeStack(){
    
    return(
        <CartProvider>
            <AuthProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={screenOptions} initialRouteName="loginUsuario">
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Restaurante" component={RestaturanteScreen}/>
                    <Stack.Screen name="Carrinho" component={CarrinhoScreen}/>
                    <Stack.Screen name="Compra" component={CompraScreen}/>


                    <Stack.Screen name="cadastroLoja" component={CadastroLoja}/>
                    <Stack.Screen name="cadastroUsuario" component={CadastroUsuario}/>
                    <Stack.Screen name="CadastroProduto" component={CadastroProduto}/>
                    <Stack.Screen name="loginLoja" component={LoginStore}/>
                    <Stack.Screen name="loginUsuario" component={LoginUsuario}/>
                    <Stack.Screen name="TelaLoja" component={LojaScreen}/>
                    <Stack.Screen name="Produto" component={ProdutoScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
            </AuthProvider>
        </CartProvider>
    )
}

const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }: {route: any}) => ({
    headerShown: false,
    tabBarIcon: ({ color , size }: {color:any, size: any}) => {
        let iconName:any;

        if (route.name === 'Home' || route.name === 'Página Inicial') {
            iconName = 'home-outline';
        } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

function AppTabs() {
    const { authData } = useAuth();
    const isAuthenticated = !!authData;

    return (
        <Tab.Navigator screenOptions={tabScreenOptions}>
            {isAuthenticated ? (
                <>
                    <Tab.Screen name="Página Inicial" component={HomeStack} />
                    <Tab.Screen name="Perfil" component={PerfilScreen} />
                </>
            ) : (
                <>
                    <Tab.Screen name="Login" component={LoginUsuario} />
                    <Tab.Screen name="Cadastro" component={CadastroUsuario} />
                </>
            )}
        </Tab.Navigator>
    );
}

export default function Index() {
    return (
        <AuthProvider>
            <CartProvider>
                <NavigationContainer independent={true}>
                    <AppTabs />
                </NavigationContainer>
            </CartProvider>
        </AuthProvider>
    );
}