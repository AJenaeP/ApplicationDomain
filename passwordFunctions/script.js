var attempt = 3;

function resetAll() {
  attempt = 3;
  document.getElementById("username").disabled = false;
  document.getElementById("password").disabled = false;
  document.getElementById("login").disabled = false;
  document.getElementById("msg").innerHTML = "";
  document.getElementById("reset").style.display = "none";
}

function userLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username == "" || password == "") {
    alert("Please complete the required field!");
  } else {
    if (username == "admin" && password == "admin") {
      alert("Login successfully");
    } else {
      attempt--;
      document.getElementById("msg").innerHTML =
        "<center class='text-danger'>Invalid username or password</center>";
      alert("You have left " + attempt + " login attempt;");
      if (attempt == 0) {
        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;
        document.getElementById("login").disabled = true;
        document.getElementById("reset").style.display = "inline";
      }
    }
  }
}
