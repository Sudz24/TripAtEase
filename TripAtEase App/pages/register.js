import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class Register extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      error: '',
      phoneno: ''
    }
  }

  async doRegister() {

    if(!this.state.username || !this.state.password || !this.state.email || !this.state.confirmPassword)
    {
      this.setState({error:"No field can be empty"})
      Keyboard.dismiss();
      return;
    }

    if(this.state.password != this.state.confirmPassword)
    {
      this.setState({error:"Passwords don't match!"})
      Keyboard.dismiss();
      return;
    }

    var data = {
      "username": this.state.username,
      "password": this.state.password,
      "email": this.state.email
    };

    console.log(JSON.stringify(data))

    this.setState({error:"Signing up... Hold on!"});
  
    fetch(
        "http://viomo-env.eba-chmgvvyz.us-east-1.elasticbeanstalk.com/signup",
        {
          method: 'POST',
          headers: {
            Accept: "application/json", 
           "Content-Type": "text/html, application/json"
          },
          body: JSON.stringify(data)
       }
    ).then(response => response.text())
    .then(response => {

        Keyboard.dismiss();

        if(response!='true')
        {
          this.setState({error:response})
  
        }
        else
        {
          this.onSuccessAlert();
        }
    
    })
    .catch((error) => { console.log(error);
      Keyboard.dismiss();
    this.setState({error: "Connection Issue. Try again later!"}) });
   
  };

  onSuccessAlert = () =>
    Alert.alert(
      "Successfully registered!",
      "Please check your registered email ID to complete the verification!",
      [
        { text: "OK", onPress: () => this.props.navigation.replace("Login") }
      ],
      { cancelable: false }
    );

  render() {

    const { replace } = this.props.navigation;

    var styles = StyleSheet.create({
      linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 35,
        width: 280,
        marginTop: 15,
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
      <ScrollView contentContainerStyle={{ justifyContent:'center', alignItems:'center', flex:1, backgroundColor:'white'}}>
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
        
        <Image source={require('../assets/travel.jpg')}
        style={{width: 110, height: 110}} />


        <View style = {{ marginTop: 25}}>
            <Text style = {{ fontWeight: 'bold', fontSize: 23}}>
                Welcome to TripAtEase!
            </Text>  
        </View>
                

        <TextInput 
          style={{ height: 40, fontSize: 15, width: 280, borderBottomWidth: 1, marginTop: 25}}
          placeholder="Username"
          placeholderTextColor="black"
          onChangeText={(text) => this.setState({username:text})}
        />

        <TextInput 
          style={{ height: 40, fontSize: 15, width: 280, borderBottomWidth: 1, marginTop: 15}}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={(text) => this.setState({email:text})}
        />

        <TextInput 
          secureTextEntry={true}
          style={{ height: 40, fontSize: 15, width: 280, borderBottomWidth: 1, marginTop: 15}}
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={(text) => this.setState({password:text})}
          
        />

        <TextInput 
          secureTextEntry={true}
          style={{ height: 40, fontSize: 15, width: 280, borderBottomWidth: 1, marginTop: 15, marginBottom:10}}
          placeholder="Confirm password"
          placeholderTextColor="black"
          onChangeText={(text) => this.setState({confirmPassword:text})}
          
        />

        { this.state.error ? 
        <Text style =  {{ color: '#df2929', fontWeight: 'bold', fontSize:15, marginTop:5, width: 280, textAlign:'center'}}>
          { this.state.error }
        </Text> : null }

        <TouchableOpacity>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,107,173,1)', 'rgba(0,95,145,1)']} style={styles.linearGradient}>
            <Text style={styles.buttonText} 
            onPress={() => this.doRegister()}>
              SIGN UP
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => replace("Login")} >
          <View>
            <Text style={{ fontSize:16, color: "rgba(1,25,69,0.8)", fontWeight: "bold", textAlign: "center", marginTop: 20 }}> Account Exists? Login Here </Text>
          </View>
        </TouchableOpacity>

      </View> 
      </ScrollView>
      

       
    );
    
  }
}
