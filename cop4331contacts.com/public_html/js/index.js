var urlBase = 'http://cop4331contactmanager.xyz/API';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	lastIdClicked = 0;

	var login = document.getElementById("loginName").value;
	var password = md5(document.getElementById("loginPassword").value);

	// sanitizing the login and Password
	var i;
	for(i = 0; i < login.length; i++)
	{
		if(login[i] === ';' || login[i] === '/' || login[i] === '-' || login[i] == ')' || login[i]=='(')
		{
			alert("There are illegal characters in your login");
			document.getElementById("loginName").value = loginName.defaultValue;
			document.getElementById("loginPassword").value =loginPassword.defaultValue;
			return;
		}

		if(password[i] === ';' || password[i] === '/' || password[i] === '-'|| password[i] == ')' || password[i]=='(')
		{
			alert("There are illegal characters in your password.");
			document.getElementById("loginName").value = loginName.defaultValue;
			document.getElementById("loginPassword").value =loginPassword.defaultValue;
			return;
		}
	}

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

		document.getElementById("loggedInDiv").style.display = "inline";
		document.getElementById("loggedInDiv").style.visibility = "visible";
	//	hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);

	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

	searchContacts();
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
	var first = "";
	var last = "";
	//this needs to only have numbers or it doesn't work
	var phoneNum = "";
	var emailAdd = "";
	var streetAdd = "";
	var cityName = "";
	// this needs to only hold 2 letters or it doesn't work
	var stateName = "";
	var zipNum = "";
	var birthday = "" ;
	var notes = "";

	//var li = document.createElement("li");
	first = document.getElementById("firstN").value;
	last = document.getElementById("lastN").value;
	//this needs to only have numbers or it doesn't work
	if (document.getElementById("phone").value.length >= 10)
	{
		phoneNum = document.getElementById("phone").value;
	}
	emailAdd = document.getElementById("email").value;
	streetAdd = document.getElementById("streetAddress").value;
	cityName = document.getElementById("city").value;
	// this needs to only hold 2 letters or it doesn't work
	stateName = document.getElementById("state").value;
	if (document.getElementById("zip").value.length == 5)
	{
		zipNum = document.getElementById("zip").value;
	}
	birthday = document.getElementById("birth").value;
	notes = document.getElementById("note").value;

	document.getElementById("contactAddResult").innerHTML = "";

//	alert(userId + ',' + first + ', ' + last + ', ' + phoneNum + ', ' + emailAdd + ', ' + streetAdd+ ', ' + cityName + ', ' + stateName + ', ' + zipNum + ', ' + birthday + ', ' + notes);
	var jsonPayload = '{"userID" : "' + userId + '", "firstName" : "' + first + '", "lastName" : "' + last + '", "streetAddress" : "' + streetAdd + '", "city" : "' + cityName + '", "state" : "' + stateName + '", "zip" : "' + zipNum + '", "phone" : "' + phoneNum + '", "email" : "' + emailAdd + '", "birthday" : "' + birthday + '", "notes" : "' + notes + '"}';

	var url = urlBase + '/AddContactSanitized.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				//document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
/*
	var t = document.createTextNode(first +' '+ last);
	li.appendChild(t);
	if (first === '' || last === '') {
		alert("You must write something!");
	} else {
		document.getElementById("myUL").appendChild(li);
	}

	document.getElementById('firstN').value = firstN.defaultValue;
	document.getElementById('lastN').value = lastN.defaultValue;
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
*/
	document.getElementById('myModal').style.display = 'none';

	setTimeout(searchContacts, 500);

	//searchContacts();

}

