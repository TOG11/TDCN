const express = require('express');
const path = require('path');
const app = express(); 
const port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload');
var detect = require('detect-file-type')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var fs = require('fs');
var busboy = require('connect-busboy');
const favicon = require('express-favicon');
app.use(favicon(__dirname + '/favicon.ico'));
app.set('view engine', 'jade');
var url = require('url');
const request = require('request');
const RequestIp = require('@supercharge/request-ip')
const insertLine = require('insert-line')
var nodemailer = require('nodemailer');
var child_process = require('child_process');

app.get('/', function(req, res) {

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const obj = JSON.parse(JSON.stringify(query))
  console.log(obj)
    if (obj) {
      if (obj.authToken) {
        if(obj.authToken == 'beta_tester1ffgb4b@v3fg3new4$TDCN') {
          res.cookie('Authorized_BetaTester', 'true', { expires: new Date(Date.now() + 900000), secure: true})
        }
      }
    }

  if (req.cookies.Authorized_BetaTester == 'true') {
  res.sendFile(path.join(__dirname, './site/Upload.html'))
  res.clearCookie('uploadFinished');
} else {
  res.sendFile(path.join(__dirname, './site/Upload.html'));

}
}); 

app.use(busboy()); 

app.get('/filetypes', function(req,res,next){
  res.sendFile(path.join(__dirname, './site/FileTypes.html'));
})

