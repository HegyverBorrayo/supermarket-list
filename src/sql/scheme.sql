

CREATE TABLE Rol (
    rol INT AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description text NULL,
    PRIMARY KEY (rol)
);

INSERT INTO Rol(nombre) VALUES('sysadmin');
INSERT INTO Rol(nombre) VALUES('administrator');
INSERT INTO Rol(nombre) VALUES('client');

CREATE TABLE Users (
    user INT AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    nickname varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    rol INT NOT NULL,
    PRIMARY KEY (user),
    FOREIGN KEY (rol) REFERENCES Rol(rol),
    UNIQUE(email)
);

INSERT INTO Users(first_name, last_name, email, nickname, password, rol) VALUES ('Erinson', 'Borrayo', 'borrayo.erinson@gmail.com', 'erehebo', MD5('123'), 1);

CREATE TABLE Brand (
    brand INT AUTO_INCREMENT,
    brand_name varchar(100) NOT NULL,
    PRIMARY KEY (brand)
);

CREATE TABLE Category (
    category INT AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text NULL,
    PRIMARY key (category)
);

CREATE TABLE Product (
    product INT AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    quantity INT NOT NULL,
    brand INT NOT NULL,
    suggested_brand INT NULL,
    similar_brand INT NULL,
    category INT NULL,
    PRIMARY KEY (product),
    FOREIGN KEY (brand) REFERENCES Brand(brand),
    FOREIGN KEY (suggested_brand) REFERENCES Brand(brand),
    FOREIGN KEY (similar_brand) REFERENCES Brand(brand),
    FOREIGN KEY (category) REFERENCES Category(category)
);

CREATE TABLE Next_Purchase (
    next_purchase INT AUTO_INCREMENT,
    status char(20) NOT NULL DEFAULT 'PENDING',
    date_purchase TIMESTAMP NULL,
    user INT NOT NULL,
    product INT NOT NULL,
    PRIMARY KEY (next_purchase),
    FOREIGN KEY (user) REFERENCES Users(user),
    FOREIGN KEY (product) REFERENCES Product(product)
);

CREATE TABLE Purchases (
    purchase INT AUTO_INCREMENT,
    product INT NOT NULL,
    user INT NOT NULL,
    date_purchase TIMESTAMP,
    PRIMARY KEY (purchase),
    FOREIGN KEY (user) REFERENCES Users(user),
    FOREIGN KEY (product) REFERENCES Product(product)
);


/*Alter Tables**/
ALTER TABLE `Users` ADD UNIQUE(`nickname`);
ALTER TABLE `Users` ADD COLUMN creation_date DATETIME DEFAULT NOW()
ALTER TABLE `Users` ADD COLUMN status varchar(100) DEFAULT 'ACTIVE';

ALTER TABLE `Brand` ADD COLUMN status varchar(100) DEFAULT 'ACTIVE';
ALTER TABLE `Brand` MODIFY status varchar(100) DEFAULT 'INACTIVE';

ALTER TABLE `Category` ADD COLUMN status varchar(100) DEFAULT 'ACTIVE';
ALTER TABLE `Category` MODIFY status varchar(100) DEFAULT 'INACTIVE';


ALTER TABLE `Next_Purchase` ADD COLUMN creation_date DATETIME DEFAULT NOW();
ALTER TABLE `Next_Purchase` ADD COLUMN name varchar(255) NOT NULL;
ALTER TABLE `Next_Purchase` ADD COLUMN description text NULL;