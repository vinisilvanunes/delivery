import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import HomeScreen from './telas/HomeScreen';
import RestaturanteScreen from './telas/RestaturanteScreen';
import ProdutoScreen from './telas/ProdutoScreen';
import CarrinhoScreen from './telas/CarrinhoScreen';
import LoginScreen from './telas/LoginScreen'
import CadastroScreen from './telas/CadastroScreen'
import CompraScreen from './telas/CompraScreen'
import {CartProvider} from '../../scripts/CartContext'

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    headerShown: false,
};

export default function Index(){
    return(
        <CartProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Restaurante" component={RestaturanteScreen}/>
                    <Stack.Screen name="Produto" component={ProdutoScreen}/>
                    <Stack.Screen name="Carrinho" component={CarrinhoScreen}/>
                    <Stack.Screen name="Compra" component={CompraScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Cadastro" component={CadastroScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    )
}