app.get('/account', function(req,res,next){
var ip = RequestIp.getClientIp(req)
  if (fs.existsSync('./data/uploads/users/'+ip+'.txt')) {
    var accountid = fs.readFileSync('./data/uploads/users/'+ip+'.txt', 'utf8')
    if (!fs.existsSync('./data/uploads/users/'+accountid+'/email.eml')) {
      if (!fs.existsSync('./data/uploads/users/'+accountid+'/expire.js')) {
   fs.writeFileSync('./data/uploads/users/'+accountid+'/expire.js', ` 
   var fs = require('fs');
  
  var myVar;

  function myFunction() {
    myVar = setTimeout(function(){ 

      fs.rmdir('./data/uploads/users/'+${accountid}, { recursive: true },function  (err)  {
        if (err) throw err
      })
      fs.unlinkSync('./data/uploads/users/${ip}.txt')
      console.log('User Account ID: ${accountid} Has Been Deleted. (Account Expired)')
      process.exit(1)
    }, 172800000);
  }


  function intervalFunc() {
    if (!fs.existsSync('./data/uploads/users/${accountid}/expire.vrf')) {
    console.log('Account ID: ${accountid} Verified, Stopping Automatic Deletion')
    fs.unlinkSync('./data/uploads/users/${accountid}/expire.js')
    process.exit(1)
    } 
  }
  
  setInterval(intervalFunc, 2500);
  
 


   `)
   fs.writeFileSync('./data/uploads/users/'+accountid+'/expire.vrf', ``)
   child_process.exec('node ./data/uploads/users/'+accountid+'/expire.js', function(error, stdout, stderr) {
    console.log(stdout);
}); 
res.sendFile(path.join(__dirname, './data/uploads/users/'+accountid+'/account.html'));
console.log('Account ID:'+accountid+'Has Been Created , Expires in 48 hours.')
      } else{res.sendFile(path.join(__dirname, './data/uploads/users/'+accountid+'/account.html'));}
    } else {res.sendFile(path.join(__dirname, './data/uploads/users/'+accountid+'/account.html'));}
  } else {
  
    res.sendFile(path.join(__dirname, './site/Account.html'));
  }

  
})
app.get('/auth', function(req,res,next){
  var ip = RequestIp.getClientIp(req)
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const obj = JSON.parse(JSON.stringify(query))
  if (obj) {
    if (obj.accountid) {
      if (fs.existsSync('./data/uploads/users/'+obj.accountid)) {
        if (fs.existsSync('./data/uploads/users/'+obj.accountid+'/email.eml')) {         
          var code = Math.floor(Math.random() *20000000)
var email = fs.readFileSync('./data/uploads/users/'+obj.accountid+'/email.eml', 'utf8')
          var name = email
          console.log(name)

         
          res.cookie('account_id', obj.accountid, {expires: new Date(Date.now() + 99999999), secure: true })
          fs.writeFileSync(`./data/uploads/users/${ip}_logincode.html`, `</html><!DOCTYPE html>
<title>TDCN - Authorize</title>

<html>
<head>
<link rel="icon" type="image/png" href="/favicon.png"/>
<link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap">
<style>
  

/* 
2021 Togi
https://tog1.me
*/  
body {
text-align:center;
background-size: cover;
background-position: center;
height: 100vh;
    padding:0;
    margin:0; 
    font-family: 'Fredoka One', serif;
        font-size: 48px;
}
h1   {color: rgb(11, 218, 208);}
p    {color: rgb(26, 235, 165);}
html, body {
  width: 100%;
  height:100%;
}

body {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

html, body {
  height: 75%;
}

.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topnav {
  background-color: rgb(0, 0, 0);
  overflow: hidden;
}


.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}


.topnav a:hover {
  background-color: rgb(0, 255, 255);
  color: black;
}


.topnav a.active {
  background-color: #00ffbf;
  color: rgb(0, 0, 0);
}
.site-footer
{
  background-color:#000000;
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#04ff8a;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#27a9d1;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
.social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
.social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
.social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
.social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
.social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#29aafe
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
.social-icons a.facebook:hover
{
  background-color:#3b5998
}
.social-icons a.twitter:hover
{
  background-color:#00aced
}
.social-icons a.linkedin:hover
{
  background-color:#007bb6
}
.social-icons a.dribbble:hover
{
  background-color:#ea4c89
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}

#code_user {
  border-radius: 25px;
  border: #00eeff;
  padding: 15px; 
  width: 200px;
  box-shadow: 5px 10px #888888;
  border-style: double;
  border-width: thick;
}

.submit {
  min-width: 300px;
  min-height: 60px;
  font-family: 'Righteous', sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: #313133;
  background: #4FD1C5;
background: linear-gradient(90deg, rgba(129,230,217,1) 0%, rgba(79,209,197,1) 100%);
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px rgba(79,209,197,.64);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
  }

.submit::before {
content: '';
  border-radius: 1000px;
  min-width: calc(300px + 12px);
  min-height: calc(60px + 12px);
  border: 6px solid #00FFCB;
  box-shadow: 0 0 60px rgba(0,255,203,.64);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all .3s ease-in-out 0s;
}

.submit:hover, .submit:focus {
  color: #313133;
  transform: translateY(-6px);
}

.submit:hover::before, .submit:focus::before {
  opacity: 1;
}

.submit::after {
  content: '';
  width: 30px; height: 30px;
  border-radius: 100%;
  border: 6px solid #00FFCB;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

.submit:hover::after, .submit:focus::after {
  animation: none;
  display: none;
}

</style>
</head>
<body>
  <script>
  function verify() {
    var usr_code = document.getElementById("code_user").value
    if (usr_code == ${code}) {
  document.cookie = "authed=true; expires=Thu, 18 Dec 2025 12:00:00 UTC";
  document.getElementById("code").innerHTML = 'Correct, Redirecting Now...'
  window.location.href = "https://togi.cloud.ngrok.io/auth/confirm/login";
    } else {
      document.getElementById("code").innerHTML = 'Invalid Code'
    }
    
}

  </script>
  <div class="topnav">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/filetypes">Supported File Types</a>
    <a href="/account"> Account Create/Login</a>
  </div>

  <a>Togi's Digital Cloud Network</a>
  <h1> ㅤ</h1>
<h3 id="code"></h3>
<h4>Email Sent To: ${name}</h4>

    <div form__group field>
    <label for="code"><small>Email Code:</small></label>
    <input type="text" id="code_user" placeholder="Code Sent To Your Email"><br><br>
    <input type="submit" value="Submit" class="submit" onclick="verify()">



<h1>ㅤ </h1>
<h1>ㅤ </h1>
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <p class="text-justify"> Upload Large Vidoes & Share!</p>
        </div>

        <div class="col-xs-6 col-md-3">
        </div>
      </div>
      <hr>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright © 2021 Togi's Digital Cloud Network TDCN, All Rights Reserved by 
            <a href="https://togar.media">Togar Media Group</a>.
          </p>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">

        </div>
      </div>
    </div>
</footer>

</body>
</html>

`)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'togarmediagroup@gmail.com',
    pass: 'Sexyd0gg#12'
  }
});

var mailOptions = {
  from: 'togarmediagroup@gmail.com',
  to: name,
  subject: 'Login Code For tog1.cloud',
  text: `Login Code For tog1.cloud

Your Account Login Code

${code}

________________________________
2021 TMG Inc.`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
          
res.redirect('/auth/email/confirm')

        } else { 
          fs.writeFileSync('./data/uploads/users/'+ip+'.txt', `${obj.accountid}`)
        }
        
      }
console.log(obj.accountid)

    }
    }
