var password = document.getElementById("password");
var confirmpassword = document.getElementById("confirmpassword");

checkPassword = () => {
    if(password.value !== confirmpassword.value){
        return confirmpassword.setCustomValidity("Both passwords must be matching.");
    }
    confirmpassword.setCustomValidity("");
};