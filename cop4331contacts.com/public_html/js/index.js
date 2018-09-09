var urlBase = 'http://167.99.12.10/API';
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

		userId = jsonObject.userID;

		if( userId < 1 || userId == 'undefined' || userId == null)
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("userName").innerHTML = firstName + " " + lastName;

		document.getElementById("loginName").value = loginName.defaultValue;
		document.getElementById("loginPassword").value =loginPassword.defaultValue;

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

function addContact() {
  document.getElementById('myModal').style.display = 'block';
}

function makeContact()
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

// added register function
// works similarly to a mix of the addcolor function and the login function
// currently follows the parameters set in the html file but can be later changed to match the php file idk
// -Updated 9/8/2018
function register()
{
	var regFirstName = document.getElementById("reg_firstname").value;
	var regLastName = document.getElementById("reg_lastname").value;
	var regUsername = document.getElementById("reg_username").value;
	var regPassword = document.getElementById("reg_password").value;
	var regPasswordConfirm = document.getElementById("reg_password_confirm").value;
	document.getElementById("registerResult").innerHTML = "";

	var jsonPayload = '{"username" : "' + regUsername + '", "password" : "' + regPassword + '", "lastName" : "' + regLastName
	+ '", "firstname" : + "' + regFirstName +'"}';
	var url = urlBase + '/Register.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)

			{
				document.getElementById("registerResult").innerHTML = "registration successful";
			}
		};
		xhr.send(jsonPayload);

		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}

	document.getElementById("reg_firstname").value = reg_firstname.defaultValue;
	document.getElementById("reg_lastname").value =reg_lastname.defaultValue;
	document.getElementById("reg_username").value =reg_username.defaultValue;
	document.getElementById("reg_password").value =reg_password.defaultValue;
	document.getElementById("reg_password_confirm").value =reg_password_confirm.defaultValue;
}

function searchContacts()
{
	// var srch = document.getElementById("searchText").value;
	// document.getElementById("contactsSearchResult").innerHTML = "";
	//
	// var colorList = document.getElementById("contactsList");
	// colorList.innerHTML = "";
	//
	// var jsonPayload = '{"search" : "' + srch + '"}';
	// var url = urlBase + '/SearchContacts.' + extension;
	//
	// var xhr = new XMLHttpRequest();
	// xhr.open("POST", url, true);
	// xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	// try
	// {
	// 	xhr.onreadystatechange = function()
	// 	{
	// 		if (this.readyState == 4 && this.status == 200)
	// 		{
	// 			hideOrShow( "contactsList", true );
	//
	// 			document.getElementById("contactsSearchResult").innerHTML = "Contact(s) has been retrieved";
	// 			var jsonObject = JSON.parse( xhr.responseText );
	//
	// 			var i;
	// 			for( i=0; i<jsonObject.results.length; i++ )
	// 			{
	// 				var opt = document.createElement("option");
	// 				opt.text = jsonObject.results[i];
	// 				opt.value = "";
	// 				colorList.options.add(opt);
	// 			}
	// 		}
	// 	};
	// 	xhr.send(jsonPayload);
	// }
	// catch(err)
	// {
	// 	document.getElementById("contactsSearchResult").innerHTML = err.message;
	// }

}
