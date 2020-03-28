import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking, ScrollView} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import styles from './styles';

import logoImg from '../../../src/assets/logo.png';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso da "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }
    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsApp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={navigateBack}>
                    <Feather name="arrow-left" size={16} color="#E02041" />
                </TouchableOpacity>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}>
            <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>
                        {incident.name} ({incident.city}/{incident.uf})
                    </Text>
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}> 
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency', 
                            currency: 'BRL'
                        }).format(incident.value)}
                    </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>
                    Entre em contato:
                </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>
                            WhatsApp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    );
}