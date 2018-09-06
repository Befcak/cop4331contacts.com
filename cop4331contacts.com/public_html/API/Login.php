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
				$sql2 = "UPDATE users SET dateLastLoggedIn = ? WHERE userID = ?";
				$date = "2018-09-06 15:49:13";
				if($stmt2 = $conn->prepare($sql))
				{
					$stmt2->bind_param('si',$date,3);
					$stmt2->execute();
					$result = $stmt2->get_result();
					
					if($result->num_rows < 1)
					{
						returnWithError("Date Update Failed");
					}
				}
				
			

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
