-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE test; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS user 
  ( 
     id         INT PRIMARY KEY auto_increment, 
     username   VARCHAR(25) UNIQUE NOT NULL, 
     password   CHAR(60) NOT NULL, 
     first_name VARCHAR(50) NOT NULL, 
     last_name  VARCHAR(50) NOT NULL, 
     email      VARCHAR(100) UNIQUE NOT NULL, 
     role       ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
     age        INT(11) DEFAULT 0 
  ); 

  
-- -----------------------------------------------------
-- Table `mydb`.`Food`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Food` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Food` (
  `idFood` INT(6) NOT NULL,
  `idMember` INT(6) NOT NULL,
  `DailyCalories` INT(6) NULL,
  `FishServings` INT(6) NULL,
  `BeefServings` INT(6) NULL,
  `ChickenServings` INT(6) NULL,
  `PorkServings` INT(6) NULL,
  `DiaryServings` INT(6) NULL,
  `Others` INT(6) NULL,
  `PetFood` INT(6) NULL,
  `Foodcol` INT(6) NULL,
  `Date` DATE NULL,
  `Members_idMembers` INT(6) NOT NULL,
  PRIMARY KEY (`idFood`),
  INDEX `fk_Food_Members_idx` (`Members_idMembers` ASC) VISIBLE,
  CONSTRAINT `fk_Food_Members`
    FOREIGN KEY (`Members_idMembers`)
    REFERENCES `mydb`.`Members` (`idMembers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Transport`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Transport` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Transport` (
  `idTransport` INT(6) NOT NULL,
  `Mode` VARCHAR(45) NULL,
  `VehicleType` VARCHAR(45) NULL,
  `Milage` VARCHAR(45) NULL,
  `FuelType` VARCHAR(45) NULL,
  `FuelConsumption` INT(45) NULL,
  `NoOfPassengers` INT(2) NULL,
  `Distance` INT(45) NULL,
  `NoOfPublicTransportUsed` INT(45) NULL,
  `idMember` INT(6) NULL,
  `Date` DATE NULL,
  `Members_idMembers` INT(6) NOT NULL,
  PRIMARY KEY (`idTransport`),
  INDEX `fk_Transport_Members1_idx` (`Members_idMembers` ASC) VISIBLE,
  CONSTRAINT `fk_Transport_Members1`
    FOREIGN KEY (`Members_idMembers`)
    REFERENCES `mydb`.`Members` (`idMembers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Home`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Home` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Home` (
  `idHome` INT NOT NULL AUTO_INCREMENT,
  `idMember` VARCHAR(45) NOT NULL,
  `ElectricityUsage` INT(6) NULL,
  `NaturalGas` INT(6) NULL,
  `HeatingType` VARCHAR(45) NULL,
  `Temp` INT(3) NULL,
  `Homecol` VARCHAR(45) NULL,
  `HoursHeating` INT(3) NULL,
  `NoOfPeople` INT(3) NULL,
  `SquareFtOfHouse` INT(3) NULL,
  `BerRating` VARCHAR(1) NULL,
  `Date` DATE NULL,
  `Members_idMembers` INT(6) NOT NULL,
  PRIMARY KEY (`idHome`),
  INDEX `fk_Home_Members1_idx` (`Members_idMembers` ASC) VISIBLE,
  CONSTRAINT `fk_Home_Members1`
    FOREIGN KEY (`Members_idMembers`)
    REFERENCES `mydb`.`Members` (`idMembers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Shopping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Shopping` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Shopping` (
  `idShopping` INT(6) NOT NULL,
  `Clothes` INT(6) NULL,
  `PaperBaseProducts` INT(6) NULL,
  `Recycle` INT(6) NULL,
  `Date` VARCHAR(45) NOT NULL,
  `idMember` INT(6) NOT NULL,
  `Members_idMembers` INT(6) NOT NULL,
  PRIMARY KEY (`idShopping`),
  INDEX `fk_Shopping_Members1_idx` (`Members_idMembers` ASC) VISIBLE,
  CONSTRAINT `fk_Shopping_Members1`
    FOREIGN KEY (`Members_idMembers`)
    REFERENCES `mydb`.`Members` (`idMembers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Services`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Services` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Services` (
  `idServices` INT(6) NOT NULL,
  `idMember` INT(6) NULL,
  `PhoneContractAmount` DECIMAL(4,2) NULL,
  `internetAmount` DECIMAL(4,2) NULL,
  `TVContract` DECIMAL(4,2) NULL,
  `Members_idMembers` INT(6) NOT NULL,
  PRIMARY KEY (`idServices`),
  INDEX `fk_Services_Members1_idx` (`Members_idMembers` ASC) VISIBLE,
  CONSTRAINT `fk_Services_Members1`
    FOREIGN KEY (`Members_idMembers`)
    REFERENCES `mydb`.`Members` (`idMembers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
