-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cloud
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `file_share`
--

DROP TABLE IF EXISTS `file_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_share` (
  `UUID` varchar(64) DEFAULT NULL,
  `UID` varchar(20) DEFAULT NULL,
  `Share_date` datetime DEFAULT NULL,
  `Link` varchar(200) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `Save_Times` int DEFAULT NULL,
  `Code` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`Link`),
  KEY `UID` (`UID`),
  KEY `UUID` (`UUID`),
  CONSTRAINT `file_share_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`),
  CONSTRAINT `file_share_ibfk_2` FOREIGN KEY (`UUID`) REFERENCES `real_file` (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_share`
--

LOCK TABLES `file_share` WRITE;
/*!40000 ALTER TABLE `file_share` DISABLE KEYS */;
INSERT INTO `file_share` VALUES ('021f5725e618333b423a4ca11589144d','18030100013','2021-04-29 22:20:14','MTgwMzAxMDAwMTMwMjFmNTcyNWU2MTgzMzNiNDIzYTRjYTExNTg5MTQ0ZA==','2021-04-29 22:20:14',0,'SSnO'),('0a72b4675da727e6eca7b85b1c715794','18030100013','2021-04-29 14:37:31','MTgwMzAxMDAwMTMwYTcyYjQ2NzVkYTcyN2U2ZWNhN2I4NWIxYzcxNTc5NA==','2021-04-29 14:37:31',0,'g77z'),('a18e9a6fff861a94c0c4053d2018ae4d','18030100013','2021-04-29 22:13:11','MTgwMzAxMDAwMTNhMThlOWE2ZmZmODYxYTk0YzBjNDA1M2QyMDE4YWU0ZA==','2021-04-29 22:13:11',0,'Uut8'),('d0f44f4148a18e965ff99bdc221c720a','18030100013','2021-04-28 13:45:15','MTgwMzAxMDAwMTNkMGY0NGY0MTQ4YTE4ZTk2NWZmOTliZGMyMjFjNzIwYQ==','2021-04-28 13:45:15',0,'Yevp');
/*!40000 ALTER TABLE `file_share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pri_files`
--

DROP TABLE IF EXISTS `pri_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pri_files` (
  `UUID` varchar(64) NOT NULL,
  `UID` varchar(20) NOT NULL,
  `Path` varchar(200) DEFAULT NULL,
  `Mtime` datetime DEFAULT NULL,
  `Collect` tinyint(1) DEFAULT NULL,
  `Del` tinyint(1) DEFAULT NULL,
  `Front_Path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`UUID`,`UID`),
  KEY `UID` (`UID`),
  CONSTRAINT `pri_files_ibfk_1` FOREIGN KEY (`UUID`) REFERENCES `real_file` (`UUID`),
  CONSTRAINT `pri_files_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pri_files`
--

