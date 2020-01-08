USE [usersdb]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[GET_TEMP]
		@startDate = N'2019-11-01',
		@endDate = N'2019-11-30',
		@startTime = N'10:00:00',
		@endTime = N'23:59;59'

SELECT	'Return Value' = @return_value

GO