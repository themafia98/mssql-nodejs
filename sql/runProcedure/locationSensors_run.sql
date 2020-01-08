USE [usersdb]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[GET_LOCATION]
		@regionNumber = 6

SELECT	'Return Value' = @return_value

GO