LOCK TABLES `pri_files` WRITE;
/*!40000 ALTER TABLE `pri_files` DISABLE KEYS */;
INSERT INTO `pri_files` VALUES ('05122dbf2c54c3cb0bcacafac634bfe5','18030100013','/public/uploads/05122dbf2c54c3cb0bcacafac634bfe5.png','2021-04-29 14:10:22',0,0,''),('0a72b4675da727e6eca7b85b1c715794','18030100013','/public/uploads/0a72b4675da727e6eca7b85b1c715794.png','2021-04-29 14:10:43',1,0,''),('12aa21bd0c1ef9013b5207e0e244f132','18030100013','/public/uploads/12aa21bd0c1ef9013b5207e0e244f132.png','2021-04-29 14:10:23',0,0,''),('1bf28b8bfe37e3961535c60f5c16a833','18030100013','/public/uploads/1bf28b8bfe37e3961535c60f5c16a833.jpg','2021-04-28 14:30:39',0,1,''),('1bf28b8bfe37e3961535c60f5c16a833','18030100148','/public/uploads/1bf28b8bfe37e3961535c60f5c16a833.jpg','2021-05-01 21:42:50',0,0,''),('1e9c751a04a4ecdd90253e71da3f5e36','18030100013','/public/uploads/1e9c751a04a4ecdd90253e71da3f5e36.png','2021-04-29 14:10:43',0,0,''),('3ae684e517032e40129f0ab64ff3f0ff','18030100013','/public/uploads/3ae684e517032e40129f0ab64ff3f0ff.docx','2021-04-28 14:50:14',0,0,''),('42a5c2b6221cd542dab7128bbb4735ae','18030100013','/public/uploads/42a5c2b6221cd542dab7128bbb4735ae.jpg','2021-04-29 14:10:22',0,0,''),('5577b1eb3f811ebe43c55f2b8ee138a9','18030100013','/public/uploads/5577b1eb3f811ebe43c55f2b8ee138a9.jpg','2021-04-29 14:10:22',0,0,''),('63297da995d4f4a51f8a5d9d7b04bd42','18030100013','/public/uploads/63297da995d4f4a51f8a5d9d7b04bd42.mp3','2021-04-29 22:10:42',0,0,''),('6bfc6ee530851b53f2582a56d821fabe','18030100013','/public/uploads/6bfc6ee530851b53f2582a56d821fabe.mp3','2021-04-29 22:10:42',0,0,''),('6f9302ac2f4218fe1cf0aa6639757f06','18030100013','/public/uploads/6f9302ac2f4218fe1cf0aa6639757f06.png','2021-04-29 22:24:21',0,1,''),('7b53187a88d00ea05deabba6cd657e13','18030100013','/public/uploads/7b53187a88d00ea05deabba6cd657e13.mp3','2021-04-29 22:12:31',0,1,''),('7d60b5534c634280cde5fffd086452bd','18030100013','/public/uploads/7d60b5534c634280cde5fffd086452bd.jpg','2021-04-29 14:10:23',0,0,''),('85c3fab7868f9d783da7dba81b880139','18030100013','/public/uploads/85c3fab7868f9d783da7dba81b880139.png','2021-04-29 14:10:43',0,0,''),('90a7b65930412323cfa5acf9ea39faea','18030100013','/public/uploads/90a7b65930412323cfa5acf9ea39faea.png','2021-04-29 14:10:43',0,0,''),('a18e9a6fff861a94c0c4053d2018ae4d','18030100013','/public/uploads/a18e9a6fff861a94c0c4053d2018ae4d.mp3','2021-04-29 22:12:31',0,0,''),('aa97f126192a702b3a5594bb84511c56','18030100013','/public/uploads/aa97f126192a702b3a5594bb84511c56.mp4','2021-04-28 14:50:23',0,0,''),('acb80186b410b1f15041b57b5324fe5d','18030100013','/public/uploads/acb80186b410b1f15041b57b5324fe5d.mp3','2021-04-28 14:50:06',0,0,''),('b247c945f7d6c59e189b0dd2f0abc4a6','18030100013','/public/uploads/b247c945f7d6c59e189b0dd2f0abc4a6.jpg','2021-04-29 14:10:22',0,0,''),('b247c945f7d6c59e189b0dd2f0abc4a6','18030100148','/public/uploads/b247c945f7d6c59e189b0dd2f0abc4a6.jpg','2021-05-01 21:44:00',0,0,''),('b6aaa2791df8b7cef118f04f18f1bd63','18030100013','/public/uploads/b6aaa2791df8b7cef118f04f18f1bd63.mp4','2021-04-29 22:10:21',0,0,''),('b77ca385c67736c7f7077c530a39daec','18030100013','/public/uploads/b77ca385c67736c7f7077c530a39daec.png','2021-04-29 14:10:43',0,0,''),('c411b865833558b6c45ba3be3a0f8c93','18030100013','/public/uploads/c411b865833558b6c45ba3be3a0f8c93.png','2021-04-28 14:30:39',0,1,''),('cae14f8bd06273383cf97c2bb24ae080','18030100013','/public/uploads/cae14f8bd06273383cf97c2bb24ae080.docx','2021-04-30 20:50:31',0,0,''),('ced53a94827ac3b2adff372ae5b609ab','18030100013','/public/uploads/ced53a94827ac3b2adff372ae5b609ab.mp3','2021-04-29 22:10:42',0,0,''),('d0271dd172de27b2a0ab85a6881693ac','18030100013','/public/uploads/d0271dd172de27b2a0ab85a6881693ac.png','2021-04-29 14:10:43',0,0,''),('d0f44f4148a18e965ff99bdc221c720a','18030100013','/public/uploads/d0f44f4148a18e965ff99bdc221c720a.png','2021-04-28 13:45:09',1,1,''),('d2c610842741955e33ac799cf5d3644c','18030100013','/public/uploads/d2c610842741955e33ac799cf5d3644c.jpg','2021-04-29 14:10:22',0,0,''),('d9423bd29e50a690a4ba8d92d579d9c0','18030100013','/public/uploads/d9423bd29e50a690a4ba8d92d579d9c0.png','2021-04-29 14:10:43',0,0,''),('e03da03ee95712cea5e6dce70a4e8d4a','18030100013','/public/uploads/e03da03ee95712cea5e6dce70a4e8d4a.png','2021-04-29 22:24:21',0,1,''),('ea49732746424630add5b9d6c5f13b19','18030100013','/public/uploads/ea49732746424630add5b9d6c5f13b19.docx','2021-04-29 22:08:44',0,0,''),('ebd9d51f16b32384d5fe9a3eb31d3264','18030100013','/public/uploads/ebd9d51f16b32384d5fe9a3eb31d3264.jpg','2021-04-28 14:30:39',0,1,''),('ebd9d51f16b32384d5fe9a3eb31d3264','18030100148','/public/uploads/ebd9d51f16b32384d5fe9a3eb31d3264.jpg','2021-05-01 21:44:00',0,0,''),('ffd30062d97ce39fc9b3a03da9da9af5','18030100013','/public/uploads/ffd30062d97ce39fc9b3a03da9da9af5.jpg','2021-04-29 14:10:23',0,0,'');
/*!40000 ALTER TABLE `pri_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `real_file`
--

DROP TABLE IF EXISTS `real_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `real_file` (
  `UUID` varchar(64) NOT NULL,
  `File_Name` varchar(100) NOT NULL,
  `Size` int NOT NULL,
  `State` int NOT NULL,
  `Fcount` int DEFAULT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `real_file`
--

LOCK TABLES `real_file` WRITE;
/*!40000 ALTER TABLE `real_file` DISABLE KEYS */;
INSERT INTO `real_file` VALUES ('021f5725e618333b423a4ca11589144d','2020下半年课表）(1).xls',61952,-1,1),('05122dbf2c54c3cb0bcacafac634bfe5','rainbow.png',81954,1,1),('0a72b4675da727e6eca7b85b1c715794','QQ截图20210327233840.png',22335,1,1),('12aa21bd0c1ef9013b5207e0e244f132','六边形.png',426680,1,1),('1bf28b8bfe37e3961535c60f5c16a833','English.jpg',32734,1,2),('1e9c751a04a4ecdd90253e71da3f5e36','QQ截图20210311225620.png',41624,1,1),('3ae684e517032e40129f0ab64ff3f0ff','2021课程设计题库.docx',18091,4,1),('42a5c2b6221cd542dab7128bbb4735ae','mountain.jpg',167295,1,1),('5577b1eb3f811ebe43c55f2b8ee138a9','island2.jpg',173079,1,1),('63297da995d4f4a51f8a5d9d7b04bd42','陈雅森 - 温柔乡.mp3',10475066,3,1),('6bfc6ee530851b53f2582a56d821fabe','本色丶coco - 老男孩.mp3',4911880,3,1),('6f9302ac2f4218fe1cf0aa6639757f06','bcnf和3nf.png',226905,1,1),('7b53187a88d00ea05deabba6cd657e13','一点点喜欢（Cover 邓福如）.mp3',7764661,3,1),('7d60b5534c634280cde5fffd086452bd','rabbit.jpg',131262,1,1),('85c3fab7868f9d783da7dba81b880139','QQ截图20210306225141.png',55076,1,1),('90a7b65930412323cfa5acf9ea39faea','QQ截图20210308222602.png',27815,1,1),('a18e9a6fff861a94c0c4053d2018ae4d','江南夜色.mp3',9621347,3,1),('aa97f126192a702b3a5594bb84511c56','VID_20191115_114500.mp4',7582945,2,1),('acb80186b410b1f15041b57b5324fe5d','1022女声 - 薛之谦歌曲串烧（Cover 薛之谦）.mp3',3390606,3,1),('b247c945f7d6c59e189b0dd2f0abc4a6','island1.jpg',149634,1,2),('b6aaa2791df8b7cef118f04f18f1bd63','食美.mp4',2994172,2,1),('b77ca385c67736c7f7077c530a39daec','QQ截图20210325124436.png',68233,1,1),('c411b865833558b6c45ba3be3a0f8c93','dragon.png',80382,1,1),('cae14f8bd06273383cf97c2bb24ae080','(组合数学)混合颜色的排列.docx',750084,4,1),('ced53a94827ac3b2adff372ae5b609ab','陈泫孝（大泫） - 静悄悄.mp3',7682221,3,1),('d0271dd172de27b2a0ab85a6881693ac','QQ截图20210313224310.png',35609,1,1),('d0f44f4148a18e965ff99bdc221c720a','cjd.png',601230,1,1),('d2c610842741955e33ac799cf5d3644c','Mars.jpg',108105,1,1),('d9423bd29e50a690a4ba8d92d579d9c0','QQ截图20210310231952.png',26240,1,1),('e03da03ee95712cea5e6dce70a4e8d4a','课表.png',67438,1,1),('ea49732746424630add5b9d6c5f13b19','计组课设.docx',175440,4,1),('ebd9d51f16b32384d5fe9a3eb31d3264','island.jpg',513543,1,2),('ffd30062d97ce39fc9b3a03da9da9af5','scene.jpg',414689,1,1);
/*!40000 ALTER TABLE `real_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UID` varchar(20) NOT NULL,
  `Pet_Name` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Avatar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('18030100013','徐祖云','991030','/public/avatar/6.jpg'),('1803010001323456','','123456','/public/avatar/default.jpeg'),('18030100098','李智','guapi','/public/avatar/12.jpg'),('18030100148','吕叶凡','blingbling','/public/avatar/3.jpg'),('18030100187','张帆','zhangqobo','/public/avatar/default.jpeg'),('18030100250','林增浩','yanzhuoni','/public/avatar/default.jpeg');
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

-- Dump completed on 2021-05-02 13:56:37
