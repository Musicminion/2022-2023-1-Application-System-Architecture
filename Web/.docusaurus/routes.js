import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '825'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'adf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'd2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'a8e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '712'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'cd9'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '528'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '99b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '2cb'),
    routes: [
      {
        path: '/docs/category/模块一-web开发进阶',
        component: ComponentCreator('/docs/category/模块一-web开发进阶', 'f43'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/模块三-运维和集群',
        component: ComponentCreator('/docs/category/模块三-运维和集群', '0f2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/模块二-数据库部分',
        component: ComponentCreator('/docs/category/模块二-数据库部分', '5bb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第01章 实例',
        component: ComponentCreator('/docs/Web开发进阶/第01章 实例', '5bf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第02章 事务',
        component: ComponentCreator('/docs/Web开发进阶/第02章 事务', 'afe'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第03章 Message',
        component: ComponentCreator('/docs/Web开发进阶/第03章 Message', 'ee3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第04章 Kafka',
        component: ComponentCreator('/docs/Web开发进阶/第04章 Kafka', '5e8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第05章 WebSocket',
        component: ComponentCreator('/docs/Web开发进阶/第05章 WebSocket', '8e6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第06章 多线程',
        component: ComponentCreator('/docs/Web开发进阶/第06章 多线程', '4e6'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第07章 安全',
        component: ComponentCreator('/docs/Web开发进阶/第07章 安全', 'a2b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第08章 jwt与SSO',
        component: ComponentCreator('/docs/Web开发进阶/第08章 jwt与SSO', '453'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第09章 缓存和Redis',
        component: ComponentCreator('/docs/Web开发进阶/第09章 缓存和Redis', 'f16'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第10章 全文搜索',
        component: ComponentCreator('/docs/Web开发进阶/第10章 全文搜索', 'e5b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第11章 Web服务',
        component: ComponentCreator('/docs/Web开发进阶/第11章 Web服务', '80a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Web开发进阶/第12章 微服务',
        component: ComponentCreator('/docs/Web开发进阶/第12章 微服务', 'cae'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第13-14章 范式',
        component: ComponentCreator('/docs/数据库部分/第13-14章 范式', '7c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第15章 MySQL优化（一）',
        component: ComponentCreator('/docs/数据库部分/第15章 MySQL优化（一）', 'd6f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第16章 MySQL优化（二）',
        component: ComponentCreator('/docs/数据库部分/第16章 MySQL优化（二）', '4ca'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第17章 MySQL备份和恢复',
        component: ComponentCreator('/docs/数据库部分/第17章 MySQL备份和恢复', '04b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第18章 MySQL分区',
        component: ComponentCreator('/docs/数据库部分/第18章 MySQL分区', '2f3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第19章 MongoDB',
        component: ComponentCreator('/docs/数据库部分/第19章 MongoDB', '065'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第20章 图数据库',
        component: ComponentCreator('/docs/数据库部分/第20章 图数据库', '74b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第21章 时序数据库',
        component: ComponentCreator('/docs/数据库部分/第21章 时序数据库', '156'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/数据库部分/第22章 数据湖',
        component: ComponentCreator('/docs/数据库部分/第22章 数据湖', 'a11'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/运维和集群部分/第23章 集群',
        component: ComponentCreator('/docs/运维和集群部分/第23章 集群', '86b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/运维和集群部分/第24章 Hadoop MR',
        component: ComponentCreator('/docs/运维和集群部分/第24章 Hadoop MR', 'dda'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '68a'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
