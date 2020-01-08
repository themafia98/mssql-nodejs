
INSERT INTO sensorsdb.dbo.Indications (numInd,numS,dateInd,timeInd,temp) 
	VALUES (111,1,CONVERT(DATE,'2019-12-15',23),CONVERT(TIME,'19:00:00',8),30);
INSERT INTO sensorsdb.dbo.Indications (numInd,numS,dateInd,timeInd,temp) 
	VALUES (112,2,CONVERT(DATE,'2019-11-11',23),CONVERT(TIME,'18:15:00',8),45);
INSERT INTO sensorsdb.dbo.Indications (numInd,numS,dateInd,timeInd,temp) 
	VALUES (113,3,CONVERT(DATE,'2019-11-15',23),CONVERT(TIME,'13:00:00',8),25);
INSERT INTO sensorsdb.dbo.Indications (numInd,numS,dateInd,timeInd,temp) 
	VALUES (114,4,CONVERT(DATE,'2019-12-11',23),CONVERT(TIME,'14:00:00',8),47);
INSERT INTO sensorsdb.dbo.Indications (numInd,numS,dateInd,timeInd,temp) 
	VALUES (115,5,CONVERT(DATE,'2019-11-18',23),CONVERT(TIME,'12:30:00',8),19);
INSERT INTO sensorsdb.dbo.Indications (numInd,numS,dateInd,timeInd,temp) 
	VALUES (116,6,CONVERT(DATE,'2019-12-15',23),CONVERT(TIME,'21:10:00',8),50);
INSERT INTO sensorsdb.dbo.Indications (numInd,numS,dateInd,timeInd,temp) 
	VALUES (117,7,CONVERT(DATE,'2019-12-15',23),CONVERT(TIME,'22:00:00',8),61);

INSERT INTO sensorsdb.dbo.Regions (numRegion,nameRegion) VALUES (1,'Texas');
INSERT INTO sensorsdb.dbo.Regions (numRegion,nameRegion) VALUES (2,'Moscow');
INSERT INTO sensorsdb.dbo.Regions (numRegion,nameRegion) VALUES (3,'Prague');
INSERT INTO sensorsdb.dbo.Regions (numRegion,nameRegion) VALUES (4,'Paris');
INSERT INTO sensorsdb.dbo.Regions (numRegion,nameRegion) VALUES (5,'Berlin');
INSERT INTO sensorsdb.dbo.Regions (numRegion,nameRegion) VALUES (6,'Minsk obl');
INSERT INTO sensorsdb.dbo.Regions (numRegion,nameRegion) VALUES (7,'Minsk');


INSERT INTO sensorsdb.dbo.Sensors (numS,numRegion,name,longitude,latitude) 
	VALUES (1,7,'Sensors 1', 45, 39);
INSERT INTO sensorsdb.dbo.Sensors (numS,numRegion,name,longitude,latitude) 
	VALUES (2,6,'Sensors 2', 35, 83);
INSERT INTO sensorsdb.dbo.Sensors (numS,numRegion,name,longitude,latitude) 
	VALUES (3,5,'Sensors 3', 15, 29);
INSERT INTO sensorsdb.dbo.Sensors (numS,numRegion,name,longitude,latitude) 
	VALUES (4,4,'Sensors 4', 5, 34);
INSERT INTO sensorsdb.dbo.Sensors (numS,numRegion,name,longitude,latitude) 
	VALUES (5,3,'Sensors 5', 15, 21);
INSERT INTO sensorsdb.dbo.Sensors (numS,numRegion,name,longitude,latitude) 
	VALUES (6,2,'Sensors 6', 12, 33);
INSERT INTO sensorsdb.dbo.Sensors (numS,numRegion,name,longitude,latitude) 
	VALUES (7,1,'Sensors 7', 13, 16);
