import React, { useState } from 'react'
import { View, 
    Text, 
    StyleSheet,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native'


import {Button} from '../components/Button'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { useNavigation } from '@react-navigation/native'

export function Confirmation() {

    const navigation = useNavigation();

    function handleSubmit() {
        navigation.navigate('PlantSelect')
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                😀
                </Text>
                <Text style={styles.title}>
                    Prontinho
                </Text>
                <Text style={styles.subtitle}>
                    Vamos começar a cuidar das suas plantinhas com muito cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button title='Começar' 
                        onPress={handleSubmit} 
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30

    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        paddingVertical: 20
    },
    footer: {
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 75,
    }
})