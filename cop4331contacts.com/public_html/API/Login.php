<?php
/*

Login:

SELECT userID, firstName, lastName, login FROM users WHERE login = '<login>' AND password = '<hashed password>';
*/

	$inData = getRequestInfo();
	
	$userID = 0;
	$firstName = "";
	$lastName = "";
	
	//$login = filter_var($inData["login"], FILTER_SANITIZE_STRING);

	$conn = new mysqli("localhost", "root", "orlando", "contactBook");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		/*Login is the weak point for SQL injection, assuming the password is sent hashed*/
		/*$sql = "SELECT userID, firstName, lastName, login FROM users WHERE login = '".$login."' AND password = '".$inData["password"]."'";*/
		$sql = "SELECT userID, firstName, lastName, login FROM users WHERE login = ? AND password = ?";
		$stmt = 0;
		
		if($stmt = $conn->prepare($sql))
		{
			/*creates the prepared statement*/
			$stmt->bind_param('ss', $inData["login"], $inData["password"]);/*Binds params to markers*/
			$stmt->execute();

			$result	= $stmt->get_result();
			//$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();
				$firstName = $row["firstName"];
				$lastName = $row["lastName"];
				$userID = $row["userID"];
				//$login = $row["login"];
				
				$date = date("Y-m-d h:i:sa");
				$sql2 = "UPDATE users SET dateLastLoggedIn='".$date."' WHERE userID= $userID";
				
				/*if($result = $conn->query($sql2) != TRUE)
				{
					returnWithError("Date Update Failed");
				}*/

				returnWithInfo($firstName, $lastName, $userID);
			}
			
			else
			{
				returnWithError( "No Records Found" );
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
		$retValue = '{"userID":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $userID)
	{
		$retValue = '{"userID":' . $userID . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
