ALTER TABLE `notifications` MODIFY COLUMN `id` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_cards` MODIFY COLUMN `id` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_cards` MODIFY COLUMN `is_default` boolean;--> statement-breakpoint
ALTER TABLE `user_cards` MODIFY COLUMN `is_default` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `user_cards` ADD `user_id` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_cards` ADD CONSTRAINT `user_cards_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_cards` DROP COLUMN `user_email`;