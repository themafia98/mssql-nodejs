USE sensorsdb
GO
	CREATE PROCEDURE GET_LOCATION
	@regionNumber INT
	AS
	BEGIN
		SELECT 
			dbo.Sensors.name AS sensorName, dbo.Regions.nameRegion AS region
		FROM 
			dbo.Sensors INNER JOIN dbo.Regions ON dbo.Sensors.numRegion=dbo.Regions.numRegion
		WHERE 
			dbo.Regions.numRegion = @regionNumber
	END;