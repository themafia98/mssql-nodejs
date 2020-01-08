USE [usersdb]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[GET_MIN_MAX_TEMP]
		@startTime = N'12:00',
		@endTime = N'15:00'

SELECT	'Return Value' = @return_value

GO