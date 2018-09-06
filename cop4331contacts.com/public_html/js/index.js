var urlBase = 'http://167.99.12.10/API';
var extension = ".php";

var userId = 0;
var firstName = "";
var lastName = "";

var tempUser = "user";
var tempPass = "pass";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	document.getElementById("loginResult").innerHTML = "";

	// Add the MD5 hashing to password.


	// Creating the json payload to be sent.
	var jsonPayload = '{"login" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		// Send the json package.
		xhr.send(jsonPayload);

		// Json response.
		var jsonObject = JSON.parse( xhr.responseText );

		// Grabbing json replay with userID.
		userId = jsonObject.userID;

		// If userID is return less than 1, error logging in.
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		window.location.href = "html/contactManager.html"

		// Grabbing json reply with firstName and lastName.
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;


		document.getElementById("userName").innerHTML = firstName + " " + lastName;

		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";



	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}



}

function doLogout()
{
	userID = 0;
	firstName = "";
	lastName = "";
}



function addContact() {
  document.getElementById('myModal').style.display = 'block';
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    document.getElementById('myModal').style.display = 'none';
}

function makeContact() {
    var li = document.createElement("li");
    var first = document.getElementById("firstName").value;
    var last = document.getElementById("lastName").value;
    var phoneNum = document.getElementById("phone").value;
    var emailAdd = document.getElementById("email").value;
    var streetAdd = document.getElementById("streetAddress").value;
    var cityName = document.getElementById("city").value;
    var stateName = document.getElementById("state").value;
    var zipNum = document.getElementById("zip").value;
    var birthday = document.getElementById("birth").value;
    var notes = document.getElementById("note").value;

    var t = document.createTextNode(first +' '+ last);
    li.appendChild(t);
    if (first === '' || last === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById('firstName').value = firstName.defaultValue;
    document.getElementById('lastName').value = lastName.defaultValue;
    document.getElementById('phone').value = phone.defaultValue;
    document.getElementById('email').value = email.defaultValue;
    document.getElementById('streetAddress').value = streetAddress.defaultValue;
    document.getElementById('city').value = city.defaultValue;
    document.getElementById('state').value = state.defaultValue;
    document.getElementById('zip').value = zip.defaultValue;
    document.getElementById('birth').value = birth.defaultValue;
    document.getElementById('note').value = note.defaultValue;

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.appendChild(txt);

    document.getElementById('myModal').style.display = 'none';
}

function search() {
  // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchBar');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
