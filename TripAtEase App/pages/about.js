/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component} from 'react';

import { Text, View, Image, ScrollView} from 'react-native';

export default class About extends Component {

    constructor(props){

        super(props)

    }

    componentDidMount() {
    }

    render() {
    
        return (
            <View style={{ justifyContent:'center', alignItems:'center', flex:1, padding:10}}>
                <ScrollView contentContainerStyle={{alignItems:'center', justifyContent:'center', flexGrow:1}}> 
                    <Image source={require('../assets/icon.png')}
                        style={{width: 100, height: 100, alignSelf:'center'}} />

                    <Text style={{ fontWeight:'bold', marginTop:20, fontSize:16, textAlign:'center'}}>
                        ABOUT TRIP-AT-EASE
                    </Text>

                    <View style={{ margin:20}}>
                        <Text style={{ textAlign:'justify', fontSize:14, lineHeight:20}}> 
                            TripAtEase is a domestic-international tour operator and travel agency based in India. We primarily operate in the travel market, supported by pillars of punctual and convenient services. 
                            Since the first booking in 1962, TripAtEase has engaged in constant endeavour to enhance customer experience. Ranging from fast bookings, hassle free cancellations, online status checkings, a twenty four hour helpline and the TripAtEase mobile app, we provide services extending over several travel modes and companies.
                            We also improve customer interaction with our chat guide Tia (Travel Information Assistant) and its search recommendations. Over the years we continue to transform travel experiences across the country. We make your trips comfortable because we know the importance of convenient, worry-free travel.
                    </Text>
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}


