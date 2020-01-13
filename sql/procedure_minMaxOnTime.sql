USE [sensorsdb]
GO
/****** Object:  StoredProcedure [dbo].[GET_MIN_MAX_TEMP]    Script Date: 13.01.2020 21:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	ALTER PROCEDURE [dbo].[GET_MIN_MAX_TEMP]
	@startTime NCHAR(25),
	@endTime NCHAR(25)
	AS
	BEGIN

		SELECT TOP 1 
				newTable.name AS name, newTable.tp AS maxTemp, newTable.timeInd AS timeInd
			FROM dbo.Sensors JOIN 
			(	SELECT MAX(dbo.Indications.temp) AS tp, dbo.Indications.timeInd,
				dbo.Sensors.name as name, dbo.Indications.numS
				FROM dbo.Indications, dbo.Sensors
				GROUP BY dbo.Indications.temp, dbo.Indications.timeInd, dbo.Indications.numS,
					dbo.Sensors.name
			) AS newTable ON
				newTable.numS = dbo.Sensors.numS AND dbo.Sensors.name = newTable.name
			WHERE newTable.timeInd BETWEEN @startTime AND @endTime
			ORDER BY maxTemp DESC;

		SELECT TOP 1 
				newTableMin.name AS name, newTableMin.tp AS minTemp, newTableMin.timeInd AS timeInd
			FROM dbo.Sensors JOIN 
			(	SELECT MIN(dbo.Indications.temp) AS tp, CONVERT(TIME,dbo.Indications.timeInd, 8) AS timeInd,
				dbo.Sensors.name AS name, dbo.Indications.numS
				FROM dbo.Indications, dbo.Sensors
				GROUP BY dbo.Indications.temp, dbo.Indications.timeInd, dbo.Indications.numS,
					dbo.Sensors.name
			) AS newTableMin ON
				newTableMin.numS = dbo.Sensors.numS AND dbo.Sensors.name = newTableMin.name
			WHERE newTableMin.timeInd BETWEEN @startTime AND @endTime
			ORDER BY minTemp ASC;
	END;