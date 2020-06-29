
import React, { Component} from 'react';

import { Text, View, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, ActivityIndicator, Alert, Linking} from 'react-native';
import {Picker} from '@react-native-community/picker';
import ChatBot from 'react-native-chatbot';

import AsyncStorage from '@react-native-community/async-storage';

export class ChooseCities extends Component {

    constructor(props){

        super(props);
        this.state = {
            fromCity : "Chennai (CHN)",
            toCity: "Hyderabad (HYD)"
        }

    }

    componentDidMount() {
       
    }

    triggerNextStep() {

        const trigger = "chooseModesLoading"

        //Error handling
        if(this.state.fromCity ==  this.state.toCity){
            Alert.alert(
                "Choose different cities!",
                "You cannot choose same cities",
                [
                  { text: "OK" }
                ],
                { cancelable: false }
              );  

              return;
        }

        this.props.triggerNextStep({ value: {"fromCity" : this.state.fromCity, "toCity": this.state.toCity}, trigger});
    }

    render() {

        return (
            <View style={{ marginLeft:-30}}>
                <Text style={{ padding:5, color:'#006bad', fontWeight:'bold'}}>
                    From city
                </Text>
                <View style={{ backgroundColor:'white', borderRadius:15}}>
                    <Picker
                    style={{}}
                    selectedValue={this.state.fromCity}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({fromCity: itemValue})
                    }
                    >
                    <Picker.Item label="Chennai" value="Chennai (CHN)" />
                    <Picker.Item label="Hyderabad" value="Hyderabad (HYD)" />
                    <Picker.Item label="Mumbai" value="Mumbai (BOM)" />
                    </Picker>
                </View>
                <Text style={{ padding:5, color:'#006bad', fontWeight:'bold'}}>
                    To city
                </Text>
                <View style={{ backgroundColor:'white', borderRadius:15}}>
                    <Picker
                    style={{}}
                    selectedValue={this.state.toCity}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({toCity: itemValue})
                    }
                    >
                    <Picker.Item label="Chennai" value="Chennai (CHN)" />
                    <Picker.Item label="Hyderabad" value="Hyderabad (HYD)" />
                    <Picker.Item label="Mumbai" value="Mumbai (BOM)" />
                    </Picker>
                </View>

                <Text style={{ borderColor:'#006bad', borderWidth:1, paddingHorizontal: 10, paddingVertical:2, textAlign:'center', color:'#006bad', marginTop:20,borderRadius:5, width:80, alignSelf:'center' }} 
                  onPress={()=> this.triggerNextStep()}>
                    Done
                </Text>
            </View>

        );
    }
}

export default class DisplayJourneys extends Component {

    constructor(props){

        super(props);
        this.state = {
            fromCity : "",
            toCity: "",
            loading: true,
            data : {},
            mode: ""
        }

    }

