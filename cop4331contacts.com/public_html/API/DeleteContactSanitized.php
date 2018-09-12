<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		$sql = "DELETE FROM contacts WHERE userId = ? AND contactId = ?;";

		$stmt = $conn->prepare($sql);

		if($stmt != false) 
		{
			$stmt->bind_param('ii', $userID, $contactID);

			$userID = $inData["userId"];
			$contactID = $inData["contactId"];

			$stmt->execute();
		}
		else
		{
			returnWithError($conn->error);
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
