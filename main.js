const form  = document.querySelector('form');
let nameInput = document.querySelector('[name="fullname"]');
let emailInput = document.querySelector('[name="email"]');
let phoneInput = document.querySelector('[name="phone"]');
let userList = document.getElementById('userlist');


form.addEventListener('submit',function(e){
    e.preventDefault();
    
    let name = nameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;

    const newUser = {name,email,phone};
    const users = JSON.stringify(newUser);

    axios.post('https://crudcrud.com/api/b910a46c8c7245f98e0d30a715dcc648/appointmentData',
    newUser)
    .then((res)=> {
        showUser(res.data);
        // console.log(res);
    })
    .catch(err => 
       {
        document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong</h4>';
        console.log(err);
       });

    // localStorage.setItem(newUser.email,users);   //using local storage
    // showUser(newUser);
    })

    window.addEventListener("DOMContentLoaded",() =>{
        axios
          .get("https://crudcrud.com/api/b910a46c8c7245f98e0d30a715dcc648/appointmentData")
          .then((res) => {
           console.log(res);

           for(let i=0;i<res.data.length;i++)
           {
            showUser(res.data[i]);
           }

          }).catch(err => console.log(err));
    })

function showUser(newUser)
{
    let listItem  = document.createElement('li');
    listItem.textContent = `${newUser.name} - ${newUser.email} - ${newUser.phone}`;
    userList.appendChild(listItem);

    nameInput.value= "";
    emailInput.value="";

    //deleteBtn
    let delBtn = document.createElement('button');
    delBtn.className = 'delete';
    delBtn.appendChild(document.createTextNode('delete'));
    listItem.appendChild(delBtn);

    delBtn.onclick=(e)=>{
        e.preventDefault();
        let id = '';
        axios
        .get("https://crudcrud.com/api/b910a46c8c7245f98e0d30a715dcc648/appointmentData")
        .then((res) => {
         for(let i=0;i<res.data.length;i++)
         {
          if(newUser.email === res.data[i].email)
          {
            id= res.data[i]._id;
            console.log(id);
          }
         }
         axios.delete(`https://crudcrud.com/api/b910a46c8c7245f98e0d30a715dcc648/appointmentData/${id}`)
        .then(res => console.log('deleted item'))
        .catch(err=> console.log(err));
        }).catch(err=> console.log(err));

        
        // localStorage.removeItem(newUser.email);
        userList.removeChild(listItem);
    }

    //editBtn
    let edit = document.createElement('button');
    edit.className='edit';
    edit.appendChild(document.createTextNode('edit'));
    listItem.appendChild(edit);

    edit.onclick=()=>{
        nameInput.value = newUser.name;
        emailInput.value = newUser.email;
        phoneInput.value = newUser.phone;
        localStorage.removeItem(newUser.email);
        userList.removeChild(listItem);

    }

}
