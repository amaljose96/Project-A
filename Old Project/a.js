var grate=0.9;
var gpitch=0.7;
function respond(){
  var text=$("#your_answer").html();
  if(add_new_mode==1){
    if(text.toLowerCase()!="Nothing"){
      add_reply(text);
    }
  }
  else if(add_new_mode==2){
    prev_q=text;
    respond_with("What is its answer?");
    add_new_mode=1;
  }
  else if(change_package==1){
    //CHECK IF VALID package
    change_pack(text);
  }
  else{
    process(text);
  }
}
function respond_with(result){
  console.log("Process return "+result);
  responsiveVoice.speak(result,"UK English Female",{
    rate:grate,
    pitch:gpitch
  });
  $("#my_reply").html(result);
  $("#your_answer").html("");
}
function process(yousaid){
  yousaid=yousaid.toLowerCase();
  var isay;
  if(yousaid=='what is the time now?'){
    var d= new Date();
    isay=d.toDateString();
    respond_with(isay);
  }
  else if(yousaid=='add a response'){
    add_new_mode=2;
    respond_with("Enter question:");
  }
  else if(yousaid=="active package?"){
    respond_with("Active package is "+b);
  }
  else if(yousaid=="change active package"){
    respond_with("Enter package name:");
    change_package=1;
  }
  else{
    $.ajax({
      url: "brain.php",
      method: "POST",
      data:{
          yousaid:yousaid,
          mode:0
      },
      success:function(response){
        console.log(response);
        isay=response;
        if(isay=="I dont know."){
            prev_q=yousaid;
              respond_with("What should I reply for "+prev_q);
              add_new_mode=1;
        }
        else{
            respond_with(isay);
        }
      }
    });
  }
}
var change_package=0;
var add_new_mode=0;
var prev_q;
var b="Default";
function add_reply(a){
  var q=prev_q;
  q=q.toLowerCase();
  $.ajax({
    url: "brain.php",
    method: "POST",
    data:{
        q:q,
        a:a,
        b:b,
        mode:1
    },
    success:function(response){
      console.log(response);
      isay=response;
      respond_with("Successfully added");
      add_new_mode=0;
    }
  });
}
function change_pack(pack){
  var check=0;
  $.ajax({
    url: "brain.php",
    method: "POST",
    data:{
        pack:pack,
        mode:2
    },
    success:function(response){
      console.log(response);
      if(response=="Exists"){
        b=pack;
        respond_with("Package changed.");
        change_package=0;
      }
      else{
        respond_with("No such package.");
        change_package=0;
      }
    }
  });
}
/*
CORE CONCEPTS
-------------

Users can teach the VI Q&A which go to user.frm.
Users can also add or create forms.

Everytime a user talks, all forms are checked.

All core functionalities are coded in JS in this file.
EDIT MODE VALUES:
0-Normal chat
1-Add next input
2-Make next input as previous question.
3-Make next input as package name
*/
$(document).ready(function(){
  document.getElementById("your_answer").addEventListener("keydown",function(e){
      if(e.keyIdentifier=="Enter"){
        respond();
      }
  });
});
