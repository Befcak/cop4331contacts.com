<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		$sql = "INSERT INTO contacts (userID, firstName, lastName, streetAddress, city, state, zip, phone, email, birthday, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

		$stmt = $conn->prepare($sql);

		if($stmt != false) 
		{
			$stmt->bind_param('isssssiisss', $userID, $firstName, $lastName, $streetAddress, $city, $state, $zip, $phone, $email, $birthday, $notes);

			$userID = $inData["userId"];
			$firstName = $inData["firstName"];
			$lastName = $inData["lastName"];
			$streetAddress = $inData["streetAddress"];
			$city = $inData["city"];
			$state = $inData["state"];
			$zip = $inData["zip"];
			$phone = $inData["phone"];
			$email = $inData["email"];
			$birthday = $inData["birthday"];
			$notes = $inData["notes"];
			//$conn = new mysqli("localhost", "root", "orlando");

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
