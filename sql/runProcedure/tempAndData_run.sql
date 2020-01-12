USE [sensorsdb]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[GET_TEMP]
		@startDate = N'2019-11-01',
		@endDate = N'2020-11-30',
		@startTime = N'09:00',
		@endTime = N'13:00'

SELECT	'Return Value' = @return_value

GO