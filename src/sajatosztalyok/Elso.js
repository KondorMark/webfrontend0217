import React, { Component } from 'react';
import { Text, StyleSheet, View,underline } from 'react-native';

export default class ButtonBasics extends Component {
  _onPressButton() {
    alert('You tapped the button!')
  }

  render() {
    return (
      <View >
        <Text style={styles.underline} >Rólunk</Text>
        <Text style={{ color: "black", fontSize: 18, textAlign: "center", marginTop: 15, marginBottom: 5 }}   >Készűlt: Kondor Márk Gábor megbízásából</Text>
        <Text style={{ color: "black", fontSize: 15, textAlign: "center", marginTop: 15, marginBottom: 5 }}
        >Ez az alkalmazás azért készült el hogy
          könyebb tájékozódást nyújtson azok számára
          akik szórakozásra vágynak vagy estleg
          szeretnének betekintést nyerni a zene világába.
        </Text> 
        <Text style={{ color: "black", fontSize: 15, textAlign: "center", marginTop: 15, marginBottom: 5 }} >Helyszin ahol készült: ?</Text>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  underline: {
    textDecorationLine: 'underline',
    textAlign: "center",
    fontSize: 25,
    color: "black"
  },

  

});