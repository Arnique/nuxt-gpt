CREATE TABLE `users` (
	`id` text NOT NULL,
	`auth_provider` text DEFAULT 'google.com' NOT NULL,
	`avatar` text NOT NULL,
	`created_at` integer NOT NULL,
	`email` text NOT NULL,
	`locked` integer,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`tokens` integer DEFAULT 0,
	`max_tokens` integer DEFAULT 300
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);