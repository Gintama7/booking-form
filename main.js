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
    localStorage.setItem(newUser.email,users);
    showUser(newUser);
    })

function showUser(newUser)
{
    let listItem  = document.createElement('li');
    listItem.textContent = `${newUser.name} - ${newUser.email} - ${newUser.phone}`;
    userList.appendChild(listItem);

    nameInput.value= "";
    emailInput.value="";

    let delBtn = document.createElement('button');
    delBtn.className = 'delete';

    delBtn.appendChild(document.createTextNode('delete'));
    listItem.appendChild(delBtn);

    delBtn.onclick=()=>{
        localStorage.removeItem(newUser.email);
        userList.removeChild(listItem);
    }

}
