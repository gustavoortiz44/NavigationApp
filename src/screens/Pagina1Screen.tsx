import { StackScreenProps } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    SafeAreaView,
    Alert
} from 'react-native';

import { reqResApi } from '../api/reqRes';

import { ReqResListado } from '../interfaces/reqRes';


const { width, height } = Dimensions.get('screen');

interface Props extends StackScreenProps<any, any>{};
const Pagina1Screen = ({navigation}: Props) => {


  const [usuarios, setUsuarios] = useState<ReqResListado[]>([]);
  const [flexDirection, setflexDirection] = useState('column');

  useEffect(() => {
    
    loadUsers();
    
  }, [])

  const loadUsers = async() => {
    //call
    await reqResApi.get<ReqResListado>('/photos?albumId=1')
    .then( resp => {                    
        setUsuarios(resp.data);
        console.log(JSON.stringify(resp.data, null, 2))      
    })
    .catch((error) => {            
      Alert.alert(
          "Revisa tu conexion",
          "Error", error
          
        );
      
  })
  }

  const renderItem = (usuario: ReqResListado) => {
    return(
        <View key={usuario.id.toString()} >        

        <FlatList style={styles.flatListStyle} data={usuarios} numColumns={2} renderItem={({ item }) => {
          return (
            <View>
              <Image style={styles.image} source={{ uri: usuario.thumbnailUrl }} />
            </View>
          )
        }
        } />

        </View>
   
    )
    
    
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text>All Photos</Text>
        <Button
          title='Ir a Pagina2'
          onPress={ () => navigation.navigate('Pagina2Screen') }
        />
        {
          usuarios.map( renderItem )
        }
        
    </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  image: {
    width: (Dimensions.get('window').width / 2) - 20,
    height: 60,
    margin: 5,
    },
  flatListStyle: { flex: 1,
  },
});

export default Pagina1Screen