<?php
if(!isset($_POST["nl_sub"])){
//WELCOME AJAX CONTACT FORM MAILER

//Stripping tags so if even user writes tags like <div></div> or <a href=""></a>, these are just getting cleared.
//Making ready the content for e-mail by the way
	$mailContent = '';
	foreach($_POST as $key => $val){

		$_POST[$key] = strip_tags($val);
		$mailContent .= $key.' : '.$_POST[$key].'<br>';
	}

//Getting rid of backslashes
	$mailContent = $mailContent != "" ? stripslashes($mailContent) : '';

//Which mail address you are going to use
	$fromMail = 'info@yourdomain.com';

//Which mail address will contain emails coming from contact form
	$toMail = 'info@yourdomain.com';

//Subject of mail
	$subject = 'E-Mail From YourDomain.Com';

	$headers  = "MIME-Version: 1.0 \n";
	$headers .= "Content-type: text/html; charset=utf-8 \n";
	$headers .= "From: "     . $fromMail. " \n".
		"Reply-To: " . $fromMail. " \n".
		"X-Mailer: PHP/" . phpversion();


	if(mail($toMail, $subject, $mailContent, $headers)){
		echo '1';
	}else{
		echo '0';
	}
}