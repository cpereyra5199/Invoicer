-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2015 at 03:50 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `invoicemanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
`ID` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `StreetAddress` varchar(200) NOT NULL,
  `CityState` varchar(200) NOT NULL,
  `ZipCode` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`ID`, `Name`, `Email`, `StreetAddress`, `CityState`, `ZipCode`) VALUES
(36, 'Sandro Olivera', 'crpereyra1@gmail.com', '8 Perimeter Ctr. E.', 'Snellville, GA', '30346'),
(37, 'Maxi Pereyra', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Duluth, GA', '30346'),
(38, 'Stefani Iotova', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Duluth, GA', '30346'),
(39, 'Santiago Figueroa', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Sandry Springs, GA', '30346'),
(40, 'Olga Pereyra', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Jonesboro, GA', '30346'),
(41, 'Facundo Figueroa', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Roswell, GA', '30346'),
(42, 'Franco Figueroa', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30346'),
(43, 'Mariel Figueroa', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Marietta, GA', '30346'),
(44, 'Daniel Tosh', 'crpereyra1@gmail.com', '8 Perimeter Ctr. E.', 'Atlanta, GA', '30342'),
(45, 'Niko Iotova', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30345'),
(46, 'Pedro Lacuesta', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30346'),
(47, 'Matias Lacuesta', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30346'),
(48, 'Paula Lacuesta', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30346'),
(49, 'Mariana Lacuesta', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30346'),
(50, 'Anabelle Lacuesta', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Lawrenceville, GA', '30346'),
(51, 'Anastacia Steele', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30346'),
(52, 'Velkov Iotova', 'crpereyra1@gmail.com', '8 Perimeter Ctr.', 'Atlanta, GA', '30346'),
(53, 'Christian Gray', 'crpereyra1@gmail.com', '8 Perimeter cTr.', 'Seattle, WA', '97001');

-- --------------------------------------------------------

--
-- Table structure for table `invoicecategories`
--

CREATE TABLE IF NOT EXISTS `invoicecategories` (
  `Category` varchar(200) NOT NULL,
  `Taxable` bit(1) NOT NULL,
  `Expense` bit(1) NOT NULL,
  `Amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoicecategories`
--

INSERT INTO `invoicecategories` (`Category`, `Taxable`, `Expense`, `Amount`) VALUES
('$100 Discount', b'0', b'0', '-100.00'),
('1 TB HardDrive', b'0', b'1', '80.00'),
('Application Development', b'0', b'0', '60.00'),
('Computer Repair', b'0', b'0', '100.00'),
('IOS Development', b'0', b'1', '100.00'),
('Web Development', b'0', b'0', '40.00');

-- --------------------------------------------------------

--
-- Table structure for table `invoiceconfig`
--

CREATE TABLE IF NOT EXISTS `invoiceconfig` (
  `ID` int(11) NOT NULL,
  `InvoiceCompanyName` varchar(200) NOT NULL,
  `InvoiceStreetAddress` varchar(200) NOT NULL,
  `InvoiceCityState` varchar(200) NOT NULL,
  `InvoiceZipCode` varchar(10) NOT NULL,
  `InvoiceSendClientEmail` bit(1) NOT NULL,
  `InvoiceSendCompanyEmail` bit(1) NOT NULL,
  `InvoiceSendToEmail` varchar(200) NOT NULL,
  `InvoiceTaxRate` double(10,2) NOT NULL,
  `LinkedDomain` varchar(200) NOT NULL,
  `SendEmailFrom` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoiceconfig`
--

INSERT INTO `invoiceconfig` (`ID`, `InvoiceCompanyName`, `InvoiceStreetAddress`, `InvoiceCityState`, `InvoiceZipCode`, `InvoiceSendClientEmail`, `InvoiceSendCompanyEmail`, `InvoiceSendToEmail`, `InvoiceTaxRate`, `LinkedDomain`, `SendEmailFrom`) VALUES
(1, 'EF Contractors LLC.', '1945 Savoy Dr.', 'Atlanta, GA', '30342', b'0', b'0', '', 7.00, 'http://localhost:81/', 'info@efcontractorsllc.com');

-- --------------------------------------------------------

