import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal, ToastAndroid } from "react-native";
import { useCart } from '../scripts/CartContext'

interface CarrinhoCardProps {
    id: number;
    uri: string;
    name: string;
    preco: number;
    quantidade: number;
    onPress: () => void;
}

const CarrinhoCard: React.FC<CarrinhoCardProps> = ({ id, uri, name, preco, quantidade, onPress }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const {removeItemFromCart} = useCart()

    const handleLongPress = () => {
        setModalVisible(true);
    };

    const handleDelete = () => {
        removeItemFromCart(id);
        ToastAndroid.show('Item excluído!', ToastAndroid.SHORT)
        setModalVisible(false); 
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={handleLongPress}>
            <View style={styles.infos}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text>{name}</Text>
            </View>
            <View style={styles.columnContainer}>
                <Text>R$ {preco}</Text>
                <Text>Quantidade: {quantidade}</Text>
            </View>

            {/* Modal de Confirmação */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tem certeza que deseja excluir este item?</Text>
                        <TouchableOpacity
                            style={[styles.modalOption, { backgroundColor: 'red' }]}
                            onPress={handleDelete}
                        >
                            <Text style={styles.modalOptionText}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalOption, { backgroundColor: 'gray' }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalOptionText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginRight: 10,
    },
    columnContainer: {
        flexDirection: "column",
        alignItems: "flex-end"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalOption: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 18,
        color: 'white',
    },
});

export default CarrinhoCard;
