import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../../scripts/CartContext';
import ProdutoCard from '../../../components/ProdutoCard';

export default function RestauranteScreen({ route, navigation }) {
    const { restaurante } = route.params;
    const { cart } = useCart();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true); // estado para controlar o carregamento

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch(`https://backend5semestre.onrender.com/product/listaProdutosPorLoja/${restaurante._id}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar produtos');
                }
                const data = await response.json();
                setProdutos(data.products);
                setLoading(false); // marca que os produtos foram carregados com sucesso
                
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                // Tratar o erro de forma apropriada, como exibir uma mensagem ao usuário
            }
        };

        fetchProdutos();
    }, [restaurante]);

    const renderNomeRestaurante = () => {
        if (restaurante.nome.length > 10) {
            return restaurante.nome.substring(0, 15) + '...';
        }
        return restaurante.nome;
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando produtos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.rowContent}>
                <Text style={styles.heading}>{renderNomeRestaurante()}</Text>
                <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.navigate('Carrinho') }}>
                    <Ionicons name="cart-outline" size={24} color="black" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cart.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text>{restaurante.description}</Text>
            <ScrollView style={styles.produtoContainer}>
                {produtos.map(produto => (
                    <ProdutoCard
                        key={produto._id}
                        name={produto.nome}
                        uri={produto.foto}
                        preco={produto.preco}
                        onPress={() => navigation.navigate('Produto', { produto })}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 15,
        marginTop: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 32
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    produtoContainer: {
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
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