// added register function
// works similarly to a mix of the addcolor function and the login function
// currently follows the parameters set in the html file but can be later changed to match the php file idk
// -Updated 9/8/2018
function register()
{
	var regPassword;
	var regFirstName = document.getElementById("reg_firstname").value;
	var regLastName = document.getElementById("reg_lastname").value;
	var regUsername = document.getElementById("reg_username").value;
	var regtempPassword = document.getElementById("reg_password").value;
	var regPasswordConfirm = document.getElementById("reg_password_confirm").value;
	document.getElementById("registerResult").innerHTML = "";

	// Check passwords match
	if(regtempPassword != regPasswordConfirm)
	{
		document.getElementById("registerResult").innerHTML = "Passwords don't match!";
		//document.getElementById("reg_firstname").value = reg_firstname.defaultValue;
		//document.getElementById("reg_lastname").value =reg_lastname.defaultValue;
		//document.getElementById("reg_username").value =reg_username.defaultValue;
		document.getElementById("reg_password").value =reg_password.defaultValue;
		document.getElementById("reg_password_confirm").value =reg_password_confirm.defaultValue;
		return;
	}

	// Check password exists
	if(regtempPassword == "" || regtempPassword == null || regtempPassword == undefined || regtempPassword == "" || regtempPassword == null || regPasswordConfirm == undefined)
	{
		document.getElementById("registerResult").innerHTML = "Invalid password!";
		//document.getElementById("reg_firstname").value = reg_firstname.defaultValue;
		//document.getElementById("reg_lastname").value =reg_lastname.defaultValue;
		//document.getElementById("reg_username").value =reg_username.defaultValue;
		document.getElementById("reg_password").value =reg_password.defaultValue;
		document.getElementById("reg_password_confirm").value =reg_password_confirm.defaultValue;
		return;
	}

	// sanitizing the login and Password
	var i;
	for(i = 0; i < regUsername.length; i++)
	{
		if(regUsername[i] === ';' || regUsername[i] === '/' || regUsername[i] === '-' || regUsername[i] == ')' || regUsername[i]=='(')
		{
			alert("There are illegal characters in your username");
			document.getElementById("regUsername").value = regUsername.defaultValue;
			document.getElementById("regPassword").value =regPassword.defaultValue;
			return;
		}
	}
	for(i = 0; i < regtempPassword.length; i++)
	{
		if(regtempPassword[i] === ';' || regtempPassword[i] === '/' || regtempPassword[i] === '-'|| regtempPassword[i] == ')' || regtempPassword[i]=='(')
		{
			alert("There are illegal characters in your password.");
			document.getElementById("loginName").value = loginName.defaultValue;
			document.getElementById("loginPassword").value =loginPassword.defaultValue;
			return;
		}
	}

		regPassword =  md5(regtempPassword);

	var jsonPayload = '{"firstName" : "' + regFirstName + '", "lastName" : "' + regLastName + '", "login" : "' + regUsername
	+ '", "password" : "' + regPassword +'"}';
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
				document.getElementById("registerResult").innerHTML = "registration successful!";
			}
		};
		xhr.send(jsonPayload);

		// forces you to login after registration is successful, I know it seems inefficient but
		// the register,php function is written like so
		// i could technically add the functionality by allowing this function to call the php.login function but we'll see for now
		//hideOrShow( "loggedInDiv", true);
		//hideOrShow( "accessUIDiv", true);
		//hideOrShow( "loginDiv", false);
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
	while(myUL.hasChildNodes())
	{
		myUL.removeChild(myUL.childNodes[0]);
	}
	//SELECT * FROM contacts WHERE userID = "1" AND (firstName LIKE 'bob' OR lastName LIKE '' OR email LIKE '')
	var srch = document.getElementById("searchText").value;
	// document.getElementById("contactsSearchResult").innerHTML = "";

