import { StackScreenProps } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView
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
    .catch(console.log)
  }

  const renderItem = (usuario: ReqResListado) => {
    return(
        <View key={usuario.id.toString()} >        
         
        <View style={{ width: width * 1,}}>
          <Image source={{ uri: usuario.thumbnailUrl }} style={{ width: "25%", height: 50, }} />
        </View>
          
        </View>
        
    )
  }

  return (
    <ScrollView>
      <View>
        <Text>All Photos</Text>
        {
          usuarios.map( renderItem )
        }
        <Button
          title='Ir a Pagina2'
          onPress={ () => navigation.navigate('Pagina2Screen') }
        />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Pagina1Screen