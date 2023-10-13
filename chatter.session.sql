-- @block
CREATE TABLE Users (
    id int primary key auto_increment,
    name varchar (16),
    color varchar (255)
);

-- @block
DROP TABLE Users;

-- @block
Select * from Users;

-- @block
INSERT INTO Users (name, color) VALUES ('Chad', 'White');

-- @block
CREATE TABLE Messages (
    id int primary key auto_increment,
    sender varchar(16),
    message varchar(255),
    date varchar(255) 
);

-- @block
select * from Messages;

-- @block
DROP TABLE Messages;