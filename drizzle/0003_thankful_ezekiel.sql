CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`image_url` text NOT NULL,
	`price` real NOT NULL,
	`description` text,
	`created_at` text NOT NULL
);
