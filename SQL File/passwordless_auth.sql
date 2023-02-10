DROP SCHEMA IF EXISTS `passwordless_auth`;
CREATE SCHEMA `passwordless_auth`;
USE `passwordless_auth`;

CREATE TABLE `users` (
  `user_name` VARCHAR(40) NOT NULL,
  `user_role` VARCHAR(30) NOT NULL DEFAULT 'Normal-User',
  `public_key` VARCHAR(632) NOT NULL,
  `meta_data` JSON NULL,
  PRIMARY KEY (`user_name`),
  UNIQUE INDEX `public_key_UNIQUE` (`public_key` ASC) VISIBLE);