res.redirect('/account')
})

app.get('/auth/email/confirm', function(req,res,next){
  if (req.cookies.account_id) {
    var ip = RequestIp.getClientIp(req)
    let accountid = req.cookies.account_id
  res.sendFile(path.join(__dirname, './data/uploads/users/'+ip+'_logincode.html'));
  } else {res.redirect('/')}
})

app.get('/emailauth', function(req,res,next){
var ip = RequestIp.getClientIp(req)
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
const obj = JSON.parse(JSON.stringify(query))
console.log(obj)

if (obj) {
  if (obj.email) {
    console.log(ip)
    var accountid = fs.readFileSync('./data/uploads/users/'+ip+'.txt', 'utf8')
    console.log(accountid)
    fs.writeFile(`./data/uploads/users/${accountid}/email.txt`, `${obj.email}`, (err) => {
      if (err) throw err
    })
var code = Math.floor(Math.random() *20000000)
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'togarmediagroup@gmail.com',
    pass: 'Sexyd0gg#12'
  }
});

var mailOptions = {
  from: 'togarmediagroup@gmail.com',
  to: obj.email,
  subject: 'Enable Email Auth on tog1.cloud',
  text: `Enable Email Auth on tog1.cloud

Your Account Email Auth Code:

${code}

________________________________
2021 TMG Inc.`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

res.cookie('authv', 'viewable', {expires: new Date(Date.now() + 1000000000), secure: true })
fs.writeFile(`./data/uploads/users/${ip}_code.html`, `</html><!DOCTYPE html>
<title>TDCN - Authorize</title>

<html>
<head>
<link rel="icon" type="image/png" href="/favicon.png"/>
<link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap">
<style>
  

/* 
2021 Togi
https://tog1.me
*/  
body {
text-align:center;
background-size: cover;
background-position: center;
height: 100vh;
    padding:0;
    margin:0; 
    font-family: 'Fredoka One', serif;
        font-size: 48px;
}
h1   {color: rgb(11, 218, 208);}
p    {color: rgb(26, 235, 165);}
html, body {
  width: 100%;
  height:100%;
}

body {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

html, body {
  height: 75%;
}

.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topnav {
  background-color: rgb(0, 0, 0);
  overflow: hidden;
}


.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}


.topnav a:hover {
  background-color: rgb(0, 255, 255);
  color: black;
}


.topnav a.active {
  background-color: #00ffbf;
  color: rgb(0, 0, 0);
}
.site-footer
{
  background-color:#000000;
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#04ff8a;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#27a9d1;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
.social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
.social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
.social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
.social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
.social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#29aafe
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
.social-icons a.facebook:hover
{
  background-color:#3b5998
}
.social-icons a.twitter:hover
{
  background-color:#00aced
}
.social-icons a.linkedin:hover
{
  background-color:#007bb6
}
.social-icons a.dribbble:hover
{
  background-color:#ea4c89
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}

#code_user {
  border-radius: 25px;
  border: #00eeff;
  padding: 15px; 
  width: 200px;
  box-shadow: 5px 10px #888888;
  border-style: double;
  border-width: thick;
}

.submit {
  min-width: 300px;
  min-height: 60px;
  font-family: 'Righteous', sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: #313133;
  background: #4FD1C5;
background: linear-gradient(90deg, rgba(129,230,217,1) 0%, rgba(79,209,197,1) 100%);
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px rgba(79,209,197,.64);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
  }

.submit::before {
content: '';
  border-radius: 1000px;
  min-width: calc(300px + 12px);
  min-height: calc(60px + 12px);
  border: 6px solid #00FFCB;
  box-shadow: 0 0 60px rgba(0,255,203,.64);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all .3s ease-in-out 0s;
}

.submit:hover, .submit:focus {
  color: #313133;
  transform: translateY(-6px);
}

.submit:hover::before, .submit:focus::before {
  opacity: 1;
}

.submit::after {
  content: '';
  width: 30px; height: 30px;
  border-radius: 100%;
  border: 6px solid #00FFCB;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

.submit:hover::after, .submit:focus::after {
  animation: none;
  display: none;
}

</style>
</head>
<body>
  <script>
  function verify() {
    var usr_code = document.getElementById("code_user").value
    if (usr_code == ${code}) {
  document.cookie = "authed=true; expires=Thu, 18 Dec 2025 12:00:00 UTC";
  document.getElementById("code").innerHTML = 'Correct, Redirecting Now...'
  window.location.href = "https://togi.cloud.ngrok.io/auth/confirm";
    } else {
      document.getElementById("code").innerHTML = 'Invalid Code'
    }
    
}

  </script>
  <div class="topnav">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/filetypes">Supported File Types</a>
    <a href="/account"> Account Create/Login</a>
  </div>

  <a>Togi's Digital Cloud Network</a>
  <h1> ㅤ</h1>
<h3 id="code"></h3>

    <div form__group field>
    <label for="code"><small>Email Code:</small></label>
    <input type="text" id="code_user" placeholder="Code Sent To Your Email"><br><br>
    <input type="submit" value="Submit" class="submit" onclick="verify()">



<h1>ㅤ </h1>
<h1>ㅤ </h1>
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <p class="text-justify"> Upload Large Vidoes & Share!</p>
        </div>

        <div class="col-xs-6 col-md-3">
        </div>
      </div>
      <hr>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright © 2021 Togi's Digital Cloud Network TDCN, All Rights Reserved by 
            <a href="https://togar.media">Togar Media Group</a>.
          </p>
        </div>
        <div class="col-md-4 col-sm-6 col-xs-12">

        </div>
      </div>
    </div>
</footer>

</body>
</html>

`, (err) => {
  if (err) throw err
})
res.redirect('/auth/email')
    } else {res.redirect('/')}
} else {res.redirect('/')}

})
app.get('/auth/email', function(req,res,next){
  if (req.cookies.authv) {
    var ip = RequestIp.getClientIp(req)
  res.sendFile(path.join(__dirname, `./data/uploads/users/${ip}_code.html`));
  } else res.redirect('/')
})

