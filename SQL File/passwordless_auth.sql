DROP SCHEMA IF EXISTS `passwordless_auth`;
CREATE SCHEMA `passwordless_auth`;
USE `passwordless_auth`;

CREATE TABLE `users` (
  `user_name` VARCHAR(40) NOT NULL,
  `user_role` VARCHAR(30) NOT NULL DEFAULT 'Normal-User',
  `public_key` JSON NOT NULL,
  `meta_data` JSON NOT NULL,
  PRIMARY KEY (`user_name`));