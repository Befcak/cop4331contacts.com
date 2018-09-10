<?php
/*
	SQL Query:
	INSERT INTO USERS (firstName, lastName, login, password) VALUES ('<firstName>', '<lastName>', '<login/email>', '<hashed password>');
*/
	$inData = getRequestInfo();
	
	/*$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];*/

	$firstName = "Reginald";
	$lastName = "Stir";
	$login = "RegiStir";
	$password = "password";

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		/*Need to check duplicate users?*/
		/*firstName, lastName, and login are weakpoints that could be be SQL injected assumming password is hashed*/
		$sql = "INSERT INTO users (firstName, lastName, login, password) VALUES ('".$firstName."', '".$lastName."', '".$login."', '".$password."');";
		//$sql = "INSERT INTO USERS (firstName, lastName, login, password) VALUES (?, ?, ?, ?)";
		


		/*if($stmt = $conn->prepare($sql))
		{
			//creates the prepared statement
			$stmt->bind_param('ssss', $inData["firstName"], $inData["lastName"], $inData["login"], $inData["password"]); //Binds params to markers
			$stmt->execute();
			$result	= $stmt->get_result();
		*/	
			
			if( $result != TRUE )
			{
				//returnWithError( $conn->error );
				returnWithError($sql);
			}
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
