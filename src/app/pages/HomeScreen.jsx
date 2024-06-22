import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RestauranteCard from "../../../components/RestauranteCard";
import { useCart } from '../../../scripts/CartContext';
import { produtosRecomendados } from "../API/product/ChamaRecomendacao";
import { ChamaTodasLojas } from "../API/store/ChamaTodosRestaurantes";
import { useAuth } from "../context/AuthContext";

export default function Restaurantes({ navigation }) {
    const { cart } = useCart();
    const { authData } = useAuth();
    const [recomendacoes, setRecomendacoes] = useState([]);
    const [restaurantes, setRestaurantes] = useState([]);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                // Busca produtos recomendados
                const dadosRecomendados = await produtosRecomendados(authData);
                setRecomendacoes(dadosRecomendados.slice(0, 10)); // Define os 4 primeiros itens

                // Busca todas as lojas
                const todasLojas = await ChamaTodasLojas(authData);
                setRestaurantes(todasLojas.usuario);
            } catch (error) {
                console.error('Erro ao buscar dados:', error.message);
            }
        };

        fetchDados();
    }, []);



    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <StatusBar translucent={true} />
                <View style={styles.rowContent}>
                    <Text style={styles.heading}>Restaurantes</Text>
                    <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.navigate('Carrinho') }}>
                        <Ionicons name="cart-outline" size={24} color="black" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cart.length}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.recomendacoesText}>Recomendações especiais para você!!!</Text>
                
                <ScrollView style={styles.cardContainer}>
                    {recomendacoes.map(recomendacao => (
                        <RestauranteCard
                            key={recomendacao.nome}
                            name={recomendacao.nome}
                            uri={recomendacao.foto}
                            onPress={() => navigation.navigate('Produto', { recomendacao: recomendacao })}
                        />
                    ))}
                </ScrollView>

                <Text style={styles.recomendacoesText}>Lojas Parceiras!!!</Text>
                
                <ScrollView style={styles.cardContainer}>
                {Array.isArray(restaurantes) && restaurantes.map(restaurante => (
                    <RestauranteCard
                        key={restaurante.nome}
                        name={restaurante.nome}
                        uri={restaurante.foto}
                        onPress={() => navigation.navigate('TelaLoja', { lojas:restaurante })}
                    />
                ))}

                </ScrollView>

                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 15,
        marginTop: 25
    },
    heading: {
        fontWeight: "bold",
        fontSize: 32
    },
    rowContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 10
    },
    recomendacoesText: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold"
    },
    cardContainer: {
        marginTop: 15,
        marginBottom: 20,
        maxHeight: 300, // Defina uma altura máxima para limitar a altura dos ScrollView
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: -5,
        backgroundColor: '#654597',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
