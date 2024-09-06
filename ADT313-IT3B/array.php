<h1>Arrays</h1>
<?php
$cars = array("Volvo", "BMW", "Toyota");
// Same as the code below
$cars = ["Volvo", "BMW", "Toyota"]

$userInformation = array(
    "firstname"=>"mark",
    "lastname"=>"arciaga",
    "role"=>"admin"


);
$userInformation["address"] = 'bocaue';
$userInformation[]="09412312312";

echo $userInformation['role'];
echo "<pre>";
print_r($userInformation);

echo"<br/>Var dump:";
var_dump($userInformation);
echo "</pre>";

$user = array(
     "information"=> array(
        "firstName"=>"mark",
        "lastName"=>"arciaga",
        
     ),
     "role"=> array(
        "intructor",
        "student"
     ),
     "address"=> array(
        "province"=>"bulacan",
        "municipality"=>"bocaue",
        "city"=>"bambang"
     )
     );
     echo  "<h1>".$user["address"]["province"]."<h2>";
     echo  "<h2>".$user["roles"]["1"]."<h2>";


?>