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

    let newUser = {name,email,phone};
    localStorage.setItem("users",JSON.stringify(newUser));

    let listItem  = document.createElement('li');
    listItem.textContent = `${name} ${email} ${phone}`;
    userList.appendChild(listItem);

    nameInput.value= "";
    emailInput.value="";
})