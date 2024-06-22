import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListaProdutoPorNomeDaLoja } from "../API/store/ListaProdutosPorNomeDaLoja";
import RestauranteCard from "../../../components/RestauranteCard"; // Certifique-se de que o caminho para RestauranteCard está correto

const LojaScreen = ({ route, navigation }) => {
    const { lojas } = route.params;
    const [produtos, setProdutos] = useState([]);

    const fetchProdutos = async () => {
        try {
            const dadosProdutos = await ListaProdutoPorNomeDaLoja(lojas.nome);
            setProdutos(dadosProdutos.products);
            console.log('Produtos:', dadosProdutos)
        } catch (error) {
            console.error('Erro ao buscar produtos:', error.message);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{lojas.nome}</Text>
            </View>
            <View style={styles.content}>
                <Image
                    source={{ uri: lojas.foto }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.description}>{lojas.descricao}</Text>
                <Text style={styles.info}>Endereço: {lojas.endereco}</Text>
                <Text style={styles.info}>Telefone: {lojas.telefone}</Text>


            <ScrollView style={styles.cardContainer}>
                {Array.isArray(produtos) && produtos.map(produto => (
                    <RestauranteCard
                        key={produto.nome}
                        name={produto.nome}
                        uri={produto.foto}
                        onPress={() => navigation.navigate('ProdutoScreen', { produto })}
                    />
                ))}
            </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 15,
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 15,
        borderRadius: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        marginBottom: 5,
    },
    cardContainer: {
        paddingHorizontal: 15,
        paddingTop: 20,
    },
});

export default LojaScreen;
