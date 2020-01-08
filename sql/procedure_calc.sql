USE sensorsdb
GO
	CREATE PROCEDURE GET_CALC
	AS
	BEGIN
		SELECT AVG(CONVERT(FLOAT,dbo.Indications.temp)) AS result
		FROM dbo.Indications;
	END;