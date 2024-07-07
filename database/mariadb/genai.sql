/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.25-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: seanglay_db
-- ------------------------------------------------------
-- Server version	10.5.25-MariaDB-ubu2004

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `categoryID` char(36) NOT NULL,
  `categoryName` varchar(255) NOT NULL UNIQUE,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_products` (
  `orderID` char(36) NOT NULL,
  `productID` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  KEY `order_products_orderid_foreign` (`orderID`),
  KEY `order_products_productid_foreign` (`productID`),
  CONSTRAINT `order_products_orderid_foreign` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `order_products_productid_foreign` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderID` char(36) NOT NULL,
  `userID` char(36) DEFAULT NULL,
  `totalAmount` float(8,2) NOT NULL,
  `isChatbotOrder` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`orderID`),
  KEY `orders_userid_foreign` (`userID`),
  CONSTRAINT `orders_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productID` char(36) NOT NULL,
  `name` varchar(255) NOT NULL UNIQUE,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantityAvailable` int(11) NOT NULL,
  `categoryID` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`productID`),
  KEY `products_categoryid_foreign` (`categoryID`),
  CONSTRAINT `products_categoryid_foreign` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `roleID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'customer'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` char(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `roleID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_roleid_foreign` (`roleID`),
  CONSTRAINT `users_roleid_foreign` FOREIGN KEY (`roleID`) REFERENCES `roles` (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1e7b7206-7f51-4a0b-b6ad-ba2fea9db712','Garret_Altenwerth83','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Della_Moore@yahoo.com','Montgomery','Female','(865) 983-8110 x4259','67542',1),('22fb42bc-f158-41d6-a799-17e502fa9b2d','Emil.Langosh','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Lucio7@gmail.com','Schambergerland','Female','(460) 468-5636 x652','19130-9703',1),('26588aad-a962-4a3b-9d62-ad0e811d8f1d','Kobe.Wisozk99','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Aleen_Kuhn@yahoo.com','Baileyton','Male','839-530-7189 x9935','46421-7759',1),('360030d9-3664-4817-99b8-734fb02da9fc','Makenna_Blick15','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Marcos_Gerhold@yahoo.com','Abdulborough','Male','248-963-1367 x3134','94980',1),('43ff37c3-4ab1-419a-b2d2-e0fdcdcd840e','Sydnie.Hammes','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Candida57@gmail.com','Matteohaven','Female','447.753.4567 x24498','68715',1),('51784d07-1446-4ae0-ae17-53f433386f55','Mariela88','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Valentine93@hotmail.com','Thielfield','Male','(378) 843-3141 x072','36168',1),('6a9df938-c7c6-4300-92a3-f00e1ccd03cc','Malvina_Murray','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Ludie.Paucek78@hotmail.com','East Eliseport','Female','(431) 253-0737 x417','12489',2),('79193151-4fc8-4ba8-8f75-f952474445e3','Alan28','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Pietro42@hotmail.com','Carliburgh','Female','702.683.2019 x8173','09286',2),('8f5760da-2d59-4166-8299-3639828e29c3','Fidel_Moore73','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Aida80@hotmail.com','Brandon','Female','(480) 973-9641 x622','26332-7307',1),('9566a4a3-151a-4129-a5f6-fe7d41a7d3d2','Matteo55','f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd','Leone_Nicolas87@hotmail.com','West Jordan','Female','661-280-6718 x56529','78546-4492',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-23 13:26:42