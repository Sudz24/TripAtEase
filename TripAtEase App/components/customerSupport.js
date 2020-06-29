
import React, { Component} from 'react';

import { Text, View, Image, TextInput, TouchableOpacity , StyleSheet, Keyboard, ActivityIndicator, Alert, Linking} from 'react-native';

const CustomerSupport = () => {

    let phone = "9844587650";

    return (
        <TouchableOpacity style={{ alignItems:'center', backgroundColor:'white', padding:10, borderRadius:15, flexDirection:'row', paddingLeft:10}} onPress={()=> Linking.openURL(`tel:${phone}`)} >
            <Image source={require('../assets/telephone.png')}
                    style={{width: 35, height: 35, marginLeft:10}} />
            <Text style={{ flexShrink: 1, textAlignVertical:'center', paddingLeft:20, fontWeight:'bold' }}>
                Tap to contact our 24x7 TripAtEase Customer Support Helpline
            </Text>
        </TouchableOpacity>

    );
}

export default CustomerSupport;