function validateForm(event) {
    let myForm = document.querySelector("#myForm");
 
    myForm.name.style.backgroundColor = "LightGreen";
    myForm.videogame.style.backgroundColor = "LightGreen";
    myForm.rating.style.backgroundColor = "LightGreen";
    myForm.completion.style.backgroundColor = "LightGreen";
    myForm.details.style.backgroundColor = "LightGreen";
    
    if (myForm.name.value.isempty() ) {
       myForm.name.style.backgroundColor = "Orange";
    }
 }
 
 let myForm = document.querySelector("#myForm");
 myForm.validate.addEventListener("click", validateForm);