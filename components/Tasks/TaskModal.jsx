import { View, Text,Modal,TouchableOpacity, TextInput, FlatList } from 'react-native'
import React,{useState} from 'react'
import tailwind from 'twrnc'
import {Ionicons} from "@expo/vector-icons"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from 'react-native';
import { useDispatch,useSelector } from "react-redux"
import { addTask } from '../../redux/tasks';
import { collection, addDoc ,doc, getDoc,setDoc ,updateDoc} from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import AsyncStorage from "@react-native-async-storage/async-storage"
const TaskModal = ({closeModal}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const tasks = useSelector(state =>state.tasks.tasks)
 
const [date,setDate] = useState("")
const [priority,setPriority] = useState("")
const [taskName,setTaskName] = useState("")
const dispatch = useDispatch()
function toggleDatePicker(){
  setDatePickerVisibility(state => !state)
}
function handleConfirm(date){
  setDate(date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }))
  
  setDatePickerVisibility(state => !state)
}

function add(){

 dispatch(addTask({
  taskName,priority,date
}))
addTasktoDb()
  closeModal()
}


async function addTasktoDb(){
  const id = await AsyncStorage.getItem("id")
  let temp = [...tasks,{
    taskName,priority,date
  }]
  
  const userRef = doc(db, "users",id);
  await updateDoc(userRef, {
    tasks :temp
  })
}


const testing = () =>{
  console.log(tasks)
}

  return (
    <Modal animationType="slide">
      <SafeAreaView style={[tailwind`flex-1`,{backgroundColor:"#404661"}]}>
<View style={[tailwind`h-15 items-center justify-end pb-4 bg-red-400`,{backgroundColor:"#404661"}]}>
  <Text style={[tailwind`text-xl`,{color:"#eaf3fe"}]}>Add New Task</Text>
</View>
<View style={[tailwind`flex-1`,{backgroundColor:"#0f1117"}]}>
  <TextInput
 style={[tailwind`border-b m-4 pb-1 text-lg rounded-md`,{borderColor:"#eaf3fe",color:"#eaf3fe"}]}
 autoCorrect={true}
 autoFocus={true}
 placeholder='Enter Task Title'
 placeholderTextColor={"#eaf3fe"}
 onChangeText={(v)=>{

  setTaskName(v)
 }}
 />
 
 <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker}
        date={new Date()}
      />
<TouchableOpacity style={[tailwind`border m-4 items-center p-4`,{borderColor:"#eaf3fe"}]} onPress={toggleDatePicker}>
<Text style={[tailwind``, { color: "#eaf3fe" }]}>{!date  ? "Press To Select Due Date" : date}</Text>
</TouchableOpacity>
<Text style={[tailwind`text-lg mx-4`, { color: "#eaf3fe" }]}>Priority:</Text>
<View style={tailwind`mx-4 my-2 justify-between`}>
<TouchableOpacity   
onPress={()=> setPriority("Low")}
style={[tailwind`border  items-center  p-2`,{borderColor:"#eaf3fe", backgroundColor:priority === "Low" ?"#eaf3fe" :"#0f1117" }]}>
<Text style={[tailwind`text-lg mx-4`, { color: priority === "Low" ?"#0f1117" :"#eaf3fe" }]}>Low</Text>
</TouchableOpacity>
<TouchableOpacity   
onPress={()=> setPriority("Medium")}
style={[tailwind`border  items-center  p-2`,{borderColor:"#eaf3fe", backgroundColor:priority === "Medium" ?"#eaf3fe" :"#0f1117" }]}>
<Text style={[tailwind`text-lg mx-4`, { color: priority === "Medium" ?"#0f1117" :"#eaf3fe" }]}>Medium</Text>
</TouchableOpacity>
<TouchableOpacity  
onPress={()=> setPriority("High")} 
style={[tailwind`border  items-center  p-2`,{borderColor:"#eaf3fe", backgroundColor:priority === "High" ?"#eaf3fe" :"#0f1117" }]}>
<Text style={[tailwind`text-lg mx-4`, { color: priority === "High" ?"#0f1117" :"#eaf3fe" }]}>High</Text>
</TouchableOpacity>

</View>
<View style={tailwind`flex-row  justify-between px-4`}> 
<TouchableOpacity onPress={closeModal} style={[tailwind`w-15 h-15 rounded-full items-center justify-center `,{backgroundColor:"#404661"}]}>
<Ionicons name='close' size={40} color="#eaf3fe"/>
     </TouchableOpacity>
<TouchableOpacity onPress={add} style={[tailwind`w-15 h-15 rounded-full items-center justify-center `,{backgroundColor:"#404661"}]}>
<Ionicons name='add' size={40} color="#eaf3fe"/>
     </TouchableOpacity>
</View>

</View>

      </SafeAreaView>
    </Modal>
  )
}

export default TaskModal

