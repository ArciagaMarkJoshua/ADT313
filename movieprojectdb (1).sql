-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 02:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieprojectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `characterName` varchar(120) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casts`
--

INSERT INTO `casts` (`id`, `movieId`, `userId`, `name`, `url`, `characterName`, `dateCreated`, `dateUpdated`) VALUES
(1, 38, 1, 'Robert Downey Jr.', 'https://image.tmdb.org/t/p/original/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg', 'Tony Stark / Iron Man', '2024-10-22 03:25:43', '0000-00-00 00:00:00'),
(2, 38, 1, 'Chris Evans', 'https://image.tmdb.org/t/p/original/3bOGNsHlrswhyW79uvIHH1V43JI.jp', 'Steve Rogers / Captain America', '2024-10-22 03:31:13', '0000-00-00 00:00:00'),
(19, 222, 13, 'Shameik Moore2', 'https://image.tmdb.org/t/p/original/mGF5ihrMt1MCxDvEOK2MO6YcNLt.jpg', 'Miles Morales (voice)2', '2024-12-20 13:10:01', '0000-00-00 00:00:00'),
(20, 222, 13, 'Hailee Steinfeld2', 'https://image.tmdb.org/t/p/original/dxSDWkiVaC6JYjrV3XRAZI7HOSS.jpg', 'Gwen Stacy (voice)2', '2024-12-20 13:10:01', '0000-00-00 00:00:00'),
(21, 223, 13, 'Ben Affleck', 'https://image.tmdb.org/t/p/original/aTcqu8cI4wMohU17xTdqmXKTGrw.jpg', 'Bruce Wayne / Batman', '2024-12-20 13:12:32', '0000-00-00 00:00:00'),
(22, 223, 13, 'Henry Cavill', 'https://image.tmdb.org/t/p/original/iWdKjMry5Pt7vmxU7bmOQsIUyHa.jpg', 'Clark Kent / Superman', '2024-12-20 13:12:32', '0000-00-00 00:00:00'),
(23, 224, 13, 'Christian Bale2', 'https://image.tmdb.org/t/p/original/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg', 'Bruce Wayne / Batma2n', '2024-12-20 13:15:59', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text NOT NULL,
  `popularity` float NOT NULL,
  `releaseDate` date NOT NULL,
  `voteAverage` float NOT NULL,
  `backdropPath` varchar(255) NOT NULL,
  `posterPath` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `userId`, `tmdbId`, `title`, `overview`, `popularity`, `releaseDate`, `voteAverage`, `backdropPath`, `posterPath`, `isFeatured`, `dateCreated`, `dateUpdated`) VALUES
(2, 1, 299534, 'Avengers: Endgame ', 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.', 126.942, '0000-00-00', 8.25222, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original//or06FN3Dka5tukK1e9sl16pB3iy.jpg', 0, '2024-10-19 04:41:51', '0000-00-00 00:00:00'),
(40, 1, 1184918, 'The Wild Robot2', 'After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island\'s animals and cares for an orphaned baby goose.', 4473.7, '2024-09-12', 8.615, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original//9w0Vh9eizfBXrcomiaFWTIPdboo.jpg', 0, '2024-10-19 03:28:34', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 38, 'uploads/photos/poster1728019066.jpg', 'test', '2024-10-04 05:17:46', '0000-00-00 00:00:00'),
(2, 1, 38, 'https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', 'Test Description', '2024-10-22 04:56:09', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `middleName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(1, 'test2@mail.com', 'd8578edf8458ce06fbc5bb76a58c5ca4', 'Lem', '', 'Francisco', '09351107560', 'admin'),
(13, 'arciagamarkjoshua@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Mark', 'Joshua Perico', 'Arciaga', '09999999', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `site` varchar(255) NOT NULL,
  `videoKey` varchar(255) NOT NULL,
  `videoType` varchar(255) NOT NULL,
  `official` tinyint(1) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `userId`, `movieId`, `url`, `name`, `site`, `videoKey`, `videoType`, `official`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 38, 'https://www.youtube.com/embed/PARfU2Vi694', 'Avengers vs Ebony Maw & Cull Obsidian | Avengers Infinity War (2018) IMAX Movie Clip HD 4K', 'Youtube', 'PARfU2Vi694', 'Clip', 0, '2024-10-22 05:13:14', '0000-00-00 00:00:00'),
(2, 1, 38, 'https://www.youtube.com/embed/49xWJJvpjzI', 'Thor Arrives In Wakanda Scene - Avengers Infinity War (2018) Movie CLIP 4K ULTRA HD', 'YouTube', '49xWJJvpjzI', 'Clip', 0, '2024-10-22 05:15:45', '0000-00-00 00:00:00'),
(89, 13, 222, 'https://www.youtube.com/embed/AFPLRIdn1pk', 'THE SPIDER WITHIN: A SPIDER-VERSE STORY | Official Short Film (Full)', 'YouTube', 'AFPLRIdn1pk', 'Featurette', 0, '2024-12-20 13:10:01', '0000-00-00 00:00:00'),
(90, 13, 222, 'https://www.youtube.com/embed/qA8JVcRUnCg', 'Drawn To The Moment | Joaquim Dos Santos & Justin K. Thompson', 'YouTube', 'qA8JVcRUnCg', 'Featurette', 0, '2024-12-20 13:10:01', '0000-00-00 00:00:00'),
(91, 13, 223, 'https://www.youtube.com/embed/9boP0bV1y8s', 'DC Super Scenes: The Trinity', 'YouTube', '9boP0bV1y8s', 'Clip', 0, '2024-12-20 13:12:32', '0000-00-00 00:00:00'),
(92, 13, 223, 'https://www.youtube.com/embed/mCrgllhLbMM', 'Batman Battles Superman', 'YouTube', 'mCrgllhLbMM', 'Clip', 0, '2024-12-20 13:12:32', '0000-00-00 00:00:00'),
(93, 13, 224, 'https://www.youtube.com/embed/lirBhHXvDSg', 'Trailer', 'YouTube', 'lirBhHXvDSg', 'Trailer', 0, '2024-12-20 13:15:59', '0000-00-00 00:00:00'),
(94, 13, 224, 'https://www.youtube.com/embed/FiL1_5DWV7Y', 'Official 4K Trailer', 'YouTube', 'FiL1_5DWV7Y', 'Trailer', 0, '2024-12-20 13:15:59', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
