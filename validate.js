function validateForm(event) {
    let myForm = document.querySelector("#myForm");
 
    myForm.name.style.backgroundColor = "LightGreen";
    myForm.videogame.style.backgroundColor = "LightGreen";
    myForm.rating.style.backgroundColor = "LightGreen";
    myForm.completion.style.backgroundColor = "LightGreen";
    myForm.details.style.backgroundColor = "LightGreen";
    
    if (myForm.name.value.length == 0) {
       myForm.name.style.backgroundColor = "Orange";
    }
    if (myForm.videogame.value.length == 0) {
      myForm.videogame.style.backgroundColor = "Orange";
   }
    if (myForm.rating.value.length == 0) {
      myForm.rating.style.backgroundColor = "Orange";
    }
    if (myForm.completion.value.length == 0) {
      myForm.completion.style.backgroundColor = "Orange";
    }

 }
 
 let myForm = document.querySelector("#myForm");
 myForm.validate.addEventListener("click", validateForm);