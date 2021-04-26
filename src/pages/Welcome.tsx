import React, { useEffect, useState } from 'react'
import { View, 
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions,
    SafeAreaView
} from 'react-native'
import {Feather} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import watering from '../assets/watering.png';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
    const navigation = useNavigation();

    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plangmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    },[userName])

    function handleStart() {
        if (userName != '') {
            navigation.navigate('PlantSelect')
        } else {
            navigation.navigate('UserIdentification')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'} suas plantas de {'\n'} forma fácil
                </Text>
                <Image 
                    source={watering} 
                    style={styles.image}
                    resizeMode='contain' 
                />
                <Text  style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. 
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity  
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather name='chevron-right' style={styles.buttonIcon}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle: {
        fontSize: 18,
        paddingHorizontal: 20,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.text,
    },
    image: {
        width: Dimensions.get('window').width * 0.7,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32
    }
})
