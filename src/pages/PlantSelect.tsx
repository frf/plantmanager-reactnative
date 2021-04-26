import React, { useEffect, useState } from 'react'
import { 
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';

import api from '../services/api'

import { Header } from '../components/Header'
import { EnvironmentButton } from '../components/EnvironmentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage';

interface EnvironmentProps {
    key: string
    title: string
}

export function PlantSelect() {

    const navigation = useNavigation();
    
    const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    function handleEnvironmentSelected(environment: string) {
        setEnviromentSelected(environment);

        console.log(environment);

        if (environment == 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant => {
            console.log('==>',environment)
            return plant.environments.includes(environment)
        });

        console.log(filtered);
        setFilteredPlants(filtered)
    }

    async function fetchPlants() {
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page${page}&_limit=18`);

        if (!data)
            return setLoading(true)

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data)
            setFilteredPlants(data)
        }
       
        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps) {
        console.log('select', plant)
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironment([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ... data
            ])
        }

        fetchEnvironment();
    }, []);


    useEffect(() => {
        fetchPlants();
    }, []);

    if (loading)
        return <Load />

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual hambiente </Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>

            <View>
                <FlatList
                    data={environment}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({item}) => (
                        <EnvironmentButton
                            title={item.title}
                            active={item.key == environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                        data={filteredPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => (
                            <PlantCardPrimary
                             data={item}
                             onPress={() => handlePlantSelect(item)}
                              />
                        )}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.1}
                        onEndReached={({distanceFromEnd}) => 
                            handleFetchMore(distanceFromEnd)
                        }
                        ListFooterComponent={
                            loadingMore 
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                        } 
                    />
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})