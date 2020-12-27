var firebaseConfig = {
  apiKey: "AIzaSyDYW1flV0uQIFhhinizMWJh06wHThdUNNw",
  authDomain: "coro-d08ab.firebaseapp.com",
  databaseURL: "https://coro-d08ab-default-rtdb.firebaseio.com",
  projectId: "coro-d08ab",
  storageBucket: "coro-d08ab.appspot.com",
  messagingSenderId: "982318041327",
  appId: "1:982318041327:web:e698e51eb727dc257d731a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var UserInputRef=firebase.database().ref('UserInputs')
document.getElementById('testForm').addEventListener('submit',submitForm);
function submitForm(e)
{
  e.preventDefault();
  var name=getInputVal('name');
  var mobile=getInputVal('mobile');
  var age=getInputVal('age');
  var state=getInputVal('state');
  state=state.toLowerCase();
  readState(state);
  var email=getInputVal('email');
  var profession=getInputVal('profession');
  var dateofbirth=getInputVal('dateofbirth');
  var volunteer=getInputVal('volunteer');
  var travel=getInputVal('travel');
  var symptomsList=getSelectedCheckboxValues('symptoms');
  saveMessages(name,mobile,age,email,profession,dateofbirth,volunteer,state,travel,symptomsList);
}

function readState(state)
{
  var centers;
  var ref=firebase.database().ref(state);
  ref.on('value',(data)=>{
    centers=data.val();
    document.getElementById("result").innerHTML=centers;
  })
}

function getInputVal(id)
{
  return document.getElementById(id).value;
}

function saveMessages(name,mobile,age,email,profession,dateofbirth,volunteer,state,travel,symptomsList){
  var newuserInputRef=UserInputRef.push();
  newuserInputRef.set({
    name:name,
    mobile:mobile,
    age:age,
    email:email,
    profession:profession,
    dateofbirth:dateofbirth,
    volunteer:volunteer,
    state:state,
    travel:travel,
    symptomsList:symptomsList
  })
}

function getSelectedCheckboxValues(name)
{
  const checkboxes=document.querySelectorAll(`input[name="${name}"]:checked`);
  let values=[];
  checkboxes.forEach((checkbox)=>{
    values.push(checkbox.value);
  });
  return values;
}

