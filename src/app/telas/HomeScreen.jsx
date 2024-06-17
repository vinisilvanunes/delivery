import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RestauranteCard from "../../../components/RestauranteCard";
import { useCart } from '../../../scripts/CartContext';

export default function Restaurantes({ navigation }) {
    const { cart } = useCart();
    const [restaurantes, setRestaurantes] = useState([]);

    useEffect(() => {
        const fetchRestaurantes = async () => {
            try {
                const response = await fetch('https://backend5semestre.onrender.com/store');
                if (!response.ok) {
                    throw new Error('Erro ao buscar restaurantes');
                }
                const data = await response.json();
                setRestaurantes(data);
            } catch (error) {
                console.error('Erro ao buscar restaurantes:', error.message);
            }
        };

        fetchRestaurantes();
    }, []);

    return (
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
            <Text>Escolha seu restaurante preferido.</Text>
            <ScrollView style={styles.restauranteContainer}>
                {restaurantes.map(restaurante => (
                    <RestauranteCard
                    key={restaurante._id}
                    name={restaurante.nome}
                    uri={restaurante.foto}
                    onPress={() => navigation.navigate('Restaurante', { restaurante })}
                />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
    restauranteContainer: {
        marginTop: 15
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
        color: 'white', // Cor do texto dentro do círculo
        fontSize: 12,
        fontWeight: 'bold',
    },
});