app.get('/auth/confirm', function(req,res,next){
  if (req.cookies.authed) {
    
    var ip = RequestIp.getClientIp(req)
    fs.unlinkSync('./data/uploads/users/'+ip+'_code.html')
    
    var accountid = fs.readFileSync('./data/uploads/users/'+ip+'.txt', 'utf8')
    var email = fs.readFileSync('./data/uploads/users/'+accountid+'/email.txt', 'utf8')
    fs.unlinkSync('./data/uploads/users/'+accountid+'/email.txt')
    if (fs.existsSync('./data/uploads/users/'+accountid+'/expire.vrf')) {
    fs.unlinkSync('./data/uploads/users/'+accountid+'/expire.vrf')
    }
    fs.writeFile(`./data/uploads/users/${accountid}/email.eml`, `${email}`, (err) => {
      if (err) throw err
    })
    insertLine('./data/uploads/users/'+accountid+'/account.html').content(`<h3>Email Auth Enabled    </h3> <script>function hide() {document.getElementById("hide").style.visibility = "hidden" 
    document.getElementById("hide1").style.visibility = "hidden"}</script>`).at(385).then(function(err) {
    })
    res.cookie('authed', 'viewable', {expires: new Date(Date.now() + 1), secure: true })
  res.redirect('/')
  } else res.redirect('/')
})