    async componentDidMount() {

        console.log(this.props.steps);
        this.setState({
            fromCity: this.props.steps['chooseCities']['value']['fromCity'],
            toCity: this.props.steps['chooseCities']['value']['toCity'],
            mode: this.props.steps['chooseModes']['value'],
            response: []
        });

        const name = await AsyncStorage.getItem('name');

        var payload = { "fromCity" : this.props.steps['chooseCities']['value']['fromCity'], "toCity" : this.props.steps['chooseCities']['value']['toCity'], "mode" : this.props.steps['chooseModes']['value'], "username" : name};

        console.log("Payload", payload);

          try {
            let response = await fetch("http://viomo-env.eba-chmgvvyz.us-east-1.elasticbeanstalk.com/getAllJourneys",
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

            this.setState({ "response" : result,
        "loading" : false});
        }
        catch (error) {
          console.log(error);
        }
       
    }

    async triggerNextStep (jid) {

        const trigger = "bookingResults";
        const name = await AsyncStorage.getItem('name');

        var payload = { "username" : name, "jid" : jid };

          try {
            let response = await fetch("http://viomo-env.eba-chmgvvyz.us-east-1.elasticbeanstalk.com/bookJourney",
            {
              method: 'POST',
              headers: {
                Accept: "application/json", 
               "Content-Type": "text/html, application/json"
              },
              body: JSON.stringify(payload)
            });

            console.log("Response", response);

            this.props.triggerNextStep({ value: {"fromCity" : this.state.fromCity, "toCity": this.state.toCity}, trigger});
        }
        catch (error) {
          console.log(error);
        }
        
    }

    async triggerNextStepEnd (trigger) {

        this.props.triggerNextStep({ value: {"fromCity" : this.state.fromCity, "toCity": this.state.toCity}, trigger});
        
        
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

                { !this.state.loading && this.state.response && <View>

                    <Text style={{ textAlign:'center', marginHorizontal:30, fontSize:15, fontWeight:'bold', color:'#006bad'}}>
                        { "Available Journeys from " + this.state.fromCity + " to " + this.state.toCity }
                    </Text>

                     { this.state.response['data'].map((item) => {
                        return(
                        <View style={{ backgroundColor:'#fff', color:'#000', paddingTop:10, borderRadius:10, marginTop:10, borderColor:'rgba(0,107,173,0.3)', borderWidth:0, elevation:2}}>
                            <View style={{ paddingBottom:10, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginLeft:10}}>
                            
                            { item.mode == 'Flight' ? <Image source={require('../assets/plane.png')}
                            style={{width: 25, height:25}}
                            /> : <Image source={require('../assets/train.png')}
                            style={{width: 25, height:25}}  
                            /> }

                                <Text style={{ marginLeft:5, color:'#006bad', fontWeight:"bold", flexShrink:1}}>
                                    { " " +  item.company }
                                </Text>
                            </View>
                            <View style={{ marginLeft:10}}>
                                <Text style={{fontWeight:'bold'}}>  
                                    Date & Time (Departure):  
                                </Text>
                                <Text>
                                    { item.dateDep + " " + item.timeDep}
                                </Text>
                            </View>

                            <View style={{ marginLeft:10, marginTop:10}}>
                                <Text style={{fontWeight:'bold'}}>  
                                    Date & Time (Arrival):  
                                </Text>
                                <Text>
                                    { item.dateArr + " " + item.timeArr}
                                </Text>
                            </View>

                            <Text style={{ fontWeight:'bold', marginTop:10, marginLeft:10}}>
                                { "Fare: Rs " + item.fare}
                            </Text>

                            <TouchableOpacity style={{ backgroundColor:'#006bad', marginTop: 10, borderBottomLeftRadius:10, borderBottomRightRadius:10, padding:7}}
                            onPress={()=> this.triggerNextStep(item.jid) } >
                                <Text style={{ color:'white', fontWeight:'bold', textAlign:'center',}}>
                                    Book Now
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                    )}) }

                    { !this.state.loading && this.state.response['data'] == '' && <View>
                        <Text style={{ textAlign:'center', marginTop:20}}>
                            No available journeys!
                        </Text>
                    </View> }

                    { !this.state.loading && this.state.response['data'] != '' && <TouchableOpacity style={{ marginTop:20, padding:10, borderColor:'#006bad', borderRadius:10, borderWidth:1, alignSelf:'center', color:'#006bad', fontWeight:'bold', backgroundColor:'white'}}
                    onPress={ () => this.triggerNextStepEnd("noBookingMade") }>
                        <Text>
                        None of these!
                        </Text>
                        </TouchableOpacity> }

                        { !this.state.loading && this.state.response['data'] == '' && <TouchableOpacity style={{ marginTop:20, padding:10, borderColor:'#006bad', borderRadius:10, borderWidth:1, alignSelf:'center', color:'#006bad', fontWeight:'bold', backgroundColor:'white'}}
                    onPress={ () => this.triggerNextStepEnd('chooseCities') }>
                        <Text>
                            Go back
                        </Text>
                        </TouchableOpacity> }



                    </View>}
            </View>
        );
    }
}