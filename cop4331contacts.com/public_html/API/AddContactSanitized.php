<?php
	$inData = getRequestInfo();
	
	// CHANGE DATABASE NAME? ("contactBook")
	/*$userId = $inData["userId"];
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
	$conn = new mysqli("localhost", "root", "orlando");*/
	/*$userID = 2;
	$firstName = "Add";
	$lastName = "Contact";
	$streetAddress = "12345 Add Ct.";
	$city = "Adlington";
	$state = "CT";
	$zip = 12345;
	$phone = 1234567890;
	$email = "acontact@fakeemailnotreal.org";
	$birthday = "2018-12-12";
	$notes = "This is a test contact for the AddContact function.";*/

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		/*$sql = "INSERT INTO contacts (userID, firstName, lastName, streetAddress, city, state, zip, phone, email, birthday, notes) VALUES (" . $userID . ", firstName, lastName, streetAddress, city, state, zip, phone, email, birthday, notes);";*/
		
		$sql = "INSERT INTO contacts (userID, firstName, lastName, streetAddress, city, state, zip, phone, email, birthday, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

		$stmt = $conn->prepare($sql);

		if($stmt != false) 
		{
			$stmt->bind_param('isssssiisss', $userID, $firstName, $lastName, $streetAddress, $city, $state, $zip, $phone, $email, $birthday, $notes);

			$userID = 2;
			$firstName = "Add";
			$lastName = "Contact";
			$streetAddress = "12345 Add Ct.";
			$city = "Adlington";
			$state = "CT";
			$zip = 12345;
			$phone = 1234567890;
			$email = "acontact@fakeemailnotreal.org";
			$birthday = "2018-12-12";
			$notes = "This is a test contact for the AddContact function.";

			$stmt->execute();
			$result = $stmt->get_result();

			if($result != true)
			{
				returnWithError( $conn->error );
				//returnWithError($sql);
			}
			//$conn->close();
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
