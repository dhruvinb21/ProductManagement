-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2025 at 05:08 PM
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
-- Database: `productdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Books'),
(4, 'Home Appliances'),
(5, 'Toys'),
(6, 'Sports'),
(7, 'Groceries'),
(8, 'Furniture'),
(9, 'Beauty'),
(10, 'Automotive');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `c_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `c_id`) VALUES
(1, 'Smartphone', 1),
(2, 'Laptop', 1),
(3, 'Headphones', 1),
(4, 'Television', 1),
(5, 'Smartwatch', 1),
(6, 'Men T-Shirt', 2),
(7, 'Women Dress', 2),
(8, 'Jeans', 2),
(9, 'Jacket', 2),
(10, 'Shoes', 2),
(11, 'Novel', 3),
(12, 'Science Book', 3),
(13, 'Comic Book', 3),
(14, 'Cookbook', 3),
(15, 'Magazine', 3),
(16, 'Microwave', 4),
(17, 'Refrigerator', 4),
(18, 'Washing Machine', 4),
(19, 'Air Conditioner', 4),
(20, 'Mixer Grinder', 4),
(21, 'Action Figure', 5),
(22, 'Puzzle', 5),
(23, 'Lego Set', 5),
(24, 'Board Game', 5),
(25, 'Remote Car', 5),
(26, 'Football', 6),
(27, 'Cricket Bat', 6),
(28, 'Badminton Racket', 6),
(29, 'Tennis Ball', 6),
(30, 'Basketball', 6),
(31, 'Rice', 7),
(32, 'Pasta', 7),
(33, 'Biscuits', 7),
(34, 'Cooking Oil', 7),
(35, 'Sugar', 7),
(36, 'Sofa', 8),
(37, 'Dining Table', 8),
(38, 'Chair', 8),
(39, 'Bed', 8),
(40, 'Wardrobe', 8),
(41, 'Lipstick', 9),
(42, 'Shampoo', 9),
(43, 'Perfume', 9),
(44, 'Face Cream', 9),
(45, 'Nail Polish', 9),
(46, 'Car Cover', 10),
(47, 'Motor Oil', 10),
(48, 'Tyres', 10),
(49, 'Seat Covers', 10),
(50, 'Car Battery', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `c_id` (`c_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
