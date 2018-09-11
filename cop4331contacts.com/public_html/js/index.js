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

	first = document.getElementById("firstN").value;
	last = document.getElementById("lastN").value;
	//this needs to only have numbers or it doesn't work
	phoneNum = document.getElementById("phone").value;
	emailAdd = document.getElementById("email").value;
	streetAdd = document.getElementById("streetAddress").value;
	cityName = document.getElementById("city").value;
	// this needs to only hold 2 letters or it doesn't work
	stateName = document.getElementById("state").value;
	zipNum = document.getElementById("zip").value;
	birthday = document.getElementById("birth").value;
	notes = document.getElementById("note").value;

	document.getElementById("contactAddResult").innerHTML = "";

	alert(userId + ',' + first + ', ' + last + ', ' + phoneNum + ', ' + emailAdd + ', ' + streetAdd+ ', ' + cityName + ', ' + stateName + ', ' + zipNum + ', ' + birthday + ', ' + notes);
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
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
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

	document.getElementById('myModal').style.display = 'none';
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
	var regPassword = md5(document.getElementById("reg_password").value);
	var regPasswordConfirm = md5(document.getElementById("reg_password_confirm").value);
	document.getElementById("registerResult").innerHTML = "";





		// added password check
		if(regPassword != regPasswordConfirm)
		{
			document.getElementById("registerResult").innerHTML = "Passwords don't match!";
			//document.getElementById("reg_firstname").value = reg_firstname.defaultValue;
			//document.getElementById("reg_lastname").value =reg_lastname.defaultValue;
			//document.getElementById("reg_username").value =reg_username.defaultValue;
			document.getElementById("reg_password").value =reg_password.defaultValue;
			document.getElementById("reg_password_confirm").value =reg_password_confirm.defaultValue;
			return;
		}


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
	//SELECT * FROM contacts WHERE userID = "1" AND (firstName LIKE 'bob' OR lastName LIKE '' OR email LIKE '')

	// ID from the HTML.
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactsSearchResult").innerHTML = "";

	var contList = document.getElementById("contactsList");
	contList.innerHTML = "";

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
				//hideOrShow( "contactsList", true );
				var jsonObject = JSON.parse( xhr.responseText );
				document.getElementById("contactsSearchResult").innerHTML = jsonObject.results[0];
				console.log(jsonObject.searchResults);
				var input = document.getElementById("searchText");
				var ul = document.getElementById("UL");
				var filter = input.value.toUpperCase();
				var list;
				for(var i=0; i<jsonObject.searchResults.length; i++ )
				{
					list = document.createElement('li');
					if(i ==1){
					list.innerHTML = jsonObject.searchResults[1];
					ul.appendChild(li);
					}else if(i == 2)
					{
					list.innerHTML = jsonObject.searchResults[2];
					ul.appendChild(li);
						
					}
					
					
					
					
					//var opt = document.createElement("option");
					//opt.text = jsonObject.searchResults[i];
					//opt.value = "";
					//contList.options.add(opt);
				}
				
					
			}
	 	};
	 	xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactsSearchResult").innerHTML = err.message;
	}
}
