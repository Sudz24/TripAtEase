

import React, { Component} from 'react';

import { Text, View, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, ActivityIndicator, Alert, Linking} from 'react-native';

const Precautions = () => {

    return (
        <View style={{ marginTop: -10, justifyContent:'center', backgroundColor:'white', padding:15, borderRadius:20}}>
            <Text style={{ textAlign:'center', marginBottom:15, fontWeight:'bold', fontSize:14, color:'#006bad'}}>
                Precautions during travel
            </Text>
            <Text style={{ }}>
                Wear Masks and Gloves
            </Text>
            <Text>
                Use hand sanitizer after touching any public surfaces
            </Text>
            <Text>
                Avoid touching your face unnecessarily
            </Text>
            <Text>
                Maintain social distancing when conversing with anyone
            </Text>
        </View>
    )
}

export default Precautions;