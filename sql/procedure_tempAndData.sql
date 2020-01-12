USE [sensorsdb]
GO
/****** Object:  StoredProcedure [dbo].[GET_TEMP]    Script Date: 12.01.2020 20:50:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	ALTER PROCEDURE [dbo].[GET_TEMP]
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
			(dbo.Indications.timeInd BETWEEN @startTime AND @endTime) AND 
			(dbo.Indications.dateInd BETWEEN @startDate AND @endDate);
	END;