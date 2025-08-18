CREATE TABLE `affirmation_schedules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`times` text NOT NULL,
	`tone` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `checkins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`week_number` integer NOT NULL,
	`hot_count` integer NOT NULL,
	`severity` integer NOT NULL,
	`sleep` integer NOT NULL,
	`mood` integer NOT NULL,
	`adherence` integer NOT NULL,
	`note` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
