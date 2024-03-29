import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://addtocart-f1cea-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-el")
const addButtonEl = document.getElementById("add-button")
const ulEl = document.getElementById("ulEl")

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        clearAll();
        let listItemsArr = Object.entries(snapshot.val())
        console.log(listItemsArr);
        for(let i = 0 ;i< listItemsArr.length; i++){
            let item = listItemsArr[i];
            // let currentItemID = item[0]
            // let currentItemValue = item[1]
            addItemToShoppingList(item);
        }
    }else{
        ulEl.innerHTML = "No items in the list added yet..."
    }


})

function clearAll(){
    ulEl.innerHTML = ""
}

addButtonEl.addEventListener("click", function() {
    let inputValue = inputEl.value
    if(inputEl.value.length>0){
        push(shoppingListInDB, inputValue)
    }
    inputEl.value = ""
    console.log(inputValue)
})

function addItemToShoppingList(item){
    
    //we have item as array.
    
    // ulEl.innerHTML += `<li>${cartItem}</li>`
    let itemID = item[0]//key
    let itemValue = item[1]//value

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    ulEl.appendChild(newEl);

    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })


}