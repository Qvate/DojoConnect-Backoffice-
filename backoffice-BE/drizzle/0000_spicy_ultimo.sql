-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

CREATE TABLE IF NOT EXISTS `admin` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT 'current_timestamp()',
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `admin_password_resets` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`admin_email` varchar(255) NOT NULL,
	`otp` varchar(6) NOT NULL,
	`expires_at` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `announcements` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`sender_email` varchar(255) NOT NULL,
	`urgency` varchar(50) DEFAULT '''Update''',
	`created_at` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `announcement_recipients` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`announcement_id` int(11) NOT NULL,
	`recipient_email` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `attendance_records` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`class_id` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`attendance_date` date NOT NULL,
	`status` enum('Present','Absent','Late') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `broadcast_recipients` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`message_id` int(11) NOT NULL,
	`recipient_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `chats` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`type` enum('dm','group','broadcast') NOT NULL,
	`name` varchar(100) DEFAULT 'NULL',
	`created_by` int(11) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `chat_participants` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`chat_id` int(11) NOT NULL,
	`user_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `children_subscription` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`child_id` int(11) NOT NULL,
	`enrollment_id` varchar(50) NOT NULL,
	`stripe_subscription_id` varchar(255) DEFAULT 'NULL',
	`stripe_customer_id` varchar(255) NOT NULL,
	`status` enum('active','cancelled','paused') DEFAULT '''active''',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`stripe_session_id` varchar(255) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `classes` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`class_uid` varchar(50) NOT NULL,
	`owner_email` varchar(255) NOT NULL,
	`class_name` varchar(255) NOT NULL,
	`description` text DEFAULT 'NULL',
	`instructor` varchar(255) DEFAULT 'NULL',
	`level` enum('Beginner','Intermediate','Advanced') DEFAULT 'NULL',
	`age_group` varchar(50) DEFAULT 'NULL',
	`frequency` varchar(50) DEFAULT 'NULL',
	`capacity` int(11) DEFAULT 'NULL',
	`location` varchar(255) DEFAULT 'NULL',
	`street_address` varchar(255) DEFAULT 'NULL',
	`city` varchar(255) DEFAULT 'NULL',
	`status` enum('active','deleted','hide') DEFAULT '''active''',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`image_path` varchar(255) DEFAULT 'NULL',
	`subscription` varchar(100) DEFAULT 'NULL',
	`price` decimal(10,2) DEFAULT '0.00',
	`chat_id` int(11) DEFAULT 'NULL',
	`stripe_price_id` varchar(255) DEFAULT 'NULL',
	`stripe_product_id` varchar(255) NOT NULL,
	CONSTRAINT `class_uid` UNIQUE(`class_uid`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `class_schedule` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`class_id` int(11) NOT NULL,
	`day` varchar(20) DEFAULT 'NULL',
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`schedule_date` date DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `deletion_requests` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`reason` text DEFAULT 'NULL',
	`status` enum('pending','approved','rejected') DEFAULT '''pending''',
	`requested_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `dojos` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_email` varchar(150) NOT NULL,
	`dojo_name` varchar(255) NOT NULL,
	`dojo_tag` varchar(50) NOT NULL,
	`dojo_tagline` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `tag` UNIQUE(`dojo_tag`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `enrolled_children` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`enrollment_id` varchar(50) NOT NULL,
	`child_name` varchar(100) NOT NULL,
	`child_email` varchar(100) NOT NULL,
	`experience_level` varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `enrollments` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`enrollment_id` varchar(50) NOT NULL,
	`class_id` varchar(50) NOT NULL,
	`parent_email` varchar(100) NOT NULL,
	`created_at` datetime DEFAULT 'current_timestamp()',
	CONSTRAINT `enrollment_id` UNIQUE(`enrollment_id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `events` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text DEFAULT 'NULL',
	`class_ids` text NOT NULL,
	`visibility` text NOT NULL,
	`event_date` date NOT NULL,
	`start_time` varchar(20) NOT NULL,
	`end_time` varchar(20) NOT NULL,
	`notification_value` int(11) DEFAULT 0,
	`notification_unit` varchar(20) DEFAULT 'NULL',
	`location` varchar(255) DEFAULT 'NULL',
	`link` varchar(255) NOT NULL,
	`created_by` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`notification_sent` tinyint(1) DEFAULT 0,
	`response_status` varchar(121) NOT NULL DEFAULT '''pending'''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `feedback` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_email` varchar(255) DEFAULT 'NULL',
	`message` text DEFAULT 'NULL',
	`full_name` varchar(255) DEFAULT 'NULL',
	`role` varchar(100) DEFAULT 'NULL',
	`submitted_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `instructors_tbl` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`instructor_first_name` varchar(50) DEFAULT 'NULL',
	`instructor_last_name` varchar(50) DEFAULT 'NULL',
	`instructor_email` varchar(100) DEFAULT 'NULL',
	`invited_by` varchar(121) NOT NULL,
	`class` varchar(100) DEFAULT 'NULL',
	`status` varchar(121) NOT NULL DEFAULT '''pending'''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `messages` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`chat_id` int(11) NOT NULL,
	`sender_id` int(11) NOT NULL,
	`message` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `notifications` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_email` varchar(255) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`message` text DEFAULT 'NULL',
	`is_read` tinyint(1) DEFAULT 0,
	`created_at` datetime DEFAULT 'current_timestamp()',
	`type` varchar(50) DEFAULT 'NULL',
	`event_id` varchar(121) DEFAULT 'NULL',
	`accept_decline` varchar(20) DEFAULT 'NULL',
	`status` varchar(20) DEFAULT '''pending'''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `parents` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`enrollment_id` varchar(255) DEFAULT '''''',
	`class_id` varchar(255) DEFAULT '''''',
	CONSTRAINT `unique_parent_enrollment` UNIQUE(`email`,`enrollment_id`,`class_id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `password_resets` (
	`email` varchar(255) NOT NULL,
	`token` varchar(64) NOT NULL,
	`expires_at` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `sessions` (
	`session_id` varchar(255) NOT NULL,
	`user_email` varchar(255) NOT NULL,
	`user_ip` varchar(50) DEFAULT 'NULL',
	`user_agent` text DEFAULT 'NULL',
	`created_at` datetime DEFAULT 'current_timestamp()',
	`expires_at` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `students` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`class_id` varchar(255) DEFAULT 'NULL',
	`added_by` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `tasks` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(255) DEFAULT 'NULL',
	`description` text DEFAULT 'NULL',
	`assigned_to` varchar(255) DEFAULT 'NULL',
	`created_by` varchar(255) DEFAULT 'NULL',
	`due_date` datetime DEFAULT 'NULL',
	`notification_value` varchar(10) DEFAULT 'NULL',
	`notification_unit` varchar(10) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`status` enum('pending','in_progress','completed','declined') DEFAULT '''pending''',
	`updated_at` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `transactions` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_email` varchar(255) NOT NULL,
	`transaction_title` varchar(255) NOT NULL,
	`revenue` decimal(10,2) DEFAULT '0.00',
	`expenses` decimal(10,2) DEFAULT '0.00',
	`committed_by` varchar(255) DEFAULT 'NULL',
	`date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`class_id` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`username` varchar(100) DEFAULT 'NULL',
	`email` varchar(150) NOT NULL,
	`password` varchar(255) DEFAULT 'NULL',
	`referred_by` varchar(255) DEFAULT 'NULL',
	`avatar` text DEFAULT 'NULL',
	`role` enum('admin','instructor','parent','child') DEFAULT '''child''',
	`balance` decimal(10,2) DEFAULT '0.00',
	`referral_code` varchar(255) DEFAULT 'NULL',
	`active_sub` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`dob` varchar(20) DEFAULT 'NULL',
	`gender` varchar(10) DEFAULT 'NULL',
	`city` varchar(50) DEFAULT 'NULL',
	`street` varchar(100) DEFAULT 'NULL',
	`stripe_customer_id` varchar(255) DEFAULT 'NULL',
	`stripe_subscription_id` varchar(255) DEFAULT 'NULL',
	`subscription_status` varchar(50) DEFAULT 'NULL',
	`trial_ends_at` datetime DEFAULT 'NULL',
	`stripe_account_id` varchar(255) NOT NULL,
	`fcm_token` text DEFAULT 'NULL',
	`session_id` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `email` UNIQUE(`email`),
	CONSTRAINT `email_2` UNIQUE(`email`),
	CONSTRAINT `email_3` UNIQUE(`email`),
	CONSTRAINT `uc_users_email` UNIQUE(`email`),
	CONSTRAINT `username` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_cards` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_email` varchar(255) DEFAULT 'NULL',
	`payment_method_id` varchar(255) DEFAULT 'NULL',
	`brand` varchar(50) DEFAULT 'NULL',
	`last4` varchar(4) DEFAULT 'NULL',
	`exp_month` varchar(2) DEFAULT 'NULL',
	`exp_year` varchar(4) DEFAULT 'NULL',
	`is_default` tinyint(1) DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `waitlist` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`fullname` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `announcement_id` ON `announcement_recipients` (`announcement_id`);--> statement-breakpoint
CREATE INDEX `message_id` ON `broadcast_recipients` (`message_id`);--> statement-breakpoint
CREATE INDEX `recipient_id` ON `broadcast_recipients` (`recipient_id`);--> statement-breakpoint
CREATE INDEX `created_by` ON `chats` (`created_by`);--> statement-breakpoint
CREATE INDEX `user_id` ON `chat_participants` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_chat_participants` ON `chat_participants` (`chat_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `class_id` ON `class_schedule` (`class_id`);--> statement-breakpoint
CREATE INDEX `enrollment_id` ON `enrolled_children` (`enrollment_id`);--> statement-breakpoint
CREATE INDEX `idx_messages_chat_id` ON `messages` (`chat_id`);--> statement-breakpoint
CREATE INDEX `idx_messages_sender_id` ON `messages` (`sender_id`);--> statement-breakpoint
CREATE INDEX `user_email` ON `sessions` (`user_email`);
