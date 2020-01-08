USE sensorsdb
GO
	CREATE PROCEDURE GET_TEMP
	@startDate NCHAR(25),
	@endDate NCHAR(25),
	@startTime NCHAR(25),
	@endTime NCHAR(25)
	AS
	BEGIN
		SELECT 
			dbo.Sensors.name AS nameSensor, CONVERT(DATE,dbo.Indications.dateInd,23) AS date,
			CONVERT(TIME,dbo.Indications.timeInd,8) AS time, dbo.Indications.temp AS temp
		FROM 
			dbo.Sensors INNER JOIN dbo.Indications ON dbo.Sensors.numS=dbo.Indications.numS
		WHERE 
			dbo.Indications.dateInd BETWEEN @startDate AND @endDate;
	END;