app.get('/about', function(req,res,next){
  res.sendFile(path.join(__dirname, '/site/about.html'));
})

app.get('/auth/confirm/login', function(req,res,next){
  if (req.cookies.account_id) {

  var accountid = req.cookies.account_id
  var ip = RequestIp.getClientIp(req)
fs.unlinkSync('./data/uploads/users/'+ip+'_logincode.html')
  fs.writeFileSync('./data/uploads/users/'+ip+'.txt', `${accountid}`)

  res.redirect('/account')
  res.cookie('account_id', '', {expires: new Date(Date.now() + 1), secure: true })
  } else {res.redirect('/account')}
})

app.get('/logout', function(req,res,next){
  var ip = RequestIp.getClientIp(req)
  fs.unlinkSync('./data/uploads/users/'+ip+'.txt')
  res.sendFile(path.join(__dirname, './site/logout.html'));
})

app.get('/anw', function(req,res,next){
  var AccountId = Math.floor(Math.random() *10000000000000000)
  var ip = req.cookies.ip_auth

  if (req.cookies.ip_auth) {

console.log(ip)

fs.mkdir('./data/uploads/users/'+AccountId, (err) => {
  if (err) throw err
})
fs.mkdir('./data/uploads/users/'+AccountId+'/media', (err) => {
  if (err) throw err
})

fs.writeFile('./data/uploads/users/'+ip+'.txt', `${AccountId}`, (err) => {
  if (err) throw err
})

fs.writeFile('./data/uploads/users/'+AccountId+'/ip.txt', `${ip}`, (err) => {
  if (err) throw err
})


fs.writeFile('./data/uploads/users/'+AccountId+'/html.num', `399`, (err) => {
  if (err) throw err
})

fs.writeFile('./data/uploads/users/'+AccountId+'/img.num', `1`, (err) => {
  if (err) throw err
})


fs.writeFile('./data/uploads/users/'+AccountId+'/account.id', `${AccountId}`, (err) => {
  if (err) throw err
})

var htmlpreset = fs.readFileSync('./site/accountpreset.html', 'utf8')
function myFunc() {
  res.sendFile(path.join(__dirname, './data/uploads/users/'+AccountId+'/account.html'));
}


setTimeout(myFunc, 700);
fs.writeFile('./data/uploads/users/'+AccountId+'/account.html', `${htmlpreset}`, (err) => {
  if (err) throw err
})

res.cookie('ip_auth', '', {expires: new Date(Date.now() + 1), secure: true })




  } else {

    res.redirect('/')







  }
})

app.get('/loading', function(req,res,next){
  res.sendFile(path.join(__dirname, './site/uploading.html'));
})

app.get('/huh.gif', function(req,res,next){
  res.sendFile(path.join(__dirname, './huh.gif'));
})


app.get('/data/uploads/users/', function(req,res,next){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const obj = JSON.parse(JSON.stringify(query))
  console.log(obj)
    if (obj) {
      if (obj.img) {
          console.log(obj.img)
        res.sendFile(path.join(__dirname, '/data/uploads/users/'+obj.img));
     
      } else if (obj.ip) {
        res.sendFile(path.join(__dirname, '/data/uploads/users/'+obj.ip+'.txt'));
      } else if (obj.ac) {
        res.sendFile(path.join(__dirname, '/data/uploads/users/'+obj.ac+'/img.num'));
      } else if (obj.em) {
        res.sendFile(path.join(__dirname, '/data/uploads/users/'+obj.ac+'/email.txt'));
      }
       }
      })

