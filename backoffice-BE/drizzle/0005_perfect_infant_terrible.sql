ALTER TABLE `dojos` MODIFY COLUMN `tagline` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('dojo-admin','instructor','parent','child') NOT NULL;