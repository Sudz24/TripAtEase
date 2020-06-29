
import React, { Component} from 'react';

import { Text, View, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, ActivityIndicator, Alert, Linking} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UpcomingBookings extends Component {


    constructor(props){

        super(props);
        this.state = {
            loading: true,
            name: "",
            response: []
        }

    }

    async componentDidMount() {

        const name = await AsyncStorage.getItem('name');

        var payload = { "username" : name};

        try {
            let response = await fetch("http://viomo-env.eba-chmgvvyz.us-east-1.elasticbeanstalk.com/getUserJourneys",
            {
              method: 'POST',
              headers: {
                Accept: "application/json", 
               "Content-Type": "text/html, application/json"
              },
              body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log(result['data']);

            this.setState({ "response" : result['data'],
                "loading" : false}); 
            
        }

        catch (error) {
          console.log(error);
        }

    }


    render() {

    return (

        <View style={{ marginLeft:-25}}>

            { this.state.loading && <View style={{marginLeft:-25}}>
                <Text style={{ textAlign:'center', paddingBottom:20, color:'#006bad'}}>
                    Fetching results....
                </Text>
                <ActivityIndicator size="small" />
            </View> }

            { !this.state.loading && <View>

                <Text style={{ textAlign:'center', marginHorizontal:30, fontSize:15, fontWeight:'bold', color:'#006bad', marginBottom:10}}>
                        Your upcoming bookings
                </Text>

            { this.state.response.map((item) => {
                    return(
                        <View style={{ borderRadius:0, margin:10, alignItems:'center', justifyContent:'center', borderBottomColor:'rgba(0,107,173,0.2)', borderBottomWidth:1, paddingBottom:20}}>

                            <View style={{ paddingBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginLeft:0}}>
                            
                            { item.mode == 'Flight' ? <Image source={require('../assets/plane.png')}
                            style={{width: 25, height:25}}
                            /> : <Image source={require('../assets/train.png')}
                            style={{width: 25, height:25}}  
                            /> }

                                <Text style={{ marginLeft:5, color:'#006bad', fontWeight:"bold", flexShrink:1}}>
                                    { " " +  item.company }
                                </Text>
                            </View>

                            <View style={{ justifyContent:'flex-start', alignItems:'center', paddingLeft:0}}>

                                <View style={{ justifyContent : 'center', flexDirection:'row', alignItems:'center', paddingBottom:10}}> 
                                    <Text style={{ paddingRight:10}}>
                                        { item.fromCity.substr(0, item.fromCity.indexOf(' ')) }
                                    </Text>
                                    <Ionicons name={'md-arrow-forward'} size={18} color={'#000'} />
                                    <Text style={{ paddingLeft:10}}>
                                        { item.toCity.substr(0, item.toCity.indexOf(' ')) }
                                    </Text>
                                </View>

                                <View style={{ justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                                    <Text style={{ padding:5, fontSize:12}}>
                                        (D)
                                    </Text>
                                        <Text style={{ backgroundColor:'#6b6b6b', borderRadius:5, paddingHorizontal:20, paddingVertical:3, color:'white', fontSize:12}}>
                                            {item.dateDep}
                                        </Text> 
                                        <Text style={{ backgroundColor:'#fff', borderRadius:5, paddingHorizontal:20, color:'#000', fontSize:12, marginHorizontal:10, paddingVertical:3}}>
                                            {item.timeDep}
                                        </Text>
                                </View>

                                <View style={{ justifyContent:'center', alignItems:'center', flexDirection:'row', marginTop:10}}>
                                    <Text style={{ padding:5, fontSize:12}}>
                                        (A)
                                    </Text>
                                    <Text style={{ backgroundColor:'#6b6b6b', borderRadius:5, paddingHorizontal:20, paddingVertical:3, color:'white', fontSize:12}}>
                                            {item.dateArr}
                                        </Text> 
                                        <Text style={{ backgroundColor:'#fff', borderRadius:5, paddingHorizontal:20, color:'#000', fontSize:12, marginHorizontal:10, paddingVertical:3}}>
                                            {item.timeArr}
                                        </Text>
                                </View>

                            </View>
                        </View>
                    );
                })
            } 

            { !this.state.loading && this.state.response == '' && <View>
                <Text style={{ textAlign:'center', marginTop:10}}>
                    Nothing to display!
                </Text>
            </View> }
            </View> }

        </View>

    )}
}