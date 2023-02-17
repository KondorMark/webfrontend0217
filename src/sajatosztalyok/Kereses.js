import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const Ip=require('./Ipcim')
export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
      this.state = {
          isLoading: true,
        szo: "",
        dataSource: [],
        valaszto: 1,
          helyszin:[]
      }
  }

  keres = () => {
    //alert(szam)
    var bemenet = {
      bevitel1: this.state.valaszto
    }

    fetch(Ip.ipcim + 'keres', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }
  
    )
      .then(x => x.json())
      .then(y => {
        alert(JSON.stringify(y))
        this.setState({dataSource : y})
      }
      );
  
  }


  componentDidMount(){
     fetch(Ip.ipcim + 'buli')
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
    fetch(Ip.ipcim + 'helyszin')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          helyszin: responseJson,
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
      
        
        <View style={{ flex: 1, paddingTop: 20,backgroundColor:'#dcdcdc' }}>
            {/*--------------------------------------------------------------------------------------keresés*/}
            <Text style={{ color: "black", fontSize: 15, textAlign: "center", marginTop: 15, marginBottom: 5 }}>Add meg a keresendő várost</Text>
            <Picker 
                style={{backgroundColor:"#42adf5",color:"white",marginTop:10, marginBottom:10}}
                selectedValue={this.state.valaszto}
                onValueChange={(ertek) => 
                  this.setState({ valaszto: ertek })


              }>
                  {this.state.helyszin.map(item=>

                <Picker.Item label={item.helyszin_varos} value={item.helyszin_id} />
          )}

              </Picker>
            <TouchableOpacity
        style={styles.kekgomb3}
        onPress={()=>this.keres()}
      >
        <Text style={{color:"black",fontWeight:"bold",fontSize:15}}  >Keresés</Text>
              </TouchableOpacity>


            

            { /*---------------------------------------------------------------------------Találatok*/ }

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
              <Text style={{ color: "brown", fontSize: 20, textAlign: "center", marginTop: 15, marginBottom: 5 }}   >{item.buli_esemeny} </Text>
              <Text style={{ color: "black", fontSize: 20, textAlign: "center", marginTop: 15, marginBottom: 5 }}   >{item.buli_datum} </Text>
              <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.helyszin_varos} </Text>
          <Image  source={{uri: Ip.ipcim + item.buli_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  

              <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.keres(item.jelentkezes_esemeny_id)}
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
  
    },
  kekgomb3: {
    alignItems: "center",
    backgroundColor: "yellow",
    padding: 3,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  
  }
});