/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Banner`;
CREATE TABLE `Banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `CumRap`;
CREATE TABLE `CumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DatVe`;
CREATE TABLE `DatVe` (
  `STT_Ve` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` int DEFAULT NULL,
  `ma_lich_chieu` int DEFAULT NULL,
  `ma_ghe` int DEFAULT NULL,
  PRIMARY KEY (`STT_Ve`),
  KEY `tai_khoan` (`tai_khoan`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung` (`tai_khoan`),
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Ghe`;
CREATE TABLE `Ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) DEFAULT NULL,
  `loai_ghe` varchar(255) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `HeThongRap`;
CREATE TABLE `HeThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `LichChieu`;
CREATE TABLE `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` datetime DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_phim` (`ma_phim`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`),
  CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `NguoiDung`;
CREATE TABLE `NguoiDung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `so_dt` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `loai_nguoi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Phim`;
CREATE TABLE `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `SAP_CHIEU` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `RapPhim`;
CREATE TABLE `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(3, 3, 'Banner_hinh_anh_3.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(4, 4, 'Banner_hinh_anh_4.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(5, 5, 'Banner_hinh_anh_5.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(6, 6, 'Banner_hinh_anh_6.jpg'),
(7, 7, 'Banner_hinh_anh_7.jpg'),
(8, 8, 'Banner_hinh_anh_8.jpg'),
(9, 9, 'Banner_hinh_anh_9.jpg'),
(10, 10, 'Banner_hinh_anh_10.jpg');

INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'Cum rap 1', 'Dia chi 1', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'Cum rap 2', 'Dia chi 2', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'Cum rap 3', 'Dia chi 3', 2);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(4, 'Cum rap 4', 'Dia chi 4', 2),
(5, 'Cum rap 5', 'Dia chi 5', 3),
(6, 'Cum rap 6', 'Dia chi 6', 3),
(7, 'Cum rap 7', 'Dia chi 7', 4),
(8, 'Cum rap 8', 'Dia chi 8', 4),
(9, 'Cum rap 9', 'Dia chi 9', 5),
(10, 'Cum rap 10', 'Dia chi 10', 5);

INSERT INTO `DatVe` (`STT_Ve`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(1, 13, 3, 4);
INSERT INTO `DatVe` (`STT_Ve`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(2, 13, 1, 4);
INSERT INTO `DatVe` (`STT_Ve`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(3, 13, 3, 2);

INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(3, 'Ghe 3', 'Loai 3', 3);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(4, 'Ghe 4', 'Loai 4', 4);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(5, 'Ghe 5', 'Loai 5', 5);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(6, 'Ghe 6', 'Loai 6', 6),
(7, 'Ghe 7', 'Loai 7', 7),
(8, 'Ghe 8', 'Loai 8', 8),
(9, 'Ghe 9', 'Loai 9', 9),
(10, 'Ghe 10', 'Loai 10', 10);

INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'He thong rap 1', 'Logo_1.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'He thong rap 2', 'Logo_2.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'He thong rap 3', 'Logo_3.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'He thong rap 4', 'Logo_4.jpg'),
(5, 'He thong rap 5', 'Logo_5.jpg'),
(6, 'He thong rap 6', 'Logo_6.jpg'),
(7, 'He thong rap 7', 'Logo_7.jpg'),
(8, 'He thong rap 8', 'Logo_8.jpg'),
(9, 'He thong rap 9', 'Logo_9.jpg'),
(10, 'He thong rap 10', 'Logo_10.jpg');

INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 3, '2022-03-01 18:00:00', 100000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(2, 2, 4, '2022-04-01 19:30:00', 120000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 3, 5, '2022-05-01 20:00:00', 90000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 4, 6, '2022-06-01 21:15:00', 110000),
(5, 5, 7, '2022-07-01 22:30:00', 95000),
(6, 6, 8, '2022-08-01 23:45:00', 130000),
(7, 7, 9, '2022-09-01 12:30:00', 85000),
(8, 8, 10, '2022-10-01 14:45:00', 105000);

INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'User 1', 'user1@example.com', '123456789', 'password1', 'Loai 1');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(2, 'User 2', 'user2@example.com', '987654321', 'password2', 'Loai 2');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(3, 'User 3', 'user3@example.com', '111222333', 'password3', 'Loai 1');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(4, 'User 4', 'user4@example.com', '444555666', 'password4', 'Loai 2'),
(5, 'User 5', 'user5@example.com', '777888999', 'password5', 'Loai 1'),
(6, 'User 6', 'user6@example.com', '000111222', 'password6', 'Loai 2'),
(7, 'User 7', 'user7@example.com', '333444555', 'password7', 'Loai 1'),
(8, 'User 8', 'user8@example.com', '666777888', 'password8', 'Loai 2'),
(9, 'User 9', 'user9@example.com', '999000111', 'password9', 'Loai 1'),
(10, 'User 10', 'user10@example.com', '222333444', 'password10', 'Loai 2'),
(12, 'Pham Tien Manh', 'test1@gmail.com', '02222222', '$2b$10$MUG0.pAWjE0ikO9PHqL2sOOjlndnwKqJ.BFoTGNfE/VQp8F1FY1iK', 'Loai 1'),
(13, 'Pham Tien Manh', 'test2@gmail.com', '02222222', '$2b$10$iGqqnwN0E7IESpK6dvYzzefntDqKK0qoNVco0y.3H5E7Nxhea0joy', 'Loai 1'),
(14, 'DuyHoang', 'example1@email.com', '123456789', '$2b$10$C1H437pNEMvzOgSOZ1AZUebi4.xs7ZXJuXT39rJ5P28liDXFc/mCe', 'admin');

INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `SAP_CHIEU`) VALUES
(3, 'Phim 3', 'Trailer 3', 'Hinh_anh_3.jpg', 'Mo ta phim 3', '2022-03-01', 9, 1, 1, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `SAP_CHIEU`) VALUES
(4, 'Phim 4', 'Trailer 4', 'Hinh_anh_4.jpg', 'Mo ta phim 4', '2022-04-01', 6, 0, 1, 1);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `SAP_CHIEU`) VALUES
(5, 'Phim 5', 'Trailer 5', 'Hinh_anh_5.jpg', 'Mo ta phim 5', '2022-05-01', 8, 1, 0, 1);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `SAP_CHIEU`) VALUES
(6, 'Phim 6', 'Trailer 6', 'Hinh_anh_6.jpg', 'Mo ta phim 6', '2022-06-01', 7, 0, 1, 0),
(7, 'Phim 7', 'Trailer 7', 'Hinh_anh_7.jpg', 'Mo ta phim 7', '2022-07-01', 9, 1, 1, 0),
(8, 'Phim 8', 'Trailer 8', 'Hinh_anh_8.jpg', 'Mo ta phim 8', '2022-08-01', 6, 0, 1, 1),
(9, 'Phim 9', 'Trailer 9', 'Hinh_anh_9.jpg', 'Mo ta phim 9', '2022-09-01', 8, 1, 0, 1),
(10, 'Phim 10', 'Trailer 10', 'Hinh_anh_10.jpg', 'Mo ta phim 10', '2022-10-01', 7, 0, 1, 0),
(11, 'Phim 11', 'Trailer 11', 'Hinh_anh_11.jpg', 'Mo ta phim 11', '2022-11-01', 7, 1, 0, 1),
(12, 'Phim 12', 'Trailer 12', 'Hinh_anh_12.jpg', 'mo ta phim 12', '2022-12-01', 10, 0, 1, 0),
(13, 'Phim 13', 'Trailer 13', 'Hinh_anh_13.jpg', 'mo ta phim 13', '2022-12-02', 11, 0, 1, 0),
(14, 'Phim 14', 'Trailer 14', 'Hinh_anh_14.jpg', 'mo ta phim 14', '2022-12-03', 12, 0, 1, 0),
(15, 'Phim 15', 'Trailer 15', 'Hinh_anh_15.jpg', 'mo ta phim 15', '2022-12-04', 13, 0, 1, 0),
(16, 'Phim 16', 'Trailer 16', 'Hinh_anh_16.jpg', 'mo ta phim 16', '2022-12-05', 14, 0, 1, 0),
(17, 'Phim 17', 'Trailer 17', 'Hinh_anh_17.jpg', 'mo ta phim 17', '2022-12-06', 15, 0, 1, 0),
(18, 'Phim 18', 'Trailer 18', 'Hinh_anh_18.jpg', 'mo ta phim 18', '2022-12-07', 16, 0, 1, 0),
(19, 'Phim 19', 'Trailer 19', 'Hinh_anh_19.jpg', 'mo ta phim 19', '2022-12-08', 17, 0, 1, 0),
(20, 'Phim 20', 'Trailer 20', 'Hinh_anh_20.jpg', 'mo ta phim 20', '2022-12-09', 18, 0, 1, 0),
(22, 'Phim 21', 'Trailer 21', 'Hinh_anh_21.jpg', 'Mo ta phim 21', '2022-12-01', 10, 0, 1, 0),
(23, 'Phim 22', 'Trailer 22', 'Hinh_anh_22.jpg', 'Mo ta phim 22', '2022-12-02', 9, 1, 1, 0),
(24, 'Phim 23', 'Trailer 23', 'Hinh_anh_23.jpg', 'Mo ta phim 23', '2022-12-03', 8, 1, 1, 0),
(25, 'Phim 24', 'Trailer 24', 'Hinh_anh_24.jpg', 'Mo ta phim 24', '2022-12-04', 7, 0, 1, 0),
(26, 'Phim 25', 'Trailer 25', 'Hinh_anh_25.jpg', 'Mo ta phim 25', '2022-12-05', 8, 1, 1, 0),
(27, 'Phim 26', 'Trailer 26', 'Hinh_anh_26.jpg', 'Mo ta phim 26', '2022-12-06', 9, 1, 1, 0),
(28, 'Phim 27', 'Trailer 27', 'Hinh_anh_27.jpg', 'Mo ta phim 27', '2022-12-07', 7, 0, 1, 0),
(29, 'Phim 28', 'Trailer 28', 'Hinh_anh_28.jpg', 'Mo ta phim 28', '2022-12-08', 8, 1, 1, 0);

INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'Rap 1', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'Rap 2', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'Rap 3', 2);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'Rap 4', 2),
(5, 'Rap 5', 3),
(6, 'Rap 6', 3),
(7, 'Rap 7', 4),
(8, 'Rap 8', 4),
(9, 'Rap 9', 5),
(10, 'Rap 10', 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;