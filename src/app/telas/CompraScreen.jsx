import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../../scripts/CartContext';

export default function CompraScreen({ route, navigation }) {
    const { total } = route.params;
    const { clearCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [address, setAddress] = useState("");

    const handlePaymentOption = (option) => {
        setSelectedPayment(option);
    };

    const finalizePurchase = () => {
        if (selectedPayment && address) {
            Alert.alert("Pagamento", `Pagamento finalizado com sucesso, seu pedido será entrege em: ${address}`);
            clearCart();
            navigation.navigate('Home');
        } else {
            Alert.alert("Informações Incompletas", "Por favor, selecione uma forma de pagamento e insira seu endereço para continuar.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Finalização de Compra</Text>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total a Pagar: R$ {total.toFixed(2)}</Text>
            </View>
            <View style={styles.addressContainer}>
                <Text style={styles.addressLabel}>Endereço de Entrega:</Text>
                <TextInput
                    style={styles.addressInput}
                    placeholder="Digite seu endereço"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>
            <View style={styles.paymentOptionsContainer}>
                <Text style={styles.paymentOptionsText}>Escolha a forma de pagamento:</Text>
                {['Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Ticket'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={styles.paymentOption}
                        onPress={() => handlePaymentOption(option)}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPayment === option && <View style={styles.selectedRb} />}
                        </View>
                        <Text style={styles.radioText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={[styles.paymentButton, selectedPayment && address ? {} : styles.paymentButtonDisabled]}
                    onPress={finalizePurchase}
                    disabled={!selectedPayment || !address}
                >
                    <Text style={styles.paymentButtonText}>Finalizar Compra</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    headerText: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    totalContainer: {
        marginBottom: 20,
        alignItems: 'center'
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    addressContainer: {
        marginBottom: 20
    },
    addressLabel: {
        fontSize: 18,
        marginBottom: 10
    },
    addressInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16
    },
    paymentOptionsContainer: {
        flex: 1,
    },
    paymentOptionsText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#654597',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    selectedRb: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#654597',
    },
    radioText: {
        fontSize: 16,
        color: '#000'
    },
    bottomButtonContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    paymentButton: {
        backgroundColor: '#654597',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    paymentButtonDisabled: {
        backgroundColor: '#d3d3d3', // Cor para indicar que o botão está desabilitado
    },
    paymentButtonText: {
        color: 'white',
        fontSize: 18
    }
});
