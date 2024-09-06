<h1>Hands-on Activity</h1>


<?php
// author mark joshua arciaga
$table = array(
    "header" => array(
        "StudentID",
        "Firstname",
        "Middlename",
        "Lastname",
        "Section",
        "Course",
        "Yearlevel"
    ),
    "body" => array(
        array(
            "StudentID" => "0",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
       
        ),
        array(
            "StudentID" => "1",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
             "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
        ),
        array(
            "StudentID" => "2",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
           "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
       
        ),
        array(
            "StudentID" => "3",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
        ),
        array(
            "StudentID" => "4",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
       
        ),
        array(
            "StudentID" => "5",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
             "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
        ),
        array(
            "StudentID" => "6",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
             "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
       
        ),
        array(
            "StudentID" => "7",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
        ),
        array(
            "StudentID" => "8",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
             "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
        ),
        array(
            "StudentID" => "9",
            "Firstname" => "Firstname",
            "Middlename" => "Middlename",
            "Lastname" => "Lastname",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel"=> "Yearlevel"
       
        )
    )
); // next is html for arrays in php inserting into table 
?>

<table border="1">
    
    <thead>
        <?php foreach ($table['header'] as $header) { ?>
            <th><?php echo $header; ?></th>
        <?php } ?>
    </thead>
    <tbody>
        <?php foreach ($table['body'] as $row) { ?>
            <tr>
                <?php foreach ($row as $value) { ?>
                    <td><?php echo $value; ?></td>
                <?php } ?>
            </tr>
        <?php } ?>
    </tbody>
</table>