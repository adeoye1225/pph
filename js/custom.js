var company_code = "1172700";
$(document).ready(function() {


    

    $(document).on('click', '#btn-sign-in', function () {
        //alert("click");

        var username = $('#username').val();
        var password = $('#pwd').val();
        if (username == "") {
            alert("Kindly enter your username");
            $('#username').focus();
            return false;
        } else if (password == "") {
            alert("Kindly enter your password");
            $('#pwd').focus();
            return false;
        } else {

            //let response_array = login_event(company_code,username,password);
            $.ajax({
                type: "POST",
                url: "http://detechnovate.net/intuitive/access/api/login/"+company_code+"/",
                
                data: {username:username, password:password, company_code:company_code},
                dataType: 'json',

                success: function(msg){

                    //console.log(msg.result.success);
                    //alert(JSON.stringify(msg));
                    //return msg;
                    if (msg.status == 1){
                        var first_name = msg.data.first_name;
                        var token = msg.data.token;
                        localStorage.setItem('app_token', token);
                        localStorage.setItem('app_name', first_name);
                        alert(msg.message);
                        window.location.replace('inner.html');
                        return false;
                    } else {

                        alert(msg.message);
                        return false;
                    }

                },
                error: function(msg){
                    alert("Error connecting");

                }

            });
            return false;
        }

    });

    $(document).on('click', '#btn-register', function () {


        var email = $('#email').val();
        var password = $('#password').val();
        var con_password = $('#con_password').val();
        var mobile_no = $('#mobile-no').val();
        if (email == "") {
            alert("Kindly enter your email");
            $('#email').focus();
            return false;
        } else if (password == "") {
            alert("Kindly enter your password");
            $('#password').focus();
            return false;

        } else if (password.length < 7) {
            alert("Password must be at least 7 characters");
            $('#password').focus();
            return false;
        } else if (mobile_no == "") {
            alert("Kindly enter your mobile no");
            $('#mobile-no').focus();
            return false;
        } else if (mobile_no.length < 11) {
            alert("Mobile number should be 11 characters");
            $('#mobile-no').focus();
            return false;

        } else if (password != con_password) {
            alert("Password Mis-match");
            $('#password').focus();
            return false;

        } else {
            $.ajax({
                type: "POST",
                //url: "http://detechnovate.net/intuitive/access/api/register/"+company_code+"/",
                url: "http://detechnovate.net/intuitive/access/api/register/"+company_code+"/",
                data: {email:email, password:password, mobile_no:mobile_no},
                //data: {email:email, password:password, mobile_no:mobile_no},
                dataType: 'json',

                success: function(msg){

                    //console.log(msg.result.success);
                    //alert(JSON.stringify(msg));
                    //return msg;
                    if (msg.status == 1){

                        alert(msg.message);
                        window.location.replace('login.html');
                        return false;
                    } else {

                        alert(msg.message);
                        return false;
                    }

                },
                error: function(msg){
                    alert("Error connecting");

                }

            });
            return false;
        }
    });




    
    $(document).on('click', '#log_out', function () {

        var token = localStorage.getItem('app_token');
        localStorage.removeItem('app_token', token);
        localStorage.removeItem('app_name', first_name);
        $.ajax({
            type: "POST",
            url:"http://detechnovate.net/intuitive/api/log_out/",
            

            headers: {"token": token},
            data: {},
            dataType: "json",

            success: function (msg) {
                if(msg.status == 1) {

                   window.location.replace('login.html');
				   
                } else if(msg.status == 101){

                    alert(msg.message);
                    window.location.replace('login.html');
					
                } else {

                    alert(msg.message);
                    window.location.replace('login.html');
					
                }

            },
            error: function(msg){
                alert("Error connecting");
                window.location.replace('login.html');
				

            }

        });
		return false;
    });
	
	    $(document).on('click', '#btn-forgot-password', function () {
        //alert("click");

        var email = $('#fgt-email').val();

        if (email == "") {
            alert("Kindly enter your email address");
            $('#email').focus();
            return false;

        } else {

            
            $.ajax({
                type: "POST",
                url: "http://detechnovate.net/intuitive/access/api/forgot_password/"+company_code+"/",
                
                data: {email:email},
                dataType: 'json',

                success: function(msg){

                    if (msg.status == 1){
                        alert(msg.data.password);
                        window.location.replace('login.html');
                        return false;
                    } else {

                        alert(msg.message);
                        return false;
                    }

                },
                error: function(msg){
                    alert("Error connecting");

                }

            });

        }
        return false;
    });

    $(document).on('click', '#home-link', function () {
        window.location.replace('inner.html');
        return false;
    });

    //$(document).on('click', '.link-logout', function () {

      //  window.location.replace('login.html');
        //return false;
    //})

    $(document).on('click','#btn-slider-login',function (){
        window.location.replace('login.html');
        return false;
    });

    // $(document).on('click', '#btn-sign-in', function () {
    //     window.location.replace('inner.html');
    //     return false;
    // });
});








