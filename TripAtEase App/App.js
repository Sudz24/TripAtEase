import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthStack from './navigation/authStack';


const fixOppoTextCutOff = () => {
  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: 'lucida grande',
    },
  });
  const oldRender = Text.render;
  Text.render = function render(...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultFontFamily, origin.props.style],
    });
  };

}

fixOppoTextCutOff();

export default AuthStack;

