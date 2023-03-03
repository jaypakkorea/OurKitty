-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 13.124.231.185    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `admin_email` varchar(255) DEFAULT NULL,
  `admin_name` varchar(255) DEFAULT NULL,
  `admin_password` varchar(255) DEFAULT NULL,
  `admin_phone` varchar(255) DEFAULT NULL,
  `admin_role` varchar(255) DEFAULT NULL,
  `admin_state` int DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_b79jyjd00uj4gvvtu7favkq5g` (`admin_email`),
  KEY `FKcmpn34n7cw3jfm2jic5uimuu9` (`group_id`),
  CONSTRAINT `FKcmpn34n7cw3jfm2jic5uimuu9` FOREIGN KEY (`group_id`) REFERENCES `admin_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'2023-02-09 12:47:54.568227','2023-02-09 12:47:54.568227','as7531@naver.com','이미현','$2a$10$YifCCRyg65Z/EKPgy7rRnOvHS.C2EdX.Jr2U/tkXxK9cLycuwL5xa',NULL,NULL,-1,1),(2,'2023-02-09 12:49:22.697199','2023-02-15 22:26:57.517858','protoss1025@naver.com','최재원','$2a$10$jEYPcF.XM4l6XT0Ecm4.Her7Ak52aQY1eDEmK5sCefIYj3BXT2gI.','01012355678','시스템 관리자',-1,1),(3,'2023-02-09 12:56:14.553323','2023-02-09 12:56:14.553323','admin001@test.test','테스트 관리자 1','$2a$10$IUrejiA5Oan4qv1FAcQwDOHp8ATpH8TI4h3qHU99UtfJQW4f.MVqa','01000000000','테스터',-1,1),(4,'2023-02-09 12:56:57.579603','2023-02-09 12:56:57.579603','admin5@test.test','테스트 관리자 2','$2a$10$.RQg6x.bElFXEGBWesXxUee83KqwbINj5bBnKgrmOZOYBcosWhrp.','01011111111','테스터',-1,1),(5,'2023-02-09 13:45:42.979631','2023-02-09 13:45:42.979631','test@test.com','심보현','$2a$10$utUu.z.hSumm64kkMo7qHO01Zlr0.ICZFM3pYo5rUydTvnzsc/.pG','01083509615','시스템 관리자',-1,1),(6,'2023-02-09 13:52:11.461773','2023-02-09 13:52:11.461773','jysong587@gmail.com','송주영','$2a$10$odsuRVHzyjVt.EUyZ6R9EO3G3c7DKAUTXRLc5apZRCEd55dupjRkC','01011112222','시스템 관리자',-1,1),(7,'2023-02-09 15:42:13.687561','2023-02-14 10:47:50.812742','yangjinee@naver.com','양희진','$2a$10$1Sx2Hot9u7spwWlLmTQ7DezHUcJh.QE0shVEl2vGhm5tFnM9Vmy/.','01011112222','테스트12',-1,1),(8,'2023-02-11 12:05:45.049153','2023-02-11 12:05:45.049153','pakjeoungho@gmail.com','박정호','$2a$10$OXkWDlJ96HdpgfA1hpqaXueVIhtWReG2qkHSsNcAlCe3PLLtLrzbS','01082458433','주무관',-1,1),(9,'2023-02-16 04:46:01.640949','2023-02-16 04:46:01.640949','asd7531@naver.com','이미현','$2a$10$jcNPJ0L5WwFoTJyXIudZYukYEXGGkcmt6VYHTJd.jMFnZ9du67QqK',NULL,'인턴',-1,2),(10,'2023-02-16 04:46:04.230288','2023-02-16 04:46:04.230288','h11@naver.com','해운대22','$2a$10$pS6tIpgxNpEMyuZqZBUGmeerucNa1jgIlpZee0TdAuCbEZWvdHNUO','01012341234','해운대 냥그릇 관리자',-1,2);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_alarm`
--

DROP TABLE IF EXISTS `admin_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_alarm` (
  `alarm_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `alarm_code` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `target_url` varchar(255) DEFAULT NULL,
  `admin_id` bigint DEFAULT NULL,
  PRIMARY KEY (`alarm_id`),
  KEY `FKtmje1m44gor7gg2q33q4a09u2` (`admin_id`),
  CONSTRAINT `FKtmje1m44gor7gg2q33q4a09u2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_alarm`
--

