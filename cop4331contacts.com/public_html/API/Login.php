<?php
/*

Login:

SELECT userID, firstName, lastName, login FROM users WHERE login = '<login>' AND password = '<hashed password>';
*/

	$inData = getRequestInfo();
	
	$userID = 0;
	$firstName = "";
	$lastName = "";
	//$login = "";

	$conn = new mysqli("localhost", "root", "orlando");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		/*Login is the weak point for SQL injection, assuming the password is sent hashed*/
		$sql = "SELECT userID, firstName, lastName, login FROM users WHERE login = '".$inData["login"]."' AND password = '".$inData["password"]."'";
		
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["firstName"];
			$lastName = $row["lastName"];
			$userID = $row["userID"];
			//$login = $row["login"];
			
			returnWithInfo($firstName, $lastName, $userID);
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	
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
		$retValue = '{"userID":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $userID )
	{
		$retValue = '{"userID":' . $userID . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
