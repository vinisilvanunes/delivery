import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Button, Modal } from 'react-native';
import CarrinhoCard from '../../../components/CarrinhoCard';
import { useCart } from '../../../scripts/CartContext';
import { ScrollView } from 'react-native-gesture-handler';

export default function CarrinhoScreen({ navigation }) {
  const { cart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const formatarMoeda = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
  };

  const total = calcularTotal();

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <View style={styles.rowContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.navigate('Carrinho') }}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {cart.length > 0 ? (
        <View style={styles.flex}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {cart.map((item, index) => (
              <CarrinhoCard
                key={item.id}
                id={item.id}
                uri={item.footo}
                name={item.nome}
                preco={item.preco}
                quantidade={item.quantidade}
              />
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: {formatarMoeda(total)}</Text>
            </View>
          </ScrollView>
          <View style={styles.bottomButtonContainer}>
            <Button
              title='Finalizar compra'
              color="#654597"
              style={styles.btn}
              onPress={() => setModalVisible(true)}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.modalText}>Deseja finalizar a compra no valor de</Text>
                  <Text style={styles.modalText}>{formatarMoeda(total)}?</Text>
                </View>
                <TouchableOpacity
                  style={[styles.modalOption, { backgroundColor: '#654597' }]}
                  onPress={() => { navigation.navigate('Compra', {total: total}); setModalVisible(false); }}
                >
                  <Text style={styles.modalOptionText}>Finalizar</Text>
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
        </View>
      ) : (
        <Text style={styles.emptyCartText}>Carrinho vazio</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 25
  },
  flex: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    marginVertical: 8
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10
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
    paddingBottom: 100, // Espaço extra para o botão não cobrir o conteúdo
  },
  bottomButtonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  btn: {
    width: '100%',
  },
  totalContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
