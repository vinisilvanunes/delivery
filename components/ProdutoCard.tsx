import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProdutoCardProps {
    uri: string;
    name: string;
    preco: number;
    onPress: () => void;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ uri, name, preco,onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.infos}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text>{name}</Text>
            </View>
            <View style={styles.columnContainer}>
                <Ionicons name="arrow-forward" size={24} color="black" />
                <Text>R$ {preco}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        marginBottom: 10,
    },
    infos: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        objectFit: "contain"
    },
    columnContainer:{
        flexDirection: "column",
        alignItems: "flex-end"
    }
});

export default ProdutoCard;
