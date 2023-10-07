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
    message varchar(0),
    dateSent DATETIME 
)

select * from Messages;