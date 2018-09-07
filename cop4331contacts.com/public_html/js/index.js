var urlBase = 'http://167.99.12.10/API';
var extension = ".php";

var userId = 1;
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
	var url = urlBase + '/Login' + extension;

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

		window.location.href = "http://167.99.12.10/html/contactManager.html";
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
	var url = urlBase + '/SearchContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
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
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}
