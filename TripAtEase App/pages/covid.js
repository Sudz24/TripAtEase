/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component} from 'react';
import ChatBot from 'react-native-chatbot';
import CustomerSupport from '../components/customerSupport';

import { Text, View, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, ActivityIndicator, Alert, Linking} from 'react-native';
import Precautions from '../components/precautions';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';

const Waivers = () => {

    return (
        <View style={{ borderRadius:10, justifyContent:'center', backgroundColor:'white', marginTop:-10}}>
            <Text style={{ textAlign:'center', padding: 10}}
             onPress={() => Linking.openURL('https://www.makemytrip.com/support/covid-19.php?open=outside&cmp=myraChat')}>
                You can read about the latest updates on cancellation/date change waivers and general Corona virus travel advisory by tapping this card.
            </Text> 
        </View>
    )

}

export default class Covid extends Component {

    constructor(props){

        super(props);

        this.state= {
            name : "",
            loading: true
        }

    }

    async componentDidMount() {

        const name = await AsyncStorage.getItem('name');
        this.setState({
            "name" : name,
            "loading" : false
        });
    }

    render() {

        const steps = [
            {
              id: '0',
              message: 'Hey, '+ this.state.name + '! What info would you like to know related to COVID-19?',
              trigger: 'menu',
            },
            {
              id: 'end',
              options: [
                { value: '0', label: 'Thank you! I am done.', trigger: 'exit' },
                { value: '1', label: 'Go back to the menu!', trigger: 'menu' },
              ],
            },
            {
                id: 'exit',
                message: 'Thank you for using our service!',
                trigger: 'restart'
            },
            {
                id: '2',
                message: 'Under construction!',
                end: true
            },
            {
                id: 'menu',
              options: [
                { value: '0', label: 'Precautions', trigger: 'precautionsLoading' },
                { value: '1', label: 'Info on waivers and travel advisory', trigger: 'waiversLoading' },
                { value: '3', label: 'Contact customer support', trigger: 'customerSupportLoading' }
              
              ],
            },
            {
                id: 'precautionsLoading',
                message: ({ previousValue, steps }) => 'Here you go...',
                trigger: 'precautions'
                
            },
            {
                id: 'precautions',
                component: <Precautions/>,
                trigger: 'end'
            },
            {
                id: 'waiversLoading',
                message: ({ previousValue, steps }) => 'Here you go...',
                trigger: 'waivers'
                
            },
            {
                id: 'waivers',
                component: <Waivers/>,
                trigger: 'end'
            },
            {
                id: 'customerSupportLoading',
                message: ({ previousValue, steps }) => 'Here you go...',
                trigger: 'customerSupport'
                
            },
            {
                id: 'customerSupport',
                component: <CustomerSupport/>,
                trigger: 'end'
            },
            {
                id: 'restart',
                options: [
                  { value: '0', label: 'Show me the menu again!', trigger: 'menu' },
                ]
            },
          ];
    
        return (
            <View style={{paddingTop:15 }}>

                {/* <Image source={require('../assets/travel.jpg')}
                    style={{width: 110, height: 110}} />


                <Text>
                    Travel
                </Text> */}

                { this.state.name ? <ChatBot steps={steps} style={{ background: 'white'}} botBubbleColor='#006bad' optionBubbleColor='white' optionElementStyle={{  borderRadius: 15, borderColor: 'rgba(0,107,173,0.4)', borderWidth: 1, margin:2 }}
                 optionFontColor='rgba(0,107,173,1)' 
                 userBubbleStyle = {{
                         borderColor: 'rgba(0,107,173,0.1)', borderWidth:1 ,
                        backgroundColor:'#fff'
                 }}
                 customStyle= {{

                    backgroundColor:'rgba(0,0,0,0)',
                    marginLeft:30,
                    borderColor: 'rgba(0,0,0,0)',
                     
                 }}
                 userFontColor='rgba(0,107,173,1)'
                /> : null }
            </View>
        );
    }
}