--
-- Table structure for table `invoiceitem`
--

CREATE TABLE IF NOT EXISTS `invoiceitem` (
`ID` int(11) NOT NULL,
  `InvoiceID` int(11) NOT NULL,
  `ItemName` varchar(200) NOT NULL,
  `ItemDescription` varchar(200) NOT NULL,
  `ItemQuantity` int(11) NOT NULL,
  `ItemTotal` decimal(10,2) NOT NULL,
  `Taxable` bit(1) NOT NULL,
  `Rate` decimal(10,2) NOT NULL,
  `Expense` bit(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=336 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoiceitem`
--

INSERT INTO `invoiceitem` (`ID`, `InvoiceID`, `ItemName`, `ItemDescription`, `ItemQuantity`, `ItemTotal`, `Taxable`, `Rate`, `Expense`) VALUES
(272, 1057, 'Computer Repair', '', 2, '100.00', b'0', '6.50', b'0'),
(273, 1058, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(274, 1059, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(275, 1060, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(276, 1061, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(280, 1063, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(281, 1063, '1 TB HardDrive', '', 1, '80.00', b'1', '6.50', b'1'),
(282, 1063, 'Web Development', '', 1, '40.00', b'1', '6.50', b'0'),
(283, 1064, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(284, 1064, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(285, 1064, '$100 Discount', '', 1, '-100.00', b'0', '6.50', b'0'),
(286, 1065, '1 TB HardDrive', '', 1, '80.00', b'0', '6.50', b'1'),
(287, 1065, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(288, 1066, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(289, 1067, 'Web Development', '', 5, '40.00', b'0', '6.50', b'0'),
(290, 1068, 'Web Development', '', 20, '40.00', b'0', '6.50', b'0'),
(291, 1068, '1 TB HardDrive', '', 1, '80.00', b'0', '6.50', b'1'),
(292, 1068, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(293, 1069, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(294, 1070, '1 TB HardDrive', '', 1, '80.00', b'0', '6.50', b'1'),
(295, 1071, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(296, 1072, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(297, 1073, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(298, 1074, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(299, 1075, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(300, 1076, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(301, 1077, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(302, 1078, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(303, 1079, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(304, 1080, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(305, 1081, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(306, 1082, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(307, 1083, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(308, 1084, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(309, 1085, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(310, 1086, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(311, 1087, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(312, 1088, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(313, 1089, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(314, 1090, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(315, 1091, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(316, 1092, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(317, 1093, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(318, 1094, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(319, 1095, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(320, 1096, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(321, 1097, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(322, 1098, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(323, 1099, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(324, 1100, 'Web Development', '', 1, '40.00', b'0', '7.00', b'0'),
(325, 1101, 'Web Development', '', 10, '40.00', b'0', '6.50', b'0'),
(326, 1102, 'Web Development', '', 5, '40.00', b'0', '6.50', b'0'),
(327, 1103, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(328, 1104, '1 TB HardDrive', '', 1, '80.00', b'0', '6.50', b'1'),
(329, 1104, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(330, 1105, '1 TB HardDrive', '', 1, '80.00', b'0', '6.50', b'1'),
(331, 1106, 'Web Development', '', 1, '40.00', b'0', '6.50', b'0'),
(332, 1107, '1 TB HardDrive', '', 1, '80.00', b'0', '6.50', b'1'),
(333, 1108, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(334, 1109, 'Computer Repair', '', 1, '100.00', b'0', '6.50', b'0'),
(335, 1110, '1 TB HardDrive', '', 1, '80.00', b'0', '6.50', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE IF NOT EXISTS `invoices` (
`ID` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `ExpirationDate` datetime NOT NULL,
  `EmailSent` bit(1) NOT NULL,
  `Paid` bit(1) NOT NULL,
  `PaidDate` datetime NOT NULL,
  `CustomerID` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1111 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`ID`, `DateTime`, `ExpirationDate`, `EmailSent`, `Paid`, `PaidDate`, `CustomerID`) VALUES
(1057, '2015-02-14 01:36:56', '2015-02-24 01:36:56', b'1', b'0', '0000-00-00 00:00:00', 41),
(1058, '2015-02-12 23:04:42', '2015-02-22 23:04:42', b'1', b'0', '0000-00-00 00:00:00', 41),
(1059, '2015-02-12 00:22:07', '2015-02-22 00:22:07', b'1', b'1', '2015-02-12 00:54:45', 42),
(1060, '2015-02-12 00:23:47', '2015-02-22 00:23:47', b'1', b'1', '2015-02-12 00:30:12', 43),
(1061, '2015-02-12 00:41:49', '2015-02-18 00:41:49', b'1', b'1', '2015-02-12 00:42:50', 43),
(1063, '2015-02-14 01:36:11', '2015-02-17 01:36:11', b'1', b'0', '0000-00-00 00:00:00', 36),
(1064, '2015-02-12 00:55:59', '2015-02-17 00:55:59', b'1', b'1', '2015-02-12 00:56:14', 40),
(1065, '2015-02-12 00:58:00', '2015-02-17 00:58:00', b'1', b'1', '2015-02-12 00:59:30', 38),
(1066, '2015-02-12 00:58:52', '2015-02-22 00:58:52', b'1', b'0', '0000-00-00 00:00:00', 43),
(1067, '2015-01-14 22:31:01', '2015-03-30 22:31:01', b'1', b'1', '2015-01-14 22:34:14', 44),
(1068, '2015-01-15 22:54:54', '2015-03-24 22:54:54', b'1', b'1', '2015-02-12 22:55:19', 36),
(1069, '2015-02-14 01:22:44', '2015-02-24 01:22:44', b'1', b'1', '2015-02-14 01:23:09', 41),
(1070, '2015-02-14 01:35:13', '2015-02-24 01:35:13', b'1', b'0', '0000-00-00 00:00:00', 38),
(1071, '2015-02-14 01:38:45', '2015-02-24 01:38:45', b'1', b'0', '0000-00-00 00:00:00', 40),
(1072, '2015-02-14 01:39:45', '2015-02-24 01:39:45', b'1', b'0', '0000-00-00 00:00:00', 37),
(1073, '2015-02-14 01:40:17', '2015-02-17 01:40:17', b'1', b'0', '0000-00-00 00:00:00', 40),
(1074, '2015-02-14 01:42:17', '2015-02-18 01:42:17', b'1', b'0', '0000-00-00 00:00:00', 43),
(1075, '2015-02-14 01:46:59', '2015-02-20 01:46:59', b'1', b'0', '0000-00-00 00:00:00', 36),
(1076, '2015-02-14 01:47:32', '2015-02-15 01:47:32', b'0', b'0', '0000-00-00 00:00:00', 40),
(1077, '2015-02-14 01:47:42', '2015-02-17 01:47:42', b'0', b'0', '0000-00-00 00:00:00', 42),
(1078, '2015-02-14 01:47:51', '2015-02-15 01:47:51', b'0', b'0', '0000-00-00 00:00:00', 41),
(1079, '2015-02-14 01:49:36', '2015-02-18 01:49:36', b'1', b'0', '0000-00-00 00:00:00', 38),
(1080, '2015-02-14 01:50:09', '2015-02-20 01:50:09', b'1', b'0', '0000-00-00 00:00:00', 43),
(1081, '2015-02-14 01:50:29', '2015-02-20 01:50:29', b'1', b'0', '0000-00-00 00:00:00', 39),
(1082, '2015-02-14 01:50:56', '2015-02-19 01:50:56', b'1', b'0', '0000-00-00 00:00:00', 40),
(1083, '2015-02-14 01:51:19', '2015-02-18 01:51:19', b'1', b'0', '0000-00-00 00:00:00', 36),
(1084, '2015-02-14 01:51:59', '2015-02-18 01:51:59', b'1', b'0', '0000-00-00 00:00:00', 42),
(1085, '2015-02-14 02:03:24', '2015-02-24 02:03:24', b'1', b'0', '0000-00-00 00:00:00', 36),
(1086, '2015-02-14 02:05:15', '2015-02-20 02:05:15', b'1', b'0', '0000-00-00 00:00:00', 38),
(1087, '2015-02-14 02:08:11', '2015-02-20 02:08:11', b'1', b'0', '0000-00-00 00:00:00', 38),
(1088, '2015-02-14 02:09:43', '2015-02-20 02:09:43', b'1', b'0', '0000-00-00 00:00:00', 37),
(1089, '2015-02-14 02:11:23', '2015-02-20 02:11:23', b'1', b'0', '0000-00-00 00:00:00', 42),
(1090, '2015-02-14 02:13:56', '2015-02-18 02:13:56', b'1', b'0', '0000-00-00 00:00:00', 40),
(1091, '2015-02-14 02:16:18', '2015-02-20 02:16:18', b'1', b'0', '0000-00-00 00:00:00', 43),
(1092, '2015-02-14 02:17:41', '2015-02-19 02:17:41', b'1', b'0', '0000-00-00 00:00:00', 40),
(1093, '2015-02-14 02:21:03', '2015-02-19 02:21:03', b'1', b'0', '0000-00-00 00:00:00', 38),
(1094, '2015-02-14 02:23:54', '2015-02-18 02:23:54', b'0', b'0', '0000-00-00 00:00:00', 38),
(1095, '2015-02-14 02:24:05', '2015-02-19 02:24:05', b'0', b'0', '0000-00-00 00:00:00', 43),
(1096, '2015-02-14 02:27:09', '2015-02-14 02:27:09', b'1', b'0', '0000-00-00 00:00:00', 37),
(1097, '2015-02-14 02:27:45', '2015-02-14 02:27:45', b'1', b'0', '0000-00-00 00:00:00', 40),
(1098, '2015-02-14 02:29:43', '2015-02-14 02:29:43', b'1', b'0', '0000-00-00 00:00:00', 43),
(1099, '2015-02-14 02:31:30', '2015-02-14 02:31:30', b'0', b'0', '0000-00-00 00:00:00', 43),
(1100, '2015-02-15 20:53:28', '2015-02-15 20:53:28', b'1', b'0', '0000-00-00 00:00:00', 38),
(1101, '2015-02-15 15:12:28', '2015-02-25 15:12:28', b'0', b'0', '0000-00-00 00:00:00', 45),
(1102, '2015-02-15 15:12:58', '2015-02-25 15:12:58', b'0', b'0', '0000-00-00 00:00:00', 46),
(1103, '2015-02-15 15:13:31', '2015-02-25 15:13:31', b'0', b'0', '0000-00-00 00:00:00', 47),
(1104, '2015-02-15 15:14:00', '2015-02-25 15:14:00', b'0', b'0', '0000-00-00 00:00:00', 48),
(1105, '2015-02-15 15:14:24', '2015-02-25 15:14:24', b'0', b'0', '0000-00-00 00:00:00', 49),
(1106, '2015-02-15 15:15:51', '2015-02-25 15:15:51', b'0', b'0', '0000-00-00 00:00:00', 50),
(1107, '2015-02-15 15:16:23', '2015-02-25 15:16:23', b'0', b'0', '0000-00-00 00:00:00', 51),
(1108, '2015-02-15 15:17:02', '2015-02-25 15:17:02', b'0', b'0', '0000-00-00 00:00:00', 52),
(1109, '2015-02-15 15:17:38', '2015-02-25 15:17:38', b'0', b'0', '0000-00-00 00:00:00', 53),
(1110, '2015-02-15 20:23:32', '2015-02-25 20:23:32', b'1', b'1', '2015-01-15 20:23:45', 49);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `invoicecategories`
--
ALTER TABLE `invoicecategories`
 ADD PRIMARY KEY (`Category`);

--
-- Indexes for table `invoiceconfig`
--
ALTER TABLE `invoiceconfig`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `invoiceitem`
--
ALTER TABLE `invoiceitem`
 ADD PRIMARY KEY (`ID`), ADD KEY `fk_invoice` (`InvoiceID`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
 ADD PRIMARY KEY (`ID`), ADD KEY `invoices_CustomerID` (`CustomerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `invoiceitem`
--
ALTER TABLE `invoiceitem`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=336;
--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1111;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoiceitem`
--
ALTER TABLE `invoiceitem`
ADD CONSTRAINT `invoiceitem_ibfk_1` FOREIGN KEY (`InvoiceID`) REFERENCES `invoices` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
ADD CONSTRAINT `invoices_CustomerID` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
