var urlBase = 'http://167.99.12.10/API';
var extension = ".php";

var userId = 1;
var firstName = "";
var lastName = "";

var tempUser = "user";
var tempPass = "pass";

=======var urlBase = 'http://167.99.12.10/API';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("userName").innerHTML = firstName + " " + lastName;

		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";

		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

function addContact()
{
	var first = document.getElementById("contactText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + first + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactAddResult").innerHTML = "contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

>>>>>>> Bridget-frontend
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
<<<<<<< HEAD
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	document.getElementById("loginResult").innerHTML = "";

	// Add the MD5 hashing to password.


	// Creating the json payload to be sent.
	var jsonPayload = '{"login" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login' + extension;
=======

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
>>>>>>> Bridget-frontend

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
<<<<<<< HEAD

	try
	{
		// Send the json package.
		xhr.send(jsonPayload);

		// Json response.
		var jsonObject = JSON.parse( xhr.responseText );

		// Grabbing json replay with userID.
		userId = jsonObject.userID;

		// If userID is return less than 1, error logging in.
=======
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

>>>>>>> Bridget-frontend
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

<<<<<<< HEAD
		window.location.href = "http://167.99.12.10/html/contactManager.html";
		// Grabbing json reply with firstName and lastName.
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;


=======
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

>>>>>>> Bridget-frontend
		document.getElementById("userName").innerHTML = firstName + " " + lastName;

		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";

<<<<<<< HEAD
=======
		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
>>>>>>> Bridget-frontend
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

<<<<<<< HEAD
}

function doLogout()
{
	userID = 0;
	firstName = "";
	lastName = "";
}



function addContact() {
  document.getElementById('myModal').style.display = 'block';
=======
>>>>>>> Bridget-frontend
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
}

<<<<<<< HEAD
function makeContact() {
    var li = document.createElement("li");
    var first = document.getElementById("firstN").value;
    var last = document.getElementById("lastN").value;
    var phoneNum = document.getElementById("phone").value;
    var emailAdd = document.getElementById("email").value;
    var streetAdd = document.getElementById("streetAddress").value;
    var cityName = document.getElementById("city").value;
    var stateName = document.getElementById("state").value;
    var zipNum = document.getElementById("zip").value;
    var birthday = document.getElementById("birth").value;
    var notes = document.getElementById("note").value;

		document.getElementById("contactAddResult").innerHTML = "";

		var jsonPayload = '{"userId" : ' + userId + ', "firstName" : "' + first + '", "lastName" : "' + last + '", "streetAddress" : "' + streetAdd + '", "city" : "' + cityName + '", "state" : "' + stateName + '", "zip" : "' + zipNum + '", "phone" : "' + phoneNum + '", "email" : "' + emailAdd + '", "birthday" : "' + birthday + '", "notes" : "' + notes + '"}';
		var url = urlBase + '/AddContact' + extension;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("contactAddResult").innerHTML = err.message;
		}

    var t = document.createTextNode(first +' '+ last);
    li.appendChild(t);
    if (first === '' || last === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById('firstName').value = firstN.defaultValue;
    document.getElementById('lastName').value = lastN.defaultValue;
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
	var srch = document.getElementById("searchBar").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	var contactList = document.getElementById("myUL");
	contactList.innerHTML = "";

	var jsonPayload = '{"search" : "' + srch + '"}';
	var url = urlBase + '/SearchContacts' + extension;
=======
function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

function addContact()
{
	var first = document.getElementById("contactText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + first + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;
>>>>>>> Bridget-frontend

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
<<<<<<< HEAD
				hideOrShow( "contactList", true );

				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				var i;
				for( i=0; i<jsonObject.results.length; i++ )
				{
					var opt = document.createElement("option");
					opt.text = jsonObject.results[i];
					opt.value = "";
					contactList.options.add(opt);
				}
=======
				document.getElementById("contactAddResult").innerHTML = "contact has been added";
>>>>>>> Bridget-frontend
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
<<<<<<< HEAD
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
=======
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

>>>>>>> Bridget-frontend
}
