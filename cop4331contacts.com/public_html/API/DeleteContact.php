<?php
	//TO DO: Link to front end (JavaScript) via getRequestInfo()
	$inData = getRequestInfo();
	
	$userID = $inData["userID"];
	$contactID = $inData["contactID"];

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		$sql = "DELETE FROM contacts WHERE userID = ".$userID." AND contactID = ".$contactID.";";

		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
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
