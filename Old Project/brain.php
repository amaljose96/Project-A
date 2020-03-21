<?php
$mode=$_POST['mode'];
if($mode==0){
  $yousaid=$_POST['yousaid'];
  $answer="I dont know.";
  //echo $yousaid;
  $file=file_get_contents("settings.frm");
  $json=json_decode($file,TRUE);
  $list=$json["packages"];
  foreach($list as $i){
    //echo "Accessing package ".$i;
    $file2=file_get_contents($i);
    //echo "\nFile:";
    //print_r($file2);
    $json2=json_decode($file2,TRUE);
    //print_r($json2);
    if(array_key_exists($yousaid,$json2["list"])){
      $answer=$json2["list"][$yousaid];
    }
  }
  echo $answer;
}
if($mode==1){
  $q=$_POST['q'];
  $a=$_POST['a'];
  $b=$_POST['b'];
  $file=file_get_contents("settings.frm");
  $json=json_decode($file,TRUE);
  $b=$json["packages"][$b];
  $file=file_get_contents($b);
  $json=json_decode($file,TRUE);
  $json["list"][$q]=$a;
  print_r($json);
  $file=json_encode($json);
  file_put_contents($b,$file);
}
if($mode==2){
  $package=$_POST['pack'];
  $file=file_get_contents("settings.frm");
  $json=json_decode($file,TRUE);
  $list=$json["packages"];
  if(key_exists($package,$list)){
    echo "Exists";
  }
  else{
    echo "Nope";
  }
}
?>
