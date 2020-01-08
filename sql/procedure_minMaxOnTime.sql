USE sensorsdb
GO


	CREATE PROCEDURE GET_MIN_MAX_TEMP
	@startTime NCHAR(25),
	@endTime NCHAR(25)
	AS
	BEGIN
		SELECT DISTINCT TOP(1) MAX(dbo.Indications.temp) AS maxTemp, 
				MIN(dbo.Indications.temp) as minTemp
		FROM 
			dbo.Sensors, dbo.Indications
		WHERE
			EXISTS (
			SELECT  MAX(dbo.Indications.temp), MIN(dbo.Indications.temp) 
			FROM dbo.Indications
			) AND dbo.Indications.timeInd BETWEEN @startTime AND @endTime;
	END;