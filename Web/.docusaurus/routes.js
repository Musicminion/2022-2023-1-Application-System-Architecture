import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '505'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'c97'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '6e0'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'ca6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '2c7'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'fe3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '6af'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '74f'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'fd5'),
    routes: [
      {
        path: '/docs/category/模块一-web开发进阶',
        component: ComponentCreator('/docs/category/模块一-web开发进阶', '163'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/category/模块三-运维和集群',
        component: ComponentCreator('/docs/category/模块三-运维和集群', 'f0f'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/category/模块二-数据库部分',
        component: ComponentCreator('/docs/category/模块二-数据库部分', 'e23'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/homework/intro',
        component: ComponentCreator('/docs/homework/intro', '0de'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业01:事务与管理',
        component: ComponentCreator('/docs/homework/作业01:事务与管理', 'd87'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业02:Kafka 消息中间件',
        component: ComponentCreator('/docs/homework/作业02:Kafka 消息中间件', '329'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业03:Websocket与线程安全',
        component: ComponentCreator('/docs/homework/作业03:Websocket与线程安全', '376'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业04:SSL',
        component: ComponentCreator('/docs/homework/作业04:SSL', 'd82'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业05:Redis缓存',
        component: ComponentCreator('/docs/homework/作业05:Redis缓存', 'ff5'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业06:全文搜索',
        component: ComponentCreator('/docs/homework/作业06:全文搜索', '390'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业07:微服务',
        component: ComponentCreator('/docs/homework/作业07:微服务', '63c'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业08:课堂签到小测',
        component: ComponentCreator('/docs/homework/作业08:课堂签到小测', '57f'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业09:数据库',
        component: ComponentCreator('/docs/homework/作业09:数据库', '33b'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业10:数据库备份',
        component: ComponentCreator('/docs/homework/作业10:数据库备份', 'b93'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业11:MongoDB和Neo4j数据库',
        component: ComponentCreator('/docs/homework/作业11:MongoDB和Neo4j数据库', '4b1'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/homework/作业12:TSDB & Cluster',
        component: ComponentCreator('/docs/homework/作业12:TSDB & Cluster', 'f91'),
        exact: true,
        sidebar: "homeworkSidebar"
      },
      {
        path: '/docs/review/intro',
        component: ComponentCreator('/docs/review/intro', 'cd6'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第01章 实例',
        component: ComponentCreator('/docs/review/Web开发进阶/第01章 实例', 'e42'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第02章 事务',
        component: ComponentCreator('/docs/review/Web开发进阶/第02章 事务', '828'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第03章 Message',
        component: ComponentCreator('/docs/review/Web开发进阶/第03章 Message', '7b5'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第04章 Kafka',
        component: ComponentCreator('/docs/review/Web开发进阶/第04章 Kafka', 'd4e'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第05章 WebSocket',
        component: ComponentCreator('/docs/review/Web开发进阶/第05章 WebSocket', '945'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第06章 多线程',
        component: ComponentCreator('/docs/review/Web开发进阶/第06章 多线程', '029'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第07章 安全',
        component: ComponentCreator('/docs/review/Web开发进阶/第07章 安全', 'c93'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第08章 jwt与SSO',
        component: ComponentCreator('/docs/review/Web开发进阶/第08章 jwt与SSO', 'd90'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第09章 缓存和Redis',
        component: ComponentCreator('/docs/review/Web开发进阶/第09章 缓存和Redis', 'e53'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第10章 全文搜索',
        component: ComponentCreator('/docs/review/Web开发进阶/第10章 全文搜索', 'd58'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第11章 Web服务',
        component: ComponentCreator('/docs/review/Web开发进阶/第11章 Web服务', '542'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/Web开发进阶/第12章 微服务',
        component: ComponentCreator('/docs/review/Web开发进阶/第12章 微服务', 'ffe'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第13-14章 范式',
        component: ComponentCreator('/docs/review/数据库部分/第13-14章 范式', 'dd4'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第15章 MySQL优化（一）',
        component: ComponentCreator('/docs/review/数据库部分/第15章 MySQL优化（一）', '4f4'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第16章 MySQL优化（二）',
        component: ComponentCreator('/docs/review/数据库部分/第16章 MySQL优化（二）', '4ed'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第17章 MySQL备份和恢复',
        component: ComponentCreator('/docs/review/数据库部分/第17章 MySQL备份和恢复', '76f'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第18章 MySQL分区',
        component: ComponentCreator('/docs/review/数据库部分/第18章 MySQL分区', 'a35'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第19章 MongoDB',
        component: ComponentCreator('/docs/review/数据库部分/第19章 MongoDB', '3e9'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第20章 图数据库',
        component: ComponentCreator('/docs/review/数据库部分/第20章 图数据库', '1bf'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第21章 时序数据库',
        component: ComponentCreator('/docs/review/数据库部分/第21章 时序数据库', 'e0d'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/数据库部分/第22章 数据湖',
        component: ComponentCreator('/docs/review/数据库部分/第22章 数据湖', '484'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/运维和集群部分/第23章 集群',
        component: ComponentCreator('/docs/review/运维和集群部分/第23章 集群', 'c8d'),
        exact: true,
        sidebar: "reviewSidebar"
      },
      {
        path: '/docs/review/运维和集群部分/第24章 Hadoop MR',
        component: ComponentCreator('/docs/review/运维和集群部分/第24章 Hadoop MR', '691'),
        exact: true,
        sidebar: "reviewSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '152'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
