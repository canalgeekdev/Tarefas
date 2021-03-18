import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Card({ data, onChildMarkComplete, onChildDelete }) {

    const [done, setDone] = useState(data.status);
    const [task, setTask] = useState(data);

    function handleMarkTask() {
        setDone(!done);
        onChildMarkComplete(data.id, data.description, !done);
    }

    function handleDeleteTask(event) {
        onChildDelete(data.id);
    }

    return (

        <View style={styles.cardItem}>

            <FontAwesome
                name="tasks"
                size={25}
                color="#3498db"
            />

            <View style={styles.cardBody}>
                <Text style={styles.cardText}>{task.description}</Text>
            </View>

            <View style={{flexDirection: 'row' }}>

                {/* <TouchableOpacity
                    onPress={ () => handleMarkTask()}
                >
                        <MaterialCommunityIcons
                            name={ done ? "checkbox-marked" : "checkbox-blank-outline" }
                            size={30}
                            color={ done ? "#c0392b" : "#3498db" }
                        />
                </TouchableOpacity> */}

                <TouchableOpacity
                    onPress={ () => handleDeleteTask()}
                >
                        <FontAwesome5 
                            name="trash-alt"
                            size={30}
                            color="#8e44ad"
                        />
                    </TouchableOpacity>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    cardItem: {
        height: 60,
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
    },
    cardBody: {
        width: '80%',
    },
    cardText: {
        fontSize: 14,
        color: '#7f8c8d',
    }

});