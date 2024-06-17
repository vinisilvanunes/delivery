import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RestauranteCardProps {
    uri: string;
    name: string;
    onPress: () => void;
}

const RestauranteCard: React.FC<RestauranteCardProps> = ({ uri, name, onPress }) => {
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
            <View>
                <Ionicons name="arrow-forward" size={24} color="black" />
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
});

export default RestauranteCard;
