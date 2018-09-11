<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		$sql = "DELETE FROM contacts WHERE userID = ? AND contactID = ?;";

		/*$sql = "INSERT INTO contacts (userID, firstName, lastName, streetAddress, city, state, zip, phone, email, birthday, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";*/

		$stmt = $conn->prepare($sql);

		if($stmt != false) 
		{
			$stmt->bind_param('ii', $userID, $contactID);

			/*$userID = $inData["userId"];
			$contactID = $inData["contactId"];*/

			$userID = 3;
			$contactID = 50;

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