//	var contList = document.getElementById("contactsList");
	//contList.innerHTML = "";

	var jsonPayload = '{"userID": "'+ userId +'","search" : "' + srch + '"}';
	var url = urlBase + '/SearchContactsSanitized.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
	 	{
	 		if (this.readyState == 4 && this.status == 200)
			{
				//hideOrShow( "contactsList", true );

				//document.getElementById("contactsSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				var i, j;
				for( i=0; i<jsonObject.results.length-6; i+=11)
				{
					var li = document.createElement("li");
					var t = document.createTextNode(jsonObject.results[i+1] + " " + jsonObject.results[i+2]);
					li.appendChild(t);
					document.getElementById("myUL").appendChild(li);
					var span = document.createElement("SPAN");
					var txt = document.createTextNode("\u00D7");
					li.id = jsonObject.results[i];
					li.setAttribute('onclick', "displayInfo(this.id)");
					span.appendChild(txt);

					if(document.getElementById("div" + li.id) != null)
					{
						continue;
					}
					var div = document.createElement("div");
					div.id = ("div" + li.id);
					div.style.display = "none";
					div.style.visibility = "hidden";
					// document.getElementById("infoDis").insertAdjacentHTML('beforeend', div);
					document.getElementById("infoDis").appendChild(div);
					div.class = "inner";
		//			for(j = i+1; j <= i+10; j++)
		//			{
		//				if (jsonObject.results[j] != "")
		//				{
		//					var paragraph = "<p>"+jsonObject.results[j]+"</p>";
		//					document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
		//				}
		//
//
//					}


					var paragraph = "<p>Name: "+jsonObject.results[i+1]+" "+ jsonObject.results[i+2] + "</p>";
					document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);


					if (jsonObject.results[i+3] != "")
					{
						var paragraph = "<p>Address: "+jsonObject.results[i+3]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
					if (jsonObject.results[i+4] != "")
					{
						var paragraph = "<p>City: "+jsonObject.results[i+4]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
					if (jsonObject.results[i+5] != "")
					{
						var paragraph = "<p>State: "+jsonObject.results[i+5]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
					if (jsonObject.results[i+6] != "")
					{
						var paragraph = "<p>Zip: "+jsonObject.results[i+6]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
					if (jsonObject.results[i+7] != "")
					{
						var paragraph = "<p>Phone: "+jsonObject.results[i+7]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
					if (jsonObject.results[i+8] != "")
					{
						var paragraph = "<p>Email: "+jsonObject.results[i+8]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
					if (jsonObject.results[i+9] != "")
					{
						var paragraph = "<p>Birthday: "+jsonObject.results[i+9]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
					if (jsonObject.results[i+10] != "")
					{
						var paragraph = "<p>Notes: "+jsonObject.results[i+10]+"</p>";
						document.getElementById(div.id).insertAdjacentHTML('beforeend', paragraph);
					}
				}
			}
	 	};
	 	xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactsSearchResult").innerHTML = err.message;
	}


}

function displayInfo(id)
{
if(lastIdClicked >= 1){
	document.getElementById("div" + lastIdClicked).style.display = "none";
	document.getElementById("div" + lastIdClicked).style.visibility = "hidden";
}
	document.getElementById("div" + id).style.display = "block";
	document.getElementById("div" + id).style.visibility = "visible";

	lastIdClicked = id;

}

function deleteContact()
{
    if (confirm("Confirm Delete")) {
       ;
	    //document.getElementById("deleteContactResult").innerHTML = "Contact has been deleted!";
    } else {
        return;
    }
	document.getElementById("div" + lastIdClicked).style.display = "none";
	document.getElementById("div" + lastIdClicked).style.visibility = "hidden";


	//var jsonPayload = '{"userId": "'+ testUserId +'","contactId" : "' + testContactId + '"}';

	var jsonPayload = '{"userId": "'+ userId +'","contactId" : "' + lastIdClicked + '"}';
	var url = urlBase + '/DeleteContactSanitized.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
	 	{
	 		if (this.readyState == 4 && this.status == 200)
			{
				;
				//document.getElementById("deleteContactResult").innerHTML = "Contact has been deleted!";
			}
	 	};
	 	xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("deleteContactResult").innerHTML = err.message;
	}

	setTimeout(searchContacts, 500);

}
