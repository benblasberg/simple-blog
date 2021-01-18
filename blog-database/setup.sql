CREATE TABLE `users` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(40) NOT NULL,
	`password` VARCHAR(60) NOT NULL,
	UNIQUE KEY `user_id_index` (`id`) USING BTREE,
UNIQUE KEY `user_name_index` (`name`) USING BTREE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `posts` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(250) NOT NULL,
	`content` TEXT NOT NULL,
	`author_id` BIGINT NOT NULL,
	UNIQUE KEY `post_id_index` (`id`) USING BTREE,
	PRIMARY KEY (`id`)
);

INSERT INTO users (name, password)
VALUES ('Bill Brasky', '$2y$12$tQtPg9UkRh8dipEe.xEsHui44ZOy61cunL8XESOBg7uV9wavFt7k.'); -- password is test

INSERT INTO users (name, password)
VALUES ('Will Williams', '$2y$12$.UBx/V8T19DPOPh.ecpj7eaauTWZ/LzcpI8CKX8W76lBOT1QLWCg.'); -- password is test2