LOCK TABLES `admin_alarm` WRITE;
/*!40000 ALTER TABLE `admin_alarm` DISABLE KEYS */;
INSERT INTO `admin_alarm` VALUES (87,'2023-02-16 15:11:49.981380','2023-02-16 15:11:49.981380',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',1),(88,'2023-02-16 15:11:49.989905','2023-02-16 15:11:49.989905',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',2),(89,'2023-02-16 15:11:49.993890','2023-02-16 15:11:49.993890',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',3),(90,'2023-02-16 15:11:49.996541','2023-02-16 15:11:49.996541',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',4),(91,'2023-02-16 15:11:50.012441','2023-02-16 15:11:50.012441',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',5),(92,'2023-02-16 15:11:50.016788','2023-02-16 15:11:50.016788',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',6),(93,'2023-02-16 15:11:50.020829','2023-02-16 15:11:50.020829',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',7),(94,'2023-02-16 15:11:50.024124','2023-02-16 15:11:50.024124',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg',0,'/catadmin/catlist/3',8),(95,'2023-02-16 15:14:17.314394','2023-02-16 15:14:17.314394',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',0,'/catadmin/catlist/4',1),(96,'2023-02-16 15:14:17.319118','2023-02-16 15:22:53.456422',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',1,'/catadmin/catlist/4',2),(97,'2023-02-16 15:14:17.323777','2023-02-16 15:14:17.323777',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',0,'/catadmin/catlist/4',3),(98,'2023-02-16 15:14:17.328250','2023-02-16 15:14:17.328250',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',0,'/catadmin/catlist/4',4),(99,'2023-02-16 15:14:17.336623','2023-02-16 15:14:17.336623',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',0,'/catadmin/catlist/4',5),(100,'2023-02-16 15:14:17.341301','2023-02-16 15:14:17.341301',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',0,'/catadmin/catlist/4',6),(101,'2023-02-16 15:14:17.345896','2023-02-16 15:14:17.345896',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',0,'/catadmin/catlist/4',7),(102,'2023-02-16 15:14:17.350407','2023-02-16 15:14:17.350407',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg',0,'/catadmin/catlist/4',8),(103,'2023-02-16 15:16:05.586941','2023-02-16 15:16:05.586941',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',1),(104,'2023-02-16 15:16:05.591733','2023-02-16 15:16:05.591733',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',2),(105,'2023-02-16 15:16:05.594269','2023-02-16 15:16:05.594269',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',3),(106,'2023-02-16 15:16:05.597280','2023-02-16 15:16:05.597280',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',4),(107,'2023-02-16 15:16:05.600330','2023-02-16 15:16:05.600330',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',5),(108,'2023-02-16 15:16:05.602174','2023-02-16 15:16:05.602174',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',6),(109,'2023-02-16 15:16:05.607077','2023-02-16 15:16:05.607077',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',7),(110,'2023-02-16 15:16:05.610787','2023-02-16 15:16:05.610787',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg',0,'/catadmin/catlist/5',8);
/*!40000 ALTER TABLE `admin_alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_group`
--

DROP TABLE IF EXISTS `admin_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_group` (
  `group_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `group_name` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_group`
--

LOCK TABLES `admin_group` WRITE;
/*!40000 ALTER TABLE `admin_group` DISABLE KEYS */;
INSERT INTO `admin_group` VALUES (1,'2023-02-09 17:47:13.000000','2023-02-09 17:47:13.000000','SSAFY'),(2,'2023-02-16 11:54:48.000000','2023-02-16 11:54:48.000000','해운대구'),(3,'2023-02-16 11:55:10.000000','2023-02-16 11:55:10.000000','동물연합복지단체');
/*!40000 ALTER TABLE `admin_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alarm_history`
--

DROP TABLE IF EXISTS `alarm_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `alarm_type` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `target_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm_history`
--

LOCK TABLES `alarm_history` WRITE;
/*!40000 ALTER TABLE `alarm_history` DISABLE KEYS */;
INSERT INTO `alarm_history` VALUES (36,'2023-02-15 11:56:01.971109','2023-02-15 11:56:01.971109',222,'게시글 \"밤마다 고양이가 너...\"에 재원1 님의 댓글 \"백색소음입니다\"',4),(40,'2023-02-15 20:43:19.056466','2023-02-15 20:43:19.056466',223,'게시글 \"장군이 못생김\"이 블락처리 되었습니다.',109),(41,'2023-02-16 08:50:38.940569','2023-02-16 08:50:38.940569',211,'냥그릇 냥그릇 1호에 사료가 없어요.',1),(42,'2023-02-16 08:53:27.460258','2023-02-16 08:53:27.460258',222,'게시글 \"고양이 짱귀여워\"에 재원1 님의 댓글 \"응\"',111),(43,'2023-02-16 08:53:50.101796','2023-02-16 08:53:50.101796',221,'게시글 \"고양이 짱귀여워\"을 재원1 님이 좋아합니다!',111),(44,'2023-02-16 13:41:12.908776','2023-02-16 13:41:12.908776',222,'게시글 \"요새 고양이가 안보...\"에 봄이로다 님의 댓글 \"오늘 밥 먹었어요! \"',106),(45,'2023-02-16 15:11:49.941813','2023-02-16 15:11:49.941813',113,'관리중인 냥그릇 냥그릇 T1에 방문한 고양이가 일주일간 없습니다.',3),(46,'2023-02-16 15:14:17.305066','2023-02-16 15:14:17.305066',113,'관리중인 냥그릇 냥그릇 T2에 방문한 고양이가 일주일간 없습니다.',4),(47,'2023-02-16 15:16:05.582554','2023-02-16 15:16:05.582554',113,'관리중인 냥그릇 냥그릇 T3에 방문한 고양이가 일주일간 없습니다.',5),(48,'2023-02-16 16:38:29.666381','2023-02-16 16:38:29.666381',222,'게시글 \"장군이 못생김\"에 재원1 님의 댓글 \"장군이가 어때서요 ㅜㅜ\"',118),(49,'2023-02-16 20:51:47.483196','2023-02-16 20:51:47.483196',222,'게시글 \"장군이가 더 귀여움...\"에 사용자-10 님의 댓글 \"노노\"',121),(50,'2023-02-16 21:58:47.454798','2023-02-16 21:58:47.454798',222,'게시글 \"밤마다 고양이가 너...\"에 길에 사는 집사 님의 댓글 \"ㅜㅜㅜㅜ\"',4),(51,'2023-02-16 22:27:26.712028','2023-02-16 22:27:26.712028',221,'게시글 \"커뮤니티 수정\"을 심보현 님이 좋아합니다!',123),(52,'2023-02-16 22:35:30.694699','2023-02-16 22:35:30.694699',222,'게시글 \"커뮤니티 수정\"에 심보현 님의 댓글 \"댓글입니다.\"',123),(53,'2023-02-17 08:48:03.623635','2023-02-17 08:48:03.623635',222,'게시글 \"귀여움 + 귀여움 ...\"에 재원1 님의 댓글 \"오 ~~!! 너무 귀여워\"',124),(54,'2023-02-17 08:48:06.644955','2023-02-17 08:48:06.644955',221,'게시글 \"귀여움 + 귀여움 ...\"을 재원1 님이 좋아합니다!',124);
/*!40000 ALTER TABLE `alarm_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `community_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `comment_count` int NOT NULL,
  `community_state` int NOT NULL,
  `content` longtext NOT NULL,
  `like_count` int NOT NULL,
  `report_count` int NOT NULL,
  `scrap_count` int NOT NULL,
  `category_id` bigint NOT NULL,
  `dish_id` bigint DEFAULT NULL,
  `user_account_id` bigint NOT NULL,
  PRIMARY KEY (`community_id`),
  KEY `FKt7kfil2cpeacnt8h54qthcwav` (`category_id`),
  KEY `FKomrqg31hxoxilxckeup4d57e3` (`dish_id`),
  KEY `FKf7ns9q857xffeet596f1xnvgc` (`user_account_id`),
  CONSTRAINT `FKf7ns9q857xffeet596f1xnvgc` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKomrqg31hxoxilxckeup4d57e3` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`),
  CONSTRAINT `FKt7kfil2cpeacnt8h54qthcwav` FOREIGN KEY (`category_id`) REFERENCES `community_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES (3,'2023-02-10 10:16:48.657599','2023-02-15 23:20:03.671709',3,2,'저희집 고양이가 너무 귀여워요 ㅎㅎ\r\n\r\n이렇게 귀여운 고양이.. 어기서만 볼수있습니다',4,1,0,3,1,2),(4,'2023-02-10 01:20:53.116392','2023-02-16 21:58:47.478596',1,0,'밤마다 고양이가 너무 울어서 힘들어요 ㅜㅜㅜㅜ',1,0,0,1,3,2),(5,'2023-02-10 01:23:04.275415','2023-02-10 01:23:04.275415',0,0,'저는 여기가 너무 좋아요..',0,0,0,1,3,1),(6,'2023-02-10 01:27:39.273378','2023-02-10 01:27:39.273378',0,0,'여기 고양이들이 너무 귀여워요 !~~',0,0,0,2,5,7),(54,'2023-02-12 17:43:12.723276','2023-02-14 21:22:00.327237',1,1,'고양이가 너무 많이먹는거 아닌가요??!!',0,1,0,1,2,3),(55,'2023-02-12 19:51:54.584970','2023-02-12 19:51:59.981456',0,1,'글도 썼다가 지웠다가 할 수 있을까요',0,0,0,1,1,12),(101,'2023-02-13 17:53:16.025846','2023-02-14 21:08:55.941056',0,0,'최신글입니다.',1,0,0,1,3,1),(102,'2023-02-14 13:14:35.954746','2023-02-14 17:12:40.100858',0,0,'고양이 귀여워',0,0,0,1,1,9),(103,'2023-02-14 15:06:42.473077','2023-02-15 23:20:10.829946',1,0,'고양이입니당!',1,1,0,3,1,5),(104,'2023-02-14 17:48:32.303820','2023-02-14 17:48:32.303820',0,0,'여기 고양이 TNR 안된 애들이 몇명정도 될까요?? 귀잘린 애들도 몇명 있던데..',0,0,0,2,3,3),(105,'2023-02-14 21:07:11.963902','2023-02-14 21:08:46.360924',1,0,'고양이가 너무 귀여워요..',1,0,0,3,2,1),(106,'2023-02-14 23:19:52.323243','2023-02-17 02:13:18.048869',2,0,'요새 고양이가 안보여요 수정',1,0,0,2,1,8),(107,'2023-02-15 08:48:46.491651','2023-02-15 08:48:46.491651',0,0,'수정을 테스트하기 위한 커뮤니티 작성',0,0,0,1,5,1),(108,'2023-02-15 20:37:41.571515','2023-02-15 20:38:54.032551',0,1,'장군이 멍청이',0,1,0,1,1,14),(109,'2023-02-15 20:39:11.467409','2023-02-15 20:43:19.115707',0,1,'장군이 못생김',0,5,0,1,1,14),(110,'2023-02-16 08:52:52.417856','2023-02-16 08:52:52.417856',0,0,'고양이 귀여워',0,0,0,3,10,2),(111,'2023-02-16 08:53:12.184857','2023-02-16 10:17:42.309170',1,1,'고양이 짱귀여워',1,0,0,1,10,2),(112,'2023-02-16 10:57:34.754540','2023-02-16 10:57:34.754540',0,0,'우리 고양이 귀여워',0,0,0,1,4,2),(113,'2023-02-16 11:51:07.957160','2023-02-16 11:52:24.454413',0,1,'ㅋㅋ',0,0,0,1,3,2),(114,'2023-02-16 11:52:19.764161','2023-02-16 11:52:27.216907',0,1,'ㅋㅋㅋㄴㅁㅌㅇㅁㄴㅇㅁㄴ',0,0,0,1,3,2),(115,'2023-02-16 13:51:18.157394','2023-02-16 13:52:24.981709',0,0,'고양이 ㅇ어딨어요',0,1,0,2,11,17),(116,'2023-02-16 14:27:07.753666','2023-02-16 14:55:37.690616',0,1,'장군이 못생김. 메롱',0,0,0,1,1,14),(117,'2023-02-16 14:56:20.380315','2023-02-16 14:56:27.696826',0,1,'장군이 못생김',0,0,0,1,5,14),(118,'2023-02-16 15:00:34.495244','2023-02-16 16:38:29.678692',1,0,'장군이 못생김',0,0,0,1,1,14),(119,'2023-02-16 16:25:40.673398','2023-02-16 16:26:33.460300',0,0,'제가 오늘 츄르 3개 줬어요!!',0,1,0,1,14,3),(120,'2023-02-16 17:06:46.226244','2023-02-16 17:06:46.226244',0,0,'저는 고양이 별로 안좋아하는데 여기 고양이들은 너무 귀엽네요..!',0,0,0,2,2,11),(121,'2023-02-16 20:43:11.174727','2023-02-16 22:37:18.093988',2,0,'장군이가 더 귀여움 ㅡㅡ',0,0,0,1,2,14),(122,'2023-02-16 21:17:26.078057','2023-02-16 21:19:20.418637',0,0,'얼마전 츄르를 놓고갔는데 양이 많아요, 장군이 살이 너무 쪄서 양을 조절하는게 좋을 것 같아요!!',0,2,0,1,16,3),(123,'2023-02-16 22:08:45.639040','2023-02-16 22:40:57.507524',1,0,'커뮤니티 수정',1,1,0,1,1,1),(124,'2023-02-16 22:42:52.576487','2023-02-17 08:48:06.664225',1,0,'귀여움 + 귀여움 = 왕귀여움!!❤',1,0,0,1,2,3);
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_category`
--

DROP TABLE IF EXISTS `community_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_category`
--

LOCK TABLES `community_category` WRITE;
/*!40000 ALTER TABLE `community_category` DISABLE KEYS */;
INSERT INTO `community_category` VALUES (1,NULL,NULL,'찬반토론'),(2,NULL,NULL,'자유 게시판'),(3,NULL,NULL,'고양이 자랑');
/*!40000 ALTER TABLE `community_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_comment`
--

DROP TABLE IF EXISTS `community_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `content` longtext NOT NULL,
  `like_count` int NOT NULL,
  `state` int NOT NULL,
  `community_id` bigint NOT NULL,
  `user_account_id` bigint NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FK5s7mlxnl3exdg2iy49qjpjsp7` (`community_id`),
  KEY `FKb35dkwkesahx7sv64onkdc28n` (`user_account_id`),
  CONSTRAINT `FK5s7mlxnl3exdg2iy49qjpjsp7` FOREIGN KEY (`community_id`) REFERENCES `community` (`community_id`),
  CONSTRAINT `FKb35dkwkesahx7sv64onkdc28n` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_comment`
--

LOCK TABLES `community_comment` WRITE;
/*!40000 ALTER TABLE `community_comment` DISABLE KEYS */;
INSERT INTO `community_comment` VALUES (3,'2023-02-14 15:06:59.086712','2023-02-14 15:06:59.086712','재원님 고양이 어딨어요?',0,0,3,5),(4,'2023-02-14 15:07:45.192608','2023-02-14 15:07:45.192608','고양이 사진 주세요.',0,0,3,5),(5,'2023-02-14 15:31:31.756633','2023-02-14 15:31:31.756633','해킹당했어요',0,0,3,2),(6,'2023-02-14 21:06:42.697409','2023-02-14 21:22:00.327379','댓글입니다.',0,1,54,1),(7,'2023-02-14 21:08:38.110144','2023-02-14 21:08:55.940612','댓글입니다.',0,1,101,1),(8,'2023-02-14 21:08:46.345971','2023-02-16 01:55:33.836067','야옹아 멍멍해봐',1,0,105,3),(9,'2023-02-14 21:20:04.331977','2023-02-14 21:20:04.331977','귀여워요!',0,0,103,3),(10,'2023-02-15 11:32:10.381833','2023-02-15 11:32:12.945234','추워서 없나봐요',1,0,106,2),(11,'2023-02-15 11:56:01.899301','2023-02-15 12:01:18.058159','백색소음입니다',0,1,4,2),(12,'2023-02-16 08:53:27.325297','2023-02-16 10:17:42.309223','응',0,1,111,2),(13,'2023-02-16 08:53:41.397150','2023-02-16 08:53:48.077952','ㅇㅇ',0,1,111,2),(14,'2023-02-16 08:53:43.804820','2023-02-16 08:53:45.819017','ㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴ',0,1,111,2),(15,'2023-02-16 13:41:12.804269','2023-02-16 13:41:12.804269','오늘 밥 먹었어요! ',0,0,106,3),(16,'2023-02-16 16:38:29.647704','2023-02-17 02:14:46.633848','장군이가 어때서요 ㅜㅜ',1,0,118,2),(17,'2023-02-16 20:51:47.371702','2023-02-16 20:51:47.371702','노노',0,0,121,10),(18,'2023-02-16 21:58:47.350877','2023-02-16 21:58:47.350877','ㅜㅜㅜㅜ',0,0,4,9),(19,'2023-02-16 22:35:30.683334','2023-02-16 22:37:04.603750','댓글입니다.',0,1,123,1),(20,'2023-02-16 22:37:18.086071','2023-02-16 22:37:18.086071','네..? 저희 봄이랑 로다가 99999999배는 더 귀엽죠,,,',0,0,121,3),(21,'2023-02-16 22:40:57.497503','2023-02-16 22:41:54.816641','커뮤니티 댓글',1,0,123,1),(22,'2023-02-17 08:48:03.346636','2023-02-17 08:48:03.346636','오 ~~!! 너무 귀여워',0,0,124,2);
/*!40000 ALTER TABLE `community_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_comment_like`
--

DROP TABLE IF EXISTS `community_comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_comment_like` (
  `community_like_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `community_comment_like_state` int NOT NULL,
  `comment_id` bigint NOT NULL,
  `user_account_id` bigint NOT NULL,
  PRIMARY KEY (`community_like_id`),
  KEY `FK970iky4p4sudsau7gknav1nl6` (`comment_id`),
  KEY `FKm684f4vj5tk05d9vr5vpoeb0s` (`user_account_id`),
  CONSTRAINT `FK970iky4p4sudsau7gknav1nl6` FOREIGN KEY (`comment_id`) REFERENCES `community_comment` (`comment_id`),
  CONSTRAINT `FKm684f4vj5tk05d9vr5vpoeb0s` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_comment_like`
--

LOCK TABLES `community_comment_like` WRITE;
/*!40000 ALTER TABLE `community_comment_like` DISABLE KEYS */;
INSERT INTO `community_comment_like` VALUES (1,'2023-02-14 21:09:09.301862','2023-02-16 01:55:33.836294',0,8,1),(2,'2023-02-15 11:32:12.933706','2023-02-15 11:32:12.933706',0,10,2),(3,'2023-02-16 08:53:59.696689','2023-02-16 08:54:00.702234',1,12,2),(4,'2023-02-16 22:41:26.922382','2023-02-16 22:41:54.817084',0,21,1),(5,'2023-02-17 02:14:46.615384','2023-02-17 02:14:46.615384',0,16,8);
/*!40000 ALTER TABLE `community_comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_comment_report`
--

DROP TABLE IF EXISTS `community_comment_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_comment_report` (
  `community_report_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `comment_id` bigint NOT NULL,
  `user_account_id` bigint NOT NULL,
  PRIMARY KEY (`community_report_id`),
  KEY `FKmvxo8q13x5c8hk9qfvpk6kbhl` (`comment_id`),
  KEY `FK1bph25qss7n1sys9pmhpdl52g` (`user_account_id`),
  CONSTRAINT `FK1bph25qss7n1sys9pmhpdl52g` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKmvxo8q13x5c8hk9qfvpk6kbhl` FOREIGN KEY (`comment_id`) REFERENCES `community_comment` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_comment_report`
--

LOCK TABLES `community_comment_report` WRITE;
/*!40000 ALTER TABLE `community_comment_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `community_comment_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_img`
--

DROP TABLE IF EXISTS `community_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_img` (
  `community_img_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `img_url` varchar(255) NOT NULL,
  `community_id` bigint NOT NULL,
  PRIMARY KEY (`community_img_id`),
  KEY `FK2mjnapgwtjc651uoel8leouf3` (`community_id`),
  CONSTRAINT `FK2mjnapgwtjc651uoel8leouf3` FOREIGN KEY (`community_id`) REFERENCES `community` (`community_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_img`
--

LOCK TABLES `community_img` WRITE;
/*!40000 ALTER TABLE `community_img` DISABLE KEYS */;
INSERT INTO `community_img` VALUES (9,'2023-02-14 15:06:42.580041','2023-02-14 15:06:42.580041','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8fcdd8da-5337-4b0b-8e1e-4d1f5dbb90e5.jpeg',103),(10,'2023-02-14 21:07:13.181975','2023-02-14 21:07:13.181975','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d214da05-b727-4c9a-8db8-44436804dde9.jpeg',105),(11,'2023-02-14 21:07:13.284175','2023-02-14 21:07:13.284175','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1ea5bc40-25e2-477f-bbb5-a67843cf6c64.jpeg',105),(12,'2023-02-15 08:48:46.823197','2023-02-15 08:48:46.823197','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2287bf88-a9d2-4575-bd54-69324c7f8e8e.jpeg',107),(13,'2023-02-15 08:48:46.937716','2023-02-15 08:48:46.937716','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/699b52a2-caf1-44e3-a643-513f2d7d0617.jpeg',107),(15,'2023-02-15 20:39:11.559116','2023-02-15 20:39:11.559116','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e30649df-e24a-4e14-99b0-d3bf829a605a.jpeg',109),(16,'2023-02-16 08:52:55.907960','2023-02-16 08:52:55.907960','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/79e08b20-37f8-4dcf-a1fe-3e90bfc141f5.png',110),(19,'2023-02-16 10:57:51.127991','2023-02-16 10:57:51.127991','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/427db223-4854-4d4f-b6dc-c6b8d5e7db75.jpg',112),(20,'2023-02-16 10:57:51.243404','2023-02-16 10:57:51.243404','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/a6dce19d-725e-4363-bc27-25ccd29af6eb.jpg',112),(29,'2023-02-16 15:00:34.659863','2023-02-16 15:00:34.659863','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e1e11a32-c5f8-4eb3-a3c2-0375c2ef1f27.jpeg',118),(30,'2023-02-16 20:43:12.183500','2023-02-16 20:43:12.183500','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d50371d3-304a-4260-a8c9-e37c322c1b6e.jpeg',121),(31,'2023-02-16 21:17:26.164085','2023-02-16 21:17:26.164085','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3cb031a1-5360-4179-ba7b-82f6b72ac14e.jpg',122),(32,'2023-02-16 22:42:52.762228','2023-02-16 22:42:52.762228','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/58a38935-7390-4799-9dc4-95ef119e41f4.jpeg',124);
/*!40000 ALTER TABLE `community_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_like`
--

DROP TABLE IF EXISTS `community_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_like` (
  `community_like_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `community_like_state` int NOT NULL,
  `community_id` bigint NOT NULL,
  `user_account_id` bigint NOT NULL,
  PRIMARY KEY (`community_like_id`),
  KEY `FK7opxraqkamch4fwhyf7r9tudf` (`community_id`),
  KEY `FK27j7jgqli1de6kttjuo8krw4q` (`user_account_id`),
  CONSTRAINT `FK27j7jgqli1de6kttjuo8krw4q` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK7opxraqkamch4fwhyf7r9tudf` FOREIGN KEY (`community_id`) REFERENCES `community` (`community_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_like`
--

LOCK TABLES `community_like` WRITE;
/*!40000 ALTER TABLE `community_like` DISABLE KEYS */;
INSERT INTO `community_like` VALUES (7,'2023-02-14 11:32:48.841998','2023-02-14 11:32:48.841998',0,3,2),(8,'2023-02-14 15:06:50.826760','2023-02-14 15:06:50.826760',0,3,5),(10,'2023-02-14 17:12:37.750692','2023-02-14 17:12:40.104466',1,102,9),(11,'2023-02-14 21:07:59.501457','2023-02-14 21:07:59.501457',0,105,1),(12,'2023-02-14 21:08:33.447911','2023-02-14 21:08:33.447911',0,101,1),(13,'2023-02-14 21:19:56.817088','2023-02-14 21:19:56.817088',0,103,3),(14,'2023-02-15 10:36:10.989568','2023-02-15 10:36:10.989568',0,4,2),(15,'2023-02-15 11:32:14.519733','2023-02-15 11:32:14.519733',0,106,2),(16,'2023-02-16 08:53:50.034661','2023-02-16 10:17:42.309204',1,111,2),(17,'2023-02-16 22:27:26.652137','2023-02-16 22:27:26.652137',0,123,1),(18,'2023-02-17 08:48:06.537286','2023-02-17 08:48:06.537286',0,124,2);
/*!40000 ALTER TABLE `community_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_report`
--

DROP TABLE IF EXISTS `community_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_report` (
  `community_report_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `community_report_state` int NOT NULL,
  `dish_id` bigint DEFAULT NULL,
  `reports_content` varchar(255) NOT NULL,
  `community_id` bigint NOT NULL,
  `user_account_id` bigint NOT NULL,
  PRIMARY KEY (`community_report_id`),
  KEY `FK3sati4cksic2y7l84679hkrbn` (`community_id`),
  KEY `FKmwmie73tx3squx8yt0we9fhjg` (`user_account_id`),
  CONSTRAINT `FK3sati4cksic2y7l84679hkrbn` FOREIGN KEY (`community_id`) REFERENCES `community` (`community_id`),
  CONSTRAINT `FKmwmie73tx3squx8yt0we9fhjg` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_report`
--

LOCK TABLES `community_report` WRITE;
/*!40000 ALTER TABLE `community_report` DISABLE KEYS */;
INSERT INTO `community_report` VALUES (1,'2023-02-14 15:09:25.479914','2023-02-14 15:09:25.479914',0,1,'고양이 사진 없는데 고양이 자랑하네용!!',3,5),(2,'2023-02-14 21:06:23.704976','2023-02-14 21:06:23.704976',0,2,'게시글이 마음에 안드네요...',54,1),(3,'2023-02-14 21:12:43.675725','2023-02-14 21:12:43.675725',0,1,'게시글이 성의가 없어요',103,3),(4,'2023-02-15 20:38:01.502797','2023-02-15 20:38:01.502797',0,1,'장군이 안 멍청함',108,14),(5,'2023-02-15 20:40:04.660960','2023-02-15 20:40:04.660960',0,1,'너무 심한 말,,,',109,5),(6,'2023-02-15 20:40:11.678474','2023-02-15 20:40:11.678474',0,1,'이상한 글이에요',109,2),(7,'2023-02-15 20:41:53.659991','2023-02-15 20:41:53.659991',0,1,'안 못생김',109,10),(8,'2023-02-15 20:43:15.229577','2023-02-15 20:43:15.229577',0,1,'이상해요..',109,9),(9,'2023-02-15 20:43:18.961256','2023-02-15 20:43:18.961256',0,1,'장군이 묘권모독입니다.',109,8),(10,'2023-02-16 13:52:24.950795','2023-02-16 13:52:24.950795',0,11,'못생겼어요',115,1),(11,'2023-02-16 16:26:33.455434','2023-02-16 16:26:33.455434',0,14,'구라에요',119,3),(12,'2023-02-16 21:17:46.867769','2023-02-16 21:17:46.867769',0,16,'못생겼어요ㅠㅠ',122,3),(13,'2023-02-16 21:19:20.389300','2023-02-16 21:19:20.389300',0,16,'이상해요!',122,2),(14,'2023-02-16 22:29:40.859477','2023-02-16 22:29:40.859477',0,1,'신고함',123,1);
/*!40000 ALTER TABLE `community_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_scrap`
--

DROP TABLE IF EXISTS `community_scrap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_scrap` (
  `community_scrap_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `community_scrap_state` int NOT NULL,
  `community_id` bigint NOT NULL,
  `user_account_id` bigint NOT NULL,
  PRIMARY KEY (`community_scrap_id`),
  KEY `FKgoww0668hgbd0kw649qqeymt0` (`community_id`),
  KEY `FK83ual12cyolguyqmb5ig76wbe` (`user_account_id`),
  CONSTRAINT `FK83ual12cyolguyqmb5ig76wbe` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKgoww0668hgbd0kw649qqeymt0` FOREIGN KEY (`community_id`) REFERENCES `community` (`community_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_scrap`
--

LOCK TABLES `community_scrap` WRITE;
/*!40000 ALTER TABLE `community_scrap` DISABLE KEYS */;
INSERT INTO `community_scrap` VALUES (5,'2023-02-14 10:43:58.364848','2023-02-14 10:43:58.364848',0,101,12),(6,'2023-02-14 11:33:10.278410','2023-02-14 11:33:10.278410',0,3,2),(7,'2023-02-14 21:08:00.471185','2023-02-14 21:08:26.824260',1,105,1),(8,'2023-02-14 21:19:11.957404','2023-02-14 21:19:11.957404',0,103,3),(9,'2023-02-14 21:19:15.498243','2023-02-14 21:19:15.498243',0,102,3),(10,'2023-02-14 21:20:51.669898','2023-02-14 21:20:51.669898',0,104,3),(11,'2023-02-16 16:25:43.627095','2023-02-16 16:25:45.024356',1,119,3),(12,'2023-02-16 21:17:30.987210','2023-02-16 21:17:30.987210',0,122,3),(13,'2023-02-16 22:28:13.358413','2023-02-16 22:28:13.358413',0,123,1);
/*!40000 ALTER TABLE `community_scrap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish`
--

DROP TABLE IF EXISTS `dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish` (
  `dish_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `dish_img` varchar(255) DEFAULT NULL,
  `dish_name` varchar(255) DEFAULT NULL,
  `dish_state` int DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `load_address` varchar(255) DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `original_lat` double DEFAULT NULL,
  `original_lon` double DEFAULT NULL,
  `other_note` varchar(100) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  PRIMARY KEY (`dish_id`),
  UNIQUE KEY `UK_2khxyfxvmhyvwfq0jkhemilj2` (`serial_number`),
  KEY `FKdvspll7idd4u75wtlpfmkaiow` (`group_id`),
  CONSTRAINT `FKdvspll7idd4u75wtlpfmkaiow` FOREIGN KEY (`group_id`) REFERENCES `admin_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish`
--

LOCK TABLES `dish` WRITE;
/*!40000 ALTER TABLE `dish` DISABLE KEYS */;
INSERT INTO `dish` VALUES (1,'2023-02-09 12:51:46.401371','2023-02-17 08:45:01.682472','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e18375af-d77b-408f-b45d-a4911e8c05b4.jpeg','냥그릇 1호',1,35.091132242532304,'부산 강서구 송정동 1625',128.85395072212856,35.091132242532304,128.85395072212856,'관리자 : 주영12','7l9Z6zGIgNDD0p1',1),(2,'2023-02-09 12:51:58.073529','2023-02-17 08:44:41.193098','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5249df73-1fce-4b4c-9e47-0d2ef5b39dc0.png','미현이네 냥그릇',1,35.092052540246954,'부산 강서구 송정동 1625',128.85329174913926,35.092052540246954,128.85329174913926,'관리자 : 이미현','Wxv8XHbTAsDmSLX',1),(3,'2023-02-09 14:04:57.815510','2023-02-16 14:53:39.684880','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25888888-8beb-40e7-a7b9-cad4462cb3bf.jpg','냥그릇 T1',1,35.092653499790075,'부산 강서구 송정동 1625',128.8528886904431,35.092653499790075,128.8528886904431,'담당 관리자 : 최재원','7qOOnCVodSK5Ij1',1),(4,'2023-02-09 14:05:04.612070','2023-02-09 14:59:23.680603','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6ae9e1fb-711b-4613-b76e-0bffe7087f79.jpg','냥그릇 T2',1,35.09116651697367,'부산 강서구 송정동 1625',128.85288793793802,35.09116651697367,128.85288793793802,'담당 관리자 : 최재원','59Wdml5CkaXMXMS',1),(5,'2023-02-09 14:05:12.434320','2023-02-16 14:59:46.411255','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/13021eb2-5daf-4d23-80df-57084817e86b.jpg','냥그릇 T3',1,35.09114246677771,'부산 강서구 송정동 1625',128.85328211702716,35.09114246677771,128.85328211702716,'담당 관리자 : 최재원','K5ozr0N2CVwayXe',1),(6,'2023-02-09 14:55:37.302664','2023-02-09 14:56:24.245486','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/22f68f4c-a103-4a36-a4ac-f02b399a4d00.jpeg','테스트냥그릇1호',2,35.09671573919804,'부산 강서구 송정동 1623-2',128.85480085635552,35.09671573919804,128.85480085635552,'1호2','1111111222333',1),(7,'2023-02-10 13:54:10.273864','2023-02-14 16:00:41.486353',NULL,'1234',2,35.095569,NULL,128.852895,NULL,NULL,'1234','test',1),(8,'2023-02-11 21:06:31.772437','2023-02-11 21:06:31.772437',NULL,'청사포 1호',0,NULL,NULL,NULL,NULL,NULL,'담당 캣대디 : 박정호\r\n010-8256-8433\r\n2023년 2월 11부터 담당\r\n1년간 봉사할 계획','24221812457',1),(9,'2023-02-15 08:59:08.481464','2023-02-16 14:58:52.293777','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f6f63d2a-14ba-45cc-a409-dbbd1b1bf061.png','나루 1호',2,35.09606450415221,'부산 강서구 송정동 1623-2',128.85377730533472,35.09606450415221,128.85377730533472,'담당 캣맘 : 박정호\r\n010-8245-8433','32131222112',1),(10,'2023-02-15 22:30:57.603954','2023-02-16 11:09:13.693763','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/44432149-4bf9-41d8-8b32-c9bd255c3db1.jpg','TEST12',2,35.09431283906108,'부산 강서구 송정동 1596',128.84927490629892,35.09431283906108,128.84927490629892,'TEST1234','TESTESTEST1234123',1),(11,'2023-02-16 13:47:08.094677','2023-02-16 13:55:45.439684','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ee96bc1f-a4d5-4337-9639-55cac0231569.png','1호',2,35.09573511499286,'부산 강서구 송정동 1623-2',128.8564563083652,35.09573511499286,128.8564563083652,'담당 캣맘 : 심보현','2345678',2),(12,'2023-02-16 14:16:28.221831','2023-02-16 14:18:57.270008',NULL,'테스트',2,NULL,NULL,NULL,NULL,NULL,'담당 캣맘 : 이미현 010-2123-2312, 2023년부터 1년간 봉사하기로 함','2kXBPprXEcOdzPB2',1),(13,'2023-02-16 14:47:59.015132','2023-02-16 14:48:28.245011','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7e207b2c-0689-4442-a891-ff7d42d26c84.jpg','test',2,35.0957064439567,'부산 강서구 송정동 1623-2',128.85598635026,35.0957064439567,128.85598635026,'ets','12312asd123',1),(14,'2023-02-16 16:22:53.174509','2023-02-16 17:47:47.591368','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ef8d080e-932b-4d1e-93ba-6bd9f7e1964e.gif','장군이네',2,35.09230579686014,'부산 강서구 송정동 1625',128.85323169282577,35.09230579686014,128.85323169282577,'담당 캣맘 : 이미현, 핸드폰번호, 2023년부터 1년간 관리 봉사하기로 함','2kXBPprXEcOdz11',1),(15,'2023-02-16 17:14:03.447150','2023-02-16 17:47:33.869748','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/aefcbf5b-3c70-4f37-a7c1-73fba66295c2.jpg','장군이네',2,35.09328660119889,'부산 강서구 송정동 1625',128.85333064452462,35.09328660119889,128.85333064452462,'담당 캣맘 : 이미현 ','2kXBPprXEcOdzPB',1),(16,'2023-02-16 21:14:07.611326','2023-02-17 08:49:45.570108','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/cb98e60c-f851-4e81-b69a-382bb79573b5.jpg','장군이네',2,35.09271367289363,'부산 강서구 송정동 1625',128.85366854895705,35.09271367289363,128.85366854895705,'담당 캣맘 : 이미현, 핸드폰번호, 2023년부터 1년간 관리 봉사하기로 함','2kXBPprXEcOdz',1);
/*!40000 ALTER TABLE `dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish_food_log`
--

DROP TABLE IF EXISTS `dish_food_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish_food_log` (
  `dish_food_log_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `food_weight` double DEFAULT NULL,
  `dish_id` bigint DEFAULT NULL,
  PRIMARY KEY (`dish_food_log_id`),
  KEY `FK17yuk6khcvehb2f7j9tpyed02` (`dish_id`),
  CONSTRAINT `FK17yuk6khcvehb2f7j9tpyed02` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=318 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish_food_log`
--

LOCK TABLES `dish_food_log` WRITE;
/*!40000 ALTER TABLE `dish_food_log` DISABLE KEYS */;
INSERT INTO `dish_food_log` VALUES (1,'2023-02-09 14:57:43.488629','2023-02-09 14:57:43.488629',0,3),(2,'2023-02-09 14:57:43.696792','2023-02-09 14:57:43.696792',0,4),(3,'2023-02-09 14:57:43.993238','2023-02-09 14:57:43.993238',0,5),(4,'2023-02-09 15:07:43.102250','2023-02-09 15:07:43.102250',300,3),(5,'2023-02-09 15:17:43.301199','2023-02-09 15:17:43.301199',300,5),(6,'2023-02-09 15:37:43.101556','2023-02-09 15:37:43.101556',250,3),(7,'2023-02-09 16:17:43.165801','2023-02-09 16:17:43.165801',300,4),(8,'2023-02-09 17:07:43.291803','2023-02-09 17:07:43.291803',600,5),(9,'2023-02-09 17:27:43.179731','2023-02-09 17:27:43.179731',600,4),(10,'2023-02-09 18:07:43.310897','2023-02-09 18:07:43.310897',550,5),(11,'2023-02-09 18:27:43.290835','2023-02-09 18:27:43.290835',500,5),(12,'2023-02-09 19:17:43.146178','2023-02-09 19:17:43.146178',200,3),(13,'2023-02-09 19:37:43.109738','2023-02-09 19:37:43.109738',150,3),(14,'2023-02-09 19:37:43.292975','2023-02-09 19:37:43.292975',450,5),(15,'2023-02-09 20:07:43.284542','2023-02-09 20:07:43.284542',400,5),(16,'2023-02-09 20:57:43.284379','2023-02-09 20:57:43.284379',350,5),(17,'2023-02-09 22:17:43.215268','2023-02-09 22:17:43.215268',550,4),(18,'2023-02-09 22:27:43.135188','2023-02-09 22:27:43.135188',100,3),(19,'2023-02-09 22:27:43.320055','2023-02-09 22:27:43.320055',300,5),(20,'2023-02-09 22:37:43.121050','2023-02-09 22:37:43.121050',500,4),(21,'2023-02-09 22:57:43.314493','2023-02-09 22:57:43.314493',250,5),(22,'2023-02-09 23:07:43.545217','2023-02-09 23:07:43.545217',550,5),(23,'2023-02-09 23:17:43.240620','2023-02-09 23:17:43.240620',450,4),(24,'2023-02-09 23:27:43.080561','2023-02-09 23:27:43.080561',400,4),(25,'2023-02-10 00:17:43.250467','2023-02-10 00:17:43.250467',350,4),(26,'2023-02-10 00:57:43.172242','2023-02-10 00:57:43.172242',50,3),(27,'2023-02-10 00:57:43.271948','2023-02-10 00:57:43.271948',300,4),(28,'2023-02-10 01:22:05.494413','2023-02-10 01:22:05.494413',30.21,1),(29,'2023-02-10 01:23:37.047202','2023-02-10 01:23:37.047202',-2.5,1),(30,'2023-02-10 01:23:42.320313','2023-02-10 01:23:42.320313',56.7,1),(31,'2023-02-10 01:23:47.785888','2023-02-10 01:23:47.785888',216.09,1),(32,'2023-02-10 01:23:53.015953','2023-02-10 01:23:53.015953',-3.24,1),(33,'2023-02-10 01:23:58.575409','2023-02-10 01:23:58.575409',211.88,1),(34,'2023-02-10 01:24:29.535293','2023-02-10 01:24:29.535293',-3.11,1),(35,'2023-02-10 01:24:34.674890','2023-02-10 01:24:34.674890',100.31,1),(36,'2023-02-10 02:07:43.502009','2023-02-10 02:07:43.502009',0,3),(37,'2023-02-10 02:17:43.177151','2023-02-10 02:17:43.177151',300,3),(38,'2023-02-10 02:21:01.242709','2023-02-10 02:21:01.242709',-3601.42,1),(39,'2023-02-10 02:21:06.534222','2023-02-10 02:21:06.534222',-7540.46,1),(40,'2023-02-10 02:21:11.733344','2023-02-10 02:21:11.733344',-7602.99,1),(41,'2023-02-10 02:21:17.291092','2023-02-10 02:21:17.291092',-7540.46,1),(42,'2023-02-10 02:21:27.823094','2023-02-10 02:21:27.823094',-7602.99,1),(43,'2023-02-10 02:21:33.013556','2023-02-10 02:21:33.013556',-7575.95,1),(44,'2023-02-10 02:21:38.643336','2023-02-10 02:21:38.643336',-7540.46,1),(45,'2023-02-10 02:21:54.336331','2023-02-10 02:21:54.336331',-7572.97,1),(46,'2023-02-10 02:22:00.442668','2023-02-10 02:22:00.442668',-7602.99,1),(47,'2023-02-10 02:22:05.710307','2023-02-10 02:22:05.710307',392.91,1),(48,'2023-02-10 02:22:26.333422','2023-02-10 02:22:26.333422',-7995.87,1),(49,'2023-02-10 11:35:32.956790','2023-02-10 11:35:32.956790',108.27,1),(50,'2023-02-10 11:37:28.967052','2023-02-10 11:37:28.967052',22.72,1),(51,'2023-02-10 11:38:09.945491','2023-02-10 11:38:09.945491',6.54,1),(52,'2023-02-10 11:38:15.329263','2023-02-10 11:38:15.329263',7484.71,1),(53,'2023-02-10 11:38:21.046699','2023-02-10 11:38:21.046699',250.1,1),(54,'2023-02-10 11:38:26.387026','2023-02-10 11:38:26.387026',4001.57,1),(55,'2023-02-10 11:38:31.815197','2023-02-10 11:38:31.815197',102.73,1),(56,'2023-02-10 11:38:36.946302','2023-02-10 11:38:36.946302',14.88,1),(57,'2023-02-10 11:38:42.097492','2023-02-10 11:38:42.097492',7995.97,1),(58,'2023-02-10 11:38:58.646075','2023-02-10 11:38:58.646075',7572.61,1),(59,'2023-02-10 11:39:33.683427','2023-02-10 11:39:33.683427',0.67,1),(60,'2023-02-10 11:39:44.017523','2023-02-10 11:39:44.017523',327.03,1),(61,'2023-02-10 11:39:49.175832','2023-02-10 11:39:49.175832',24.33,1),(62,'2023-02-10 11:40:07.342903','2023-02-10 11:40:07.342903',0.18,1),(63,'2023-02-10 11:40:12.514424','2023-02-10 11:40:12.514424',7973.88,1),(64,'2023-02-10 11:40:40.184402','2023-02-10 11:40:40.184402',-7975.53,1),(65,'2023-02-10 11:41:06.128644','2023-02-10 11:41:06.128644',-7999.33,1),(66,'2023-02-10 11:41:55.867251','2023-02-10 11:41:55.867251',60.85,1),(67,'2023-02-10 11:42:01.018498','2023-02-10 11:42:01.018498',24.97,1),(68,'2023-02-10 11:42:21.605852','2023-02-10 11:42:21.605852',7996.03,1),(69,'2023-02-10 11:42:31.876538','2023-02-10 11:42:31.876538',26.52,1),(70,'2023-02-10 11:44:07.708179','2023-02-10 11:44:07.708179',204.49,1),(71,'2023-02-10 11:44:12.874314','2023-02-10 11:44:12.874314',28.78,1),(72,'2023-02-10 11:45:43.538218','2023-02-10 11:45:43.538218',62.52,1),(73,'2023-02-10 11:46:45.686749','2023-02-10 11:46:45.686749',4001.57,1),(74,'2023-02-10 11:46:55.738462','2023-02-10 11:46:55.738462',62.52,1),(75,'2023-02-10 11:47:05.936171','2023-02-10 11:47:05.936171',204.24,1),(76,'2023-02-10 11:47:15.983796','2023-02-10 11:47:15.983796',62.52,1),(77,'2023-02-10 11:55:15.394905','2023-02-10 11:55:15.394905',28.69,1),(78,'2023-02-10 11:55:54.743240','2023-02-10 11:55:54.743240',0.03,1),(79,'2023-02-10 11:56:00.392722','2023-02-10 11:56:00.392722',167.17,1),(80,'2023-02-10 11:56:05.523675','2023-02-10 11:56:05.523675',197.56,1),(81,'2023-02-10 11:56:16.069114','2023-02-10 11:56:16.069114',0.03,1),(82,'2023-02-10 11:58:14.515727','2023-02-10 11:58:14.515727',3972.73,1),(83,'2023-02-10 11:58:19.781916','2023-02-10 11:58:19.781916',-0.14,1),(84,'2023-02-10 11:58:40.744273','2023-02-10 11:58:40.744273',167.65,1),(85,'2023-02-10 12:01:01.495072','2023-02-10 12:01:01.495072',351.26,1),(86,'2023-02-10 12:01:06.724794','2023-02-10 12:01:06.724794',167.37,1),(87,'2023-02-10 12:07:43.257701','2023-02-10 12:07:43.257701',250,4),(88,'2023-02-10 12:08:40.728548','2023-02-10 12:08:40.728548',30.15,1),(89,'2023-02-10 12:08:45.916563','2023-02-10 12:08:45.916563',187.75,1),(90,'2023-02-10 12:09:06.487768','2023-02-10 12:09:06.487768',167.53,1),(91,'2023-02-10 12:27:43.272246','2023-02-10 12:27:43.272246',200,4),(92,'2023-02-10 13:47:43.199031','2023-02-10 13:47:43.199031',600,3),(93,'2023-02-10 14:07:43.177466','2023-02-10 14:07:43.177466',550,3),(94,'2023-02-10 14:07:43.282189','2023-02-10 14:07:43.282189',500,4),(95,'2023-02-10 14:27:43.143721','2023-02-10 14:27:43.143721',450,4),(96,'2023-02-10 14:37:43.271660','2023-02-10 14:37:43.271660',750,4),(97,'2023-02-10 14:57:43.194437','2023-02-10 14:57:43.194437',500,3),(98,'2023-02-10 14:57:43.390118','2023-02-10 14:57:43.390118',500,5),(99,'2023-02-10 15:07:43.550955','2023-02-10 15:07:43.550955',450,5),(100,'2023-02-10 15:17:43.395986','2023-02-10 15:17:43.395986',400,5),(101,'2023-02-10 15:37:43.252811','2023-02-10 15:37:43.252811',450,3),(102,'2023-02-10 18:37:43.307324','2023-02-10 18:37:43.307324',700,4),(103,'2023-02-10 18:47:43.437076','2023-02-10 18:47:43.437076',350,5),(104,'2023-02-10 19:17:43.281149','2023-02-10 19:17:43.281149',300,5),(105,'2023-02-10 19:27:53.827308','2023-02-10 19:27:53.827308',650,4),(106,'2023-02-10 19:37:42.472250','2023-02-10 19:37:42.472250',600,4),(107,'2023-02-10 19:37:42.574206','2023-02-10 19:37:42.574206',250,5),(108,'2023-02-10 19:57:42.566611','2023-02-10 19:57:42.566611',200,5),(109,'2023-02-10 20:27:42.480362','2023-02-10 20:27:42.480362',550,4),(110,'2023-02-10 22:57:42.403628','2023-02-10 22:57:42.403628',500,4),(111,'2023-02-10 23:27:42.466097','2023-02-10 23:27:42.466097',400,3),(112,'2023-02-10 23:27:42.657216','2023-02-10 23:27:42.657216',150,5),(113,'2023-02-10 23:47:42.418910','2023-02-10 23:47:42.418910',350,3),(114,'2023-02-11 00:07:42.544546','2023-02-11 00:07:42.544546',450,4),(115,'2023-02-11 00:07:42.639445','2023-02-11 00:07:42.639445',450,5),(116,'2023-02-11 00:27:42.584840','2023-02-11 00:27:42.584840',400,5),(117,'2023-02-11 00:37:42.628353','2023-02-11 00:37:42.628353',350,5),(118,'2023-02-11 00:47:43.409172','2023-02-11 00:47:43.409172',300,5),(119,'2023-02-15 00:57:42.423000','2023-02-11 00:57:42.423375',300,3),(120,'2023-02-15 01:17:42.430000','2023-02-11 01:17:42.430018',250,3),(121,'2023-02-11 01:37:42.535226','2023-02-11 01:37:42.535226',400,4),(122,'2023-02-15 02:17:42.439000','2023-02-11 02:17:42.439536',550,3),(123,'2023-02-15 02:37:42.426000','2023-02-11 02:37:42.426934',500,3),(124,'2023-02-15 02:57:42.441000','2023-02-11 02:57:42.441973',450,3),(125,'2023-02-11 02:57:42.626331','2023-02-11 02:57:42.626331',250,5),(126,'2023-02-11 03:17:43.365394','2023-02-11 03:17:43.365394',350,4),(127,'2023-02-11 03:17:43.470376','2023-02-11 03:17:43.470376',200,5),(128,'2023-02-11 03:27:42.558536','2023-02-11 03:27:42.558536',650,4),(129,'2023-02-15 04:17:42.479000','2023-02-11 04:17:42.479391',400,3),(130,'2023-02-15 04:27:42.448000','2023-02-11 04:27:42.448968',350,3),(131,'2023-02-11 04:57:42.630328','2023-02-11 04:57:42.630328',150,5),(132,'2023-02-15 05:47:42.483000','2023-02-11 05:47:42.483068',300,3),(133,'2023-02-11 05:47:42.570670','2023-02-11 05:47:42.570670',600,4),(134,'2023-02-11 05:57:43.545107','2023-02-11 05:57:43.545107',100,5),(135,'2023-02-11 06:17:42.549060','2023-02-11 06:17:42.549060',550,4),(136,'2023-02-11 07:17:42.570424','2023-02-11 07:17:42.570424',500,4),(137,'2023-02-11 07:27:42.659589','2023-02-11 07:27:42.659589',50,5),(138,'2023-02-11 07:57:42.578750','2023-02-11 07:57:42.578750',450,4),(139,'2023-02-11 08:57:42.559981','2023-02-11 08:57:42.559981',400,4),(140,'2023-02-11 08:57:42.671769','2023-02-11 08:57:42.671769',350,5),(141,'2023-02-11 09:07:42.685383','2023-02-11 09:07:42.685383',650,5),(142,'2023-02-11 09:27:42.690580','2023-02-11 09:27:42.690580',600,5),(143,'2023-02-11 09:37:42.465169','2023-02-11 09:37:42.465169',350,4),(144,'2023-02-15 09:47:42.487000','2023-02-11 09:47:42.487471',250,3),(145,'2023-02-11 09:47:42.669628','2023-02-11 09:47:42.669628',550,5),(146,'2023-02-11 10:07:42.673279','2023-02-11 10:07:42.673279',500,5),(147,'2023-02-15 11:07:42.404000','2023-02-11 11:07:42.404360',550,3),(148,'2023-02-15 11:17:42.515000','2023-02-11 11:17:42.515261',500,3),(149,'2023-02-15 11:57:42.549000','2023-02-11 11:57:42.549050',450,3),(150,'2023-02-15 12:27:42.529000','2023-02-11 12:27:42.529183',400,3),(151,'2023-02-11 12:27:42.627502','2023-02-11 12:27:42.627502',300,4),(152,'2023-02-11 12:37:42.626046','2023-02-11 12:37:42.626046',250,4),(153,'2023-02-15 12:57:42.541000','2023-02-11 12:57:42.541656',350,3),(154,'2023-02-11 12:57:42.638484','2023-02-11 12:57:42.638484',550,4),(155,'2023-02-15 13:07:42.515000','2023-02-11 13:07:42.515194',300,3),(156,'2023-02-11 13:17:42.702388','2023-02-11 13:17:42.702388',450,5),(157,'2023-02-15 13:47:42.558000','2023-02-11 13:47:42.558756',250,3),(158,'2023-02-11 13:47:42.742460','2023-02-11 13:47:42.742460',400,5),(159,'2023-02-15 14:17:42.554000','2023-02-11 14:17:42.554669',200,3),(160,'2023-02-11 14:17:42.739261','2023-02-11 14:17:42.739261',350,5),(161,'2023-02-12 10:41:15.660845','2023-02-12 10:41:15.660845',6.79,1),(162,'2023-02-12 10:41:20.946465','2023-02-12 10:41:20.946465',332.63,1),(163,'2023-02-12 10:41:40.345324','2023-02-12 10:41:40.345324',6.47,1),(164,'2023-02-12 10:42:44.739192','2023-02-12 10:42:44.739192',46,1),(165,'2023-02-12 10:42:49.889787','2023-02-12 10:42:49.889787',6.03,1),(166,'2023-02-12 10:46:15.039543','2023-02-12 10:46:15.039543',42.85,1),(167,'2023-02-12 10:46:20.158889','2023-02-12 10:46:20.158889',26.45,1),(168,'2023-02-12 11:01:35.227443','2023-02-12 11:01:35.227443',124.01,1),(169,'2023-02-12 11:05:05.493578','2023-02-12 11:05:05.493578',134.08,1),(170,'2023-02-12 11:15:05.216405','2023-02-12 11:15:05.216405',170.28,1),(171,'2023-02-12 11:46:54.668359','2023-02-12 11:46:54.668359',12.96,1),(172,'2023-02-12 11:53:17.821784','2023-02-12 11:53:17.821784',430.82,1),(173,'2023-02-12 11:53:48.030453','2023-02-12 11:53:48.030453',405.77,1),(174,'2023-02-12 11:55:09.560546','2023-02-12 11:55:09.560546',555.1,1),(175,'2023-02-12 11:55:14.760626','2023-02-12 11:55:14.760626',544.09,1),(176,'2023-02-12 12:01:47.622391','2023-02-12 12:01:47.622391',2.65,1),(177,'2023-02-12 12:01:52.922758','2023-02-12 12:01:52.922758',85.21,1),(178,'2023-02-12 12:01:58.042677','2023-02-12 12:01:58.042677',436.06,1),(179,'2023-02-12 12:03:15.550660','2023-02-12 12:03:15.550660',483.07,1),(180,'2023-02-12 12:03:20.702583','2023-02-12 12:03:20.702583',437.19,1),(181,'2023-02-12 12:04:12.642121','2023-02-12 12:04:12.642121',456.16,1),(182,'2023-02-12 12:10:13.352752','2023-02-12 12:10:13.352752',466.88,1),(183,'2023-02-12 12:10:18.549986','2023-02-12 12:10:18.549986',193.46,1),(184,'2023-02-12 12:10:23.815319','2023-02-12 12:10:23.815319',1.2,1),(185,'2023-02-12 12:12:50.543109','2023-02-12 12:12:50.543109',433.49,1),(186,'2023-02-12 12:12:55.680304','2023-02-12 12:12:55.680304',445.29,1),(187,'2023-02-13 11:56:19.997177','2023-02-13 11:56:19.997177',0.17,1),(188,'2023-02-13 11:56:32.149553','2023-02-13 11:56:32.149553',180.64,1),(189,'2023-02-14 11:30:47.997726','2023-02-14 11:30:47.997726',3.19,1),(190,'2023-02-14 11:32:43.525144','2023-02-14 11:32:43.525144',82.32,1),(191,'2023-02-14 11:33:41.404463','2023-02-14 11:33:41.404463',169.51,1),(192,'2023-02-14 12:59:15.782015','2023-02-14 12:59:15.782015',234.53,1),(193,'2023-02-14 12:59:21.156053','2023-02-14 12:59:21.156053',221.3,1),(194,'2023-02-14 12:59:26.311962','2023-02-14 12:59:26.311962',199.16,1),(195,'2023-02-14 12:59:54.751513','2023-02-14 12:59:54.751513',2.48,1),(196,'2023-02-14 13:00:15.927039','2023-02-14 13:00:15.927039',34.22,1),(197,'2023-02-14 13:00:52.586171','2023-02-14 13:00:52.586171',46.27,1),(198,'2023-02-14 13:02:04.606192','2023-02-14 13:02:04.606192',66.91,1),(199,'2023-02-14 13:02:15.073893','2023-02-14 13:02:15.073893',53.35,1),(200,'2023-02-14 13:02:30.770042','2023-02-14 13:02:30.770042',74.7,1),(201,'2023-02-14 13:02:35.886273','2023-02-14 13:02:35.886273',53.29,1),(202,'2023-02-14 13:02:41.029554','2023-02-14 13:02:41.029554',35.67,1),(203,'2023-02-14 13:02:46.238294','2023-02-14 13:02:46.238294',112.07,1),(204,'2023-02-14 13:02:51.374824','2023-02-14 13:02:51.374824',13.94,1),(205,'2023-02-14 13:03:01.643729','2023-02-14 13:03:01.643729',39.99,1),(206,'2023-02-14 13:03:17.303537','2023-02-14 13:03:17.303537',15.3,1),(207,'2023-02-14 13:03:22.464229','2023-02-14 13:03:22.464229',44.08,1),(208,'2023-02-14 13:03:28.238176','2023-02-14 13:03:28.238176',14.37,1),(209,'2023-02-14 13:03:33.489160','2023-02-14 13:03:33.489160',85.4,1),(210,'2023-02-14 13:03:43.706019','2023-02-14 13:03:43.706019',52.67,1),(211,'2023-02-14 13:05:57.145474','2023-02-14 13:05:57.145474',16.25,1),(212,'2023-02-14 13:06:07.372330','2023-02-14 13:06:07.372330',2.91,1),(213,'2023-02-14 13:06:12.489845','2023-02-14 13:06:12.489845',38.82,1),(214,'2023-02-14 13:07:39.723300','2023-02-14 13:07:39.723300',162.52,1),(215,'2023-02-14 13:08:06.216802','2023-02-14 13:08:06.216802',174.69,1),(216,'2023-02-14 13:09:47.574372','2023-02-14 13:09:47.574372',47.79,1),(217,'2023-02-14 13:10:13.112674','2023-02-14 13:10:13.112674',243.44,1),(218,'2023-02-14 13:10:59.085568','2023-02-14 13:10:59.085568',255.17,1),(219,'2023-02-14 13:12:46.957314','2023-02-14 13:12:46.957314',244.9,1),(220,'2023-02-15 11:04:36.377365','2023-02-15 11:04:36.377365',0.03,1),(221,'2023-02-15 11:05:02.182198','2023-02-15 11:05:02.182198',264.02,1),(222,'2023-02-15 11:05:07.305867','2023-02-15 11:05:07.305867',569.26,1),(226,'2023-02-16 08:50:38.264495','2023-02-16 08:50:38.264495',0.2,1),(227,'2023-02-16 08:50:49.737557','2023-02-16 08:50:49.737557',155.1,1),(228,'2023-02-16 11:32:06.712365','2023-02-16 11:32:06.712365',2.01,1),(229,'2023-02-15 00:00:00.119000','2023-02-16 11:34:06.119507',323.169,2),(230,'2023-02-15 01:25:00.398000','2023-02-16 11:34:11.398785',297.55,2),(231,'2023-02-15 01:35:00.918000','2023-02-16 11:34:14.918373',234.202,2),(232,'2023-02-15 02:37:18.103000','2023-02-16 11:34:18.103196',193.204,2),(233,'2023-02-15 05:34:21.195000','2023-02-16 11:34:21.195389',432.139,2),(234,'2023-02-15 05:57:26.649000','2023-02-16 11:34:26.649417',393.213,2),(235,'2023-02-15 06:23:30.308000','2023-02-16 11:34:30.308960',350.421,2),(236,'2023-02-15 06:39:33.584000','2023-02-16 11:34:33.584110',310.123,2),(237,'2023-02-15 07:23:37.013000','2023-02-16 11:34:37.013304',280.124,2),(238,'2023-02-15 07:56:40.741000','2023-02-16 11:34:40.741631',227.123,2),(239,'2023-02-15 08:34:44.608000','2023-02-16 11:34:44.608785',543.235,2),(240,'2023-02-15 09:02:48.148000','2023-02-16 11:34:48.148333',503.123,2),(241,'2023-02-15 09:12:52.820000','2023-02-16 11:34:52.820712',403.123,2),(242,'2023-02-15 09:55:30.384000','2023-02-16 11:40:30.384954',372.159,2),(243,'2023-02-15 10:21:33.926000','2023-02-16 11:40:33.926026',674.139,2),(244,'2023-02-15 11:25:37.390000','2023-02-16 11:40:37.390400',634.12,2),(245,'2023-02-15 12:35:40.556000','2023-02-16 11:40:40.556304',600.393,2),(246,'2023-02-15 13:53:53.095000','2023-02-16 11:40:53.095666',764.16,2),(247,'2023-02-15 14:43:07.679000','2023-02-16 11:41:07.679965',730.13,2),(248,'2023-02-15 16:23:12.529000','2023-02-16 11:41:12.529293',696.195,2),(249,'2023-02-15 17:23:16.355000','2023-02-16 11:41:16.355187',624.598,2),(250,'2023-02-15 18:33:19.475000','2023-02-16 11:41:19.475085',584.103,2),(251,'2023-02-15 18:53:22.750000','2023-02-16 11:41:22.750141',545.104,2),(252,'2023-02-15 19:34:26.154000','2023-02-16 11:41:26.154096',512.395,2),(253,'2023-02-15 19:54:29.733000','2023-02-16 11:41:29.733824',487.392,2),(254,'2023-02-16 12:49:38.067466','2023-02-16 12:49:38.067466',27.37,1),(255,'2023-02-16 12:50:09.172200','2023-02-16 12:50:09.172200',178.47,1),(256,'2023-02-16 12:50:14.437759','2023-02-16 12:50:14.437759',192.45,1),(257,'2023-02-16 12:50:19.757036','2023-02-16 12:50:19.757036',179.16,1),(258,'2023-02-16 12:50:30.471880','2023-02-16 12:50:30.471880',270.63,1),(259,'2023-02-16 12:50:35.787602','2023-02-16 12:50:35.787602',177.5,1),(260,'2023-02-16 12:50:56.903319','2023-02-16 12:50:56.903319',187.74,1),(261,'2023-02-16 12:51:34.356197','2023-02-16 12:51:34.356197',168.41,1),(262,'2023-02-16 12:52:00.586720','2023-02-16 12:52:00.586720',186.97,1),(263,'2023-02-16 12:52:05.901587','2023-02-16 12:52:05.901587',239.86,1),(264,'2023-02-16 12:52:11.215839','2023-02-16 12:52:11.215839',257.19,1),(265,'2023-02-16 12:52:16.559401','2023-02-16 12:52:16.559401',218.97,1),(266,'2023-02-16 12:52:21.671772','2023-02-16 12:52:21.671772',251.15,1),(267,'2023-02-16 12:52:27.002144','2023-02-16 12:52:27.002144',177.31,1),(268,'2023-02-16 12:52:37.216874','2023-02-16 12:52:37.216874',167.14,1),(269,'2023-02-16 12:53:08.767286','2023-02-16 12:53:08.767286',193.11,1),(270,'2023-02-16 12:53:40.313219','2023-02-16 12:53:40.313219',215.76,1),(271,'2023-02-16 12:54:01.412158','2023-02-16 12:54:01.412158',195.97,1),(272,'2023-02-16 12:54:12.261026','2023-02-16 12:54:12.261026',231.56,1),(273,'2023-02-16 12:54:17.376056','2023-02-16 12:54:17.376056',192.57,1),(274,'2023-02-16 12:54:38.888062','2023-02-16 12:54:38.888062',181.24,1),(275,'2023-02-16 12:54:49.771799','2023-02-16 12:54:49.771799',192.42,1),(276,'2023-02-16 12:55:00.397980','2023-02-16 12:55:00.397980',182.23,1),(277,'2023-02-16 12:55:11.362250','2023-02-16 12:55:11.362250',193.64,1),(278,'2023-02-16 12:55:16.567237','2023-02-16 12:55:16.567237',176.6,1),(279,'2023-02-16 12:56:09.607658','2023-02-16 12:56:09.607658',194.01,1),(280,'2023-02-16 12:56:15.060968','2023-02-16 12:56:15.060968',166.39,1),(281,'2023-02-16 12:56:20.407835','2023-02-16 12:56:20.407835',178.74,1),(282,'2023-02-16 12:56:25.791418','2023-02-16 12:56:25.791418',167.99,1),(283,'2023-02-16 12:56:31.130724','2023-02-16 12:56:31.130724',178.48,1),(284,'2023-02-16 12:56:42.240757','2023-02-16 12:56:42.240757',168.13,1),(285,'2023-02-16 12:56:52.727479','2023-02-16 12:56:52.727479',222.86,1),(286,'2023-02-16 12:56:57.831142','2023-02-16 12:56:57.831142',164.63,1),(287,'2023-02-16 12:57:08.086754','2023-02-16 12:57:08.086754',182.33,1),(288,'2023-02-16 12:57:13.346373','2023-02-16 12:57:13.346373',164.39,1),(289,'2023-02-16 12:57:18.452485','2023-02-16 12:57:18.452485',178.7,1),(290,'2023-02-16 12:57:23.752632','2023-02-16 12:57:23.752632',164.05,1),(291,'2023-02-16 12:57:55.486167','2023-02-16 12:57:55.486167',174.06,1),(292,'2023-02-16 12:58:00.826212','2023-02-16 12:58:00.826212',194.08,1),(293,'2023-02-16 12:58:06.157831','2023-02-16 12:58:06.157831',164.13,1),(294,'2023-02-16 12:58:11.781184','2023-02-16 12:58:11.781184',175.13,1),(295,'2023-02-16 12:58:17.007130','2023-02-16 12:58:17.007130',162.93,1),(296,'2023-02-16 13:02:28.282405','2023-02-16 13:02:28.282405',176.43,1),(297,'2023-02-16 13:03:47.225857','2023-02-16 13:03:47.225857',93.94,1),(298,'2023-02-15 20:43:39.169000','2023-02-16 15:00:39.169353',432.126,2),(299,'2023-02-15 21:23:43.538000','2023-02-16 15:00:43.538581',400.129,2),(300,'2023-02-15 22:14:47.113000','2023-02-16 15:00:47.113966',350.392,2),(301,'2023-02-15 22:56:51.003000','2023-02-16 15:00:51.003209',300.395,2),(302,'2023-02-15 23:34:54.680000','2023-02-16 15:00:54.680443',203.128,2),(303,'2023-02-15 16:23:54.212000','2023-02-16 15:11:54.212172',600,3),(304,'2023-02-15 17:54:57.287000','2023-02-16 15:11:57.287146',550,3),(305,'2023-02-15 19:25:00.284000','2023-02-16 15:12:00.284395',500,3),(306,'2023-02-15 21:21:03.150000','2023-02-16 15:12:03.150205',400,3),(307,'2023-02-15 22:35:06.441000','2023-02-16 15:12:06.441272',350,3),(308,'2023-02-15 23:23:09.465000','2023-02-16 15:12:09.465236',300,3),(309,'2023-02-15 00:30:17.290000','2023-02-16 15:14:17.290730',550,4),(310,'2023-02-15 07:35:22.222000','2023-02-16 15:14:22.222297',789.54,4),(311,'2023-02-15 01:16:21.770000','2023-02-16 15:16:21.770039',300,5),(312,'2023-02-15 02:32:26.839000','2023-02-16 15:16:26.839110',254.32,5),(313,'2023-02-15 06:34:30.654000','2023-02-16 15:16:30.654986',201.32,5),(314,'2023-02-15 07:21:34.455000','2023-02-16 15:16:34.455607',134.65,5),(315,'2023-02-15 08:12:39.624000','2023-02-16 15:16:39.624144',85.32,5),(316,'2023-02-15 09:46:45.007000','2023-02-16 15:16:45.007100',45.32,5),(317,'2023-02-16 17:21:06.679795','2023-02-16 17:21:06.679795',42.87,15);
/*!40000 ALTER TABLE `dish_food_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish_gps_log`
--

DROP TABLE IF EXISTS `dish_gps_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish_gps_log` (
  `dish_gps_log_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `after_lat` double DEFAULT NULL,
  `after_lon` double DEFAULT NULL,
  `before_lat` double DEFAULT NULL,
  `before_lon` double DEFAULT NULL,
  `dish_id` bigint DEFAULT NULL,
  PRIMARY KEY (`dish_gps_log_id`),
  KEY `FK6iq9ue64xt64428fdj5okpef1` (`dish_id`),
  CONSTRAINT `FK6iq9ue64xt64428fdj5okpef1` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish_gps_log`
--

LOCK TABLES `dish_gps_log` WRITE;
/*!40000 ALTER TABLE `dish_gps_log` DISABLE KEYS */;
INSERT INTO `dish_gps_log` VALUES (1,'2023-02-09 14:57:43.607625','2023-02-09 14:57:43.607625',35.092569,128.852895,0,0,3),(2,'2023-02-09 14:57:43.927211','2023-02-09 14:57:43.927211',35.091209,128.852924,0,0,4),(3,'2023-02-09 14:57:44.050302','2023-02-09 14:57:44.050302',35.091201,128.853977,0,0,5),(4,'2023-02-10 13:55:20.500360','2023-02-10 13:55:20.500360',35.095569,128.852895,0,0,7),(5,'2023-02-12 16:15:59.977609','2023-02-12 16:15:59.977609',35.1,221.85,35.254396628733474,128.6276218428684,1),(6,'2023-02-12 16:18:00.426251','2023-02-12 16:18:00.426251',0,0,35.1,221.85,1),(7,'2023-02-12 23:01:37.915916','2023-02-12 23:01:37.915916',128.8528886904431,35.092653499790075,0,0,1),(8,'2023-02-12 23:01:58.351098','2023-02-12 23:01:58.351098',128.8548886904431,35.092653499790075,128.8528886904431,35.092653499790075,1),(9,'2023-02-12 23:03:38.920598','2023-02-12 23:03:38.920598',35.09116651697367,128.85288793793802,128.8548886904431,35.092653499790075,1),(10,'2023-02-12 23:03:45.279169','2023-02-12 23:03:45.279169',35.09116651697367,128.85388793793803,35.09116651697367,128.85288793793802,1),(11,'2023-02-14 11:25:59.009293','2023-02-14 11:25:59.009293',25.2312321,35.1232,35.09116651697367,128.85388793793803,1),(12,'2023-02-14 11:26:18.793110','2023-02-14 11:26:18.793110',125.2312321,35.1232,25.2312321,35.1232,1),(13,'2023-02-14 11:26:38.520022','2023-02-14 11:26:38.520022',128.85388793793803,35.1232,125.2312321,35.1232,1),(14,'2023-02-14 11:26:48.283328','2023-02-14 11:26:48.283328',128.85388793793803,35.09116651697367,128.85388793793803,35.1232,1),(15,'2023-02-14 11:27:24.724189','2023-02-14 11:27:24.724189',128.85388793793803,35.092653499790075,128.85388793793803,35.09116651697367,1),(16,'2023-02-14 13:55:15.569530','2023-02-14 13:55:15.569530',25.09156651697367,28.8548886904431,128.85388793793803,35.092653499790075,1),(17,'2023-02-14 13:56:12.628622','2023-02-14 13:56:12.628622',35.09156651697367,128.8548886904431,25.09156651697367,28.8548886904431,1),(18,'2023-02-14 13:58:51.672206','2023-02-14 13:58:51.672206',128.8558886904431,35.09156651697367,35.09156651697367,128.8548886904431,1),(19,'2023-02-14 13:59:05.367982','2023-02-14 13:59:05.367982',128.8548886904431,35.09156651697367,128.8558886904431,35.09156651697367,1),(20,'2023-02-14 14:06:50.032635','2023-02-14 14:06:50.032635',25.092653499790075,28.8538886904431,128.8548886904431,35.09156651697367,1),(21,'2023-02-14 14:07:13.863010','2023-02-14 14:07:13.863010',25.092653499790075,35.092653499790075,25.092653499790075,28.8538886904431,1),(22,'2023-02-14 14:08:06.294226','2023-02-14 14:08:06.294226',35.092653499790075,35.092653499790075,25.092653499790075,35.092653499790075,1),(23,'2023-02-14 14:08:11.327868','2023-02-14 14:08:11.327868',35.092653499790075,125.09265349979007,35.092653499790075,35.092653499790075,1),(24,'2023-02-14 15:21:13.053257','2023-02-14 15:21:13.053257',35.09156651697367,128.8548886904431,35.092653499790075,125.09265349979007,1);
/*!40000 ALTER TABLE `dish_gps_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish_history`
--

DROP TABLE IF EXISTS `dish_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish_history` (
  `dish_history_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `writer_id` bigint DEFAULT NULL,
  `dish_id` bigint DEFAULT NULL,
  PRIMARY KEY (`dish_history_id`),
  KEY `FK9u76g3pneot4yws867fpgmajy` (`writer_id`),
  KEY `FKlly0ernpjm7vryw23ykjv8yp6` (`dish_id`),
  CONSTRAINT `FK9u76g3pneot4yws867fpgmajy` FOREIGN KEY (`writer_id`) REFERENCES `admin` (`id`),
  CONSTRAINT `FKlly0ernpjm7vryw23ykjv8yp6` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish_history`
--

LOCK TABLES `dish_history` WRITE;
/*!40000 ALTER TABLE `dish_history` DISABLE KEYS */;
INSERT INTO `dish_history` VALUES (1,'2023-02-09 15:32:26.255514','2023-02-09 15:32:26.255514','정상적으로 설치 완료',0,2,5),(2,'2023-02-13 09:53:28.273816','2023-02-13 09:53:28.273816','새벽마다 물을마심',0,1,2),(3,'2023-02-14 15:58:30.716434','2023-02-14 15:58:30.716434','고양이가 방문을 안합니다.',1,2,4),(4,'2023-02-14 16:08:13.048879','2023-02-14 16:08:13.048879','상태 이상 없습니다',0,2,4),(5,'2023-02-15 08:45:43.317252','2023-02-15 08:45:43.317252','2/15 아침 상태 양호합니다.',0,2,3),(6,'2023-02-15 10:34:08.868816','2023-02-15 10:34:08.868816','그릇 세척이 필요해보임',1,8,1),(7,'2023-02-15 22:33:11.240472','2023-02-15 22:33:11.240472','상태 정상입니다 !',0,2,10),(8,'2023-02-15 23:55:43.669707','2023-02-15 23:55:43.669707','바람에 살짝 뒤집혔음',2,2,5),(9,'2023-02-16 16:28:47.938471','2023-02-16 16:28:47.938471','밥그릇 세척 필요',1,1,14),(10,'2023-02-16 16:29:32.468480','2023-02-16 16:29:32.468480','다이어트 필요함',2,1,2),(11,'2023-02-16 21:21:38.352563','2023-02-16 21:21:38.352563','잘지내요',0,1,2);
/*!40000 ALTER TABLE `dish_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish_like`
--

DROP TABLE IF EXISTS `dish_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish_like` (
  `dish_like_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `dish_id` bigint DEFAULT NULL,
  `user_account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`dish_like_id`),
  KEY `FKmjlqpe0tkgb2pr62puvwddpp9` (`dish_id`),
  KEY `FKsg8g1njaos76umfpamh1uac96` (`user_account_id`),
  CONSTRAINT `FKmjlqpe0tkgb2pr62puvwddpp9` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`),
  CONSTRAINT `FKsg8g1njaos76umfpamh1uac96` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish_like`
--

LOCK TABLES `dish_like` WRITE;
/*!40000 ALTER TABLE `dish_like` DISABLE KEYS */;
INSERT INTO `dish_like` VALUES (16,'2023-02-10 00:59:42.164969','2023-02-10 00:59:42.164969',NULL,1,6),(17,'2023-02-10 01:16:09.104882','2023-02-10 01:16:09.104882',NULL,3,6),(19,'2023-02-10 02:00:48.112691','2023-02-10 02:00:48.112691',NULL,3,1),(21,'2023-02-10 02:01:37.539487','2023-02-10 02:01:37.539487',NULL,3,2),(23,'2023-02-10 02:02:45.576029','2023-02-10 02:02:45.576029',NULL,1,2),(25,'2023-02-10 02:03:56.801311','2023-02-10 02:03:56.801311',NULL,1,10),(26,'2023-02-10 02:04:33.720074','2023-02-10 02:04:33.720074',NULL,2,10),(28,'2023-02-10 11:39:23.855290','2023-02-10 11:39:23.855290',NULL,1,3),(30,'2023-02-10 11:40:37.325222','2023-02-10 11:40:37.325222',NULL,3,11),(32,'2023-02-10 12:18:39.435293','2023-02-10 12:18:39.435293',NULL,3,9),(37,'2023-02-13 14:22:22.618307','2023-02-13 14:22:22.618307',NULL,3,12),(39,'2023-02-13 14:24:14.770510','2023-02-13 14:24:14.770510',NULL,2,12),(40,'2023-02-13 14:26:00.560799','2023-02-13 14:26:00.560799',NULL,5,12),(41,'2023-02-13 14:26:26.292146','2023-02-13 14:26:26.292146',NULL,1,12),(44,'2023-02-13 17:27:48.817254','2023-02-13 17:27:48.817254',NULL,3,7),(45,'2023-02-13 17:36:51.093487','2023-02-13 17:36:51.093487',NULL,3,14),(46,'2023-02-14 11:36:39.434450','2023-02-14 11:36:39.434450',NULL,4,2),(49,'2023-02-14 17:54:21.501495','2023-02-14 17:54:21.501495',NULL,1,11),(52,'2023-02-16 13:27:35.430191','2023-02-16 13:27:35.430191',NULL,1,14),(54,'2023-02-16 14:04:02.087948','2023-02-16 14:04:02.087948',NULL,2,17),(55,'2023-02-16 16:25:06.905471','2023-02-16 16:25:06.905471',NULL,14,3),(58,'2023-02-16 18:21:24.087775','2023-02-16 18:21:24.087775',NULL,1,5),(61,'2023-02-17 08:57:24.719450','2023-02-17 08:57:24.719450',NULL,1,8);
/*!40000 ALTER TABLE `dish_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital` (
  `hospital_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `hospital_phone` varchar(255) DEFAULT NULL,
  `hospital_state` int DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  PRIMARY KEY (`hospital_id`),
  KEY `FKnojga5r42b4w6083qd875iuup` (`group_id`),
  CONSTRAINT `FKnojga5r42b4w6083qd875iuup` FOREIGN KEY (`group_id`) REFERENCES `admin_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital`
--

LOCK TABLES `hospital` WRITE;
/*!40000 ALTER TABLE `hospital` DISABLE KEYS */;
INSERT INTO `hospital` VALUES (1,'2023-02-10 11:45:46.660925','2023-02-13 15:17:29.130804','부산 강서구 명지오션시티4로 69','해옴동물병원','051-271-8119',1,35.0827790122621,128.903938421158,1),(2,'2023-02-13 15:16:42.394862','2023-02-13 15:16:42.394862','부산 강서구 명지오션시티11로 66','오션시티동물병원','051-271-7582',0,35.0840317240018,128.903149444771,1),(6,'2023-02-16 16:32:15.100676','2023-02-16 16:32:15.100676','부산 강서구 녹산산단321로 24-8','녹산 갑을병원','010-7518-7531',0,35.0905660398253,128.853312491062,1);
/*!40000 ALTER TABLE `hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iotcat_img`
--

DROP TABLE IF EXISTS `iotcat_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iotcat_img` (
  `iot_cat_img` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `is_hungry` bit(1) DEFAULT NULL,
  `dish_id` bigint NOT NULL,
  PRIMARY KEY (`iot_cat_img`),
  KEY `FKl5x7ma5i4hrjut3qrvigtf6gf` (`dish_id`),
  CONSTRAINT `FKl5x7ma5i4hrjut3qrvigtf6gf` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=587 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iotcat_img`
--

LOCK TABLES `iotcat_img` WRITE;
/*!40000 ALTER TABLE `iotcat_img` DISABLE KEYS */;
INSERT INTO `iotcat_img` VALUES (5,'2023-02-09 13:01:49.179863','2023-02-09 13:01:49.179863','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1384711c-2b47-4874-96d1-32ba00088691.jpeg',_binary '\0',2),(6,'2023-02-09 13:01:59.258150','2023-02-09 13:01:59.258150','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d1809695-86ce-4bde-bb19-0be02f5f0010.jpeg',_binary '',2),(7,'2023-02-09 13:02:09.320094','2023-02-09 13:02:09.320094','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/bc7c22f6-e6d8-48e9-949a-676935631868.jpeg',_binary '',2),(8,'2023-02-10 01:25:57.392578','2023-02-10 01:25:57.392578','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e2ac0312-7e0d-4694-ac23-ae075a9a201b.jpeg',_binary '\0',1),(9,'2023-02-10 12:03:13.854637','2023-02-10 12:03:13.854637','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1528f2df-6335-4834-82c2-817632d545b3.jpeg',_binary '\0',1),(10,'2023-02-11 15:07:54.700554','2023-02-11 15:07:54.700554','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9cf061ea-6cfc-4430-bde4-98f3cb558538.jpeg',_binary '\0',2),(11,'2023-02-11 15:14:14.138889','2023-02-11 15:14:14.138889','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7150d6e1-f808-412d-8dc3-ebc4214e94ad.jpeg',_binary '\0',2),(12,'2023-02-11 15:27:43.884864','2023-02-11 15:27:43.884864','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/86d5945e-0fe8-4713-80d5-2987bc0975cd.jpeg',_binary '\0',2),(13,'2023-02-11 15:28:33.734600','2023-02-11 15:28:33.734600','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4e44807d-1179-4b18-b996-b59eb11f449f.jpeg',_binary '\0',2),(14,'2023-02-11 15:28:43.477548','2023-02-11 15:28:43.477548','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f8ed2901-8edd-43f3-a090-689b416ff73f.jpeg',_binary '\0',2),(15,'2023-02-11 15:28:53.721894','2023-02-11 15:28:53.721894','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/19f48de8-accc-4af9-9727-11085c2a0844.jpeg',_binary '\0',2),(16,'2023-02-11 15:29:23.721519','2023-02-11 15:29:23.721519','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ffff1edb-9074-4abe-962c-deb2390e8494.jpeg',_binary '\0',2),(17,'2023-02-11 15:29:33.553808','2023-02-11 15:29:33.553808','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6cf576b7-7768-4b19-94ea-5752e37ac9cc.jpeg',_binary '\0',2),(18,'2023-02-11 15:29:53.540590','2023-02-11 15:29:53.540590','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/20b5782d-546e-4be4-b5df-6be9904b6d1a.jpeg',_binary '\0',2),(19,'2023-02-11 15:30:23.629304','2023-02-11 15:30:23.629304','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f246f73f-d9c2-45d3-8529-5ad888aedcbb.jpeg',_binary '\0',2),(20,'2023-02-11 15:30:53.705392','2023-02-11 15:30:53.705392','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/00310990-dba8-4ed8-acdb-22a2fc2a594f.jpeg',_binary '\0',2),(21,'2023-02-11 15:32:03.542333','2023-02-11 15:32:03.542333','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7174869c-7774-41c4-a33d-2f30557ed084.jpeg',_binary '\0',2),(22,'2023-02-11 15:32:13.726830','2023-02-11 15:32:13.726830','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/a71c4e5e-08af-4acb-b44c-5ea2204da301.jpeg',_binary '\0',2),(23,'2023-02-11 15:32:53.500932','2023-02-11 15:32:53.500932','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e203ecd5-e5c1-4366-9c6a-f438a55502df.jpeg',_binary '\0',2),(24,'2023-02-11 15:34:03.605872','2023-02-11 15:34:03.605872','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d22d82ba-6c78-45a5-b314-71dda977a44e.jpeg',_binary '\0',2),(25,'2023-02-11 15:34:33.485486','2023-02-11 15:34:33.485486','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b47b0789-5089-4fef-9637-48c2144545b6.jpeg',_binary '\0',2),(26,'2023-02-11 15:49:43.424380','2023-02-11 15:49:43.424380','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/80d5d18d-d106-4cca-8422-a97448b50c09.jpeg',_binary '',2),(27,'2023-02-11 15:49:53.560720','2023-02-11 15:49:53.560720','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b79506d6-87b6-4981-9e9f-b21ad5a33540.jpeg',_binary '\0',2),(29,'2023-02-11 15:50:53.227008','2023-02-11 15:50:53.227008','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/51fd4b7f-f0ac-4e21-9eac-644d3738a74e.jpeg',_binary '\0',2),(31,'2023-02-11 16:40:04.442855','2023-02-11 16:40:04.442855','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b8278ebb-c120-49b4-9a82-ae38e59f4d6a.jpeg',_binary '\0',2),(32,'2023-02-11 16:46:04.559890','2023-02-11 16:46:04.559890','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/af119e6d-731c-429f-90e2-4c9df04d0e07.jpeg',_binary '\0',2),(34,'2023-02-11 18:47:54.609381','2023-02-11 18:47:54.609381','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/172cc6f6-a715-4621-bbe5-60392a9aa713.jpeg',_binary '\0',2),(37,'2023-02-11 18:48:24.563303','2023-02-11 18:48:24.563303','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c0d6be32-d3ac-4151-8dac-5eaddf582da7.jpeg',_binary '\0',2),(38,'2023-02-11 18:48:34.735239','2023-02-11 18:48:34.735239','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/96df7a9a-322c-449f-8c30-00a13d2bfbee.jpeg',_binary '\0',2),(39,'2023-02-11 18:48:44.677020','2023-02-11 18:48:44.677020','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4118de3b-ef9c-45cd-9e66-12dbd74ddb62.jpeg',_binary '\0',2),(40,'2023-02-11 18:48:54.645349','2023-02-11 18:48:54.645349','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9f08f7c5-3017-4e9f-b902-9a104c726f08.jpeg',_binary '\0',2),(41,'2023-02-11 18:49:04.423372','2023-02-11 18:49:04.423372','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/66f57d98-4c19-4ba7-8f8c-3fc5d9aa2374.jpeg',_binary '\0',2),(43,'2023-02-11 18:49:54.640960','2023-02-11 18:49:54.640960','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/886dfa4e-b615-4eef-a80c-2de95398c5c6.jpeg',_binary '',2),(44,'2023-02-11 18:50:54.643420','2023-02-11 18:50:54.643420','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/88f505c9-d37a-4f14-9325-d9d198619e69.jpeg',_binary '\0',2),(45,'2023-02-11 19:33:07.455092','2023-02-11 19:33:07.455092','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3704a336-a495-4728-a6d6-54b2e5cdff59.jpeg',_binary '\0',2),(46,'2023-02-11 19:33:16.932417','2023-02-11 19:33:16.932417','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/68349b93-773f-4bb4-97e8-3a6cdadc0b83.jpeg',_binary '\0',2),(47,'2023-02-11 19:33:27.455920','2023-02-11 19:33:27.455920','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/fc261433-4952-454a-99c4-337790b27f86.jpeg',_binary '\0',2),(50,'2023-02-11 19:33:57.342404','2023-02-11 19:33:57.342404','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/27a2f667-9483-4a89-9291-1059c9e0efef.jpeg',_binary '\0',2),(51,'2023-02-11 19:37:37.202452','2023-02-11 19:37:37.202452','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3d2ca07f-7e06-4e01-b412-bdd37f1e3320.jpeg',_binary '\0',2),(53,'2023-02-11 19:38:46.895191','2023-02-11 19:38:46.895191','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4715e8ee-82d4-4d95-9ac7-3863648c8044.jpeg',_binary '\0',2),(54,'2023-02-11 19:38:57.078274','2023-02-11 19:38:57.078274','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/0e4162b2-c951-4c92-991d-2b40ae0b1a73.jpeg',_binary '\0',2),(55,'2023-02-11 19:39:27.163318','2023-02-11 19:39:27.163318','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/08e19694-d95f-4d5d-b819-6eaee617fc8a.jpeg',_binary '',2),(56,'2023-02-11 19:39:47.264411','2023-02-11 19:39:47.264411','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7c5b3879-9f8f-4ae0-8e6f-160b87b3dcb3.jpeg',_binary '\0',2),(57,'2023-02-11 19:40:46.848228','2023-02-11 19:40:46.848228','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b532c961-9df7-4f58-8396-4965cf821b80.jpeg',_binary '\0',2),(59,'2023-02-11 19:41:26.958336','2023-02-11 19:41:26.958336','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/05221dc6-1d7f-4b40-aa36-4063411a0657.jpeg',_binary '\0',2),(60,'2023-02-11 19:46:37.437450','2023-02-11 19:46:37.437450','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f9b66b75-3197-4249-b393-53f17f5253e3.jpeg',_binary '\0',2),(61,'2023-02-11 19:49:17.383032','2023-02-11 19:49:17.383032','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ab62bb8e-c7e7-4e90-95ba-d8fe2de16d81.jpeg',_binary '\0',2),(62,'2023-02-11 20:02:27.125813','2023-02-11 20:02:27.125813','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c345a490-29f2-4578-96db-5f420625ee28.jpeg',_binary '\0',2),(63,'2023-02-11 20:03:56.966937','2023-02-11 20:03:56.966937','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/69d02a11-393c-4fa4-a233-83587bbade7d.jpeg',_binary '\0',2),(64,'2023-02-11 20:13:07.261483','2023-02-11 20:13:07.261483','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/40427bd1-fc78-4e02-acef-1d62519746de.jpeg',_binary '\0',2),(65,'2023-02-11 20:21:16.952860','2023-02-11 20:21:16.952860','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5b25790d-a5c2-4b90-9ba0-f1f7ee681917.jpeg',_binary '\0',2),(66,'2023-02-11 20:45:37.248491','2023-02-11 20:45:37.248491','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c79c419a-ac8e-4df2-8a11-bc0b182966b7.jpeg',_binary '\0',2),(67,'2023-02-11 20:45:47.239253','2023-02-11 20:45:47.239253','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/bd1f732b-fc3e-4b74-9dd4-4017ec30a5d6.jpeg',_binary '\0',2),(68,'2023-02-11 20:49:27.115852','2023-02-11 20:49:27.115852','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2dab120f-78df-48c5-ba1e-da9c5d9b6dd8.jpeg',_binary '\0',2),(69,'2023-02-11 20:50:07.433868','2023-02-11 20:50:07.433868','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/98ae1d19-d5e4-4194-9e37-9398590569b6.jpeg',_binary '\0',2),(70,'2023-02-12 03:54:36.582213','2023-02-12 03:54:36.582213','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/283f2ccb-be88-4b7d-a69f-cd27433a9d10.jpeg',_binary '\0',2),(71,'2023-02-12 03:55:06.660710','2023-02-12 03:55:06.660710','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1971e88f-00a1-4945-b1d2-bfd01d533214.jpeg',_binary '\0',2),(72,'2023-02-12 03:55:16.750766','2023-02-12 03:55:16.750766','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/17a5c478-30c6-4c38-bb84-4716aaacf61a.jpeg',_binary '\0',2),(73,'2023-02-12 03:55:46.683959','2023-02-12 03:55:46.683959','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e2fb7e4e-dfea-4b25-ad3d-c9a91601f135.jpeg',_binary '\0',2),(74,'2023-02-12 03:56:06.611411','2023-02-12 03:56:06.611411','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b637d714-183b-43ee-ad1e-920a03e4eaad.jpeg',_binary '\0',2),(75,'2023-02-12 04:01:26.492550','2023-02-12 04:01:26.492550','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ea381b30-d7d8-4245-bf3d-400aadb7185b.jpeg',_binary '\0',2),(76,'2023-02-12 04:02:26.638541','2023-02-12 04:02:26.638541','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/007379a0-f58d-450a-a114-5247fd514947.jpeg',_binary '\0',2),(77,'2023-02-12 04:31:46.342832','2023-02-12 04:31:46.342832','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/14ea8115-44a3-4431-969a-69b43774092d.jpeg',_binary '\0',2),(81,'2023-02-12 04:32:36.416235','2023-02-12 04:32:36.416235','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b594b732-ca0d-4ba9-9fba-b42ee7bc4e31.jpeg',_binary '\0',2),(83,'2023-02-12 04:33:06.246621','2023-02-12 04:33:06.246621','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e0e55110-c846-492d-96de-612866012fff.jpeg',_binary '\0',2),(84,'2023-02-12 10:50:04.853602','2023-02-12 10:50:04.853602','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/fd9249b6-b145-44d3-a5ba-db2f1c953501.jpeg',_binary '\0',1),(85,'2023-02-12 11:14:46.190529','2023-02-12 11:14:46.190529','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8a21030c-b9fe-4e39-b535-bd79c1ea9bd7.jpeg',_binary '\0',1),(86,'2023-02-12 12:53:50.164356','2023-02-12 12:53:50.164356','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/08d307e8-c08a-4df5-8217-e142a6301ecb.jpeg',_binary '\0',1),(87,'2023-02-12 12:54:09.408598','2023-02-12 12:54:09.408598','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2a5a916d-1b9b-4d50-91aa-430acfe7f399.jpeg',_binary '\0',1),(88,'2023-02-12 12:54:28.562434','2023-02-12 12:54:28.562434','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ca1d0367-b85c-4be3-993f-e1193c523ae1.jpeg',_binary '\0',1),(89,'2023-02-12 12:54:47.299036','2023-02-12 12:54:47.299036','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c4086623-2b4e-4841-a58d-6dce13206c1a.jpeg',_binary '\0',1),(90,'2023-02-12 12:55:14.237290','2023-02-12 12:55:14.237290','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f8ec53a4-1faa-40fb-9875-6e480e4eca4b.jpeg',_binary '\0',1),(91,'2023-02-12 12:56:18.190401','2023-02-12 12:56:18.190401','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b9f4a0db-0d1d-44f5-8bb2-047691d8b246.jpeg',_binary '\0',1),(92,'2023-02-12 12:57:18.184186','2023-02-12 12:57:18.184186','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/a1e385a7-0906-476e-8a33-0c6328ef3192.jpeg',_binary '\0',1),(93,'2023-02-12 12:57:36.792785','2023-02-12 12:57:36.792785','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6330d557-6f4b-47d7-a7d9-a7677debddba.jpeg',_binary '\0',1),(94,'2023-02-12 12:57:55.811361','2023-02-12 12:57:55.811361','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/63c72370-f896-4c50-817a-54beb2d0597c.jpeg',_binary '\0',1),(95,'2023-02-12 12:58:15.516783','2023-02-12 12:58:15.516783','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/cec3bf3b-1de3-40a6-b6d0-5e53680ec81e.jpeg',_binary '\0',1),(96,'2023-02-12 17:20:02.834254','2023-02-12 17:20:02.834254','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8935f042-d42c-4747-846d-f531e5b2769e.jpeg',_binary '\0',2),(99,'2023-02-12 17:21:12.546261','2023-02-12 17:21:12.546261','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7ea5a8b8-096d-4793-a100-df108d7e29c7.jpeg',_binary '\0',2),(101,'2023-02-12 17:21:52.715165','2023-02-12 17:21:52.715165','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/110964b8-ba26-4cf2-b3b8-bc3bbb8eb9c4.jpeg',_binary '\0',2),(102,'2023-02-12 17:22:42.685041','2023-02-12 17:22:42.685041','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/94778560-64e2-44d8-bfb9-0a12d2649f54.jpeg',_binary '\0',2),(103,'2023-02-12 17:23:02.777168','2023-02-12 17:23:02.777168','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b85f0470-87ec-4d98-b01c-f52acf72c224.jpeg',_binary '\0',2),(104,'2023-02-12 17:23:12.412796','2023-02-12 17:23:12.412796','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f1bbc39a-f4ed-4f10-8b0e-47029d9eb9c4.jpeg',_binary '\0',2),(105,'2023-02-12 17:28:33.110459','2023-02-12 17:28:33.110459','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b1d7725c-8ce4-4bff-9cf0-6a4ffb74d4e8.jpeg',_binary '\0',2),(107,'2023-02-12 17:58:34.112449','2023-02-12 17:58:34.112449','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d2795645-e44a-4d18-a1eb-5885537ac5e0.jpeg',_binary '\0',2),(108,'2023-02-12 17:59:13.759564','2023-02-12 17:59:13.759564','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5501224b-2c35-4068-8afe-c4a98ba952d5.jpeg',_binary '\0',2),(116,'2023-02-12 18:00:43.960103','2023-02-12 18:00:43.960103','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/014a4b0f-34f4-4820-a1ea-f3eac029359e.jpeg',_binary '\0',2),(117,'2023-02-12 18:00:53.999348','2023-02-12 18:00:53.999348','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1623d157-2512-4a3f-ac6f-c4897403e7e5.jpeg',_binary '\0',2),(118,'2023-02-12 18:01:03.697000','2023-02-12 18:01:03.697000','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f1e6562e-2a72-4580-a755-4bac64332149.jpeg',_binary '\0',2),(123,'2023-02-12 18:02:24.010408','2023-02-12 18:02:24.010408','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5ecaa304-e78c-4d54-9aef-e035f0125c54.jpeg',_binary '\0',2),(124,'2023-02-12 18:02:33.817050','2023-02-12 18:02:33.817050','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f933cee3-9258-4b2a-a5a6-c5fd12d5f566.jpeg',_binary '\0',2),(129,'2023-02-12 18:03:43.876117','2023-02-12 18:03:43.876117','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/97aee8cf-2f13-43d0-9c61-38062ed6329c.jpeg',_binary '\0',2),(133,'2023-02-12 18:04:33.966599','2023-02-12 18:04:33.966599','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/875259db-2d71-4bf1-a8ef-33a98b8424fa.jpeg',_binary '\0',2),(134,'2023-02-12 19:07:33.767736','2023-02-12 19:07:33.767736','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b87ec300-5db6-4e8a-a5f8-cffa9dc90e13.jpeg',_binary '\0',1),(135,'2023-02-12 19:26:50.085779','2023-02-12 19:26:50.085779','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/acfdc694-b81c-42de-9a61-76ef7743218b.jpeg',_binary '\0',1),(136,'2023-02-12 19:27:07.029041','2023-02-12 19:27:07.029041','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/27850768-7e1e-4c8c-94fe-7f19f3b29efb.jpeg',_binary '\0',1),(137,'2023-02-12 19:42:32.884977','2023-02-12 19:42:32.884977','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3190f1d7-827b-4240-bee4-41c8e16f56f4.jpeg',_binary '\0',1),(139,'2023-02-12 19:43:57.280689','2023-02-12 19:43:57.280689','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/39d35bd4-c9ae-4351-ba49-b487bb58d601.jpeg',_binary '\0',2),(143,'2023-02-12 19:45:00.660758','2023-02-12 19:45:00.660758','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e5ff65fc-e8f9-41c1-963a-e2d8651350f0.jpeg',_binary '\0',2),(146,'2023-02-12 19:45:27.486835','2023-02-12 19:45:27.486835','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9030aabe-5c94-4315-9f15-b45f22a835e4.jpeg',_binary '\0',2),(148,'2023-02-12 19:45:47.512019','2023-02-12 19:45:47.512019','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/17f8be43-b4cc-42d0-b2b9-8a348667d235.jpeg',_binary '\0',2),(149,'2023-02-12 19:45:57.707254','2023-02-12 19:45:57.707254','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f5185e5d-0b0f-4d8d-aa5f-77700c079553.jpeg',_binary '\0',2),(150,'2023-02-12 19:46:07.604669','2023-02-12 19:46:07.604669','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/476272f3-9410-4268-b9e9-6be9fbb5727e.jpeg',_binary '\0',2),(151,'2023-02-12 19:46:17.693036','2023-02-12 19:46:17.693036','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9106cd1b-6d03-47c7-a6a7-6afe5eda696c.jpeg',_binary '\0',2),(152,'2023-02-12 19:46:27.321829','2023-02-12 19:46:27.321829','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8cabde87-eab9-4e65-b670-d5eebff254bf.jpeg',_binary '\0',2),(153,'2023-02-12 20:12:46.879445','2023-02-12 20:12:46.879445','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6a8ad899-af07-4889-8087-54e48df33893.jpeg',_binary '\0',2),(154,'2023-02-12 20:51:26.836590','2023-02-12 20:51:26.836590','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/745f6b87-aa02-4f41-aead-4371d0c649f8.jpeg',_binary '\0',2),(155,'2023-02-12 20:51:36.862094','2023-02-12 20:51:36.862094','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2b4a978b-d171-4e64-b383-3544d3bf0d06.jpeg',_binary '\0',2),(157,'2023-02-13 01:46:59.895049','2023-02-13 01:46:59.895049','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3df6f697-6455-4292-a83a-017b83705150.jpeg',_binary '\0',2),(158,'2023-02-13 01:47:09.726675','2023-02-13 01:47:09.726675','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/53899e84-1f70-4bf3-baf7-d1c1632f5fbe.jpeg',_binary '\0',2),(159,'2023-02-13 01:47:29.551659','2023-02-13 01:47:29.551659','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7aad4eb7-ac6f-44b2-8aec-68222bbf8b41.jpeg',_binary '\0',2),(161,'2023-02-13 04:15:54.385624','2023-02-13 04:15:54.385624','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5e2eccb9-2d2a-4f32-8831-12fcfed2ab78.jpeg',_binary '\0',2),(162,'2023-02-13 04:30:04.741665','2023-02-13 04:30:04.741665','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c905ef84-ff9e-4264-a145-ec953317bdcb.jpeg',_binary '\0',2),(168,'2023-02-13 04:31:34.457837','2023-02-13 04:31:34.457837','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/92661911-9b0f-4668-aec0-bd8e02facb1c.jpeg',_binary '\0',2),(184,'2023-02-13 04:35:34.899765','2023-02-13 04:35:34.899765','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d97904f8-b637-4178-82ea-fa2a7b70f597.jpeg',_binary '\0',2),(186,'2023-02-13 05:30:05.806164','2023-02-13 05:30:05.806164','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/22158208-57a7-4a2c-a453-87ff16ed5e21.jpeg',_binary '\0',2),(187,'2023-02-13 05:30:25.486887','2023-02-13 05:30:25.486887','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e804619e-0feb-4c35-b751-40717d349d1a.jpeg',_binary '\0',2),(188,'2023-02-13 05:30:55.814774','2023-02-13 05:30:55.814774','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5397c9f4-3dbc-40a0-8c26-705d98941bf9.jpeg',_binary '\0',2),(190,'2023-02-13 05:31:15.404577','2023-02-13 05:31:15.404577','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/52d8aaa3-9c9c-48ad-bf60-a197b3a57118.jpeg',_binary '\0',2),(192,'2023-02-13 05:31:45.589718','2023-02-13 05:31:45.589718','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/54d83d53-296e-4181-9a75-c59ecb580d98.jpeg',_binary '\0',2),(193,'2023-02-13 05:31:55.414403','2023-02-13 05:31:55.414403','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/0f29edc3-cd35-4bed-8683-726f0eb64f45.jpeg',_binary '\0',2),(194,'2023-02-13 05:32:05.430724','2023-02-13 05:32:05.430724','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5738eeb9-8ffa-4354-83da-400e140b9811.jpeg',_binary '\0',2),(195,'2023-02-13 05:50:05.388952','2023-02-13 05:50:05.388952','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6484b243-efb3-4b44-9a42-6a4a6c1ef4ac.jpeg',_binary '\0',2),(196,'2023-02-13 05:50:25.876465','2023-02-13 05:50:25.876465','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/44c432f1-936f-4aa6-bf4e-bdf87fe1c7ed.jpeg',_binary '\0',2),(200,'2023-02-13 05:51:05.863740','2023-02-13 05:51:05.863740','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/aa00f0bd-7858-4c78-bb50-3df012ce393b.jpeg',_binary '\0',2),(203,'2023-02-13 06:18:15.572249','2023-02-13 06:18:15.572249','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e38a016f-45c1-4e71-b336-b66786bebc75.jpeg',_binary '\0',2),(204,'2023-02-13 06:18:26.273751','2023-02-13 06:18:26.273751','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6abfd1e9-2d49-4fdc-be74-9fcfe0b68e6a.jpeg',_binary '\0',2),(205,'2023-02-13 06:18:35.820686','2023-02-13 06:18:35.820686','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b38d723c-0cd3-47be-98d1-2c1e123ebe31.jpeg',_binary '\0',2),(206,'2023-02-13 06:18:45.663849','2023-02-13 06:18:45.663849','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9ac55558-5e05-4ab0-b0e1-2b3de04e71c3.jpeg',_binary '\0',2),(207,'2023-02-13 06:18:55.817530','2023-02-13 06:18:55.817530','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/01dd8472-5e4d-4424-9bed-add605f5bc66.jpeg',_binary '\0',2),(208,'2023-02-13 06:19:05.993286','2023-02-13 06:19:05.993286','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/0dd55329-487c-4070-b9a1-21d4a88eb9f6.jpeg',_binary '\0',2),(212,'2023-02-13 06:19:45.869532','2023-02-13 06:19:45.869532','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/988825c6-aa79-4d0b-9c92-ab8e080fdeb7.jpeg',_binary '\0',2),(213,'2023-02-13 06:19:55.945539','2023-02-13 06:19:55.945539','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/20439d66-b43f-4d69-bb26-564746d738cb.jpeg',_binary '\0',2),(214,'2023-02-13 06:20:25.901171','2023-02-13 06:20:25.901171','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/34ca84bd-7a44-4f37-9a33-b38a9ee1bca2.jpeg',_binary '\0',2),(215,'2023-02-13 06:20:35.882791','2023-02-13 06:20:35.882791','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b0199505-97c6-4e1c-b274-352347720c9c.jpeg',_binary '\0',2),(216,'2023-02-13 06:21:26.212676','2023-02-13 06:21:26.212676','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8fa1310e-7f05-435f-8ad8-75c3d1ed3dd6.jpeg',_binary '\0',2),(217,'2023-02-13 06:23:16.130295','2023-02-13 06:23:16.130295','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5c26bdc9-55ce-43bf-b13e-e4fbec34abe4.jpeg',_binary '\0',2),(218,'2023-02-13 07:10:02.412242','2023-02-13 07:10:02.412242','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f569eaf5-b79d-4c17-bcfa-ceddc96ef11e.jpeg',_binary '\0',2),(219,'2023-02-13 07:10:12.458966','2023-02-13 07:10:12.458966','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/70c8aaf1-b15f-4d39-b5b3-efd30001641a.jpeg',_binary '\0',2),(220,'2023-02-13 07:22:22.324577','2023-02-13 07:22:22.324577','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9f106950-2c77-4460-b642-03551f14dcf2.jpeg',_binary '\0',2),(221,'2023-02-13 07:30:42.700895','2023-02-13 07:30:42.700895','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/850d26b7-809d-4ac8-b7e8-d5d93c41d794.jpeg',_binary '\0',2),(228,'2023-02-13 07:31:52.546477','2023-02-13 07:31:52.546477','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5de89f48-e77b-4c2b-9c3f-ad1c238ef36f.jpeg',_binary '\0',2),(230,'2023-02-13 07:32:12.599654','2023-02-13 07:32:12.599654','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6d3f5582-565a-4883-806e-10823c4c3096.jpeg',_binary '\0',2),(231,'2023-02-13 07:32:22.746569','2023-02-13 07:32:22.746569','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/09df819f-97ea-41c2-8c75-be8709bd8925.jpeg',_binary '\0',2),(233,'2023-02-13 07:32:42.711183','2023-02-13 07:32:42.711183','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5f8fc849-8942-434a-a738-ea1f7bea1d76.jpeg',_binary '\0',2),(234,'2023-02-13 07:57:32.348800','2023-02-13 07:57:32.348800','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6771c5db-3133-44ec-8bcc-4236ae498a4d.jpeg',_binary '\0',2),(243,'2023-02-13 07:59:12.762137','2023-02-13 07:59:12.762137','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/0160cea5-b1eb-4d1d-b744-5841d18fbf0e.jpeg',_binary '\0',2),(244,'2023-02-13 07:59:22.545668','2023-02-13 07:59:22.545668','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1bd0a395-18d8-4710-94d1-fb8527267bd9.jpeg',_binary '\0',2),(245,'2023-02-13 07:59:32.482982','2023-02-13 07:59:32.482982','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d3647ed0-5979-4e3e-8b9b-3a9612b0ccd5.jpeg',_binary '\0',2),(246,'2023-02-13 07:59:42.804926','2023-02-13 07:59:42.804926','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/161d4b3f-1d2a-49a4-aa74-56497898bec0.jpeg',_binary '\0',2),(247,'2023-02-13 08:00:22.624031','2023-02-13 08:00:22.624031','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ac45c1a0-f826-440e-8452-81cda7dc12bb.jpeg',_binary '\0',2),(248,'2023-02-13 08:01:22.439339','2023-02-13 08:01:22.439339','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/42b7d8ed-a588-41e4-8e77-f547030abc3a.jpeg',_binary '\0',2),(249,'2023-02-13 08:01:52.450757','2023-02-13 08:01:52.450757','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f290ec69-c323-4501-8106-b1a37293122d.jpeg',_binary '\0',2),(250,'2023-02-13 08:02:02.616578','2023-02-13 08:02:02.616578','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/af695551-222f-4286-b076-b91b7bd1b91f.jpeg',_binary '\0',2),(251,'2023-02-13 08:13:02.353297','2023-02-13 08:13:02.353297','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/68bc617f-7a04-4873-9fdc-6c14e7c61dc0.jpeg',_binary '\0',2),(252,'2023-02-13 08:13:12.554208','2023-02-13 08:13:12.554208','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9b9a631d-f1d0-477d-ba61-f4561e7e70f0.jpeg',_binary '\0',2),(253,'2023-02-13 08:13:22.434129','2023-02-13 08:13:22.434129','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2f199298-c2a0-481d-a0b8-158864427b27.jpeg',_binary '\0',2),(254,'2023-02-13 08:14:22.862398','2023-02-13 08:14:22.862398','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/15625bf1-5245-4e41-bbc9-c227e8b11654.jpeg',_binary '\0',2),(259,'2023-02-13 08:16:12.231884','2023-02-13 08:16:12.231884','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b4eee425-a28a-45c4-9049-b82bef0f3666.jpeg',_binary '\0',2),(260,'2023-02-13 13:40:35.803940','2023-02-13 13:40:35.803940','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/48d5f81e-1a5e-40da-99c5-323ca066b423.jpeg',_binary '\0',2),(265,'2023-02-13 13:44:21.827233','2023-02-13 13:44:21.827233','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/acf72161-1214-4f75-910b-82cbe68a1185.jpeg',_binary '\0',2),(266,'2023-02-13 15:46:02.316941','2023-02-13 15:46:02.316941','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e9b99025-a482-4edd-9256-9fdf5fb87d77.jpeg',_binary '\0',2),(267,'2023-02-13 15:46:41.763733','2023-02-13 15:46:41.763733','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d98210a9-421c-47fc-91fe-f6f11f90de0a.jpeg',_binary '\0',2),(268,'2023-02-13 15:46:51.583318','2023-02-13 15:46:51.583318','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c59eaeff-727f-4efd-9c45-600d639b21b2.jpeg',_binary '\0',2),(269,'2023-02-13 15:47:41.879469','2023-02-13 15:47:41.879469','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/871a1ab1-1e21-4415-9f96-0d7c0a6483d6.jpeg',_binary '\0',2),(270,'2023-02-13 15:47:52.826322','2023-02-13 15:47:52.826322','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9070ed34-ac47-4759-ba34-e8c72c8bc4b4.jpeg',_binary '\0',2),(271,'2023-02-13 15:49:02.053563','2023-02-13 15:49:02.053563','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/dafcd624-2c15-43da-949b-c71199d7213f.jpeg',_binary '\0',2),(272,'2023-02-13 15:49:21.683136','2023-02-13 15:49:21.683136','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/38a1bac8-c1ae-4987-9091-8d2663f39118.jpeg',_binary '\0',2),(275,'2023-02-13 15:49:51.435887','2023-02-13 15:49:51.435887','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9063ddda-c438-4a40-8050-26c20e4ccc28.jpeg',_binary '\0',2),(276,'2023-02-13 15:50:01.715422','2023-02-13 15:50:01.715422','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6e294406-8aba-4bb1-b2c1-c14e0409a95f.jpeg',_binary '\0',2),(277,'2023-02-13 15:51:01.449923','2023-02-13 15:51:01.449923','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/bc9e06e1-1688-4bdb-bd98-68855b3b5fab.jpeg',_binary '\0',2),(279,'2023-02-13 15:51:41.728086','2023-02-13 15:51:41.728086','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7f4d5dad-6114-41a0-bb2e-b7c518775a10.jpeg',_binary '\0',2),(280,'2023-02-13 15:54:41.788796','2023-02-13 15:54:41.788796','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/66fdaeeb-8d55-4d40-923b-74e9fc7aa5df.jpeg',_binary '\0',2),(281,'2023-02-13 16:08:32.348899','2023-02-13 16:08:32.348899','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/fe0d8e6c-47f7-4c1b-820a-49b0421a0db6.jpeg',_binary '\0',2),(282,'2023-02-13 16:43:01.430981','2023-02-13 16:43:01.430981','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f79010f6-fcce-47f2-871d-530eb7972c04.jpeg',_binary '\0',2),(288,'2023-02-13 16:50:49.163515','2023-02-13 16:50:49.163515','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3f96a317-c3c6-41c1-a325-268c3672dda2.jpeg',_binary '\0',2),(289,'2023-02-13 16:51:09.311921','2023-02-13 16:51:09.311921','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/71eee686-c468-497b-9295-4267e1cb163f.jpeg',_binary '\0',2),(291,'2023-02-13 16:52:19.516126','2023-02-13 16:52:19.516126','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7f76f47f-2741-4270-a8d4-e5bc60ed5fc9.jpeg',_binary '\0',2),(292,'2023-02-13 16:56:09.048576','2023-02-13 16:56:09.048576','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8f143d9a-7d9e-4cfc-b0c4-63628e759979.jpeg',_binary '\0',2),(293,'2023-02-13 17:02:09.292828','2023-02-13 17:02:09.292828','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/02bae151-114b-46e2-a615-e33fe9281301.jpeg',_binary '\0',2),(294,'2023-02-13 17:52:09.839208','2023-02-13 17:52:09.839208','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/cd1427c9-92fa-4166-9047-967523230f18.jpeg',_binary '\0',2),(295,'2023-02-13 17:53:29.364824','2023-02-13 17:53:29.364824','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8f1470e4-14ba-4dda-b51d-9f48363820a4.jpeg',_binary '\0',2),(296,'2023-02-13 17:53:39.398626','2023-02-13 17:53:39.398626','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4b728d3d-6819-45b2-81bc-e00e72562177.jpeg',_binary '\0',2),(297,'2023-02-13 17:53:48.984327','2023-02-13 17:53:48.984327','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/bbd27dc9-3715-4d5b-9008-d5b7043ff374.jpeg',_binary '\0',2),(298,'2023-02-13 17:54:09.673344','2023-02-13 17:54:09.673344','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f0bcad05-11ed-4c78-bf9a-e266b1c45109.jpeg',_binary '\0',2),(299,'2023-02-13 17:54:29.549654','2023-02-13 17:54:29.549654','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/60bf1efc-d230-452f-8532-301a592568a0.jpeg',_binary '\0',2),(300,'2023-02-13 18:03:51.156872','2023-02-13 18:03:51.156872','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e35a545a-444c-438a-9e59-5d44a126b47a.jpeg',_binary '\0',2),(302,'2023-02-13 18:39:05.930158','2023-02-13 18:39:05.930158','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/305c9f59-044f-4921-8e4e-b75b1373f503.jpeg',_binary '\0',2),(320,'2023-02-13 18:42:25.106590','2023-02-13 18:42:25.106590','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c823636d-5933-4320-9931-69dbececead0.jpeg',_binary '\0',2),(321,'2023-02-13 18:43:25.113680','2023-02-13 18:43:25.113680','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/da60faf2-2adf-46c9-9304-79b9655cce72.jpeg',_binary '\0',2),(322,'2023-02-13 19:04:24.923408','2023-02-13 19:04:24.923408','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4b0898c1-c958-4e7a-8181-8e69ce72d03a.jpeg',_binary '\0',2),(324,'2023-02-13 19:04:54.617376','2023-02-13 19:04:54.617376','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9c5e0a36-f76c-4f8c-8b8c-623eb0fe5455.jpeg',_binary '\0',2),(325,'2023-02-13 19:05:05.265117','2023-02-13 19:05:05.265117','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2bf1a539-fefb-4a7d-8a87-bb09da134286.jpeg',_binary '\0',2),(326,'2023-02-13 19:09:25.286568','2023-02-13 19:09:25.286568','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/149bdfdd-649f-457e-9a1d-f0f89afa27d0.jpeg',_binary '\0',2),(327,'2023-02-13 19:17:45.333497','2023-02-13 19:17:45.333497','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/692b254f-05be-4331-90e5-9d95f41eee69.jpeg',_binary '\0',2),(328,'2023-02-13 19:26:34.902462','2023-02-13 19:26:34.902462','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ca8375b4-8076-4bee-aa22-a5c7bff0cead.jpeg',_binary '\0',2),(329,'2023-02-13 19:26:45.034332','2023-02-13 19:26:45.034332','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f0b7f2b2-c30c-4ccc-80aa-80892daf061f.jpeg',_binary '\0',2),(330,'2023-02-13 19:26:55.341054','2023-02-13 19:26:55.341054','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e14e178c-bead-4b45-9776-10203645afbb.jpeg',_binary '\0',2),(331,'2023-02-13 19:27:35.250573','2023-02-13 19:27:35.250573','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/feb4636f-77bf-4f8f-ab90-1da551716411.jpeg',_binary '\0',2),(332,'2023-02-13 19:45:05.195624','2023-02-13 19:45:05.195624','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3ac267d5-4e05-4d6c-8119-c63b555478c7.jpeg',_binary '\0',2),(333,'2023-02-13 20:03:54.800409','2023-02-13 20:03:54.800409','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ac2f1aea-906f-4aa0-9da6-81b0eb8dd9f5.jpeg',_binary '\0',2),(340,'2023-02-14 12:56:45.170571','2023-02-14 12:56:45.170571','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/89dc6021-e702-4436-bcd3-25b47c0a17a0.jpeg',_binary '\0',1),(351,'2023-02-14 13:04:31.640131','2023-02-14 13:04:31.640131','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/250483dc-8b85-485f-95c9-f431a5be14e7.jpeg',_binary '\0',1),(352,'2023-02-14 13:04:33.112121','2023-02-14 13:04:33.112121','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/66c98d2e-5482-4a6b-aa99-046a5925a568.jpeg',_binary '\0',1),(353,'2023-02-14 13:04:34.832994','2023-02-14 13:04:34.832994','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/938cead9-7077-42e5-b190-5998fc9b41fc.jpeg',_binary '\0',1),(354,'2023-02-14 13:04:36.010317','2023-02-14 13:04:36.010317','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/18a4f94f-56db-436f-aef6-835837ee0268.jpeg',_binary '\0',1),(355,'2023-02-14 13:04:37.574458','2023-02-14 13:04:37.574458','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2ef99f9c-5520-467b-b9bf-552f2461d5a6.jpeg',_binary '\0',1),(356,'2023-02-14 13:04:39.123720','2023-02-14 13:04:39.123720','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6f251b03-d4ef-4534-b39a-8049ebf20dbc.jpeg',_binary '\0',1),(357,'2023-02-14 13:04:40.819311','2023-02-14 13:04:40.819311','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8c06dbfe-6c99-49cf-a1c0-e4e59b38b378.jpeg',_binary '\0',1),(358,'2023-02-14 13:04:44.196931','2023-02-14 13:04:44.196931','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9fb801e0-59b6-4435-ac0a-8178c97d82a7.jpeg',_binary '\0',1),(359,'2023-02-14 13:04:45.566304','2023-02-14 13:04:45.566304','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/91859f63-1252-4033-bb68-0ed8011399c7.jpeg',_binary '\0',1),(360,'2023-02-14 13:04:47.301682','2023-02-14 13:04:47.301682','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6b53a38a-4230-4dcf-81ca-92e3cc70a8b5.jpeg',_binary '\0',1),(361,'2023-02-14 13:04:48.524259','2023-02-14 13:04:48.524259','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c0e16467-e296-4bea-bda2-1aaf60600585.jpeg',_binary '\0',1),(362,'2023-02-14 13:04:55.842128','2023-02-14 13:04:55.842128','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c7196326-aac8-4504-851d-fcdf75304c80.jpeg',_binary '\0',1),(364,'2023-02-14 13:10:47.119742','2023-02-14 13:10:47.119742','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/a7cd023e-d758-4b4b-ba1d-6753ba9b02cf.jpeg',_binary '\0',1),(365,'2023-02-14 13:10:59.089353','2023-02-14 13:10:59.089353','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5ac2be1d-7729-46f4-b4c7-aee2bf200741.jpeg',_binary '\0',1),(366,'2023-02-14 13:11:13.062463','2023-02-14 13:11:13.062463','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d87be613-0f66-443b-a272-1f0836e0ae23.jpeg',_binary '\0',1),(367,'2023-02-14 13:11:44.910418','2023-02-14 13:11:44.910418','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/48fc3cf4-5d64-46fe-a8c7-979098b93579.jpeg',_binary '\0',1),(368,'2023-02-14 13:11:55.626331','2023-02-14 13:11:55.626331','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/fe62839f-0979-4346-83ec-e7143319f242.jpeg',_binary '\0',1),(369,'2023-02-14 13:12:35.795143','2023-02-14 13:12:35.795143','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/aa344371-38f0-49c2-a259-e1396fe680f8.jpeg',_binary '\0',1),(370,'2023-02-14 13:12:48.186201','2023-02-14 13:12:48.186201','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/357b6ef1-38f3-4e9a-8197-8fa7e5338b1b.jpeg',_binary '\0',1),(371,'2023-02-15 19:34:22.742277','2023-02-15 19:34:22.742277','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1f07a50e-5c1d-4e12-a47a-6e668d159274.jpeg',_binary '\0',2),(372,'2023-02-15 19:35:30.535350','2023-02-15 19:35:30.535350','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3976f4ea-226c-4b32-b742-324616c5a4a1.jpeg',_binary '\0',2),(373,'2023-02-15 19:35:40.274078','2023-02-15 19:35:40.274078','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e284d0a8-b221-4532-a220-02c75b8da16c.jpeg',_binary '\0',2),(374,'2023-02-15 19:35:50.289597','2023-02-15 19:35:50.289597','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/dd1e4948-8d5e-4981-b381-c74b56d88446.jpeg',_binary '\0',2),(375,'2023-02-15 19:44:11.583654','2023-02-15 19:44:11.583654','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/a34ed067-6215-4364-9c1c-19179671408d.jpeg',_binary '\0',2),(376,'2023-02-15 19:44:51.082055','2023-02-15 19:44:51.082055','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d4b4e142-fe33-42fa-a768-7bc8959d8a0c.jpeg',_binary '\0',2),(378,'2023-02-15 19:45:30.383622','2023-02-15 19:45:30.383622','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/82688ecc-b3aa-4a0c-9a19-4363005dee87.jpeg',_binary '\0',2),(379,'2023-02-15 19:46:30.610607','2023-02-15 19:46:30.610607','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/5ecf6bb7-c492-4856-a62f-595d088badc6.jpeg',_binary '\0',2),(380,'2023-02-15 19:46:40.434591','2023-02-15 19:46:40.434591','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e39a0b9f-4b52-4085-9a12-5c4819783b4e.jpeg',_binary '\0',2),(387,'2023-02-15 23:04:20.596461','2023-02-15 23:04:20.596461','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6fbe5421-18d7-4b23-b4ba-e1b1d46e6725.jpeg',_binary '\0',2),(389,'2023-02-15 23:04:39.634450','2023-02-15 23:04:39.634450','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ad8f4726-f727-4218-a447-7c5be90e9913.jpeg',_binary '\0',2),(390,'2023-02-15 23:04:50.240084','2023-02-15 23:04:50.240084','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c832deac-7feb-42ed-9ae1-84846b5b9f59.jpeg',_binary '\0',2),(391,'2023-02-16 00:33:48.841036','2023-02-16 00:33:48.841036','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/2e2b3c6d-05e9-4cbb-bde2-b8d1069c3c3a.jpeg',_binary '\0',2),(392,'2023-02-16 00:34:57.233639','2023-02-16 00:34:57.233639','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/46481c3e-4d6d-4ded-bc26-e422837f9f60.jpeg',_binary '\0',2),(393,'2023-02-16 00:35:47.412545','2023-02-16 00:35:47.412545','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/0d993fbe-cd75-449f-813c-f342257bc549.jpeg',_binary '\0',2),(394,'2023-02-16 06:25:25.568988','2023-02-16 06:25:25.568988','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/42ee6059-7fa1-43e4-a9b6-72732290a6ab.jpeg',_binary '\0',2),(397,'2023-02-16 06:25:53.381517','2023-02-16 06:25:53.381517','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7c5e5a8a-70e5-4ef1-8e58-e4e37655b107.jpeg',_binary '\0',2),(406,'2023-02-16 06:27:33.351111','2023-02-16 06:27:33.351111','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/97aa7133-beb2-419e-a9bd-474435fb2365.jpeg',_binary '\0',2),(407,'2023-02-16 06:27:43.272198','2023-02-16 06:27:43.272198','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b6c7cf2c-fab5-4849-bd7d-f4ddb8cc90ab.jpeg',_binary '\0',2),(408,'2023-02-16 06:27:53.201298','2023-02-16 06:27:53.201298','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/66d8f8cc-c2ea-43ff-9485-303fd2044297.jpeg',_binary '\0',2),(409,'2023-02-16 06:28:03.162889','2023-02-16 06:28:03.162889','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/23c91490-ee3c-4709-9739-93b2cb46c46c.jpeg',_binary '\0',2),(419,'2023-02-16 06:29:43.398512','2023-02-16 06:29:43.398512','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/488c44b7-cfaf-419d-937b-904727a887b8.jpeg',_binary '\0',2),(427,'2023-02-16 06:44:53.174744','2023-02-16 06:44:53.174744','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/14de2df2-7fb4-439e-baa0-09d24eac74cc.jpeg',_binary '\0',2),(428,'2023-02-16 06:45:13.223342','2023-02-16 06:45:13.223342','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/fe574939-372c-4d4a-b85a-6d166831c7df.jpeg',_binary '\0',2),(453,'2023-02-16 06:49:33.128687','2023-02-16 06:49:33.128687','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/954b293a-26f7-47d1-8505-a2f0fe68d561.jpeg',_binary '\0',2),(474,'2023-02-16 06:53:03.660282','2023-02-16 06:53:03.660282','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c4e9cc5c-0d5f-42d3-881d-cea0e8bdecc0.jpeg',_binary '\0',2),(476,'2023-02-16 06:53:23.601880','2023-02-16 06:53:23.601880','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/97f9aa24-fd9a-4406-8ed4-04827ab35195.jpeg',_binary '\0',2),(477,'2023-02-16 07:07:23.496994','2023-02-16 07:07:23.496994','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/798aca8b-992e-4bed-9056-ddebd7e9cbef.jpeg',_binary '\0',2),(478,'2023-02-16 08:30:04.178142','2023-02-16 08:30:04.178142','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/66fe55fc-017b-4fd0-90e8-c38fb134484e.jpeg',_binary '\0',2),(480,'2023-02-16 11:44:48.049553','2023-02-16 11:44:48.049553','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/50572a6a-e162-4ddc-85ae-bf6c380595a1.jpeg',_binary '\0',2),(481,'2023-02-16 11:47:05.751937','2023-02-16 11:47:05.751937','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b070219a-4b29-4b84-b4cf-5c33079151ae.jpeg',_binary '\0',2),(482,'2023-02-16 11:47:15.555258','2023-02-16 11:47:15.555258','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/03a11f49-b950-47d2-9ae5-4875db033c95.jpeg',_binary '\0',2),(483,'2023-02-16 11:47:25.974000','2023-02-16 11:47:25.974000','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8ed44979-1be2-4e28-9d39-2fa7a5bcbc0a.jpeg',_binary '\0',2),(484,'2023-02-16 11:54:15.780062','2023-02-16 11:54:15.780062','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/cac9815f-90c1-475a-8ea9-a4bac6d40854.jpeg',_binary '\0',2),(488,'2023-02-16 11:54:55.607272','2023-02-16 11:54:55.607272','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/112ff66f-a95b-4ac7-afd4-91a745c39627.jpeg',_binary '\0',2),(489,'2023-02-16 11:57:55.576638','2023-02-16 11:57:55.576638','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/78d8f1b0-49b4-4d1f-a727-f1f67635cbdd.jpeg',_binary '\0',2),(490,'2023-02-16 12:50:39.407474','2023-02-16 12:50:39.407474','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/74848ee5-7082-4461-a04b-f1e20382454c.jpeg',_binary '\0',1),(491,'2023-02-16 12:50:48.909613','2023-02-16 12:50:48.909613','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/441862ed-8d96-403b-8a74-e7ac0f0622b2.jpeg',_binary '\0',1),(492,'2023-02-16 12:50:58.810423','2023-02-16 12:50:58.810423','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ffa3de33-0d12-48d7-9541-5a5eb3707689.jpeg',_binary '\0',1),(493,'2023-02-16 12:51:08.802067','2023-02-16 12:51:08.802067','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d5d0243b-f71c-4026-b7b1-d4d55dd2daad.jpeg',_binary '\0',1),(494,'2023-02-16 12:51:18.517975','2023-02-16 12:51:18.517975','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f14bf03f-52fc-4b5e-97f2-def78b14e09b.jpeg',_binary '\0',1),(495,'2023-02-16 12:52:08.772168','2023-02-16 12:52:08.772168','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ff7da635-7049-4276-8959-301291dded73.jpeg',_binary '\0',1),(496,'2023-02-16 12:52:18.209277','2023-02-16 12:52:18.209277','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9a3dd7b0-56b7-4917-82b1-c7d020732688.jpeg',_binary '\0',1),(497,'2023-02-16 12:52:38.430145','2023-02-16 12:52:38.430145','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/48933606-a42a-4180-8e9e-a5075fdbf6a3.jpeg',_binary '\0',1),(498,'2023-02-16 12:52:48.368094','2023-02-16 12:52:48.368094','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/46736044-1afc-4ece-b878-1f00df820886.jpeg',_binary '\0',1),(499,'2023-02-16 12:53:59.114107','2023-02-16 12:53:59.114107','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/05ff14c4-388c-4a75-86aa-7a28359e8724.jpeg',_binary '\0',1),(500,'2023-02-16 12:54:09.480796','2023-02-16 12:54:09.480796','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1daae655-0c1a-46b1-a233-40be990ce83d.jpeg',_binary '\0',1),(501,'2023-02-16 12:54:28.631300','2023-02-16 12:54:28.631300','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3aa1e1f0-daf6-416a-b269-89d963d20803.jpeg',_binary '\0',1),(502,'2023-02-16 12:54:48.921410','2023-02-16 12:54:48.921410','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/aa1949b7-266a-4e9a-be89-01fc9e1c5eed.jpeg',_binary '\0',1),(503,'2023-02-16 12:54:58.311872','2023-02-16 12:54:58.311872','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ad6262d0-7c48-41bc-bfdd-ff8e9529db37.jpeg',_binary '\0',1),(504,'2023-02-16 12:55:08.616997','2023-02-16 12:55:08.616997','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8afb1457-7b94-47ba-82d5-caf534ff1386.jpeg',_binary '\0',1),(505,'2023-02-16 12:55:18.640704','2023-02-16 12:55:18.640704','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4f016d7b-70f7-46f9-b741-1c6fcfdd7894.jpeg',_binary '\0',1),(506,'2023-02-16 12:55:28.639773','2023-02-16 12:55:28.639773','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/25396b95-41ae-4fb9-8531-fd101b6d3be6.jpeg',_binary '\0',1),(507,'2023-02-16 12:55:38.937211','2023-02-16 12:55:38.937211','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3110d5e8-9d4b-4609-83f0-f12aa90a55b6.jpeg',_binary '\0',1),(508,'2023-02-16 12:55:48.715678','2023-02-16 12:55:48.715678','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c748ddc4-db5e-4717-91b6-13bdd8639c90.jpeg',_binary '\0',1),(509,'2023-02-16 12:55:58.534661','2023-02-16 12:55:58.534661','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d09da743-d339-423e-a9ab-77c951729329.jpeg',_binary '\0',1),(510,'2023-02-16 12:56:08.519815','2023-02-16 12:56:08.519815','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3f02265f-9027-4016-a029-176266e05919.jpeg',_binary '\0',1),(511,'2023-02-16 12:56:18.298444','2023-02-16 12:56:18.298444','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e13f6ab8-0629-4f6b-be7b-f581841ccd5e.jpeg',_binary '\0',1),(512,'2023-02-16 12:56:28.963288','2023-02-16 12:56:28.963288','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/883036d2-6e52-42f1-a24e-48b1b0a37f7c.jpeg',_binary '\0',1),(513,'2023-02-16 12:56:38.630331','2023-02-16 12:56:38.630331','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d7c876ac-3e5b-48da-a1a8-3a39ea31df36.jpeg',_binary '\0',1),(514,'2023-02-16 12:56:48.310862','2023-02-16 12:56:48.310862','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/fdf2e7f2-4b15-47a8-8e3a-93b6f5e50f7a.jpeg',_binary '\0',1),(515,'2023-02-16 12:56:58.673612','2023-02-16 12:56:58.673612','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/438c8dda-4ef3-465e-9ca5-913855103b70.jpeg',_binary '\0',1),(516,'2023-02-16 12:57:08.234864','2023-02-16 12:57:08.234864','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9bbbaf6f-1b22-4377-98d6-3834a4beaca8.jpeg',_binary '\0',1),(517,'2023-02-16 12:57:18.258031','2023-02-16 12:57:18.258031','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/342208d6-8bb7-4c52-9b8f-943034491240.jpeg',_binary '\0',1),(518,'2023-02-16 12:57:28.335855','2023-02-16 12:57:28.335855','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b73270a5-2e79-4337-9b33-3c3d14cb2b0c.jpeg',_binary '\0',1),(519,'2023-02-16 12:57:38.562786','2023-02-16 12:57:38.562786','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/92e2ea7b-9eb8-48a2-ae11-ef34223b202b.jpeg',_binary '\0',1),(520,'2023-02-16 12:57:45.688824','2023-02-16 12:57:45.688824','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9bc1bbe8-0e63-4f3a-9710-71133a2e86f1.jpeg',_binary '\0',2),(521,'2023-02-16 12:57:48.367630','2023-02-16 12:57:48.367630','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d4f4fd7c-7d5b-46b0-a500-c64cabd9aa68.jpeg',_binary '\0',1),(522,'2023-02-16 12:58:08.321089','2023-02-16 12:58:08.321089','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b4786e42-bfdc-4e8b-9721-8136b77a4d73.jpeg',_binary '\0',1),(523,'2023-02-16 12:58:18.215502','2023-02-16 12:58:18.215502','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7264e220-c1bc-4177-8156-948d81fccbde.jpeg',_binary '\0',1),(524,'2023-02-16 12:58:28.444188','2023-02-16 12:58:28.444188','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/12c6639d-fbfe-499f-8c0b-0cc9c205336d.jpeg',_binary '\0',1),(525,'2023-02-16 12:58:38.802248','2023-02-16 12:58:38.802248','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/830efc1d-fd00-48b7-9dda-0ed1643254d3.jpeg',_binary '\0',1),(526,'2023-02-16 12:58:48.405405','2023-02-16 12:58:48.405405','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8b92ed04-b91e-4c62-bbb3-73120a4c4dcb.jpeg',_binary '\0',1),(527,'2023-02-16 13:00:25.853079','2023-02-16 13:00:25.853079','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1d97334a-5514-4e05-995e-ca21516e1400.jpeg',_binary '\0',2),(528,'2023-02-16 13:00:28.479169','2023-02-16 13:00:28.479169','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/a5abbd92-34ae-475c-b359-1530caf5d044.jpeg',_binary '\0',1),(531,'2023-02-16 13:03:18.703257','2023-02-16 13:03:18.703257','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/37494c30-5ce5-4b39-9293-70da1b752da9.jpeg',_binary '\0',1),(533,'2023-02-16 13:19:05.643843','2023-02-16 13:19:05.643843','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/0ce4ba0c-4bde-4d9d-8357-7eb6c7a2503f.jpeg',_binary '\0',2),(534,'2023-02-16 13:19:35.482856','2023-02-16 13:19:35.482856','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/3671a215-615c-4d34-b4a3-d977a2bd81bc.jpeg',_binary '\0',2),(543,'2023-02-16 13:23:05.341373','2023-02-16 13:23:05.341373','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/90eac0a0-fdac-4d0f-bd00-ab1efeb5131f.jpeg',_binary '\0',2),(544,'2023-02-16 13:23:26.291136','2023-02-16 13:23:26.291136','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b6d4b035-c41f-4a09-b0a8-6bf6894093f2.jpeg',_binary '\0',2),(545,'2023-02-16 13:38:15.776241','2023-02-16 13:38:15.776241','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ce8c1647-bc06-4233-b497-84acfc1f9762.jpeg',_binary '\0',2),(546,'2023-02-16 13:42:18.324528','2023-02-16 13:42:18.324528','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1577ac4f-70ac-454a-a9e8-fa20e713d79f.jpeg',_binary '\0',2),(547,'2023-02-16 13:44:18.203818','2023-02-16 13:44:18.203818','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/36c83eeb-b9ba-4802-9cad-c0ccdcab6d7c.jpeg',_binary '\0',2),(548,'2023-02-16 13:44:28.200064','2023-02-16 13:44:28.200064','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c67adaf7-59b7-49dd-8e68-5147655728e6.jpeg',_binary '\0',2),(549,'2023-02-16 13:46:58.068452','2023-02-16 13:46:58.068452','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/765a5006-99f0-4737-9822-545669e4ba2d.jpeg',_binary '\0',2),(550,'2023-02-16 13:47:07.847095','2023-02-16 13:47:07.847095','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8974fc85-032e-4efa-83df-070d5f15864a.jpeg',_binary '\0',2),(551,'2023-02-16 13:48:17.931646','2023-02-16 13:48:17.931646','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/447e23ed-ab59-489f-8ff8-03ad04aa6c12.jpeg',_binary '\0',2),(552,'2023-02-16 13:50:47.884580','2023-02-16 13:50:47.884580','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/20c18f5a-f0bb-415c-be60-c6bd0659aaaa.jpeg',_binary '\0',2),(553,'2023-02-16 13:50:59.162607','2023-02-16 13:50:59.162607','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e2d92d26-7a5c-441c-809b-50eed94e9bfb.jpeg',_binary '\0',2),(554,'2023-02-16 13:52:29.043006','2023-02-16 13:52:29.043006','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ff2bc4df-f1d7-4cfb-98ba-04cb0726b093.jpeg',_binary '\0',2),(555,'2023-02-16 13:52:58.903838','2023-02-16 13:52:58.903838','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c06382fe-8520-4e22-b396-5ca72de07923.jpeg',_binary '\0',2),(556,'2023-02-16 13:53:09.164240','2023-02-16 13:53:09.164240','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1a72bca9-7acf-4099-a2e4-38120b8a59c9.jpeg',_binary '\0',2),(557,'2023-02-16 13:53:49.027899','2023-02-16 13:53:49.027899','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ea24cf16-0d35-4bac-b32c-9c542ff79e71.jpeg',_binary '\0',2),(558,'2023-02-16 14:02:27.884787','2023-02-16 14:02:27.884787','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/1c1f54bd-7961-42be-b84e-ab0267364c1a.jpeg',_binary '\0',2),(559,'2023-02-16 14:13:17.759555','2023-02-16 14:13:17.759555','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/71dfbaa2-1520-4c1c-8d43-1b0c1edb9330.jpeg',_binary '\0',2),(560,'2023-02-16 14:13:29.280326','2023-02-16 14:13:29.280326','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/f5ad1d08-ea57-4c55-a61b-f7345f3acc3f.jpeg',_binary '\0',2),(563,'2023-02-16 14:13:58.156156','2023-02-16 14:13:58.156156','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/fc11980b-df1a-477b-bebd-fae07311607c.jpeg',_binary '\0',2),(564,'2023-02-16 14:38:49.132659','2023-02-16 14:38:49.132659','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4fae6035-e507-4071-a1b8-f885f98b3789.jpeg',_binary '\0',2),(565,'2023-02-16 14:45:19.440483','2023-02-16 14:45:19.440483','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c6ac88c4-031a-4ae2-af42-86f7c0112b33.jpeg',_binary '\0',2),(566,'2023-02-16 14:45:49.238323','2023-02-16 14:45:49.238323','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/064b73a0-8d6c-4a98-94c1-28986541248e.jpeg',_binary '\0',2),(567,'2023-02-16 14:50:30.419268','2023-02-16 14:50:30.419268','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8ce4023a-d5e3-461d-8672-786ba26c71d2.jpeg',_binary '\0',2),(568,'2023-02-16 15:43:59.431303','2023-02-16 15:43:59.431303','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/224caa3a-4172-4313-a1d9-63926591a442.jpeg',_binary '\0',2),(572,'2023-02-16 20:50:09.708686','2023-02-16 20:50:09.708686','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/03c74747-4175-4cc0-a129-b9be21bbbe0c.jpeg',_binary '\0',2),(577,'2023-02-17 07:02:33.221659','2023-02-17 07:02:33.221659','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/57225d08-dc24-4da8-8562-2add39de5619.jpeg',_binary '\0',2),(578,'2023-02-17 07:03:03.005692','2023-02-17 07:03:03.005692','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/34f059c0-08e2-4621-868e-4dea3e2c87fc.jpeg',_binary '\0',2),(579,'2023-02-17 07:03:53.052997','2023-02-17 07:03:53.052997','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/01497b12-5e34-4e5c-84a6-32ae57d11f1b.jpeg',_binary '\0',2),(580,'2023-02-17 07:05:12.951455','2023-02-17 07:05:12.951455','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4796b1b2-ea37-4b9d-9826-51551d5e201e.jpeg',_binary '\0',2),(581,'2023-02-17 07:12:32.959167','2023-02-17 07:12:32.959167','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/ab03d5ab-c8c9-4bf4-bf26-24f374a9fe9f.jpeg',_binary '\0',2),(582,'2023-02-17 07:12:53.310502','2023-02-17 07:12:53.310502','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/6cefab30-2e37-4a8e-8b70-70da6441f398.jpeg',_binary '\0',2);
/*!40000 ALTER TABLE `iotcat_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iotcat_img_like`
--

DROP TABLE IF EXISTS `iotcat_img_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iotcat_img_like` (
  `iot_cat_img_like` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `community_like_state` int NOT NULL,
  `iot_cat_img` bigint NOT NULL,
  `user` bigint NOT NULL,
  PRIMARY KEY (`iot_cat_img_like`),
  KEY `FKctwg22hcfabkqpr6j932hk5sn` (`iot_cat_img`),
  KEY `FKicp6tbe4puvkx4e154svaqc96` (`user`),
  CONSTRAINT `FKctwg22hcfabkqpr6j932hk5sn` FOREIGN KEY (`iot_cat_img`) REFERENCES `iotcat_img` (`iot_cat_img`),
  CONSTRAINT `FKicp6tbe4puvkx4e154svaqc96` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iotcat_img_like`
--

LOCK TABLES `iotcat_img_like` WRITE;
/*!40000 ALTER TABLE `iotcat_img_like` DISABLE KEYS */;
INSERT INTO `iotcat_img_like` VALUES (2,'2023-02-09 13:10:37.674430','2023-02-09 14:44:09.526442',1,7,3),(4,'2023-02-09 13:13:22.433239','2023-02-09 14:30:18.633764',0,6,3),(6,'2023-02-09 14:00:29.462261','2023-02-09 14:00:29.462261',0,5,3),(8,'2023-02-09 14:20:37.486689','2023-02-09 14:43:06.816530',1,7,1),(9,'2023-02-09 14:20:39.738242','2023-02-09 23:40:37.089136',0,6,1),(15,'2023-02-10 02:00:45.861072','2023-02-10 02:00:45.861072',0,7,8),(16,'2023-02-10 02:02:05.736176','2023-02-16 08:56:46.779977',1,6,2),(17,'2023-02-10 02:04:14.187291','2023-02-10 02:04:14.187291',0,8,1),(18,'2023-02-10 11:34:40.014556','2023-02-10 11:34:40.014556',0,8,8),(19,'2023-02-10 13:36:24.007910','2023-02-10 13:36:31.431626',1,9,3),(20,'2023-02-11 15:31:36.683299','2023-02-11 15:31:36.683299',0,13,3),(22,'2023-02-11 18:57:02.060708','2023-02-11 18:57:02.060708',0,5,5),(25,'2023-02-12 19:51:18.105357','2023-02-12 19:51:18.997838',1,7,12),(26,'2023-02-12 19:51:31.965199','2023-02-12 19:51:31.965199',0,8,12),(27,'2023-02-12 19:51:35.325965','2023-02-12 19:51:35.325965',0,9,12),(28,'2023-02-13 10:05:44.305034','2023-02-13 10:05:50.581660',1,259,13),(30,'2023-02-13 10:25:06.791855','2023-02-13 10:25:06.791855',0,22,3),(31,'2023-02-13 10:25:09.444736','2023-02-13 10:25:09.444736',0,12,3),(32,'2023-02-13 10:25:13.185669','2023-02-13 10:25:15.562373',1,10,3),(33,'2023-02-13 10:25:18.946975','2023-02-13 10:25:20.858480',1,11,3),(34,'2023-02-13 14:24:50.094457','2023-02-13 14:24:50.094457',0,260,12),(36,'2023-02-13 14:24:52.898891','2023-02-13 14:24:52.898891',0,252,12),(39,'2023-02-13 14:26:33.715917','2023-02-13 14:26:33.715917',0,94,12),(40,'2023-02-13 15:27:45.995910','2023-02-13 15:27:48.325654',1,260,9),(43,'2023-02-14 11:37:36.048638','2023-02-14 11:37:36.048638',0,7,2),(44,'2023-02-14 13:12:53.217235','2023-02-14 13:12:53.217235',0,369,9),(45,'2023-02-14 18:16:14.828184','2023-02-16 12:51:12.295748',1,369,2),(46,'2023-02-14 18:16:19.410437','2023-02-16 12:51:12.978296',1,370,2),(48,'2023-02-15 23:53:55.663981','2023-02-15 23:53:55.663981',0,390,3),(49,'2023-02-15 23:54:02.979580','2023-02-16 12:51:05.222613',1,366,8),(51,'2023-02-16 12:51:14.004981','2023-02-16 12:51:14.004981',0,491,8),(53,'2023-02-16 12:51:19.367599','2023-02-16 12:51:19.367599',0,367,8),(54,'2023-02-16 12:52:14.645167','2023-02-16 12:52:14.645167',0,494,16),(55,'2023-02-16 12:55:48.638752','2023-02-16 12:55:48.638752',0,503,8),(56,'2023-02-16 12:58:30.302560','2023-02-16 12:58:32.731907',1,523,8),(57,'2023-02-16 12:58:33.624164','2023-02-16 12:58:33.624164',0,516,8),(58,'2023-02-16 13:40:35.563011','2023-02-16 13:40:35.563011',0,544,14),(59,'2023-02-16 20:27:25.676694','2023-02-16 20:27:25.676694',0,409,3),(60,'2023-02-17 02:17:16.170200','2023-02-17 02:17:16.170200',0,543,8),(61,'2023-02-17 02:17:30.020975','2023-02-17 02:17:30.020975',0,374,8);
/*!40000 ALTER TABLE `iotcat_img_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `comment_count` int NOT NULL,
  `content` longtext NOT NULL,
  `like_count` int NOT NULL,
  `state` int NOT NULL,
  `admin_id` bigint NOT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `FKd816ad20ht41wty5l6f85w8mb` (`admin_id`),
  CONSTRAINT `FKd816ad20ht41wty5l6f85w8mb` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'2023-02-10 11:48:41.302071','2023-02-14 22:00:26.603536',1,'어제 TNR 한 고양이 입니다!',2,0,2),(13,'2023-02-11 22:15:36.563789','2023-02-17 02:13:34.496066',5,'23년 1월에 창원시에서 포획한 고양이들이\r\n오늘 중성화 수술을 마치고 방생하는 날입니다.\r\n수슬경과가 아주 좋고 애들도 매우 건강해요~!\r\n건강히 지내라고 응원의 한마디 남겨주세요!',3,0,8),(14,'2023-02-13 10:23:34.426150','2023-02-15 23:21:17.958044',5,'저번주 중성화를 완료하고 오늘 다시 살던곳으로 돌아간 \'버터\' 입니다!  앞으로도 많은 애기들이 TNR을 통해 건강해질수 있도록 지속적인 관심 부탁드립니다^_^',4,0,1),(15,'2023-02-14 16:04:43.233574','2023-02-15 22:30:40.471355',2,'2-13 ~ 2-14 고양이 TNR에 실패했습니다 ㅜ.ㅜ',1,1,2),(16,'2023-02-14 21:23:49.875792','2023-02-14 21:24:15.442222',0,'zz',0,1,1),(17,'2023-02-15 22:32:19.872207','2023-02-16 09:27:27.881539',0,'귀여운 고양이 한마리 잡았습니다 ~~',0,1,2);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_comment`
--

DROP TABLE IF EXISTS `notice_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_comment` (
  `notice_comment_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `content` longtext NOT NULL,
  `state` int NOT NULL,
  `notice_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`notice_comment_id`),
  KEY `FKax7qcww5twiq84y8dvvpaketx` (`notice_id`),
  KEY `FKd62s03w50n7jbg8rg0dtgsmee` (`user_id`),
  CONSTRAINT `FKax7qcww5twiq84y8dvvpaketx` FOREIGN KEY (`notice_id`) REFERENCES `notice` (`notice_id`),
  CONSTRAINT `FKd62s03w50n7jbg8rg0dtgsmee` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_comment`
--

LOCK TABLES `notice_comment` WRITE;
/*!40000 ALTER TABLE `notice_comment` DISABLE KEYS */;
INSERT INTO `notice_comment` VALUES (2,'2023-02-13 10:25:48.805843','2023-02-13 10:25:48.805843','건강하게 지냇으면 좋겠어요ㅎㅎ',0,14,3),(3,'2023-02-13 10:51:28.625380','2023-02-13 10:51:28.625380','123',0,13,1),(4,'2023-02-13 11:09:34.706665','2023-02-13 11:09:34.706665','123',0,13,1),(9,'2023-02-14 10:59:48.988202','2023-02-14 10:59:48.988202','너무 귀여워요',0,14,2),(14,'2023-02-14 15:05:57.511125','2023-02-14 15:05:57.511125','고양이가 정말로 귀엽내용',0,13,5),(15,'2023-02-14 15:19:01.639502','2023-02-14 15:19:01.639502','버터야 건강하자~~~',0,14,5),(16,'2023-02-14 15:37:07.169665','2023-02-14 15:37:07.169665','건강하자 ~~',0,14,2),(19,'2023-02-14 16:48:16.902649','2023-02-14 16:48:16.902649','화이팅 !!',0,15,8),(20,'2023-02-14 21:09:29.568600','2023-02-14 21:09:29.568600','똑바로하세요!',0,15,1),(22,'2023-02-14 21:33:05.077229','2023-02-14 21:33:05.077229','우와!!',0,13,2),(23,'2023-02-14 22:00:24.357212','2023-02-14 22:00:24.357212','!!',0,1,2),(24,'2023-02-14 23:16:54.959017','2023-02-14 23:16:54.959017','건강해라 고양이야~',0,13,8),(25,'2023-02-15 23:21:17.822115','2023-02-15 23:21:17.822115','버터 화이팅~~',0,14,8);
/*!40000 ALTER TABLE `notice_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_img`
--

DROP TABLE IF EXISTS `notice_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_img` (
  `notice_img_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `img_url` varchar(255) NOT NULL,
  `notice_id` bigint NOT NULL,
  PRIMARY KEY (`notice_img_id`),
  KEY `FKflgmvn9j5ynswpueyqqthos2e` (`notice_id`),
  CONSTRAINT `FKflgmvn9j5ynswpueyqqthos2e` FOREIGN KEY (`notice_id`) REFERENCES `notice` (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_img`
--

LOCK TABLES `notice_img` WRITE;
/*!40000 ALTER TABLE `notice_img` DISABLE KEYS */;
INSERT INTO `notice_img` VALUES (1,'2023-02-10 11:48:42.419335','2023-02-10 11:48:42.419335','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c3d9cb18-f075-4126-81b4-f19485458766.jpg',1),(13,'2023-02-11 22:15:36.680570','2023-02-11 22:15:36.680570','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/305b9122-41d4-4e6c-87bf-0534dcdfabb1.png',13),(14,'2023-02-11 22:15:36.743743','2023-02-11 22:15:36.743743','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b7b7ecfc-c80b-459a-9142-0ceff60b5e39.png',13),(15,'2023-02-11 22:15:36.830810','2023-02-11 22:15:36.830810','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/4e53785e-f8ce-4e5b-a55e-a068d985bbff.png',13),(16,'2023-02-13 10:23:34.575991','2023-02-13 10:23:34.575991','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/14a718f2-dae0-4e8c-aefd-6eb171567f07.jpg',14),(17,'2023-02-14 21:23:49.984194','2023-02-14 21:23:49.984194','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/dd86bb39-93c0-43cb-a7f9-c536751e3084.png',16),(18,'2023-02-15 22:32:19.984356','2023-02-15 22:32:19.984356','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/9c4f91f3-a8b7-482b-acd0-68dc4b5eeed1.jpg',17);
/*!40000 ALTER TABLE `notice_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_like`
--

DROP TABLE IF EXISTS `notice_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_like` (
  `notice_like_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `state` int NOT NULL,
  `notice_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`notice_like_id`),
  KEY `FKm2krt4h5dcpydbb4tlvxyr27` (`notice_id`),
  KEY `FKnplmervi6gx6dqj4vpnq7jn6g` (`user_id`),
  CONSTRAINT `FKm2krt4h5dcpydbb4tlvxyr27` FOREIGN KEY (`notice_id`) REFERENCES `notice` (`notice_id`),
  CONSTRAINT `FKnplmervi6gx6dqj4vpnq7jn6g` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_like`
--

LOCK TABLES `notice_like` WRITE;
/*!40000 ALTER TABLE `notice_like` DISABLE KEYS */;
INSERT INTO `notice_like` VALUES (4,'2023-02-13 10:09:03.175404','2023-02-13 10:09:03.921221',1,13,13),(6,'2023-02-13 11:57:19.730516','2023-02-13 11:57:19.730516',0,14,13),(7,'2023-02-13 11:57:26.275373','2023-02-14 11:14:01.153229',0,14,1),(8,'2023-02-13 17:52:12.011822','2023-02-13 17:52:12.011822',0,13,1),(10,'2023-02-14 16:04:55.150227','2023-02-15 08:48:46.393850',0,15,2),(11,'2023-02-14 23:19:08.903849','2023-02-14 23:19:08.903849',0,14,8),(12,'2023-02-17 02:13:34.415962','2023-02-17 02:13:34.415962',0,13,8);
/*!40000 ALTER TABLE `notice_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preference`
--

DROP TABLE IF EXISTS `preference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preference` (
  `preference_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `preference_result` int DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `dish_id` bigint DEFAULT NULL,
  `user_account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`preference_id`),
  KEY `FKk7odf0xfoyopfg6iummxugd9k` (`dish_id`),
  KEY `FK8ws26faw3pa7wsoi66qp5l3cg` (`user_account_id`),
  CONSTRAINT `FK8ws26faw3pa7wsoi66qp5l3cg` FOREIGN KEY (`user_account_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKk7odf0xfoyopfg6iummxugd9k` FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preference`
--

LOCK TABLES `preference` WRITE;
/*!40000 ALTER TABLE `preference` DISABLE KEYS */;
INSERT INTO `preference` VALUES (2,'2023-02-10 01:17:00.976118','2023-02-10 01:17:00.976118',-1,'밤마다 고양이가 너무 시끄럽게 울어서 싫어요 ㅜㅜ',3,2),(3,'2023-02-10 11:33:26.033305','2023-02-10 11:33:26.033305',1,'이 위치 너무 좋아요 !!! 다양한 고양이들이 많이 보이네요',3,7),(4,'2023-02-12 19:48:14.219842','2023-02-12 19:48:14.219842',1,'',2,12),(5,'2023-02-13 07:23:13.966626','2023-02-15 11:04:04.341827',1,'넘나리 좋아용',2,3),(6,'2023-02-13 14:21:40.199962','2023-02-13 14:21:40.199962',1,'이 위치 좋아요',4,12),(7,'2023-02-13 17:36:31.338156','2023-02-13 17:36:31.338156',1,'',3,8),(8,'2023-02-14 15:06:21.528339','2023-02-14 15:06:21.528339',1,'이 위치 너무좋아요!!!!!',1,5),(9,'2023-02-14 16:47:27.881033','2023-02-14 23:16:16.616748',-1,'',1,8),(10,'2023-02-15 11:34:17.106067','2023-02-15 11:34:51.879621',0,'그럭저럭 입니다.',4,2),(11,'2023-02-16 08:52:21.019813','2023-02-16 08:52:21.019813',1,'여기 너무 좋아요',10,2),(12,'2023-02-16 13:51:42.953898','2023-02-16 13:51:42.953898',-1,'냥그릇 아무때나 설치하지마세요',11,17),(13,'2023-02-16 13:52:42.534733','2023-02-16 13:52:42.534733',-1,'위치별로에요.',11,1),(14,'2023-02-16 13:52:59.884698','2023-02-16 13:52:59.884698',1,'찬성합니다!!',11,5),(15,'2023-02-16 16:25:14.580860','2023-02-16 16:25:14.580860',0,'그저그래요',14,3),(16,'2023-02-16 17:42:00.140327','2023-02-16 17:42:00.140327',1,'좋아요 !!',1,2),(17,'2023-02-16 17:42:50.369384','2023-02-16 17:42:56.024836',-1,'싫어요 ㅜㅜ',5,2),(18,'2023-02-16 20:45:24.041488','2023-02-16 20:45:24.041488',-1,'주변에 주차장이 있어서 위치를 바꿔줬으면 좋겠어요!',2,14),(19,'2023-02-16 20:51:34.739049','2023-02-16 20:51:34.739049',1,'뭐야 넘나 좋은 서비스잖아!',2,10),(20,'2023-02-16 21:16:24.783308','2023-02-16 21:16:24.783308',0,'별루에요',16,3),(21,'2023-02-16 21:16:48.611557','2023-02-16 21:16:48.611557',1,'좋아요!!',16,2),(22,'2023-02-17 08:46:41.222002','2023-02-17 08:46:41.222002',0,'나쁘진 않네요',2,2);
/*!40000 ALTER TABLE `preference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `admin_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa05i46xnn0y4yvc55h2dh06n1` (`admin_id`),
  KEY `FKfgk1klcib7i15utalmcqo7krt` (`user_id`),
  CONSTRAINT `FKa05i46xnn0y4yvc55h2dh06n1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`),
  CONSTRAINT `FKfgk1klcib7i15utalmcqo7krt` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (1,'2023-02-09 12:47:55.534286','2023-02-16 12:10:11.294070','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhczc1MzFAbmF2ZXIuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc2NTQ5NDExLCJleHAiOjE2ODQzMjU0MTF9.vsXvU1LWR421FcaWLpWN0mmk2tihRnqLR08G8EuqnQI',1,NULL),(2,'2023-02-09 12:49:24.812863','2023-02-16 23:44:04.187137','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcm90b3NzMTAyNUBuYXZlci5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzY1OTEwNDQsImV4cCI6MTY4NDM2NzA0NH0.BUMiiAiChpxssa3hPdlNFhNSQ0bASI94l95reYN8VjE',2,NULL),(3,'2023-02-09 12:56:14.757364','2023-02-09 12:56:14.757364','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjAwMUB0ZXN0LnRlc3QiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDczNzQsImV4cCI6MTY4MzcyMzM3NH0.f8DZqjMRsx7o8ROmFmybCFy_COv2oE9QOiHG0vPCC-w',3,NULL),(4,'2023-02-09 12:56:57.763127','2023-02-09 12:56:57.763127','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjVAdGVzdC50ZXN0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc1OTQ3NDE3LCJleHAiOjE2ODM3MjM0MTd9.qIdwqGpkGYCKChlGInmFnNyhHnSuct6t-JSuPPejE2c',4,NULL),(5,'2023-02-09 12:57:58.763287','2023-02-16 07:25:00.335288','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjQ0OTg3NzkxIiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTMyMzAwLCJleHAiOjE2ODQzMDgzMDB9.qu2UAgYE1kMjSE0sgVpAfyhdgz9mAwUQPJUQ12DzAP4',NULL,3),(6,'2023-02-09 13:00:14.265251','2023-02-16 08:41:32.996235','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjI3Njc1MTA5IiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTM2ODkyLCJleHAiOjE2ODQzMTI4OTJ9.XAx-DV9I4T74IYGpv53euI85myQK-LlIYNSujQ1OPxw',NULL,2),(7,'2023-02-09 13:45:43.144251','2023-02-09 13:45:43.144251','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc1OTUwMzQzLCJleHAiOjE2ODM3MjYzNDN9.itKC7fESfvGKDJYTBWK5WeSrn4SUhnl6h8-qtnaM_I8',5,NULL),(8,'2023-02-09 13:52:11.764481','2023-02-16 08:16:54.857896','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqeXNvbmc1ODdAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc2NTM1NDE0LCJleHAiOjE2ODQzMTE0MTR9.ccGFUx7uVgDIal5eMnnPQ0Y_YvR1lgSP_QW1wYyf9AA',6,NULL),(9,'2023-02-09 14:20:34.195227','2023-02-16 04:46:10.596667','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjQ1NTU3Njg5IiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTIyNzcwLCJleHAiOjE2ODQyOTg3NzB9.xGQUFk9IO1cDw0EwAMcwfNRXAxBNmMptm3IJxbd4Bzc',NULL,1),(10,'2023-02-09 15:42:13.938734','2023-02-15 14:22:37.678122','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YW5namluZWVAbmF2ZXIuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc2NDcwOTU3LCJleHAiOjE2ODQyNDY5NTd9.L8y4mAht9jAgyLm1E43JkTJTOgZAmysmIC9zzurn7fQ',7,NULL),(12,'2023-02-10 00:21:40.440000','2023-02-16 11:51:54.093593','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDQ3OTUzNzQ4Mjk3MTg5MDY0NDEiLCJwcm92aWRlciI6Imdvb2dsZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTQ4MzE0LCJleHAiOjE2ODQzMjQzMTR9.NaCKRzZhqLQbwRaedWQkQNf8EYB1ZwzSkWItya936KM',NULL,5),(13,'2023-02-10 00:56:55.127218','2023-02-10 01:29:00.936840','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTQ0Nzc4MTU0ODEzNzcyODY1OTUiLCJwcm92aWRlciI6Imdvb2dsZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc1OTkyNTQwLCJleHAiOjE2ODM3Njg1NDB9.y8zzR_-Fl5Gc0OBiZd5_aPMEMEX0tWPDwPv09T-2i80',NULL,6),(14,'2023-02-10 01:26:53.331347','2023-02-15 03:55:59.698200','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTAxNDg4OTA5MTYzNzM3NjI0NjkiLCJwcm92aWRlciI6Imdvb2dsZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NDMzMzU5LCJleHAiOjE2ODQyMDkzNTl9.Sus0Nyx453KahuPFf9UnIpwS2czfL-SXwD8u584ddwI',NULL,7),(15,'2023-02-10 01:36:31.845225','2023-02-16 17:10:40.398663','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjUyNDA4NjcxIiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTY3NDQwLCJleHAiOjE2ODQzNDM0NDB9._qB94dnS7SCKp5Fv1MDqOql5n-ic941Vl-ImNyV2Gdk',NULL,8),(16,'2023-02-10 02:00:43.409386','2023-02-16 12:58:06.169893','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyVDRTODZiQUhEZ1JMNGVCc3N5TURYMkdCSUhzTDg5X3dMckprV0ZHUm5jIiwicHJvdmlkZXIiOiJuYXZlciIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTUyMjg1LCJleHAiOjE2ODQzMjgyODV9.0d-lwKntDskVirKAxuzN6Q6JffpdGq8A_NuvnOib8QI',NULL,9),(17,'2023-02-10 02:03:46.857689','2023-02-16 11:47:23.012457','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDU0NTIzMjcwMjYyMDI0ODE5MzgiLCJwcm92aWRlciI6Imdvb2dsZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTQ4MDQyLCJleHAiOjE2ODQzMjQwNDJ9.aUEVxcJO-1EaVZsWZFJMyYFKkohsZdypWF16d2itfhw',NULL,10),(18,'2023-02-10 02:40:26.442851','2023-02-16 08:01:24.861165','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTE5MTYxNDkyNjkxMDIwNzYyMjIiLCJwcm92aWRlciI6Imdvb2dsZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTM0NDg0LCJleHAiOjE2ODQzMTA0ODR9.kKWRMYt0JlNinyoda0MYt7Gawd1EE8767m1_04rEwSs',NULL,11),(19,'2023-02-11 12:05:45.437355','2023-02-16 06:24:59.025305','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWtqZW91bmdob0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzY1Mjg2OTksImV4cCI6MTY4NDMwNDY5OX0.e5riEa6antfo4q-puUOvt59_GHiMWt2wD2i4PRYik6Y',8,NULL),(20,'2023-02-12 10:44:45.777736','2023-02-14 04:50:29.773757','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjYyNDgyMTE0IiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2MzUwMjI5LCJleHAiOjE2ODQxMjYyMjl9.kgdg1YqnXzILucpoYzb1tiiRE0qkLbM_rwttRs7oR64',NULL,12),(21,'2023-02-13 01:03:53.447033','2023-02-13 01:03:53.447033','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTYwMTEwMTgxNzEzMjM0NDA4OTciLCJwcm92aWRlciI6Imdvb2dsZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2MjUwMjMzLCJleHAiOjE2ODQwMjYyMzN9.eN_AiGWrt7IDiqI1tyKHcdUoUm-OT1qN5PvDF4xTMxA',NULL,13),(22,'2023-02-13 08:36:32.685469','2023-02-16 11:47:41.325003','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjQ0NjQyMzYzIiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTQ4MDYxLCJleHAiOjE2ODQzMjQwNjF9.OtpdRv0pDbKuKLE6xXOQ_dTNJv5WkjeyOoecW_YvkBo',NULL,14),(23,'2023-02-15 02:34:07.715095','2023-02-15 02:34:07.715095','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjY2ODM5NzE3IiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NDI4NDQ3LCJleHAiOjE2ODQyMDQ0NDd9._R5LkLPqnu11CGVsw7zdP-_OIpoXkfpPMYEShiG9-qo',NULL,15),(24,'2023-02-16 03:52:09.136061','2023-02-16 03:52:09.136061','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjY4Mzg5MDk0IiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTE5NTI5LCJleHAiOjE2ODQyOTU1Mjl9.EB9_2ePVvJ_doNenCSbLN3ATx8uRjv6KB-gYFP9ncRE',NULL,16),(25,'2023-02-16 04:46:01.892976','2023-02-16 04:46:01.892976','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2Q3NTMxQG5hdmVyLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NjUyMjc2MSwiZXhwIjoxNjg0Mjk4NzYxfQ.PiQ2Ony_dJqatr27P9NgbESiGYiElY-T0ylU6E73w_o',9,NULL),(26,'2023-02-16 04:46:04.496202','2023-02-16 04:46:04.496202','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoMTFAbmF2ZXIuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc2NTIyNzY0LCJleHAiOjE2ODQyOTg3NjR9.Ry9rqUeAj8HI4fvUh_u9I87Fqo-4VAevLdI6Iux2GbI',10,NULL),(27,'2023-02-16 04:46:19.087595','2023-02-16 04:46:19.087595','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTE2NTE1MTkyNTc1MjU3MzY2MzQiLCJwcm92aWRlciI6Imdvb2dsZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTIyNzc5LCJleHAiOjE2ODQyOTg3Nzl9.vcngio-gYR12_3mk6WAP0672_vOp5y2io74GakA9tUs',NULL,17),(28,'2023-02-16 08:00:36.188994','2023-02-16 08:00:36.188994','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsTWs3MDVzWUhjUUZZdjVvWGRPRjE2TTY1S1QwU1hROGZTTkV2OVEtekVvIiwicHJvdmlkZXIiOiJuYXZlciIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc2NTM0NDM2LCJleHAiOjE2ODQzMTA0MzZ9.SdyiA4dY5Gk24TySXIlgYhVl5mkmm5uWJ38U0NYDL04',NULL,18);
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `account_id` varchar(255) NOT NULL,
  `is_agree_location_provision` bit(1) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `provider` varchar(255) NOT NULL,
  `user_state` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-02-09 08:39:59.994554','2023-02-13 09:51:34.347891','2645557689',_binary '\0','심보현','http://k.kakaocdn.net/dn/h8gYG/btrgBJuXrCa/DpFOcFBKL7vPRNm6QgmL20/img_640x640.jpg','kakao',0),(2,'2023-02-09 08:41:13.959714','2023-02-14 15:45:07.687020','2627675109',_binary '\0','재원1','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b0a2c8a4-247a-4bca-b65d-72bc0c69121e.jpg','kakao',0),(3,'2023-02-09 12:57:58.464532','2023-02-14 21:18:54.559080','2644987791',_binary '','봄이로다','http://k.kakaocdn.net/dn/UGeXH/btrRn0nVLzJ/8R2J6dlRvPVJuXNvsX9uGK/img_640x640.jpg','kakao',0),(5,'2023-02-10 00:21:40.394767','2023-02-14 15:18:37.707955','104795374829718906441',_binary '\0','주영냥','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/aaec67ee-250a-4aa1-b927-fe90253ce267.jpeg','google',0),(6,'2023-02-10 00:56:55.080018','2023-02-10 01:25:20.316430','114477815481377286595',_binary '\0','심보현','https://lh3.googleusercontent.com/a/AEdFTp7sA6LZmEpbsfNlnMc4Y-2tIZz19V-n4oEog3aQ=s96-c','google',0),(7,'2023-02-10 01:26:53.282348','2023-02-10 01:27:08.485563','110148890916373762469',_binary '\0','재원2','https://lh3.googleusercontent.com/a/AEdFTp5X22GsBSmjk9NxfY0-n8mO1lQBj4ZOGHq693DY=s96-c','google',0),(8,'2023-02-10 01:36:31.813170','2023-02-14 23:18:55.241944','2652408671',_binary '\0','양희진','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d28a017f-8a12-409f-9dc7-6286cc1ac7b3.jpg','kakao',0),(9,'2023-02-10 02:00:42.295927','2023-02-16 17:00:58.847876','rT4S86bAHDgRL4eBssyMDX2GBIHsL89_wLrJkWFGRnc',_binary '','길에 사는 집사','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c088608a-9350-4f80-953b-ae19a1929f51.jpg','naver',0),(10,'2023-02-10 02:03:46.767309','2023-02-16 20:52:07.883887','105452327026202481938',_binary '\0','개냥이','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/b6c3c2f1-9d5c-4a5f-b5ca-e322d9b50374.jpeg','google',0),(11,'2023-02-10 02:40:26.126393','2023-02-16 17:07:15.338859','111916149269102076222',_binary '','고양이 싫어','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/84bec487-f04a-40e7-9a72-db4c74088f33.jpg','google',0),(12,'2023-02-12 10:44:45.674108','2023-02-13 14:22:44.221014','2662482114',_binary '\0',' coach2','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/a9a08e56-6358-4564-9cdf-b0dd531f9c84.png','kakao',0),(13,'2023-02-13 01:03:53.329156','2023-02-13 01:03:53.428909','116011018171323440897',_binary '\0','사용자-13','https://lh3.googleusercontent.com/a/AEdFTp73GKNIE-_v5I2L0bdpXQwQPPQS-a7Vw7B93qUh=s96-c','google',0),(14,'2023-02-13 08:36:32.466535','2023-02-16 14:26:19.685471','2644642363',_binary '\0','Jay Pak','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/18dc9d24-5ad8-4424-958d-d4709b9c5f2d.jpeg','kakao',0),(15,'2023-02-15 02:34:07.535306','2023-02-15 02:34:07.696088','2666839717',_binary '\0','사용자-15','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','kakao',0),(16,'2023-02-16 03:52:08.997590','2023-02-16 03:52:09.106185','2668389094',_binary '\0','사용자-16','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','kakao',0),(17,'2023-02-16 04:46:19.002477','2023-02-16 04:46:19.056095','111651519257525736634',_binary '\0','사용자-17','https://lh3.googleusercontent.com/a/AEdFTp6y4q8QCUjbs-an8KC-t5Nv_jDH4RY6L-USXaXj=s96-c','google',0),(18,'2023-02-16 08:00:36.126595','2023-02-16 17:01:19.888139','lMk705sYHcQFYv5oXdOF16M65KT0SXQ8fSNEv9Q-zEo',_binary '\0','박정호',NULL,'naver',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_alarm`
--

DROP TABLE IF EXISTS `user_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_alarm` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `alarm_code` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `target_url` varchar(255) DEFAULT NULL,
  `target_user_url` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3jy4cegmgsfqg0ngckvty90f6` (`user_id`),
  CONSTRAINT `FK3jy4cegmgsfqg0ngckvty90f6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_alarm`
--

LOCK TABLES `user_alarm` WRITE;
/*!40000 ALTER TABLE `user_alarm` DISABLE KEYS */;
INSERT INTO `user_alarm` VALUES (1,'2023-02-10 01:23:53.078574','2023-02-10 01:23:53.078574',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/27e388b5-cb81-4c0b-ad30-4896bffb6c49.jpeg',0,'/map/dish/1/1',NULL,1),(2,'2023-02-10 02:07:43.865742','2023-02-12 15:28:18.214934',211,'냥그릇 냥그릇 T1에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7173ffc7-e7f8-446b-9409-9f57d4cb9e61.jpg',1,'/map/dish/1/3',NULL,3),(5,'2023-02-12 10:41:15.764320','2023-02-12 10:41:15.764320',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/27e388b5-cb81-4c0b-ad30-4896bffb6c49.jpeg',0,'/map/dish/1/1',NULL,1),(6,'2023-02-12 10:41:15.770940','2023-02-12 10:41:15.770940',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/27e388b5-cb81-4c0b-ad30-4896bffb6c49.jpeg',0,'/map/dish/1/1',NULL,1),(7,'2023-02-12 15:27:59.376365','2023-02-15 11:32:19.293616',221,'게시글 \"저희집 고양이가 너...\"을 사용자-3 님이 좋아합니다!','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/c2e30b3e-263d-4a48-8ba9-182bbade77fa.jpeg',2,'/community/detail/3',NULL,2),(8,'2023-02-13 00:04:02.754367','2023-02-13 00:04:02.754367',221,'게시글 \"무한 스크롤을 위한...\"을 사용자-1 님이 좋아합니다!',NULL,0,'/community/detail/71',NULL,1),(9,'2023-02-13 00:04:04.117450','2023-02-13 00:04:04.117450',221,'게시글 \"무한 스크롤을 위한...\"을 사용자-1 님이 좋아합니다!',NULL,0,'/community/detail/70',NULL,1),(10,'2023-02-13 11:56:20.084921','2023-02-13 11:56:20.084921',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e18375af-d77b-408f-b45d-a4911e8c05b4.jpeg',0,'/map/dish/1/1',NULL,1),(11,'2023-02-13 11:56:20.089480','2023-02-13 11:56:20.089480',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e18375af-d77b-408f-b45d-a4911e8c05b4.jpeg',0,'/map/dish/1/1',NULL,1),(12,'2023-02-13 14:26:22.824697','2023-02-13 14:26:22.824697',221,'게시글 \"무한 스크롤을 위한...\"을 양희진 님이 좋아합니다!',NULL,0,'/community/detail/60',NULL,1),(13,'2023-02-13 14:45:34.320800','2023-02-13 14:45:34.320800',222,'게시글 \"무한 스크롤을 위한...\"에 심보현 님의 댓글 \"123\"',NULL,0,'/community/detail/73',NULL,1),(14,'2023-02-14 11:32:48.938374','2023-02-15 11:32:18.742634',221,'게시글 \"저희집 고양이가 너...\"을 재원1 님이 좋아합니다!',NULL,2,'/community/detail/3',NULL,2),(15,'2023-02-14 12:59:55.251154','2023-02-14 12:59:55.251154',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e18375af-d77b-408f-b45d-a4911e8c05b4.jpeg',0,'/map/dish/1/1',NULL,1),(16,'2023-02-14 12:59:55.292084','2023-02-14 12:59:55.292084',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e18375af-d77b-408f-b45d-a4911e8c05b4.jpeg',0,'/map/dish/1/1',NULL,1),(17,'2023-02-14 15:06:59.175785','2023-02-15 11:32:18.322336',222,'게시글 \"저희집 고양이가 너...\"에 Juuu1131 님의 댓글 \"재원님 고양이 어딨어요?\"',NULL,2,'/community/detail/3',NULL,2),(19,'2023-02-14 17:12:37.959248','2023-02-14 17:12:37.959248',221,'게시글 \"고양이 귀여워\"을 사용자-9 님이 좋아합니다!',NULL,0,'/community/detail/102',NULL,9),(20,'2023-02-14 21:06:42.832697','2023-02-14 21:09:13.790585',222,'게시글 \"고양이가 너무 많이...\"에 심보현 님의 댓글 \"댓글입니다.\"',NULL,1,'/community/detail/54',NULL,3),(21,'2023-02-14 21:07:59.536348','2023-02-14 21:07:59.536348',221,'게시글 \"고양이가 너무 귀여...\"을 심보현 님이 좋아합니다!','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d214da05-b727-4c9a-8db8-44436804dde9.jpeg',0,'/community/detail/105',NULL,1),(22,'2023-02-14 21:08:33.458645','2023-02-14 21:08:33.458645',221,'게시글 \"최신글입니다.\"을 심보현 님이 좋아합니다!',NULL,0,'/community/detail/101',NULL,1),(23,'2023-02-14 21:08:38.123115','2023-02-14 21:08:38.123115',222,'게시글 \"최신글입니다.\"에 심보현 님의 댓글 \"댓글입니다.\"',NULL,0,'/community/detail/101',NULL,1),(24,'2023-02-14 21:08:46.357488','2023-02-14 21:09:06.579755',222,'게시글 \"고양이가 너무 귀여...\"에 봄이로다 님의 댓글 \"야옹아 멍멍해봐\"','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d214da05-b727-4c9a-8db8-44436804dde9.jpeg',1,'/community/detail/105',NULL,1),(25,'2023-02-14 21:19:56.826874','2023-02-16 18:52:19.252019',221,'게시글 \"고양이입니당!\"을 봄이로다 님이 좋아합니다!','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8fcdd8da-5337-4b0b-8e1e-4d1f5dbb90e5.jpeg',2,'/community/detail/103',NULL,5),(26,'2023-02-14 21:20:04.345033','2023-02-16 18:52:18.832717',222,'게시글 \"고양이입니당!\"에 봄이로다 님의 댓글 \"귀여워요!\"','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/8fcdd8da-5337-4b0b-8e1e-4d1f5dbb90e5.jpeg',2,'/community/detail/103',NULL,5),(27,'2023-02-15 10:36:11.099600','2023-02-15 11:32:17.788508',221,'게시글 \"밤마다 고양이가 너...\"을 재원1 님이 좋아합니다!',NULL,2,'/community/detail/4',NULL,2),(28,'2023-02-15 11:32:10.423548','2023-02-15 11:32:10.423548',222,'게시글 \"요새 고양이가 안보...\"에 재원1 님의 댓글 \"추워서 없나봐요\"',NULL,0,'/community/detail/106',NULL,8),(29,'2023-02-15 11:32:14.528412','2023-02-15 11:32:14.528412',221,'게시글 \"요새 고양이가 안보...\"을 재원1 님이 좋아합니다!',NULL,0,'/community/detail/106',NULL,8),(30,'2023-02-15 11:56:01.990042','2023-02-15 11:56:36.943670',222,'게시글 \"밤마다 고양이가 너...\"에 재원1 님의 댓글 \"백색소음입니다\"',NULL,2,'/community/detail/4',NULL,2),(31,'2023-02-15 20:43:19.095622','2023-02-16 18:52:18.357147',223,'게시글 \"장군이 못생김\"이 블락처리 되었습니다.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e30649df-e24a-4e14-99b0-d3bf829a605a.jpeg',2,'/community/detail/109',NULL,5),(32,'2023-02-16 08:50:39.059321','2023-02-16 08:50:39.059321',211,'냥그릇 냥그릇 1호에 사료가 없어요.','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e18375af-d77b-408f-b45d-a4911e8c05b4.jpeg',0,'/map/dish/1/1',NULL,1),(33,'2023-02-16 08:53:27.483285','2023-02-16 16:38:48.131720',222,'게시글 \"고양이 짱귀여워\"에 재원1 님의 댓글 \"응\"','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7d3cfd12-f288-4675-af97-ab8cd3121315.png',2,'/community/detail/111',NULL,2),(34,'2023-02-16 08:53:50.104888','2023-02-16 16:38:47.586410',221,'게시글 \"고양이 짱귀여워\"을 재원1 님이 좋아합니다!','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/7d3cfd12-f288-4675-af97-ab8cd3121315.png',2,'/community/detail/111',NULL,2),(35,'2023-02-16 13:41:12.943452','2023-02-16 13:41:12.943452',222,'게시글 \"요새 고양이가 안보...\"에 봄이로다 님의 댓글 \"오늘 밥 먹었어요! \"',NULL,0,'/community/detail/106',NULL,8),(36,'2023-02-16 16:38:29.673471','2023-02-16 16:38:29.673471',222,'게시글 \"장군이 못생김\"에 재원1 님의 댓글 \"장군이가 어때서요 ㅜㅜ\"','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/e1e11a32-c5f8-4eb3-a3c2-0375c2ef1f27.jpeg',0,'/community/detail/118',NULL,14),(37,'2023-02-16 20:51:47.492820','2023-02-16 20:51:47.492820',222,'게시글 \"장군이가 더 귀여움...\"에 사용자-10 님의 댓글 \"노노\"','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/d50371d3-304a-4260-a8c9-e37c322c1b6e.jpeg',0,'/community/detail/121',NULL,14),(38,'2023-02-16 21:58:47.471359','2023-02-16 21:59:46.841546',222,'게시글 \"밤마다 고양이가 너...\"에 길에 사는 집사 님의 댓글 \"ㅜㅜㅜㅜ\"',NULL,1,'/community/detail/4',NULL,2),(39,'2023-02-16 22:27:26.716993','2023-02-16 22:27:26.716993',221,'게시글 \"커뮤니티 수정\"을 심보현 님이 좋아합니다!',NULL,0,'/community/detail/123',NULL,1),(40,'2023-02-16 22:35:30.698288','2023-02-16 22:35:30.698288',222,'게시글 \"커뮤니티 수정\"에 심보현 님의 댓글 \"댓글입니다.\"',NULL,0,'/community/detail/123',NULL,1),(41,'2023-02-17 08:48:03.776362','2023-02-17 08:48:03.776362',222,'게시글 \"귀여움 + 귀여움 ...\"에 재원1 님의 댓글 \"오 ~~!! 너무 귀여워\"','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/58a38935-7390-4799-9dc4-95ef119e41f4.jpeg',0,'/community/detail/124',NULL,3),(42,'2023-02-17 08:48:06.651816','2023-02-17 08:48:06.651816',221,'게시글 \"귀여움 + 귀여움 ...\"을 재원1 님이 좋아합니다!','https://cat-ssafy.s3.ap-northeast-2.amazonaws.com/58a38935-7390-4799-9dc4-95ef119e41f4.jpeg',0,'/community/detail/124',NULL,3);
/*!40000 ALTER TABLE `user_alarm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:02:22
