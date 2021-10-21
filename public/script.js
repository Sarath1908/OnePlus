$(document).ready(function(){
    $(".submit").on('click' , ()=>{
        $.post('/register' , {
                        name : $("#exampleInputfirstname").val() , 
                        phoneno : $("#exampleInputphoneno").val(),
                        email : $("#exampleInputEmail1").val() ,
                        variant : $("#variant").find(":selected").text()
                    })
        .then((data)=>{
            alert(data);
        })
        .catch(function(err){
            console.log(err);
        })
        $("#exampleInputfirstname").val("")
        $("#exampleInputphoneno").val("")
        $("#exampleInputEmail1").val("")
        $("#variant").find(":selected").text()
    })
})


let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}


