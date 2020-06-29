/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component} from 'react';
import ChatBot from 'react-native-chatbot';
import {NavigationActions, SwitchActions} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, ActivityIndicator, Alert, Linking} from 'react-native';
import CustomerSupport from '../components/customerSupport';
import LinearGradient from 'react-native-linear-gradient';
import  { ChooseCities } from '../components/newBooking';
import  DisplayJourneys from '../components/newBooking';
import UpcomingBookings from '../components/upcomingBookings';

import AsyncStorage from '@react-native-community/async-storage';


const BestDestinationsWorld = () => {
    return (
        <View style={{ marginHorizontal: 10, marginTop:-10, justifyContent:'center'}}>
            
            <View style={{ borderRadius:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                <View>
                    <Image source={{ uri : 'https://cdn.travelpulse.com/images/59abedf4-a957-df11-b491-006073e71405/6849c6fe-848b-4727-923c-763f642fa5ee/630x355.jpg'}}
                        style={{ height: 100, width: 100, borderRadius:5 }}/>
                </View>

                <View style={{ justifyContent:'center', flex:1, alignItems:'center', paddingLeft:10}}>
                    <Text style={{ fontWeight:'bold', textAlign:'center', color:'#006bad'}}>
                        Salzburg, Austria
                    </Text>
                    <Text style={{ padding:5, textAlign:'justify'}}>
                    One of the world’s greatest classical music shindigs, the Salzburg festival is always a riotous feast of opera, classical music and drama!
                    </Text>
                </View>

            </View>

            <View style={{ borderRadius:10, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>

                <View>
                    <Image source={{ uri : 'https://lonelyplanetstatic.imgix.net/marketing/2020/BIT/cities/Washington_DC_shutterstockRF_1063696139.jpg?q=72&sharp=10&w=1330&vib=20'}}
                        style={{ height: 100, width: 100, borderRadius:5 }}/>
                </View>

                <View style={{ justifyContent:'center', flex:1, alignItems:'center', paddingLeft:10}}>
                    <Text style={{ fontWeight:'bold', textAlign:'center', color:'#006bad'}}>
                        Washington DC, USA
                    </Text>
                    <Text style={{ padding:5, textAlign:'justify'}}>
                        Washington’s renaissance is in always a full bloom, with a revitalised waterfront, celebrated new museums and an exploding food scene.
                    </Text>
                </View>

            </View>

            <TouchableOpacity style={{ marginTop:10, alignItems:'center', justifyContent:'center', backgroundColor:'#006bad', padding:5, marginHorizontal:30, borderRadius:20}}
                onPress={() => Linking.openURL('https://www.lonelyplanet.com/best-in-travel/cities')} >
                <Text style={{ color:'#fff'}}>
                    View More
                </Text>
            </TouchableOpacity>
        </View>

    )
}


const BestDestinationsIndia = () => {

    return (
        <View style={{ marginLeft: 10, marginTop:-10, justifyContent:'center'}}>
            
            <View style={{ borderRadius:10, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                <View>
                    <Image source={{ uri : 'https://k6u8v6y8.stackpathcdn.com/blog/wp-content/uploads/2016/03/pangaong-lake.jpg'}}
                        style={{ height: 110, width: 100, borderRadius:5 }}/>
                </View>

                <View style={{ justifyContent:'center', flex:1, alignItems:'center', paddingLeft:10}}>
                    <Text style={{ fontWeight:'bold', textAlign:'center', color:'#006bad'}}>
                        Leh, Ladakh
                    </Text>
                    <Text style={{ padding:5, textAlign:'justify'}}>
                    The land of majestic snowy mountains, serene alpine glacial lakes, enchanting valleys and ancient colourful Buddhist monasteries, Leh-Ladakh is one of the ‘must-visit’ destinations in India.
                    </Text>
                </View>

            </View>

            <View style={{ borderRadius:10, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>

                <View>
                    <Image source={{ uri : 'https://k6u8v6y8.stackpathcdn.com/blog/wp-content/uploads/2016/03/humayun-tomb-delhi.jpg'}}
                        style={{ height: 110, width: 100, borderRadius:5 }}/>
                </View>

                <View style={{ justifyContent:'center', flex:1, alignItems:'center', paddingLeft:10}}>
                    <Text style={{ fontWeight:'bold', textAlign:'center', color:'#006bad'}}>
                        New Delhi
                    </Text>
                    <Text style={{ padding:5, textAlign:'justify'}}>
                    A city of heritage monuments, teeming bazaars and mouth-watering street food reminding you of its rich past from the Mughal era to a city that is today, more cosmopolitan and contemporary!
                    </Text>
                </View>

            </View>

            <TouchableOpacity style={{ marginTop:10, justifyContent:'center', alignItems:'center', backgroundColor:'#006bad', padding:5, marginHorizontal:30, borderRadius:25}}
                onPress={() => Linking.openURL('https://www.tourmyindia.com/blog/top-places-in-india-that-every-tourist-must-visit/')} >
                <Text style={{ color:'#fff'}}>
                    View More
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default class Travel extends Component {

    constructor(props){

        super(props);
        this.state = {
            fromCity : "",
            toCity: "",
            mode: "",
            loading: true,
            name: ""
        }

    }

    async componentDidMount() {

        const name = await AsyncStorage.getItem('name');
        this.setState({
            "name" : name,
            "loading" : false
        })  
        
    }

    async performLogout() {

        await AsyncStorage.setItem('name', '');
        this.props.navigation.replace('Login');
        
    }

    render() {

        console.disableYellowBox = true;

            const steps = [
            {
              id: '0',
              message: 'Hey, ' +  this.state.name +  '! What would you like to do?',
              trigger: 'menu',
            },
            {
                id: 'menu',
              options: [
                { value: '0', label: 'Show my upcoming bookings', trigger: 'upcomingBookings' },
                { value: '1', label: 'Make a new booking', trigger: 'chooseCities' },
                { value: '2', label: 'Suggest best destinations', trigger: 'bestDestinationsChoice' },
                { value: '3', label: 'Contact customer support', trigger: 'customerSupportLoading' },
                { value: '4', label: 'Log me out', trigger: 'logout' }
              ],
            },
            {
                id: 'bestDestinationsChoice',
                options: [
                    { value: '0', label: 'In India', trigger: 'bestDestinationsLoading' },
                    { value: '1', label: 'Outside India', trigger: 'bestDestinationsLoading' }
                  ]
            },
            {
                id: 'bestDestinationsLoading',
                message: ({ previousValue, steps }) => 'Let me get that for you..',
                trigger: ({ value, steps }) => {

                    console.log(steps['bestDestinationsChoice']['value']);
                    
                    if(steps['bestDestinationsChoice']['value'] == 0)
                        return 'bestDestinationsIndia';
                    else
                        return 'bestDestinationsWorld'
                }
                
            },
            {
                id: 'customerSupportLoading',
                message: ({ previousValue, steps }) => 'Here you go...',
                trigger: 'customerSupport'
                
            },
            {
                id: '2',
                message: ({ previousValue, steps }) => 'Under construction!',
                end: true
            },
            {
                id: 'upcomingBookings',
                component: <UpcomingBookings/>,
                trigger: 'seePrecautions'
            },
            {
                id: 'bestDestinationsIndia',
                component: <BestDestinationsIndia/>,
                trigger: 'end'
            },
            {
                id: 'customerSupport',
                component: <CustomerSupport/>,
                trigger: 'end'
            },
            {
                id: 'bestDestinationsWorld',
                component: <BestDestinationsWorld/>,
                trigger: 'end'
            },
            {
                id: 'chooseCities',
                replace: true,
                component: <ChooseCities/>,
                waitAction: true
            },
            {
                id: 'chooseModesLoading',
                message: ({ previousValue, steps }) => {
                    this.setState({
                        "fromCity" : previousValue['fromCity'],
                        "toCity": previousValue['toCity']
                    });
                    return 'Choose your mode of transport' },
                
                trigger: "chooseModes"
            },
            {
                id: 'chooseModes',
                metadata: {
                    "fromCity" : "rgrt",
                    "toCity" :  this.state.toCity 
                },
                options: [
                    { value: 'Flight', label: 'Flights', trigger: ()=> {
                        this.setState({
                            "mode" : 'Flight'
                        });
                        return 'chooseTravel'
                    } },
                    { value: 'Train', label: 'Trains', trigger: ()=> {
                        this.setState({
                            "mode" : 'Train'
                        });
                        return 'chooseTravel'
                    }  },
                    { value: 'Any', label: 'Any', trigger: ()=> {
                        this.setState({
                            "mode" : 'Any'
                        });
                        console.log(this.state.toCity);
                        return 'chooseTravel'
                    }  },
                  ],
                  waitAction: true
            },
            {
                id: 'chooseTravel',
                replace: true,
                component: <DisplayJourneys/>,
                waitAction: true
                
            },
            {    
                id: 'bookingResults',
                message: ({ previousValue, steps }) => {
                return 'Your journey from ' + previousValue['fromCity'] + ' to ' + previousValue['toCity'] + ' has been booked! Lets look at your upcoming journeys!' },
                trigger: 'upcomingBookings'
        },
            {
                id: 'logout',
                delay:1000,
                message: () => {

                    setTimeout(()=>{this.performLogout();}, 2000); 
                    
                    return 'Bye '+ this.state.name +'!' + ' I am logging you out...' },
                end: true
            },
            {
                id: 'seePrecautions',
                message: 'Travel safe! You can go through the precautions from the COVID-19 Section for more info!',
                trigger:'end'
            },
            {
                id: 'noBookingMade',
                message: 'Oh no! Okay',
                trigger:'end'
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
                id: 'restart',
                options: [
                  { value: '0', label: 'Show me the menu again!', trigger: 'menu' },
                ]
            },
          ];

    
        return (
             <View style={{ paddingTop:15}}>

            { this.state.name ? <View>
                <ChatBot steps={steps} style={{ background: 'white'}} botBubbleColor='#006bad' optionBubbleColor='white' optionElementStyle={{  borderRadius: 15, borderColor: 'rgba(0,107,173,0.4)', borderWidth: 1, margin:2 }}
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
                /> 

            </View> : null }

                
            </View>
        );
    }
}


