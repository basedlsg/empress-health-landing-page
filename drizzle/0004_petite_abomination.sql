CREATE TABLE `doctors_waitlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`specialty` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `doctors_waitlist_email_unique` ON `doctors_waitlist` (`email`);