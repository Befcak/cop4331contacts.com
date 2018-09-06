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
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var streetAddress = document.getElementById("streetAddress");
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var birthday = document.getElementById("birth").value;
    var note = document.getElementById("note").value;

    var t = document.createTextNode(first +' '+ last);
    li.appendChild(t);
    if (first === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById('firstName').value = firstName.defaultValue;
    document.getElementById('lastName').value = lastName.defaultValue;

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.appendChild(txt);

    document.getElementById('myModal').style.display = 'none';
}
