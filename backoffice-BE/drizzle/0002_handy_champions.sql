ALTER TABLE `notifications` MODIFY COLUMN `is_read` boolean;--> statement-breakpoint
ALTER TABLE `notifications` MODIFY COLUMN `is_read` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `notifications` MODIFY COLUMN `type` enum('EVENT','INVITATION','MESSAGE','SIGNUP');--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('ADMIN','INSTRUCTOR','PARENT','CHILD') DEFAULT 'CHILD';--> statement-breakpoint
ALTER TABLE `notifications` ADD `user_id` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` DROP COLUMN `user_email`;