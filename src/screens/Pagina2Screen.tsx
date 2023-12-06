import { StackScreenProps } from '@react-navigation/stack';
import React, {useState} from 'react'
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableHighlight, 
  StyleSheet, 
  Pressable,   
  ScrollView, 
  TextInput,
  Alert,
  Keyboard,
  Button
} from 'react-native';
interface Props extends StackScreenProps<any, any>{};
const Pagina2Screen = ({navigation}:Props) => {

  const [loginEmailAddress, setLoginEmailAddress] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const loginFunction = () => {
    Keyboard.dismiss();

    if([loginEmailAddress, loginPassword].includes('')){
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
       
      )
      return
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    
    if( (loginEmailAddress.trim().length != 0 === true && loginPassword.trim().length != 0))
    {    
      fetch("http://192.168.137.1/inicioG/login.php",{        
          method:'POST',
          header:{
          'Accept':'application/json',            
          'Content-type':'application/json'            
          },
          body:JSON.stringify({
          login_email_address: loginEmailAddress,            
          login_password: loginPassword,             
          })
    })
    .then((response) => response.json())         
    .then((responseJson) => {          
        if(responseJson.status == true)
        {      
          
            Alert.alert(
                "You're Log in!!!",
                "Conexion Sucessfully",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
              navigation.navigate('Pagina3Screen');                                                                 
        }
        else
        {
          console.log(responseJson.status)
            Alert.alert(
                "You need review information",
                "access denied",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );                
            console.log("no its true");
        }
    })
    .catch((error) => {            
        Alert.alert(
            "Revisa tu informacion",
            "Acceso Denegado",
            
          );
        
    });
    }
    
};

  return (

    <View
      style={styles.contenido}
    >

      <ScrollView>

        <Text
          style={styles.titulo}
        >Inicio {' '}
          <Text
            style={styles.tituloBold}
          >De Sesion</Text>

        </Text>

        <View>
          <Text
            style={styles.label}
          >
            Usuario
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu usuario'
            placeholderTextColor={'#666'}
            value={loginEmailAddress}
            onChangeText={setLoginEmailAddress}
          />
        </View>

        <View>
          <Text
            style={styles.label}
          >
            Contraseña
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu contraseña'
            placeholderTextColor={'#666'}
            secureTextEntry={true}
            value={loginPassword}
            onChangeText={setLoginPassword}
          />
        </View>


        <Pressable style={styles.bntLogin}
          onPress={loginFunction}
        >
          <Text style={styles.bntLoginText}>Acceder</Text>
        </Pressable>

      </ScrollView>

</View>

  )
}

const styles = StyleSheet.create({
  contenido:{
      backgroundColor:'#fff',
      flex:1,
      
  },
  titulo:{
      fontSize:30,
      fontWeight:'600',
      textAlign:'center',
      marginTop:30,
      color: '#FFF'
  },
  tituloBold:{
      fontWeight: '900'
  },
  campo:{
      marginTop: 40,
      marginHorizontal: 30        
  },
  label:{
      color:'#000',
      marginBottom: 10,
      marginTop:40,
      fontSize:20,
      fontWeight:'600',
      marginHorizontal:10
  },
  input:{
      backgroundColor:'#E7E7E7',
      padding:15,
      borderRadius:10,        
      marginHorizontal:10,
      
  },
  sintomasInput:{
      height:100
  },
  bntLogin:{      
      backgroundColor:'#000',
      marginVertical:50,      
      marginHorizontal:10,
      padding:20,
      borderRadius:10,
      borderWidth:1,
      borderColor:'#FFF'

    },
    bntLoginText:{
      textAlign:'center',
      color:'#fff',
      textTransform:'uppercase',
      fontWeight:'700'
    }
})


export default Pagina2Screen