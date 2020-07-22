var activeuser = getActiveUser();
var xhttp = new XMLHttpRequest();
var newuser = document.getElementById("newuser");

function storeActiveUser(activeuser) {
    localStorage.activeuser = JSON.stringify(activeuser);
}

function getActiveUser() {
    if (!localStorage.activeuser) {
        localStorage.activeuser = JSON.stringify("");
    }
    return JSON.parse(localStorage.activeuser);
}

function getActualPassword(username, password) {
    xhttp.open("GET", "/actualpassword?username=" + username);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            actualpassword = JSON.parse(xhttp.responseText);
            console.log('actual password is\t', actualpassword);
            checkpassword(password, actualpassword.Password, username);
        } else {
            console.log(xhttp.status);
        }
    }
}

function validate() {
    errormessage.innerHTML = "";
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    getActualPassword(username, password);

}

function checkpassword(password, actualpass, username) {
    console.log('the actual password is\t', actualpass);
    if (actualpass == "") {
        gotoregister();
    } else {
        newuser.innerHTML = "";
        if (actualpass == password) {
            activeuser = username;
            storeActiveUser(activeuser);
            document.getElementById("errormessage").innerHTML = "";
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", '/loginpost', true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log('setting session username');
                    window.location = '/listproducts';
                } else {
                    console.log('error', xhttp.status);
                }
            }
            xhttp.send('user=' + username);
        } else {
            document.getElementById("errormessage").innerHTML = "Password is incorrect!";
        }

    }
}

function gotoregister() {
    //divgotoregister.innerHTML="";
    var txtregister = document.createElement("p");
    txtregister.innerHTML = "Looks like you are a new user!";
    txtregister.setAttribute('style', 'padding-left: 10%; color: grey');
    /*  var aregister=document.createElement("a");
      aregister.setAttribute("href","/register");
      aregister.innerHTML="Register!?";*/
    newuser.appendChild(txtregister);
    //newuser.appendChild(aregister);
}

function userLogout() {
    activeuser = "";
    storeActiveUser(activeuser);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/logout');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('logging out');
            window.location = '/login';
        } else {
            console.log(xhttp.status);
        }
    }

}

/*var aAddProduct=document.getElementById("aAddProduct");
if(activeuser!="admin")
{
  aAddProduct.style.display="none";
}
*/
var txtWelcome = document.getElementById("txtWelcome");
var aLogin = document.getElementById("aLogin");
var aRegister = document.getElementById("aRegister");
if (activeuser == "") {
    txtWelcome.innerHTML = "Welcome, Guest!";
} else {
    txtWelcome.innerHTML = "Welcome, " + activeuser + "!";
    aLogin.style.display = "none";
    aRegister.style.display = "none";
}