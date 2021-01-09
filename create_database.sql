CREATE DATABASE db_bunnie;

USE db_bunnie;

CREATE TABLE `user` (
  `id` int,
  `name` varchar(50),
  `last_name` varchar(50),
  `mobile` varchar(13),
  `username` varchar(20),
  `email` varchar(50),
  `password_hash` varchar(32),
  `registered_at` datetime,
  `last_login` datetime,
  `bio` text,
  `public` bool,
  PRIMARY KEY (`id`)
);

CREATE TABLE `anime` (
  `id` int,
  `user_id` int,
  `mal_id` int,
  `name` varchar(50),
  `current_episode` int,
  `total_episode` int,
  `last_update` datetime,
  `status` varchar(20),
  `note` text,
  FOREIGN KEY (user_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `collection` (
  `id` int,
  `user_id` int,
  `image_url` varchar(50),
  `name` varchar(50),
  `description` text,
  `created_at` datetime,
  `last_update` datetime,
  `public` bool,
  FOREIGN KEY (user_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `collection_item` (
  `id` int,
  `collection_id` int,
  `mal_id` int,
  `order` int,
  `note` text,
  `inserted_at` datetime,
  `last_update` datetime,
  FOREIGN KEY (collection_id) REFERENCES collection(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `post` (
  `id` int,
  `user_id` int,
  `content` text,
  `image_url` varchar(50),
  `likes` int,
  `comments` int,
  `created_at` datetime,
  `last_update` datetime,
  FOREIGN KEY (user_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `post_comment` (
  `id` int,
  `user_id` int,
  `post_id` int,
  `content` text,
  `created_at` datetime,
  `last_update` datetime,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (post_id) REFERENCES post(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_friend` (
  `id` int,
  `user_id` int,
  `friend_id` int,
  `created_at` datetime,
  `last_update` datetime,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (friend_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_follow` (
  `id` int,
  `user_id` int,
  `follower_id` int,
  `created_at` datetime,
  `last_update` datetime,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (follower_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_message` (
  `id` int,
  `user_id` int,
  `friend_id` int,
  `text` text,
  `created_at` datetime,
  `last_update` datetime,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (friend_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
);
