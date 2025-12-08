ALTER TABLE `dojos` DROP INDEX `tag`;--> statement-breakpoint
ALTER TABLE `notifications` MODIFY COLUMN `type` enum('event','invitation','message','signup');--> statement-breakpoint
ALTER TABLE `user_cards` MODIFY COLUMN `exp_month` int;--> statement-breakpoint
ALTER TABLE `user_cards` MODIFY COLUMN `exp_year` int;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('admin','instructor','parent','child') DEFAULT 'child';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `stripe_account_id` varchar(255);--> statement-breakpoint
ALTER TABLE `dojos` ADD `user_id` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `dojos` ADD `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `dojos` ADD `tag` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `dojos` ADD `tagline` varchar(255);--> statement-breakpoint
ALTER TABLE `dojos` ADD CONSTRAINT `tag` UNIQUE(`tag`);--> statement-breakpoint
ALTER TABLE `dojos` ADD CONSTRAINT `dojos_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dojos` DROP COLUMN `user_email`;--> statement-breakpoint
ALTER TABLE `dojos` DROP COLUMN `dojo_name`;--> statement-breakpoint
ALTER TABLE `dojos` DROP COLUMN `dojo_tag`;--> statement-breakpoint
ALTER TABLE `dojos` DROP COLUMN `dojo_tagline`;