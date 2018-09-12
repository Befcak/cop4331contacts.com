<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$inData["search"] = 'b';
	$inData["userID"] = 1;
	
	$test = "%".$inData["search"]."%";
	$conn = new mysqli("localhost", "root", "orlando", "contactBook");

	if ($conn->connect_error) 
	{	
		returnWithError( $conn->connect_error );
	} 

	else
	{  
	$sql = "SELECT * FROM contacts WHERE userID = ? AND (firstName LIKE ? 
		OR lastName LIKE ? OR email LIKE ?)";
	$stmt = 0;

		if($stmt = $conn->prepare($sql))
    		{

            		$stmt->bind_param('isss', $inData["userID"],$test, $test, $test);
            		$stmt->execute();

            		$result = $stmt->get_result();
		
			if ($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc())
				{
					if( $searchCount > 0 )
					{
						$searchResults .= ",";
					}
				
					$searchCount++;

                			// Create and initialize variable with contact attribute
					$contactID = $row["contactId"];
					$firstName = $row["firstName"];
					$lastName = $row["lastName"];
              	  			$streetAddress = $row["streetAddress"];
                			$city = $row["city"];
                			$state = $row["state"];
                			$zip = $row["zip"];
                			$phone = $row["phone"];				
                			$email = $row["email"];
                			$birthday = $row["birthday"];
                			$notes = $row["notes"];

                			// Building a list of contact attributes as a string
					$searchResults = $searchResults . '"' . $contactID . '","' . $firstName . '","' . $lastName . '","' 
                                 		. $streetAddress . '","' . $city . '","' . $state . '","' . $zip . '","' 
                                 		. $phone . '","' . $email . '","' . $birthday . '","'. $notes .'"';
				}
			}
			else
			{
				returnWithError( "No Records Found" );
        		}
        	}
		else 
		{
			echo "fail";
		}
		$conn->close();
	}
	returnWithInfo( $searchResults );

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
