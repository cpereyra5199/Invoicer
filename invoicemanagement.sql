-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2015 at 02:59 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

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
-- Table structure for table `contractsteps`
--

CREATE TABLE IF NOT EXISTS `contractsteps` (
  `ID` int(11) NOT NULL,
  `InvoiceID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Value` decimal(10,2) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contractsteps`
--

INSERT INTO `contractsteps` (`ID`, `InvoiceID`, `Name`, `Description`, `Value`) VALUES
(1, 1164, 'Starts', 'Materials money down', '3000.00'),
(2, 1164, 'Phase 1', 'When framing and sheetrock is done', '4800.00'),
(3, 1164, 'Phase 2', 'Money down for painting materials', '1000.00'),
(4, 1164, 'Completion', 'When paint is done', '8700.00');

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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`ID`, `Name`, `Email`, `StreetAddress`, `CityState`, `ZipCode`) VALUES
(58, 'William Mullen', 'william.mullenjr@gmail.com', '3840 rivendell dr', 'Cumming, GA', '30040'),
(59, 'Joe Glaza', 'crpereyra1@gmail.com', '282 Underwood Dr', 'Sandy Springs, GA', '30328'),
(61, 'Kory Phillips', 'lovelybodies@gmail.com', '798 Marietta st', 'Atlanta, GA', '30318'),
(63, 'Laura Dorado', 'lauradorado29@gmail.com', '123 Home Address', 'Atlanta, GA', '30346'),
(64, 'Residence Inn', 'Hugydd@hotmail.com', '2771 Cumberland Blvd', 'Smyrna, GA', '30080'),
(65, 'Domingo', 'hervis.d@comcast.net', '2035 Westside ct', 'Snellville, GA', '30078'),
(66, 'Terry and Rich Fuller', 'tlfuller@ymail.com', '11 Lakeshore Dr', 'Avondale Estate, GA', '30002'),
(67, 'Tangela Watkins', 'tangelawatkins64@gmail.com', '3800 Mountain Way Cove', 'Snellville, GA', '30039'),
(68, 'Jamika Williams', 'jamika25@yahoo.com', '1959 Slate rd', 'Ellenwood, GA', '30295'),
(69, 'Emily and Temur', 'emilydonhauser@gmail.com', '3512 Skyland ridge ct', 'Loganville, GA', '30052'),
(70, 'Carlos Pereyra', 'crpereyra1@gmail.com', '123 home', 'atlanta, ga', '30346'),
(71, 'Mario Lan', 'moyungemail@yahoo.com', '2630 Cambrigde park dr', 'Duluth, GA', '30096');

-- --------------------------------------------------------

--
-- Table structure for table `invoicecategories`
--

CREATE TABLE IF NOT EXISTS `invoicecategories` (
  `Category` varchar(200) NOT NULL,
  `Taxable` tinyint(1) NOT NULL,
  `Expense` tinyint(1) NOT NULL,
  `Amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoicecategories`
--

INSERT INTO `invoicecategories` (`Category`, `Taxable`, `Expense`, `Amount`) VALUES
('Aplliances', 0, 0, '0.00'),
('Basement', 0, 0, '0.00'),
('Deck', 0, 0, '0.00'),
('Demolition', 0, 0, '0.00'),
('Door', 0, 0, '0.00'),
('Drain', 0, 0, '0.00'),
('Fixtures', 0, 0, '0.00'),
('Framing and Drywall ', 0, 0, '0.00'),
('Gutters', 0, 0, '0.00'),
('Installation', 0, 0, '0.00'),
('Labor', 0, 1, '15000.00'),
('Paint', 0, 0, '0.00'),
('Plumbing', 0, 0, '0.00'),
('Pressure wash', 0, 0, '0.00'),
('Tile ceiling', 0, 0, '0.00'),
('Tiling', 0, 0, '0.00'),
('Trim', 0, 0, '0.00'),
('Vinyl floor', 0, 0, '0.00');

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
  `InvoiceSendClientEmail` tinyint(1) NOT NULL,
  `InvoiceSendCompanyEmail` tinyint(1) NOT NULL,
  `InvoiceSendToEmail` varchar(200) NOT NULL,
  `InvoiceTaxRate` double(10,2) NOT NULL,
  `LinkedDomain` varchar(200) NOT NULL,
  `SendEmailFrom` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoiceconfig`
--

INSERT INTO `invoiceconfig` (`ID`, `InvoiceCompanyName`, `InvoiceStreetAddress`, `InvoiceCityState`, `InvoiceZipCode`, `InvoiceSendClientEmail`, `InvoiceSendCompanyEmail`, `InvoiceSendToEmail`, `InvoiceTaxRate`, `LinkedDomain`, `SendEmailFrom`) VALUES
(1, 'CGS Contractors LLC.', '3620 Dekalb Technology Parkway Suite 24', 'Atlanta, GA', '30340', 0, 0, '', 6.50, 'http://cgscontractors.com/', 'info@cgscontractors.com');

-- --------------------------------------------------------

--
-- Table structure for table `invoiceimages`
--

CREATE TABLE IF NOT EXISTS `invoiceimages` (
  `ID` int(11) NOT NULL,
  `InvoiceID` int(11) NOT NULL,
  `ImageName` varchar(1000) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invoiceitem`
--

CREATE TABLE IF NOT EXISTS `invoiceitem` (
  `ID` int(11) NOT NULL,
  `InvoiceID` int(11) NOT NULL,
  `ItemName` varchar(200) NOT NULL,
  `ItemDescription` longtext NOT NULL,
  `ItemQuantity` int(11) NOT NULL,
  `ItemTotal` decimal(10,2) NOT NULL,
  `Taxable` tinyint(1) NOT NULL,
  `Rate` decimal(10,2) NOT NULL,
  `Expense` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=514 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoiceitem`
--

INSERT INTO `invoiceitem` (`ID`, `InvoiceID`, `ItemName`, `ItemDescription`, `ItemQuantity`, `ItemTotal`, `Taxable`, `Rate`, `Expense`) VALUES
(365, 1127, 'bathroom renovation', 'Phase 1', 1, '1000.00', 0, '6.50', 0),
(378, 1135, 'Demolition', 'Labor and Materials', 1, '3000.00', 0, '6.50', 0),
(379, 1135, 'Framing', 'Labor and Materials', 1, '1800.00', 0, '6.50', 0),
(380, 1135, 'Drywall', 'Labor and Materials', 1, '980.00', 0, '6.50', 0),
(381, 1135, 'Roofing', 'Labor and Materials', 1, '620.00', 0, '6.50', 0),
(382, 1136, 'Kitchen renovation', '', 1, '2000.00', 0, '6.50', 0),
(383, 1137, 'Bathroom renovation', '', 1, '2000.00', 0, '6.50', 0),
(395, 1143, 'Demolition', 'Master bathroom complete demo', 1, '1800.00', 0, '6.50', 0),
(396, 1143, 'Framing', 'New wall,door and pocket door labor and materials', 1, '980.00', 0, '6.50', 0),
(397, 1143, 'Drywall', 'Labor and Materials', 1, '990.00', 0, '6.50', 0),
(398, 1143, 'Plumbing', ' Labor and Materials', 1, '1600.00', 0, '6.50', 0),
(399, 1143, 'Tiling', 'Labor and Builder materials', 1, '2800.00', 0, '6.50', 0),
(400, 1144, 'Bathroom renovation', '', 1, '2000.00', 0, '6.50', 0),
(403, 1147, 'Hardwood Floor instalation', 'Kitchen', 1, '2000.00', 0, '6.50', 0),
(408, 1149, 'Demolition', 'Closet Labor and Materials', 1, '600.00', 0, '6.50', 0),
(409, 1149, 'Framing', 'Closet Labor and Materials', 1, '900.00', 0, '6.50', 0),
(410, 1149, 'Drywall', 'Closet Labor and Materials', 1, '600.00', 0, '6.50', 0),
(414, 1151, 'Hardwood Floor instalation', 'Select white oak Labor and Materials', 1, '3200.00', 0, '6.50', 0),
(415, 1151, 'Hardwood Floor Repairs', 'Master closet repairs Labor and Materials', 1, '680.00', 0, '6.50', 0),
(416, 1151, 'Hardwood Floor Refinish', 'Labor and Materials entire house (3 coats)', 1, '3800.00', 0, '6.50', 0),
(417, 1152, 'Kitchen renovation', '', 1, '6000.00', 0, '6.50', 0),
(418, 1153, 'Hardwood Floor instalation', '', 1, '2000.00', 0, '6.50', 0),
(419, 1154, 'Master Bathroom Renovations', '', 1, '4000.00', 0, '6.50', 0),
(420, 1155, 'Kitchen renovation', '', 1, '4000.00', 0, '6.50', 0),
(421, 1151, 'Kitchen Drain', 'Labor and Materials', 1, '300.00', 0, '6.50', 0),
(422, 1151, 'Fridge line', 'Labor and Materials', 1, '120.00', 0, '6.50', 0),
(423, 1151, 'Kitchen Floor Reframe', 'Labor and Materials', 1, '320.00', 0, '6.50', 0),
(428, 1157, 'Master Bedroom Renovation', '', 1, '2000.00', 0, '6.50', 0),
(429, 1158, 'Kitchen renovation', '', 1, '4000.00', 0, '6.50', 0),
(430, 1159, 'Trim', 'Labor and Materials', 1, '900.00', 0, '6.50', 0),
(431, 1160, 'Built in Closet', 'Labor', 1, '1000.00', 0, '6.50', 0),
(432, 1160, 'Materials', '', 1, '630.00', 0, '6.50', 1),
(433, 1161, 'Kitchen renovation', '', 1, '3140.00', 0, '6.50', 0),
(434, 1162, 'Bathroom renovation', '', 1, '760.00', 0, '6.50', 0),
(435, 1163, 'Hardwood Floor Refinish', 'Hallway remove and replace', 1, '800.00', 0, '6.50', 0),
(436, 1163, 'Hardwood Floor Refinish', 'Refinish entire house', 1, '3600.00', 0, '6.50', 0),
(438, 1165, 'Siding', 'Remove and replace rotten and missing cedar siding ,labor and materials', 1, '800.00', 0, '6.50', 0),
(439, 1165, 'Deck', 'Remove and replace rotten band, labor and materials', 1, '300.00', 0, '6.50', 0),
(440, 1165, 'Gutters', 'Clean and install gutters guard ', 1, '120.00', 0, '6.50', 0),
(441, 1165, 'Ext. Paint', 'Repaint entire exterior house , labor only', 1, '3000.00', 0, '6.50', 0),
(442, 1165, 'Ext. Paint', 'Materials for painting aprox.', 1, '680.00', 0, '6.50', 0),
(443, 1166, 'Underlayment', 'Install 21 sheets of plywood upstairs to level floors.Labor only', 1, '1200.00', 0, '6.50', 0),
(444, 1166, 'Floor prep', 'Prepare floors for painting or vinyl sheet installation', 1, '1200.00', 0, '6.50', 0),
(445, 1166, 'Vinyl floor', 'Install aprox 370 sq/yd of vinyl floor', 1, '2850.00', 0, '6.50', 0),
(446, 1166, 'Floor paint', 'Paint garage,hallway,stairs and two room upstairs', 1, '1200.00', 0, '6.50', 0),
(447, 1166, 'Vanities', 'Remove and replace two vanities and faucets .Labor and materials', 1, '1200.00', 0, '6.50', 0),
(448, 1166, 'Materials', 'Materials needed for flooring project', 1, '5620.00', 0, '6.50', 1),
(449, 1167, 'Grading', 'Remove pine straw and regrade surface sloping away of building.', 1, '5600.00', 0, '6.50', 0),
(450, 1167, 'Drain', 'Install a drain box at center and connect it to existing drain pipe. Labor and materials', 1, '3000.00', 0, '6.50', 0),
(452, 1169, 'Roof', 'Remove and replace chimney metal flashing and four squares of architectural shingles. Labor and materials.', 1, '4800.00', 0, '6.50', 0),
(453, 1170, 'Demolition', 'Remove existing front door ', 1, '220.00', 0, '6.50', 0),
(454, 1170, 'Door', 'Install new door and lock, Labor and materials', 1, '640.00', 0, '6.50', 0),
(455, 1170, 'Drywall', 'Drywall inside to complete new size door', 1, '140.00', 0, '6.50', 0),
(456, 1170, 'Siding', 'Install exterior siding and level step with concrete', 1, '280.00', 0, '6.50', 0),
(457, 1171, 'Demolition', 'Remove existing floor and plywood to reach original subfloor.', 1, '1200.00', 0, '6.50', 0),
(458, 1171, 'Underlayment', 'Install plywood to level previous floor ', 1, '680.00', 0, '6.50', 0),
(459, 1171, 'Vinyl floor', 'Install vinyl floor .Labor only, homeowner will provide flooring.', 1, '620.00', 0, '6.50', 0),
(460, 1171, 'Aplliances', 'Remove and reinstall appliances', 1, '125.00', 0, '6.50', 0),
(461, 1172, 'Demolition', 'Remove tile, vanity, toilet to be replace it', 1, '900.00', 0, '6.50', 0),
(462, 1172, 'Plumbing', 'Install new shower faucet Labor only.', 1, '300.00', 0, '6.50', 0),
(463, 1172, 'Tiling', 'Install tile surround tub and floor Labor and building materials', 1, '1800.00', 0, '6.50', 0),
(464, 1172, 'Installation', 'Install vanity, faucet and drain Labor only', 1, '360.00', 0, '6.50', 0),
(465, 1173, 'Demolition', 'Remove tile vanity and toilet', 1, '1200.00', 0, '6.50', 0),
(466, 1173, 'Plumbing', 'Install new shower faucet, Labor only', 1, '300.00', 0, '6.50', 0),
(467, 1173, 'Tiling', 'Install tile surround tub and floor ,Labor and building materials', 1, '2200.00', 0, '6.50', 0),
(468, 1173, 'Installation', 'Install vanity, faucet and drain, Labor only', 1, '380.00', 0, '6.50', 0),
(469, 1174, 'Demolition', 'Remove tile vanity and toilet', 1, '2400.00', 0, '6.50', 0),
(470, 1174, 'Plumbing', 'Install new shower faucet. Labor only', 1, '300.00', 0, '6.50', 0),
(471, 1174, 'Installation', 'Install tile in shower tub and floor, Labor and building materials.', 1, '2800.00', 0, '6.50', 0),
(472, 1174, 'Installation', 'Install vanities faucet and drain , Labor only', 1, '580.00', 0, '6.50', 0),
(473, 1175, 'Deck', 'Replace rotten decking boards {5} and put band back in place and reinforce with 6x6 post, remove top rail. Labor and materials', 1, '340.00', 0, '6.50', 0),
(474, 1175, 'Pressure wash', 'Pressure wash deck and front steps', 1, '360.00', 0, '6.50', 0),
(475, 1176, 'Demolition', 'Remove walls and ceiling where  new bathroom will be build it', 1, '890.00', 0, '6.50', 0),
(477, 1176, 'Framing and Drywall ', 'Frame new walls and drywall ready to be paint it. Labor and materials', 1, '1800.00', 0, '6.50', 0),
(479, 1176, 'Trim', 'Trim and doors need it for laundry and bathroom. Labor and materials', 1, '740.00', 0, '6.50', 0),
(480, 1176, 'Tile ceiling', 'Install ceiling tile in the laundry room. Labor and materials', 1, '680.00', 0, '6.50', 0),
(481, 1177, 'Demolition', 'Remove garage door', 1, '320.00', 0, '6.50', 0),
(482, 1177, 'Framing and Drywall ', 'Frame new exterior wall and drywall it and ceiling. Labor and materials', 1, '2200.00', 0, '6.50', 0),
(483, 1177, 'Door', 'Install patio door and brick around to complete exterior wall. Labor and materials except patio door', 1, '2600.00', 0, '6.50', 0),
(484, 1177, 'Trim', 'Install baseboard in den. Labor and materials', 1, '260.00', 0, '6.50', 0),
(485, 1178, 'Demolition', 'Remove existing tile', 1, '680.00', 0, '6.50', 0),
(486, 1178, 'Door', 'Remove exterior door and install window and brick around to complete exterior wall. Labor and materials except window', 1, '1200.00', 0, '6.50', 0),
(487, 1176, 'Installation', 'Install vanity\r\n\r\nand toilet', 1, '280.00', 0, '6.50', 0),
(488, 1179, 'Gutters', 'Install 6'' gutters front and back of the house using same downspouts. Labor and materials', 1, '460.00', 0, '6.50', 0),
(489, 1180, 'Installation', 'Install kitchen cabinets, counter top and appliances to complete kitchen with microwave hood. Labor only', 1, '1000.00', 0, '6.50', 0),
(490, 1181, 'Installation', 'Install kitchen cabinets ,counter top and appliances with duct range hood. Labor only', 1, '1200.00', 0, '6.50', 0),
(491, 1182, 'Paint', 'Paint interior some interior walls and some doors. Labor and materials', 1, '780.00', 0, '6.50', 0),
(492, 1182, 'Tiling', 'Install ceramic tile Kitchen. Labor and materials', 1, '1000.00', 0, '6.50', 0),
(493, 1183, 'Paint', 'Paint interior some interior walls and some doors. Labor and materials', 1, '780.00', 0, '6.50', 0),
(494, 1183, 'Tiling', 'Install ceramic tile Kitchen. Labor and materials', 1, '1000.00', 0, '6.50', 0),
(495, 1176, 'Demolition', 'Remove and dispose rigid duct work  from basement', 1, '300.00', 0, '6.50', 0),
(496, 1176, 'Installation', 'Install ceiling insulation R -19 at laundry and bathroom area', 1, '220.00', 0, '6.50', 0),
(497, 1176, 'Installation', 'Drywall and shelf closet under stairs', 2, '400.00', 1, '6.50', 0),
(498, 1184, 'Installation', 'Remove and replace rotten fascia and paint it', 1, '380.00', 0, '6.50', 0),
(499, 1185, 'Basement', '', 1, '4000.00', 0, '6.50', 0),
(500, 1185, 'Paint', '', 1, '1000.00', 0, '6.50', 1),
(501, 1186, 'Drain', '', 1, '100.00', 0, '6.50', 0),
(502, 1127, 'Demolition', '', 1, '1500.00', 0, '6.50', 1),
(503, 1187, 'Fixtures', '', 1, '1500.00', 0, '6.50', 0),
(504, 1187, 'Vinyl floor', '', 1, '600.00', 0, '6.50', 1),
(505, 1176, 'Pressure wash', 'asdfsadf', 1, '2300.00', 0, '6.50', 0),
(506, 1176, 'Fixtures', 'Testing my descriptionTesting my description\r\n\r\nTesting my descriptionTesting my description\r\n\r\nTesting my description\r\n\r\nTesting my descriptionTesting my descriptionTesting my description\r\n\r\nTesting my descriptionTesting my descriptionTesting my description', 1, '300.00', 0, '6.50', 0),
(508, 1176, 'Drain', 'Another testAnother testAnother\r\n\r\n testAnother testAnother testAnother\r\n\r\n\r\n testAnother testAnother testAnother \r\n\r\ntestAnother testAnother testAnother testAnother testAnother test', 1, '200.00', 0, '6.50', 0),
(512, 1188, 'Drain', 'my \r\n\r\ntest\r\n\r\ndescription', 1, '1500.00', 0, '6.50', 0),
(513, 1188, 'Labor', 'paid mexicans', 1, '1000.00', 0, '6.50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE IF NOT EXISTS `invoices` (
  `ID` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `ExpirationDate` datetime NOT NULL,
  `EmailSent` tinyint(1) NOT NULL,
  `Paid` tinyint(1) NOT NULL,
  `PaidDate` datetime NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `InvoiceTitle` varchar(200) NOT NULL,
  `AttachContract` tinyint(1) NOT NULL,
  `BuildingandSpecs` varchar(2000) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1189 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`ID`, `DateTime`, `ExpirationDate`, `EmailSent`, `Paid`, `PaidDate`, `CustomerID`, `InvoiceTitle`, `AttachContract`, `BuildingandSpecs`) VALUES
(1127, '2015-06-11 21:22:43', '2015-06-11 21:22:43', 1, 1, '2015-03-17 17:44:48', 59, 'my title', 0, ''),
(1135, '2015-03-27 15:39:18', '2015-03-27 15:39:18', 1, 1, '2015-03-29 18:24:56', 59, '', 0, ''),
(1136, '2015-03-29 18:26:59', '2015-03-29 18:26:59', 1, 1, '2015-03-29 18:29:34', 59, '', 0, ''),
(1137, '2015-03-29 18:28:54', '2015-03-29 18:28:54', 1, 1, '2015-03-29 18:29:20', 59, '', 0, ''),
(1143, '2015-04-23 18:41:21', '2015-04-23 18:41:21', 1, 1, '2015-04-23 18:41:38', 59, '', 0, ''),
(1144, '2015-04-12 13:26:41', '2015-04-12 13:26:41', 1, 1, '2015-04-12 13:31:52', 59, '', 0, ''),
(1147, '2015-04-12 13:24:41', '2015-04-12 13:24:41', 1, 1, '2015-04-12 13:33:39', 59, '', 0, ''),
(1149, '2015-04-23 17:40:47', '2015-04-23 17:40:47', 1, 1, '2015-04-23 17:41:13', 59, '', 0, ''),
(1151, '2015-04-23 18:20:19', '2015-04-23 18:20:19', 1, 1, '2015-04-23 18:20:44', 59, '', 0, ''),
(1152, '2015-04-23 17:24:08', '2015-04-23 17:24:08', 1, 1, '2015-04-23 17:37:29', 59, '', 0, ''),
(1153, '2015-04-23 17:21:39', '2015-04-23 17:21:39', 1, 1, '2015-04-23 17:38:48', 59, '', 0, ''),
(1154, '2015-04-23 17:25:48', '2015-04-23 17:25:48', 1, 1, '2015-04-23 17:26:14', 59, '', 0, ''),
(1155, '2015-04-23 17:44:43', '2015-04-23 17:44:43', 1, 1, '2015-04-23 17:45:06', 59, '', 0, ''),
(1157, '2015-05-14 17:20:47', '2015-05-24 17:20:47', 1, 0, '0000-00-00 00:00:00', 59, 'v', 1, 'Frame 110 if and sheetrock it, Paint entire building walls, trim and doors.  Labor only, Homeowner will pay for the materials but contractor will be responsable for it, from pick them up to return it and keep receipts to balance to homeowner at each phase of the work.'),
(1158, '2015-05-01 17:00:51', '2015-05-01 17:00:51', 1, 1, '2015-05-01 17:01:08', 59, '', 0, ''),
(1159, '2015-05-01 17:05:49', '2015-05-01 17:05:49', 1, 0, '0000-00-00 00:00:00', 59, '', 0, ''),
(1160, '2015-05-01 17:13:52', '2015-05-01 17:13:52', 1, 0, '0000-00-00 00:00:00', 59, '', 0, ''),
(1161, '2015-05-01 17:18:02', '2015-05-01 17:18:02', 1, 1, '2015-05-01 17:18:24', 59, '', 0, ''),
(1162, '2015-05-01 17:25:40', '2015-05-01 17:25:40', 1, 1, '2015-05-01 17:25:54', 59, '', 0, ''),
(1163, '2015-05-03 18:36:49', '2015-05-03 18:36:49', 1, 1, '2015-05-03 18:37:32', 59, '', 0, ''),
(1165, '2015-06-10 23:38:14', '2015-06-10 23:38:14', 1, 1, '2015-06-10 23:38:20', 63, 'Owner', 0, ''),
(1166, '2015-05-17 17:24:32', '2015-05-17 17:24:32', 0, 0, '0000-00-00 00:00:00', 61, 'Floors', 1, 'EF Contractors will provide Labor to complete the works specifies at the estimate above, and labor and materials for vanities item'),
(1167, '2015-05-19 18:32:30', '2015-05-19 18:32:30', 0, 0, '0000-00-00 00:00:00', 64, 'Drain Sump', 0, ''),
(1169, '2015-05-20 18:46:27', '2015-05-20 18:46:27', 0, 0, '0000-00-00 00:00:00', 64, 'Roof Leak', 0, ''),
(1170, '2015-05-24 11:34:00', '2015-05-24 11:34:00', 0, 0, '0000-00-00 00:00:00', 65, 'Front door', 0, ''),
(1171, '2015-05-26 16:53:27', '2015-05-26 16:53:27', 0, 0, '0000-00-00 00:00:00', 66, 'Kitchen floor', 0, ''),
(1172, '2015-05-28 16:40:20', '2015-05-28 16:40:20', 0, 0, '0000-00-00 00:00:00', 67, 'Downstairs bath', 0, ''),
(1173, '2015-05-28 16:48:01', '2015-05-28 16:48:01', 0, 0, '0000-00-00 00:00:00', 67, 'Upstairs Bath', 0, ''),
(1174, '2015-05-28 17:10:34', '2015-05-28 17:10:34', 0, 0, '0000-00-00 00:00:00', 67, 'Master Bath', 0, ''),
(1175, '2015-05-31 07:43:44', '2015-05-31 07:43:44', 0, 0, '0000-00-00 00:00:00', 68, 'Deck', 0, ''),
(1176, '2015-06-18 00:54:20', '2015-06-18 00:54:20', 1, 0, '0000-00-00 00:00:00', 59, 'Laundry and Bathroom', 0, ''),
(1177, '2015-05-31 08:33:48', '2015-05-31 08:33:48', 1, 0, '0000-00-00 00:00:00', 59, 'Den', 0, ''),
(1178, '2015-05-31 08:32:37', '2015-05-31 08:32:37', 0, 0, '0000-00-00 00:00:00', 59, 'Bedroom', 0, ''),
(1179, '2015-05-31 08:57:14', '2015-05-31 08:57:14', 0, 0, '0000-00-00 00:00:00', 69, 'Gutters', 0, ''),
(1180, '2015-05-31 09:04:04', '2015-05-31 09:04:04', 0, 0, '0000-00-00 00:00:00', 69, 'Kitchen', 0, ''),
(1181, '2015-05-31 09:03:34', '2015-05-31 09:03:34', 0, 0, '0000-00-00 00:00:00', 69, 'Kitchen 2', 0, ''),
(1182, '2015-06-13 02:19:52', '2015-06-23 02:19:52', 1, 0, '0000-00-00 00:00:00', 71, 'Paint and Kit floor', 1, 'EF Contractors will complete the jobs describe on estimate attached .'),
(1183, '2015-06-13 02:19:38', '2015-06-13 02:19:38', 1, 0, '0000-00-00 00:00:00', 71, 'Paint and Kit floor', 1, 'EF Contractors will complete the jobs describe on estimate attached .'),
(1184, '2015-06-09 10:50:23', '2015-06-09 10:50:23', 1, 0, '0000-00-00 00:00:00', 64, 'Fascia repairs', 0, ''),
(1185, '2015-06-09 14:55:56', '2015-06-09 14:55:56', 1, 1, '2015-06-08 20:07:31', 59, 'Basement', 0, ''),
(1186, '2015-06-13 01:42:28', '2015-06-23 01:42:28', 1, 1, '2015-06-13 01:51:26', 68, 'My Title', 0, ''),
(1187, '2015-06-11 21:42:33', '2015-06-21 21:42:33', 1, 1, '2015-06-11 21:42:39', 58, '8 Perimeter Ctr.', 0, ''),
(1188, '2015-06-19 15:12:45', '2015-06-29 15:12:45', 1, 0, '0000-00-00 00:00:00', 70, 'trest', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `payee`
--

CREATE TABLE IF NOT EXISTS `payee` (
  `ID` int(11) NOT NULL,
  `Name` varchar(2000) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payee`
--

INSERT INTO `payee` (`ID`, `Name`) VALUES
(2, 'Carlos Pereyra'),
(3, 'Joaquin Contreras'),
(6, 'Maxi Pereyra');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE IF NOT EXISTS `payments` (
  `ID` int(11) NOT NULL,
  `InvoiceID` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`ID`, `InvoiceID`, `Amount`) VALUES
(1, 1188, '750.00'),
(2, 1188, '750.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contractsteps`
--
ALTER TABLE `contractsteps`
  ADD PRIMARY KEY (`ID`);

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
-- Indexes for table `invoiceimages`
--
ALTER TABLE `invoiceimages`
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
-- Indexes for table `payee`
--
ALTER TABLE `payee`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contractsteps`
--
ALTER TABLE `contractsteps`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT for table `invoiceimages`
--
ALTER TABLE `invoiceimages`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `invoiceitem`
--
ALTER TABLE `invoiceitem`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=514;
--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1189;
--
-- AUTO_INCREMENT for table `payee`
--
ALTER TABLE `payee`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
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
