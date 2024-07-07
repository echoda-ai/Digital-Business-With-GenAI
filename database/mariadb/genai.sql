-- Adminer 4.8.1 MySQL 5.5.5-10.5.25-MariaDB-ubu2004 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `categoryID` char(36) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`categoryID`),
  UNIQUE KEY `categoryName` (`categoryName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `categories` (`categoryID`, `categoryName`, `description`, `createdAt`, `updatedAt`) VALUES
('6630bf0a-0b98-435f-8da7-1bef901b72de',	'women\'s clothing',	'Description for women\'s clothing',	'2024-07-07 09:31:50',	'2024-07-07 09:31:50'),
('75f342da-8718-48d6-825d-4fa8452a5756',	'men\'s clothing',	'Description for men\'s clothing',	'2024-07-07 09:31:50',	'2024-07-07 09:31:50'),
('8cf760b0-cbff-4ae1-82a8-6996bd06f5df',	'jewelery',	'Description for jewelery',	'2024-07-07 09:31:50',	'2024-07-07 09:31:50'),
('b860eea7-70ca-4a71-b8e3-996a162cea1b',	'electronics',	'Description for electronics',	'2024-07-07 09:31:50',	'2024-07-07 09:31:50');

DROP TABLE IF EXISTS `knex_migrations`;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `knex_migrations_lock`;
CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `orders`;
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


DROP TABLE IF EXISTS `order_products`;
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


DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `productID` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantityAvailable` int(11) NOT NULL,
  `categoryID` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`productID`),
  UNIQUE KEY `name` (`name`),
  KEY `products_categoryid_foreign` (`categoryID`),
  CONSTRAINT `products_categoryid_foreign` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`productID`, `name`, `description`, `price`, `image`, `quantityAvailable`, `categoryID`, `created_at`, `updated_at`) VALUES
