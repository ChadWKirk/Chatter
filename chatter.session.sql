-- @block
CREATE TABLE Users (
    id int primary key auto_increment,
    name varchar (16),
    color varchar (255)
);

-- @block
Select * from Users;

-- @block
INSERT INTO Users (name, color) VALUES ('Chad', 'White');

-- @block
CREATE TABLE Messages (
    id int primary key auto_increment,
    sender varchar(16),
    message varchar(255),
    dateSent DATETIME 
);

-- @block
INSERT INTO Messages (sender, message) VALUES ('Chad', 'Sup');

-- @block
select * from Messages;

-- @block
DROP TABLE Messages;