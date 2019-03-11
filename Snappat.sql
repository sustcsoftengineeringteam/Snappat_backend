-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2019-03-11 04:08:58
-- 服务器版本： 8.0.12
-- PHP 版本： 7.1.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `Snappat`
--

-- --------------------------------------------------------

--
-- 表的结构 `sp_users`
--

CREATE TABLE `sp_users` (
  `id` int(100) NOT NULL COMMENT '编号',
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '未命名' COMMENT '用户名',
  `phone` varchar(20) NOT NULL COMMENT '手机号码',
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户简介',
  `location` varchar(2000) NOT NULL DEFAULT '{}' COMMENT '用户的地理位置JSON,该JSON可直接发送给百度地图',
  `age` int(10) NOT NULL DEFAULT '0' COMMENT '用户年龄',
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '男' COMMENT '用户性别',
  `coin` int(100) NOT NULL DEFAULT '0' COMMENT '用户积分、金币',
  `avator` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '头像的图片链接',
  `follower` varchar(2000) DEFAULT '[]' COMMENT '关注你的人(你的粉丝)',
  `star` varchar(2000) NOT NULL DEFAULT '[]' COMMENT '你关注的人',
  `mystery` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户发布的素有谜题',
  `history` text NOT NULL COMMENT '用户解密成功的谜题',
  `message` text COMMENT '用户离线时收到的消息会存储在这里'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sp_users`
--

INSERT INTO `sp_users` (`id`, `username`, `phone`, `description`, `location`, `age`, `gender`, `coin`, `avator`, `follower`, `star`, `mystery`, `history`, `message`) VALUES
(1, '测试机器人1', '13711111111', '测试机器人1', '{}', 1, '男', 0, '', '[]', '[]', '[]', '[]', '[]'),
(2, '未命名', '13811111111', '', '{}', 0, '男', 0, '', '[]', '[]', '[]', '[]', '[]');

--
-- 转储表的索引
--

--
-- 表的索引 `sp_users`
--
ALTER TABLE `sp_users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sp_users`
--
ALTER TABLE `sp_users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT '编号', AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
