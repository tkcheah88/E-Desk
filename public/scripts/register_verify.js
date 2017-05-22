var password = document.getElementById("su_password");
var confirmpassword = document.getElementById("su_confirmpassword");

checkPassword = () => {
    if(password.value !== confirmpassword.value){
        return confirmpassword.setCustomValidity("Both passwords must be matching.");
    }
    confirmpassword.setCustomValidity("");
};