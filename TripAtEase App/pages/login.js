
import React, { Component} from 'react';
import { Text, ScrollView, View, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, ActivityIndicator, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default class Login extends Component {

    constructor(props){

        super(props);

    this.state = {
        username: "",
        password: "",
        error: "",
        loggedIn: false,
        status: "",
        loading: true,
        internet: true
      }
  

    }

    async componentDidMount() {

        //Checking for Internet
        NetInfo.fetch().then(state => {
            if(!state.isConnected){
              Alert.alert(
                "You are offline!",
                "Please connect to a network to use the app.",
                [
                  { text: "OK" }
                ],
                { cancelable: false }
              );

              return;
            }
          });
        
        const name = await AsyncStorage.getItem('name');
        if(name !== null) {
          this.props.navigation.replace("Tabs", { "name" : name });
        }
        else {
          this.setState({loading: false});
        }

    }

    async performLogin() {

        //Checking for Internet
        NetInfo.fetch().then(state => {
            if(!state.isConnected){
              Alert.alert(
                "You are offline!",
                "Please connect to a network to use the app.",
                [
                  { text: "OK" }
                ],
                { cancelable: false }
              );

              return;
            }
          });

          this.setState({error:""})

          if(!this.state.username || !this.state.password)
          {
            this.setState({error:"No field can be empty"})
            Keyboard.dismiss();
            return;
          }
      
          var data = {
            "username": this.state.username,
            "password": this.state.password
          };
      
          console.log(JSON.stringify(data))
      
          this.setState({status:"Logging in... Hold on!"});
      
          Keyboard.dismiss();
        
          fetch(
              "http://viomo-env.eba-chmgvvyz.us-east-1.elasticbeanstalk.com/login",
              {
                method: 'POST',
                headers: {
                  Accept: "application/json", 
                 "Content-Type": "text/html, application/json"
                },
                body: JSON.stringify(data)
             }
          ).then(response => response.json())
          .then(response => {
      
              if(!response.status)
              {
                this.setState({status: "",error:response.content});
                console.log(response.status)
              }
              else
              {
                AsyncStorage.setItem('name', data.username);
                this.setState({error: "", loggedIn: true, status: ""});
                Keyboard.dismiss();
                this.props.navigation.replace("Tabs", {name : data.username});
              }
          
          })
          .catch((error) => { console.log(error);
            Keyboard.dismiss();
          this.setState({error: "Connection Issue. Try again later!", status: ""}) });      

    }


    render() {

        const { replace } = this.props.navigation;
        const { navigate } = this.props.navigation;

        var styles = StyleSheet.create({
            linearGradient: {
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 35,
              width: 280,
              marginTop: 15
            },
            buttonText: {
              fontSize: 16,
              fontFamily: 'Gill Sans',
              textAlign: 'center',
              margin: 5,
              color: '#ffffff',
              backgroundColor: 'transparent',
            },
          });
      

        return (
            <View style={{ flex:1, justifyContent: "center", alignItems: "center", backgroundColor:'white' }}>

                <Image source={require('../assets/travel.jpg')}
                    style={{width: 120, height: 120, borderRadius:20}} onPress={()=> this.props.navigation.replace("Register")} />

                <View style = {{ marginTop: 20, textAlign: 'center'}}>
                    <Text style = {{ fontWeight: 'bold', fontSize: 26, textAlign: "center"}}>
                        Hello!
                    </Text> 
                    { !this.state.loading ? 
                    
                    <Text style = {{ fontSize: 15, fontWeight: 'bold', marginTop:5 }}>
                        Sign in to continue exploring.
                    </Text> 
                    : <ActivityIndicator size="small"/> }
                </View>

                
                {/* <View onPress={()=> replace("Register")}>
                    <Text onPress={()=> replace("Tabs")}>
                        Click
                    </Text>
                </View> */}
                { !this.state.loading && <TextInput 
                    style={{ height: 40, fontSize: 14, width: 280, borderBottomWidth: 1, marginTop: 20}}
                    placeholder="Username"
                    placeholderTextColor="black"
                    onChangeText={(text) => this.setState({username:text})}
                /> }

                { !this.state.loading && <TextInput 
                    secureTextEntry={true}
                    style={{ height: 40, fontSize: 14, width: 280, borderBottomWidth: 1, marginTop: 20, marginBottom: 10}}
                    placeholder="Password"
                    placeholderTextColor="black"
                    onChangeText={(text) => this.setState({password:text})} 
                  />  }

                { this.state.error ? 
                <Text style =  {{ color: '#df2929', fontWeight: 'bold', fontSize:16, textAlign:'center', width: 280}}>
                { this.state.error }
                </Text> : null }

                { this.state.status ? 
                <Text style =  {{ color: 'green', fontWeight: 'bold', fontSize:16, textAlign:'center', width: 280}}>
                { this.state.status }
                </Text> : null }


                { !this.state.loading && <TouchableOpacity>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,107,173,1)', 'rgba(0,95,145,1)']} style={styles.linearGradient}>
                        <Text style={styles.buttonText} 
                        onPress={() => this.performLogin()}>
                        SIGN IN
                        </Text>
                    </LinearGradient>
                </TouchableOpacity> }

                { !this.state.loading && <TouchableOpacity>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,107,173,1)', 'rgba(0,95,145,1)']} style={styles.linearGradient}>
                        <Text style={styles.buttonText} 
                        onPress={() => this.props.navigation.navigate("Register")}>
                        SIGN UP
                        </Text>
                    </LinearGradient>
                </TouchableOpacity> }

            </View>
        );
    }
}