('019f876e-24b9-4d35-a433-80fd4ad6903f',	'White Gold Plated Princess',	'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine\'s Day...',	9.99,	'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',	33,	'8cf760b0-cbff-4ae1-82a8-6996bd06f5df',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('09e927a6-99e4-4756-acb4-8dd706006921',	'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',	'3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',	109.00,	'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',	68,	'b860eea7-70ca-4a71-b8e3-996a162cea1b',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('0dbbf652-342a-44a5-8f10-34df8004e1cb',	'Lock and Love Women\'s Removable Hooded Faux Leather Moto Biker Jacket',	'100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',	29.95,	'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',	7,	'6630bf0a-0b98-435f-8da7-1bef901b72de',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('0e676179-f31c-42e3-a8e1-a0587a6fd9a8',	'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',	'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',	109.95,	'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',	43,	'75f342da-8718-48d6-825d-4fa8452a5756',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('16149e15-8ab9-4bf8-a8e6-e2834f3da1f4',	'Rain Jacket Women Windbreaker Striped Climbing Raincoats',	'Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn\'t overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.',	39.99,	'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',	84,	'6630bf0a-0b98-435f-8da7-1bef901b72de',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('30de19de-d41b-4743-bbdd-009cdc8f20aa',	'Mens Casual Premium Slim Fit T-Shirts ',	'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',	22.30,	'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',	35,	'75f342da-8718-48d6-825d-4fa8452a5756',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('38f5138d-17a9-4a60-a4b9-afe8f095d3ae',	'Mens Cotton Jacket',	'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',	55.99,	'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',	75,	'75f342da-8718-48d6-825d-4fa8452a5756',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('3b4364e3-4e72-4a4b-8892-2fa6d2a9e08e',	'Mens Casual Slim Fit',	'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',	15.99,	'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',	6,	'75f342da-8718-48d6-825d-4fa8452a5756',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('4900d6dc-0ab1-4082-af5e-96d290594f40',	'Pierced Owl Rose Gold Plated Stainless Steel Double',	'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',	10.99,	'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',	58,	'8cf760b0-cbff-4ae1-82a8-6996bd06f5df',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('56562fc6-db39-4396-9256-715b14126faa',	'BIYLACLESEN Women\'s 3-in-1 Snowboard Jacket Winter Coats',	'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',	56.99,	'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',	83,	'6630bf0a-0b98-435f-8da7-1bef901b72de',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('7035c8aa-182c-4205-af68-e3db1d261d08',	'MBJ Women\'s Solid Short Sleeve Boat Neck V ',	'95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',	9.85,	'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',	80,	'6630bf0a-0b98-435f-8da7-1bef901b72de',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('710ec6ab-22d7-4476-9eb7-ca31131a9656',	'Opna Women\'s Short Sleeve Moisture',	'100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',	7.95,	'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',	51,	'6630bf0a-0b98-435f-8da7-1bef901b72de',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('77d95530-6af7-4296-b441-2f0c2023bfc0',	'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet',	'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean\'s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.',	695.00,	'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',	37,	'8cf760b0-cbff-4ae1-82a8-6996bd06f5df',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('8b9d5f38-b631-4c1f-8a40-34456ac64d09',	'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',	'Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer\'s limited warranty',	114.00,	'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',	5,	'b860eea7-70ca-4a71-b8e3-996a162cea1b',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('9d380a73-1804-4120-9d2b-ad5bcc02e28c',	'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',	'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',	64.00,	'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',	51,	'b860eea7-70ca-4a71-b8e3-996a162cea1b',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('a3f4c7d1-5e23-4235-9ce3-e8beae51d68e',	'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',	'21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',	599.00,	'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',	13,	'b860eea7-70ca-4a71-b8e3-996a162cea1b',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('bd47502b-8df6-463e-acae-aa8fdb54467e',	'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',	'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',	109.00,	'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',	73,	'b860eea7-70ca-4a71-b8e3-996a162cea1b',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('d09548e4-9b81-4c98-997e-a8bb0d5b530d',	'DANVOUY Womens T Shirt Casual Cotton Short',	'95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',	12.99,	'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',	71,	'6630bf0a-0b98-435f-8da7-1bef901b72de',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('debc1a76-bcdb-4ce6-924a-271285b6f737',	'Solid Gold Petite Micropave ',	'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',	168.00,	'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',	97,	'8cf760b0-cbff-4ae1-82a8-6996bd06f5df',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50'),
('f1a057d2-45d7-49ce-848a-63f87d023be3',	'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ',	'49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',	999.99,	'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',	66,	'b860eea7-70ca-4a71-b8e3-996a162cea1b',	'2024-07-07 09:33:50',	'2024-07-07 09:33:50');

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `roleID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `roles` (`roleID`, `roleName`) VALUES
(1,	'customer'),
(2,	'admin');

DROP TABLE IF EXISTS `users`;
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

INSERT INTO `users` (`userID`, `username`, `password`, `email`, `address`, `gender`, `phone`, `zip`, `roleID`) VALUES
('1e7b7206-7f51-4a0b-b6ad-ba2fea9db712',	'Garret_Altenwerth83',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Della_Moore@yahoo.com',	'Montgomery',	'Female',	'(865) 983-8110 x4259',	'67542',	1),
('22fb42bc-f158-41d6-a799-17e502fa9b2d',	'Emil.Langosh',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Lucio7@gmail.com',	'Schambergerland',	'Female',	'(460) 468-5636 x652',	'19130-9703',	1),
('26588aad-a962-4a3b-9d62-ad0e811d8f1d',	'Kobe.Wisozk99',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Aleen_Kuhn@yahoo.com',	'Baileyton',	'Male',	'839-530-7189 x9935',	'46421-7759',	1),
('360030d9-3664-4817-99b8-734fb02da9fc',	'Makenna_Blick15',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Marcos_Gerhold@yahoo.com',	'Abdulborough',	'Male',	'248-963-1367 x3134',	'94980',	1),
('43ff37c3-4ab1-419a-b2d2-e0fdcdcd840e',	'Sydnie.Hammes',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Candida57@gmail.com',	'Matteohaven',	'Female',	'447.753.4567 x24498',	'68715',	1),
('51784d07-1446-4ae0-ae17-53f433386f55',	'Mariela88',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Valentine93@hotmail.com',	'Thielfield',	'Male',	'(378) 843-3141 x072',	'36168',	1),
('6a9df938-c7c6-4300-92a3-f00e1ccd03cc',	'Malvina_Murray',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Ludie.Paucek78@hotmail.com',	'East Eliseport',	'Female',	'(431) 253-0737 x417',	'12489',	2),
('79193151-4fc8-4ba8-8f75-f952474445e3',	'Alan28',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Pietro42@hotmail.com',	'Carliburgh',	'Female',	'702.683.2019 x8173',	'09286',	2),
('8f5760da-2d59-4166-8299-3639828e29c3',	'Fidel_Moore73',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Aida80@hotmail.com',	'Brandon',	'Female',	'(480) 973-9641 x622',	'26332-7307',	1),
('9566a4a3-151a-4129-a5f6-fe7d41a7d3d2',	'Matteo55',	'f12e112240082ed228fbb4e6fba5ea3ecba165340d1d7645f149e09298d484dd',	'Leone_Nicolas87@hotmail.com',	'West Jordan',	'Female',	'661-280-6718 x56529',	'78546-4492',	1);

-- 2024-07-07 09:34:58