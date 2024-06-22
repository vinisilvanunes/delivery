import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProdutoScreen = ({ route, navigation }) => {
    
    const { recomendacao } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{recomendacao.nome}</Text>
            </View>
            <View style={styles.content}>
                <Image
                    source={{ uri: recomendacao.foto }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.description}>descrição: {recomendacao.descricao}</Text>
                <Text style={styles.info}>preço: {recomendacao.preco}</Text>
                <Text style={styles.info}>quantidade: {recomendacao.quantidade}</Text>
                <Text style={styles.info}>tags: {recomendacao.tags}</Text>

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
});

export default ProdutoScreen;
