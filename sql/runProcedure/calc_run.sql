USE [sensorsdb]
GO

DECLARE	@return_value float

EXEC	@return_value = [dbo].[GET_CALC]

SELECT	'Return Value' = @return_value

GO