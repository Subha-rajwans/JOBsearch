var xhttp=new XMLHttpRequest();

var users=getUsers();
var activeuser=getActiveUser();

function storeActiveUser(activeuser)
{

}
function getActiveUser()
{
  xhttp.open("GET", "/activeuser");
  xhttp.send();
  if (xhttp.readyState == 4 && xhttp.status == 200)
  {
    return JSON.parse(xhttp.responseText);
  }
  else
  {
     console.log(xhttp.status) ;
  }
}
function getUsers()
{
  xhttp.open("GET", "/users");
  xhttp.send();
  if (xhttp.readyState == 4 && xhttp.status == 200)
  {
    return JSON.parse(xhttp.responseText);
  }
  else
  {
     console.log(xhttp.status) ;
  }
}

function storeUsers(users)
{

}

function checkpassword()
{
  var password=document.getElementById("inputPassword").value;
  var repassword=document.getElementById("inputRePassword").value;
  if(password!=repassword)
  {
    document.getElementById("btnregister").disabled = true;
    document.getElementById("mismatcherror").innerHTML="Passwords do not match!";
  }
  else
  {
    document.getElementById("btnregister").disabled = false;
    document.getElementById("mismatcherror").innerHTML="";
  }
}

function register()
{
var name=document.getElementById("inputName").value;
var username=document.getElementById("inputUsername").value;
var password=document.getElementById("inputPassword").value;
var repassword=document.getElementById("inputRePassword").value;
if(username=="" || password=="" || name=="")
{
}
else
{
  if(checkUsername(username))
  {
  createObject(username,password,name);
  }
}
activeuser=username;
storeActiveUser(activeuser);
window.location='listproducts.html';
}

function createObject(u,p,n)
{
  var objUser=new Object();
  objUser.Name=n;
  objUser.Username=u;
  objUser.Password=p;
  users.push(objUser);
  storeUsers(users);
}

function checkUsername(u)
{
  if(users==[])
  return true;
  else
  for(var i=0;i<users.length;i++)
  {
    if(users[i].Username==u)
    {
      alert("This username already exists!");
      return false;
    }
  }
  return true;
}
var alogin=document.createElement("a");
alogin.innerHTML="Or Login?";
alogin.setAttribute("style","padding-left: 9%;color: #fffcea;text-decoration: underline;");
alogin.setAttribute("href","login.html");
var formregister=document.getElementById("formregister");
formregister.appendChild(alogin);
