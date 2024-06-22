import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importa o ImagePicker do Expo
import { ChamadadosUsuario } from '../API/user/chamaDadosPessoais';

const initialUser = {
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    endereco: '', 
    telefone: '', 
    profilePicture: 'https://example.com/path/to/profile-picture.jpg'
};
export default function PerfilScreen() {

    const [user, setUser] = useState(initialUser);


    const DadosUsuario = async () => {
        try {
            const response = await ChamadadosUsuario("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbHRvbkBnbWFpbC5jb20iLCJpZCI6IjY2NzM5MTIxMGY2M2RlZGM0MDIyNmNjNCIsImlhdCI6MTcxOTAyNDI2OSwiZXhwIjoxNzE5MTEwNjY5fQ.5wPOo3Yz144saBdmaqdT8D-m9DiqBcUgq67V8zNo96M");
            setUser(response.usuario);
            console.log('response', response)
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    }

    useEffect(() => {
        DadosUsuario()
       
    }, []);

    const handleChangeName = (text) => {
        setUser({ ...user, nome: text });
    };

    const handleChangeFoto = (text) => {
        setUser({ ...user, foto: text });
    };

    const handleChangeEmail = (text) => {
        setUser({ ...user, email: text });
    };

    const handleChangeAddress = (text) => {
        setUser({ ...user, endereco: text });
    };

    const handleChangePhone = (text) => {
        setUser({ ...user, telefone: text });
    };

    const handleChoosePhoto = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert('Permissão negada', 'É necessário permitir o acesso à galeria para escolher uma foto.');
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if (!pickerResult.cancelled) {
                console.log('Foto escolhida:', pickerResult);

                setUser({ ...user, foto: pickerResult.assets[0].uri });
            }
        } catch (error) {
            console.error('Erro ao escolher a foto:', error);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={handleChoosePhoto}>
                <Image source={{ uri: user.foto }} style={styles.profilePicture} />
            </TouchableOpacity>

            <Text style={styles.header}>Perfil do Usuário</Text>
            
            <View style={styles.userInfo}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    value={user.nome}
                    onChangeText={handleChangeName}
                    placeholder="Digite seu nome"
                />
            </View>
            
            <View style={styles.userInfo}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={user.email}
                    onChangeText={handleChangeEmail}
                    placeholder="Digite seu email"
                />
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Endereço:</Text>
                <TextInput
                    style={styles.input}
                    value={user.endereco}
                    onChangeText={handleChangeAddress}
                    placeholder="Digite seu endereço"
                />
            </View>
            
            <View style={styles.userInfo}>
                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                    style={styles.input}
                    value={user.telefone}
                    onChangeText={handleChangePhone}
                    placeholder="Digite seu telefone"
                    keyboardType="phone-pad"
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Salvar dados')}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 24
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
        width: 120 // Aumenta a largura para acomodar rótulos mais longos
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 8
    },
    saveButton: {
        marginTop: 16,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
