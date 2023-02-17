import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native';
const Ip = require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      letszamtomb:[]
      

    }
  }

  jelentkezes=(szam)=>{
    alert(szam)
    
    var bemenet={
      bevitel1:szam
    }

  fetch(Ip.ipcim +'jelentkezes', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }
  


  componentDidMount(){
    fetch(Ip.ipcim +'kiallitas',)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
    
    
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      
      
      <View style={{flex: 1, paddingTop:20,backgroundColor: `#dcdcdc`}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

            <View >

              <Text style={{ color: "brown", fontSize: 20, textAlign: "center", marginTop: 15, marginBottom: 5 }}   >{item.esemenynev} </Text>
              <Text style={{ color: "black", fontSize: 15, textAlign: "center", marginTop: 5, marginBottom: 5 }}   > jelenkezők:  {item.letszam} </Text>
                  <Text style={{ color: "black", fontSize: 20, textAlign: "center", marginTop: 15, marginBottom: 5 }}   >Dátum: {item.datum1} </Text>
                  <Text style={{ color: "black", fontSize: 20, textAlign: "center", marginTop: 15, marginBottom: 5 }}   >Dátum: {item.datum2} </Text>
              <Text style={{color:"royalblue",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >Helyszin:  {this.state.helyszin_id} </Text>
          <Image  source={{uri: Ip.ipcim +item.kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  

              <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.jelentkezes(item.buli_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Ott leszek</Text>
              </TouchableOpacity>
          </View>
        }
    
          keyExtractor={({buli_id}, index) => buli_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 3,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    
  },
  kekgomb2: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 3,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  
  }
});