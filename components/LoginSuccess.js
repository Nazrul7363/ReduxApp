
import {View,Text,FlatList}  from 'react-native'
import  {Button}  from 'react-native-paper'

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../src/redux/action';

function LoginSuccess({navigation}) {
const{posts,loading}=useSelector((posts)=>({...posts.data}));

const dispatch=useDispatch();


  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Button
        style={{ backgroundColor: "#042d5b", marginTop: 30, width: 230 }}
        onPress={() =>navigation.navigate('Output')}
      >
        Images
      </Button>


      < Button
        style={{ backgroundColor: "#042d5b", marginTop: 30, width: 230 }}
        onPress={()=>dispatch(fetchPosts())}
  
      >
        Posts
      </Button>
      {!loading ? (
        <View style={{ maxHeight: 300, padding: 25, marginTop: 20 }}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>ID: {item.id}</Text>
                <Text>Title: {item.title}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        console.log('Loading', loading)
      )}

    </View>
  )
}
export default LoginSuccess