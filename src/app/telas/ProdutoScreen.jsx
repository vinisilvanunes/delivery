import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, Image, Button, ToastAndroid, ScrollView, ActivityIndicator } from "react-native";
import SimpleStepper from 'react-native-simple-stepper';
import { useCart } from "../../../scripts/CartContext";

export default function ProdutoScreen({ route, navigation }) {
    const { produto } = route.params;
    const { addItemToCart } = useCart();
    const { cart } = useCart();
    const [quantidade, setQuantidade] = useState(0);
    const [stepperKey, setStepperKey] = useState(Date.now());
    const [loading, setLoading] = useState(true);
    const [produtoDetalhes, setProdutoDetalhes] = useState(null); // Estado para armazenar os detalhes do produto

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await fetch(`https://backend5semestre.onrender.com/product/${produto._id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar produto');
                }
                const data = await response.json();
                

                setProdutoDetalhes(data.nome);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
                setLoading(false);
            }
        };

        fetchProduto();
    }, [produto]);

    const handleAddToCart = () => {
        if (quantidade > 0) {
            addItemToCart({ ...produtoDetalhes, quantidade });
            ToastAndroid.show('Produto adicionado no carrinho!', ToastAndroid.SHORT);
            setStepperKey(Date.now());
            setQuantidade(0);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#654597" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.rowContent}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.navigate("Carrinho") }}>
                    <Ionicons name="cart-outline" size={24} color="black" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cart.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}> 
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: produtoDetalhes.foto }}
                        style={styles.image}
                        resizeMode="cover"
                    /> 
                </View>
                <View>
                    <Text style={styles.headling}>{produtoDetalhes.nome}</Text>
                </View>
                <View>
                    <Text>{produtoDetalhes.description}</Text>
                </View>
                <View style={styles.rowContent}>
                    <Text style={styles.price}>R$ {produtoDetalhes.preco}</Text>
                    <SimpleStepper
                        key={stepperKey}
                        minimumValue={0}
                        maximumValue={10}
                        stepValue={1}
                        value={quantidade}
                        valueChanged={(value) => setQuantidade(value)}
                        showText={true}
                        containerStyle={styles.stepperContainer}
                        incrementStepStyle={styles.buttonStep}
                        decrementStepStyle={styles.buttonStep}
                        textStyle={styles.stepperValueText}
                    />
                </View>
            </ScrollView>
            <View style={styles.bottomButtonContainer}>
                <Button
                    style={styles.btn}
                    title="Adicionar ao carrinho"
                    color="#654597"
                    onPress={handleAddToCart}
                    disabled={quantidade < 1}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 15,
        marginTop: 10
    },
    imageContainer: {
        alignItems: "center"
    },
    image: {
        width: 350,
        height: 350,
        objectFit: "contain"
    },
    headling: {
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
    price: {
        fontWeight: "bold",
        fontSize: 24
    },
    stepperContainer: {
        width: 100,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
        borderWidth: 1,
        borderBlockColor: "#A99985",
        borderRadius: 5
    },
    buttonStep: {
        backgroundColor: 'none',
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepperValueText: {
        fontSize: 15
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
    scrollContainer: {
        paddingBottom: 100, // Espaço extra para evitar que o botão sobreponha o conteúdo
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20, // Ajuste conforme necessário
        width: '100%', // Garante que ocupa toda a largura
        alignItems: 'center',
        paddingVertical: 10, // Espaço vertical interno
    },
    btn: {
        width: 200, // Largura do botão conforme necessário
    },
});
