import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { Ionicons } from '@expo/vector-icons';

import Card from '../../components/Card';

export default function Home() {

    const [tasks, setTasks] = useState([]);
    const [tarefa, setTarefa] = useState('');

    async function handleChildMarkComplete(id, description, done) {
        
        let data = tasks;

        let filtered = data.filter(function (e) {
            return e.id !== id;
        });

        let newId = id;
        let dataNew = [
            ...filtered, 
            {
                id: newId.toString(),
                description: description,
                status: done ? 'true' : ''
            }
        ];

        storeData(dataNew);

    }

    function handleChildDelete(id) {

        let data = tasks;

        let filtered = data.filter(function (e) {
            return e.id != id;
        });        

        setTasks(filtered);

        storeData(filtered);

    }

    useEffect(() => {

        getData();

    },[])

    const storeData = async (data) => {
        try {
            await AsyncStorage.setItem('com.eduardodiogogarcia.tarefas', JSON.stringify(data));
        } catch (e) {
            Alert('Error','Ocorreu um erro ao tentar ler as tarefas gravadas! ' );
        }
    }

    const deleteAll = async () => {
        try {
            await AsyncStorage.removeItem('com.eduardodiogogarcia.tarefas');
        } catch (e) {
            Alert('Error','Ocorreu um erro ao tentar ler as tarefas gravadas! ' );
        }
    }

   const getData = async () => {

        try {
          const value = await AsyncStorage.getItem('com.eduardodiogogarcia.tarefas');
          if(value !== null) {
            setTasks( JSON.parse(value) );
          }
        } catch(e) {
          Alert('Error','Ocorreu um erro ao tentar ler as tarefas gravadas! ' );
        }

    }

    async function handleAddTarefa() {

        if(tarefa.trim() !== '') {

            let newId = tasks.length+1; 

            let data = [
                ...tasks, 
                {
                    id: newId.toString(),
                    description: tarefa,
                    status: ''
                }
            ];

            setTasks(data);

            storeData(data);

            Keyboard.dismiss();

            setTarefa(null);
        }
    }


    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" />

            <Text style={styles.titulo}>Tarefas para Hoje</Text>

            <View style={styles.cards}>

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={tasks}
                    keyExtractor={data => data.id}
                    renderItem={ ({ item }) => (

                        <Card data={item} key={item.id} onChildMarkComplete={handleChildMarkComplete} onChildDelete={handleChildDelete} />

                    )}
                />

            </View>
            
            <View style={styles.addPanel}>
                <TextInput 
                    style={styles.fieldTarefa}
                    placeholderTextColor="#2c3e50"
                    placeholder="Digite uma nova tarefa ..."
                    value={tarefa}
                    onChangeText={ (valor) => setTarefa(valor)}
                />
                <TouchableOpacity onPress={ () => handleAddTarefa()}>
                    <Ionicons
                        style={{top: 10, marginLeft: 5}}
                        name="md-add-circle-sharp"
                        size={40}
                        color="#ecf0f1"
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',        
    },
    titulo: {
        color: '#ecf0f1',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 10,
        left: 20,
    },
    cards: {
        top: 5,
        height: '80%',
        backgroundColor: '#3498db',
    },
    addPanel:{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',              
    },
    fieldTarefa: {
        marginTop: 20,
        backgroundColor: '#ecf0f1',
        color: '#2c3e50',
        width: '90%',
        height: 50,
        borderRadius: 6,
        padding: 15,
    }
})