

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, set,get, child,push ,onValue,remove,update  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"


const firebaseConfig = {
    apiKey: "AIzaSyCkOaafmzhKaSSpY2Kgy2_FSqThqDjRY6Q",
    authDomain: "authentication-247ce.firebaseapp.com",
    projectId: "authentication-247ce",
    storageBucket: "authentication-247ce.appspot.com",
    messagingSenderId: "1066835457540",
    appId: "1:1066835457540:web:62c4a8ff35ee65fdb8a751",
    measurementId: "G-SHP1Z40XXW"
  };


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app); 
  const database = getDatabase()



document.getElementById('addtodo').addEventListener('click',()=>{
    const db = getDatabase();
   try {
    var todoitem=document.getElementById("todo-item").value
    const postListRef = ref(db, 'todo');
    
    const todoRef = push(postListRef);
    const todoId = todoRef.key;
    console.log(todoId)
    set(todoRef, {
        todoitem,
        todoId
        
    });
   
   } catch (error) {
    console.log(error.messege)
   }

})





const getTodoData=()=>{
    
const db = getDatabase();
let list=document.getElementById('list')
try {
    const starCountRef = ref(db, 'todo/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
 list.innerHTML=""
 if(data){
    for (const todoId in data) {
        const todoItem = data[todoId].todoitem;
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(todoItem));
        const delbtn = document.createElement('button');
        delbtn.classList.add('btn');
        delbtn.textContent = 'Delete';
        delbtn.onclick = () => delebtn(todoId); 

        const editbtn = document.createElement('button');
        editbtn.classList.add('btn');
        editbtn.textContent = 'EDIT';
        editbtn.onclick = () => updateData(todoId); 
        li.appendChild(editbtn)
        li.appendChild(delbtn)
        list.appendChild(li);
    }
 }
  
})
;
} catch (error) {
    console.log(error.messege)
}
}
getTodoData()


const delebtn = async (docId) => {
  const db = getDatabase();

    console.log(docId)
  try {

    const postListRef = ref(db, 'todo/',docId);
    remove(postListRef)
    getTodoData();
    
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

const updateData = (docId) => {
  const db = getDatabase();
  console.log(docId)

  try {
    const updatedValue = prompt("Enter an updated todo item");
    
    // Construct the updates object with the correct path to update the todoitem
    const updates = {};
    updates[`/todo/${docId}/todoitem`] = updatedValue;

    update(ref(db), updates); // Update the data in the database

    console.log("Update successful");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};


