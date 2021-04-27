-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. Apr 2021 um 21:24
-- Server-Version: 10.4.14-MariaDB
-- PHP-Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `bif2webscriptinguser`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `id` int(6) UNSIGNED NOT NULL,
  `title` varchar(30) NOT NULL,
  `Erstelldatum` date NOT NULL,
  `Ablaufdatum` date NOT NULL,
  `Ort` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`id`, `title`, `Erstelldatum`, `Ablaufdatum`, `Ort`) VALUES
(1, 'Presenatation', '2021-04-10', '2021-04-20', 'Vienna'),
(2, 'test', '2021-04-27', '2021-05-01', 'Vienna'),
(3, 'Study', '2021-04-27', '2021-05-10', 'Vienna');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `oneappointment`
--

CREATE TABLE `oneappointment` (
  `id` int(11) NOT NULL,
  `appointment` varchar(50) NOT NULL,
  `Datum` datetime NOT NULL,
  `votes` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `oneappointment`
--

INSERT INTO `oneappointment` (`id`, `appointment`, `Datum`, `votes`) VALUES
(1, 'Presentation', '2021-04-15 15:30:00', ''),
(2, 'Presentation', '2021-04-16 15:30:00', ''),
(3, 'test', '2021-04-30 10:20:00', ''),
(4, 'test', '2021-04-29 14:20:00', '1'),
(5, 'Study', '2021-05-05 14:10:00', ''),
(6, 'Study', '2021-04-30 15:20:00', '1'),
(7, 'Study', '2021-05-07 15:30:00', '1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(6) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `kommentar` varchar(100) DEFAULT NULL,
  `appointment` varchar(50) NOT NULL,
  `Datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `kommentar`, `appointment`, `Datum`) VALUES
(1, 'Kollin', 'maths', 'Presentation', '2021-04-15 15:30:00'),
(4, 'leeiam', 'maths, chemistry ', 'Study', '2021-05-07 15:30:00'),
(5, '', '', 'test', '2021-04-29 14:20:00'),
(6, '', '', 'test', '2021-05-07 15:30:00');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `oneappointment`
--
ALTER TABLE `oneappointment`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `oneappointment`
--
ALTER TABLE `oneappointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
