CREATE DATABASE LibraryManagement
go
use LibraryManagement
go
CREATE TABLE [user] (
  [id] integer IDENTITY(1,1) PRIMARY KEY,
  [fullName] nvarchar(255),
  [username] nvarchar(255) UNIQUE,
  [password] nvarchar(255),
  [email] nvarchar(255),
  [mobileNumber] nvarchar(255),
  [isAdmin] bit,
  [created_at] DATETIME DEFAULT GETDATE(),
  [updated_at] DATETIME DEFAULT NULL,
)
GO

CREATE TABLE [category] (
  [id] integer IDENTITY(1,1) PRIMARY KEY,
  [categoryName] nvarchar(255) UNIQUE,
  [created_at] DATETIME DEFAULT GETDATE(),
  [updated_at] DATETIME DEFAULT NULL,
  [status] bit
)
GO

CREATE TABLE [author] (
  [id] integer IDENTITY(1,1) PRIMARY KEY,
  [authorName] nvarchar(255) UNIQUE,
  [created_at] DATETIME DEFAULT GETDATE(),
  [updated_at] DATETIME DEFAULT NULL
)
GO

CREATE TABLE [book] (
  [id] integer IDENTITY(1,1) PRIMARY KEY,
  [authorId] integer,
  [category_id] integer,
  [bookName] nvarchar(255) UNIQUE,
  [isBorrowed] bit,
  [ISBNNumber] nvarchar(255),
  [bookImage] nvarchar(255),
  [bookPrice] smallint,
  [created_ad] DATETIME DEFAULT GETDATE(),
  [updated_at] DATETIME DEFAULT NULL
)
GO

CREATE TABLE [order] (
  [id] integer IDENTITY(1,1) PRIMARY KEY,
  [userId] integer,
  [borrowDate] DATETIME DEFAULT GETDATE(),
  [returnDate] DATETIME DEFAULT GETDATE(),
  [returnStatus] bit
)
GO

CREATE TABLE [orderItems] (
  [bookId] integer,
  [orderId] integer
)
GO

ALTER TABLE [book] ADD FOREIGN KEY ([authorId]) REFERENCES [author] ([id])
GO

ALTER TABLE [book] ADD FOREIGN KEY ([category_id]) REFERENCES [category] ([id])
GO

ALTER TABLE [orderItems] ADD FOREIGN KEY ([orderId]) REFERENCES [order] ([id])
GO

ALTER TABLE [orderItems] ADD FOREIGN KEY ([bookId]) REFERENCES [book] ([id])
GO

ALTER TABLE [order] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO
