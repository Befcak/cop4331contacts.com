<?php
	//TO DO: Link to front end (JavaScript) via getRequestInfo()
	$inData = getRequestInfo();
	
	$userID = 2; //$inData["userID"];
	$contactID = 11; // = $inData["contactID"];

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		$sql = "DELETE FROM contacts WHERE userID = ".$userID." AND contactID = ".$contactID.";";

		/*"DELETE FROM contacts WHERE userID = 2, AND contactID = 11;"*/

		if( $result = $conn->query($sql) != TRUE )
		{
			//returnWithError( $conn->error );
			returnWithError($sql);
		}
		$conn->close();
	}
	
	returnWithError("");
	
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