app.post('/upload', function(req, res) {
  var authenticated = false
  var ip = RequestIp.getClientIp(req)

 
  if (fs.existsSync('./data/uploads/users/'+ip+'.txt')) {
    function myFunc() {
     var accountid = fs.readFileSync('./data/uploads/users/'+ip+'.txt', 'utf8')
    


   

  var authenticated = true;

  if(authenticated === true){

    var fstream;
    var line2 = fs.readFileSync('./data/uploads/users/'+accountid+'/html.num', 'utf8')
    var line3 = fs.readFileSync('./data/uploads/users/'+accountid+'/img.num', 'utf8')
    var abc = parseInt(line2, 10)
    var abcd = parseInt(line3, 10)
    var line = abc +1
    var line4 = abcd +1
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
      if (filename == '') {
        res.redirect('/')
        res.end()
      } else {
       fstream = fs.createWriteStream(__dirname + '/data/uploads/users/'+accountid+'/media/'+filename)
      
        file.pipe(fstream)
        fstream.on('close', function () { 
 
          detect.fromFile('./data/uploads/users/'+accountid+'/media/'+filename, function(err, ext1) {

            fs.truncateSync('./data/uploads/users/'+accountid+'/img.num');

            fs.writeFileSync('./data/uploads/users/'+accountid+'/img.num', `${line4}`)

            if (err) {
              return console.log(err);
            }
            if (ext1 === null || ext1 === undefined || ext1 == 'null' || ext1 == 'undefined') {
              res.sendFile(path.join(__dirname, './site/InvalidFileType.html'))
              fs.unlink('/data/uploads/users/'+accountid+'/media/'+filename, (err) => {
                if (err) throw err
              })
            } else {
              var ext = ext1.ext
            if (ext == 'py' || ext == 'js' || ext == 'bat' || ext == 'asp' || ext == 'html' || ext == 'vbs' || ext == 'wsf' || ext == 'wsh' || ext == 'cmd' || ext == 'exe' || ext == 'jar' || ext == 'run' || ext == 'com' || ext == 'script' || ext == 'command' || ext == 'ws' || ext == 'ps1' || ext == 'server' || ext == 'exe1' || ext == 'csh' || ext == 'sct' || ext == ' vbscript' || ext == 'pvd') {
              res.sendFile(path.join(__dirname, './site/InvalidFileType.html'))
              fs.unlink('./data/uploads/users/'+accountid+'/media/'+filename, (err) => {
                if (err) throw err
              })
            } else {

              fs.truncate('./data/uploads/users/'+accountid+'/img.num', 1, err => {
                if (err) throw err;
              });

              fs.writeFile('./data/uploads/users/'+accountid+'/img.num', `${line4}`, (err) => {if (err) throw err})
              
        fs.rename('./data/uploads/users/'+accountid+'/media/'+filename, './data/uploads/users/'+accountid+'/media/'+line4+'_'+accountid+'.'+ext, function(err) {
          if ( err ) console.log('ERROR: ' + err);
      });
      res.cookie('uploadFinished', 'true', {expires: new Date(Date.now() + 900000), secure: true})
      res.cookie('upload_ext', ext, {expires: new Date(Date.now() + 900000), secure: true})
              res.redirect('/complete')

              var media = 'https://togi.cloud.ngrok.io/data/uploads/users/?img='+accountid+'/media/'+line4+'_'+accountid+'.'+ext

              var newfile = '<h2><a href='+media+'>'+filename+'</a></h2>'
              insertLine('./data/uploads/users/'+accountid+'/account.html').content(newfile).at(line).then(function(err) {
              })
              fs.truncateSync('./data/uploads/users/'+accountid+'/html.num');
              fs.writeFileSync('./data/uploads/users/'+accountid+'/html.num', `${line}`)
          }
          }
  
            });
          
        });
      };
    }); 
  }
}
setTimeout(myFunc, 600);
  } else {
    res.sendFile(path.join(__dirname, './site/NotLoggedIn.html'));
  }
});

app.get('/complete', function(req,res,next){

if (req.cookies.uploadFinished == 'true') {

  var authenticatedcompletepage = req.cookies.uploadFinished

  if(authenticatedcompletepage === 'true'){
    res.sendFile(path.join(__dirname, './site/UploadComplete.html'));
  } else {
      
      res.redirect('/');
  }

} else {res.redirect('/');
}
});
app.use(function(req, res, next) {
  res.status(404)
  res.sendFile(path.join(__dirname, './errors/404.html'));
});


app.listen(port);