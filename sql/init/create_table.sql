CREATE TABLE sensorsdb.dbo.Sensors(
	numS INT NOT NULL,
	numRegion INT NOT NULL,
	name NCHAR(25) NOT NULL,
	longitude FLOAT NOT NULL,
	latitude FLOAT NOT NULL,
	PRIMARY KEY(numS)
)

CREATE TABLE sensorsdb.dbo.Regions(
	numRegion INT NOT NULL,
	nameRegion NCHAR(25) NOT NULL,
	PRIMARY KEY(numRegion)
)

Create TABLE sensorsdb.dbo.Indications(
	numInd INT NOT NULL,
	numS INT NOT NULL,
	dateInd DATE NOT NULL,
	timeInd TIME NOT NULL,
	temp NCHAR(25) NOT NULL,
	PRIMARY KEY(numS),
	UNIQUE(numInd)
)
