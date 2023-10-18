USE master
GO

-- Drop database if it exists
IF DB_ID('laptop_scraper') IS NOT NULL
BEGIN
    ALTER DATABASE laptop_scraper SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE laptop_scraper;
END

CREATE DATABASE laptop_scraper
GO

USE laptop_scraper
GO

-- Create tables
CREATE TABLE companies (
    company_id int IDENTITY(1,1) NOT NULL,
    company_name varchar(50) NOT NULL,
    CONSTRAINT PK_companies PRIMARY KEY (company_id),
    CONSTRAINT UQ_company_name UNIQUE (company_name)
)

CREATE TABLE amazon (
    laptop_id int IDENTITY(1,1) NOT NULL,
    company_name varchar(50) NOT NULL,
    title varchar(MAX) NOT NULL,
    image_url varchar(MAX) NOT NULL,
    link varchar(MAX) NOT NULL,
    price decimal(10,2) NOT NULL,
    stars varchar(50) NOT NULL,
    reviews varchar(50) NULL,
    date_pulled DATE NOT NULL,
    CONSTRAINT PK_amazon PRIMARY KEY (laptop_id),
    CONSTRAINT FK_amazon_companies FOREIGN KEY (company_name) REFERENCES companies (company_name)
)

CREATE TABLE newegg (
    laptop_id int IDENTITY(1,1) NOT NULL,
    company_name varchar(50) NOT NULL,
    title varchar(MAX) NOT NULL,
    image_url varchar(MAX) NOT NULL,
    link varchar(MAX) NOT NULL,
    price decimal(10,2) NOT NULL,
    stars varchar(50) NOT NULL,
	reviews varchar(50) NULL,
    date_pulled DATE NOT NULL,
    CONSTRAINT PK_newegg PRIMARY KEY (laptop_id),
    CONSTRAINT FK_newegg_companies FOREIGN KEY (company_name) REFERENCES companies (company_name)
)

CREATE TABLE bestbuy (
    laptop_id int IDENTITY(1,1) NOT NULL,
    company_name varchar(50) NOT NULL,
    title varchar(MAX) NOT NULL,
    image_url varchar(MAX) NOT NULL,
    link varchar(MAX) NOT NULL,
    price decimal(10,2) NOT NULL,
    stars varchar(50) NOT NULL,
    date_pulled DATE NOT NULL,
    CONSTRAINT PK_bestbuy PRIMARY KEY (laptop_id),
    CONSTRAINT FK_bestbuy_companies FOREIGN KEY (company_name) REFERENCES companies (company_name)
)

INSERT INTO companies (company_name)
VALUES ('amazon');

INSERT INTO companies (company_name)
VALUES ('newegg');

INSERT INTO companies (company_name)
VALUES ('bestbuy');

GO