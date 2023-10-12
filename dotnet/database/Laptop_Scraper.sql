USE master
GO

--drop database if it exists
IF DB_ID('laptop_scraper') IS NOT NULL
BEGIN
	ALTER DATABASE laptop_scraper SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
	DROP DATABASE laptop_scraper;
END

CREATE DATABASE laptop_scraper
GO

USE laptop_scraper
GO

--create tables
CREATE TABLE amazon (
	laptop_id int IDENTITY(1,1) NOT NULL,
	title varchar(50) NOT NULL,
	image_url varchar(MAX) NOT NULL,
	link varchar(MAX) NOT NULL,
	price decimal(10,2) NOT NULL,
	stars varchar(50) NOT NULL,
	reviews varchar(50) NULL,
	date_pulled DATE NOT NULL,
	CONSTRAINT PK_amazon PRIMARY KEY (laptop_id)
)

CREATE TABLE newegg (
	laptop_id int IDENTITY(1,1) NOT NULL,
	title varchar(50) NOT NULL,
	image_url varchar(MAX) NOT NULL,
	link varchar(MAX) NOT NULL,
	price decimal(10,2) NOT NULL,
	stars varchar(50) NOT NULL,
	date_pulled DATE NOT NULL,
	CONSTRAINT PK_newegg PRIMARY KEY (laptop_id)
)

CREATE TABLE bestbuy (
	laptop_id int IDENTITY(1,1) NOT NULL,
	title varchar(50) NOT NULL,
	image_url varchar(MAX) NOT NULL,
	link varchar(MAX) NOT NULL,
	price decimal(10,2) NOT NULL,
	stars varchar(50) NOT NULL,
	reviews varchar(50) NULL,
	date_pulled DATE NOT NULL,
	CONSTRAINT PK_bestbuy PRIMARY KEY (laptop_id)
)