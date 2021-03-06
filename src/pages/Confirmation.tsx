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
import { useNavigation, useRoute } from '@react-navigation/native'

interface Params {
    title: string
    subtitle: string
    buttonTitle: string
    icon: 'smile' | 'hug'
    nextScreen: string
}

const emojis = {
    hug: '🤗',
    smile: '😃'
}

export function Confirmation() {

    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleSubmit() {
        navigation.navigate(nextScreen)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button title={buttonTitle}
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