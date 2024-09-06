    <?php

  echo "conditional statements<br/>";
   $showVariable = false;
     $name = "Mark";
     $auth = false;
    // if...else 
    if($showVariable == true){
       echo $name;
        // execute code 
    }elseif ($showVariable && $name == 'Mark' && $auth){
        echo "hello ".$name
    }elseif ($showVariable && $name) {
        echo 'not Mark';
    }else {
    echo "Else statement"
    }
    
      // no show
      //  echo "Else Statement";  
   
   // conditon
   
   
  $anotherVariable == ($showVariable == true) ? $name : "short hand: else";
  echo $anotherVariable;
    ?>
