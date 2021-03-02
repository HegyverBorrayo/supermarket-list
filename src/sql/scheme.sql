

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
    PRIMARY KEY (category)
);

CREATE TABLE Product (
    product INT AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    quantity INT NOT NULL,
    brand INT NOT NULL,
    suggested_brand INT NULL,
    similar_brand INT NULL,
    category INT NULL,
    owner INT NOT NULL,
    PRIMARY KEY (product),
    FOREIGN KEY (brand) REFERENCES Brand(brand),
    FOREIGN KEY (suggested_brand) REFERENCES Brand(brand),
    FOREIGN KEY (similar_brand) REFERENCES Brand(brand),
    FOREIGN KEY (category) REFERENCES Category(category),
    FOREIGN KEY (owner) REFERENCES Users(user)
);

/* Tabla para las compras (futuras y no futuras)*/
CREATE TABLE Purchase (
    purchase INT AUTO_INCREMENT,
    name varchar(255) NULL,
    description text NULL,
    status char(20) NULL DEFAULT 'PENDING',
    date_purchase TIMESTAMP NULL,
    owner INT NOT NULL,
    next_purchase Boolean DEFAULT TRUE,
    PRIMARY KEY (purchase),
    FOREIGN KEY (owner) REFERENCES Users(user)
);

/* Tabla para compartir las listas */
CREATE TABLE Shared_Purchase(
    snp INT AUTO_INCREMENT,
    purchase INT NOT NULL,
    user_shared INT NOT NULL,
    PRIMARY KEY (snp),
    FOREIGN KEY (purchase) REFERENCES Purchase(purchase),
    FOREIGN KEY (user_shared) REFERENCES Users(user)
);

/* Relacion entre lista siguiente compra y producto */
CREATE TABLE Product_Purchase (
    pnp INT AUTO_INCREMENT,
    purchase INT NOT NULL,
    product INT NOT NULL,
    UNIQUE(purchase, product),
    PRIMARY KEY (pnp),
    FOREIGN KEY (purchase) REFERENCES Purchase(purchase),
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

ALTER TABLE `Purchases` ADD COLUMN creation_date DATETIME DEFAULT NOW();

ALTER TABLE `Product` DROP COLUMN quantity;

ALTER TABLE `Product_Purchase` ADD COLUMN quantity INT DEFAULT 1;