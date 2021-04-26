import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacityProps, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/fabio.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plangmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    },[userName])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Ola,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image style={styles.image} source={userImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    }
})
