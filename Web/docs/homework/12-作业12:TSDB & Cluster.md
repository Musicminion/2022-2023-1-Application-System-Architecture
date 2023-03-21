---
sidebar_position: 13
---

### 作业12 TSDB & Cluster

#### 一、时序数据库部分

先到官网查看下载方法，我下载的版本是2.6.1：[下载地址](https://portal.influxdata.com/downloads/)

安装InfluxDB的命令

```shell
# MacOS 方法 命令行
brew update
brew install influxdb

# Winodws方法 命令行 
# SHA256: c84c8237c74e795b88cc5ddc6f90a2c0db18f5b71e58deac28c3c69adbba1a53
wget https://dl.influxdata.com/influxdb/releases/influxdb2-2.6.1-windows-amd64.zip -UseBasicParsing -OutFile influxdb2-2.6.1-windows-amd64.zip
Expand-Archive .\influxdb2-2.6.1-windows-amd64.zip -DestinationPath 'C:\Program Files\InfluxData\influxdb\'
```

安装Telegraf采集数据的工具

```shell
# MacOS 方法 命令行
brew update
brew install telegraf

# Winodws方法 命令行 
# SHA256: cb51a71313c62ddfd327b199346d8f87f39721e11cca01780173717961d9757a
wget https://dl.influxdata.com/telegraf/releases/telegraf-1.25.0_windows_amd64.zip -UseBasicParsing -OutFile telegraf-1.25.0_windows_amd64.zip
Expand-Archive .\telegraf-1.25.0_windows_amd64.zip -DestinationPath 'C:\Program Files\InfluxData\telegraf'
```

安装好之后，启动数据库，然后用浏览器访问：`http://localhost:8086/`(推荐Chrome浏览器，edge好像打不开网页)

```shell
influxd
```

按照教程配置好之后，得到Token还有启动的命令：

```
export INFLUX_TOKEN=gpDfH1EX6Ao6dTab54KbaHnw7br0DMfxUVH_UI5wPzzdkEHfP0Wk1ObhP67P_ETNhnY_7pO9sAGl2kVREz57Qg==
telegraf --config http://localhost:8086/api/v2/telegrafs/0a8462d6e0af2000
```

值得注意的是，默认只会监控System，也就是输出只有一张表，为了跟上课演示的一样的效果，需要编辑配置文件，然后加入后面的几行：

```
[[inputs.system]]

[[inputs.mem]]

[[inputs.disk]]

[[inputs.diskio]]

[[inputs.net]]

```

![截屏2022-12-30 14.13.56](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2014.13.56.png)

##### 补充：Mac的brew的换源的方法

```
# 替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# 替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

最后展示一下效果：

(监控CPU的空闲)

![截屏2022-12-30 14.15.41](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2014.15.41.png)

##### 解释一下内存的图：

(监控内存的解释)

![截屏2022-12-30 14.27.39](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2014.27.39.png)

- 总内存64GB，这个是最上面的红色的线标示的，显然这个数值是没办法改变的除非是虚拟机调整内存。
- 为了让图有明显的变化，我开启了Adobe AE打开一个项目，进行动画帧的预览，给电脑内存增加一点压力。
- 开启AE并打开项目之后，可以明显的看到表中有几根线开始上涨，这几根线代表的是活跃内存、内存使用占比百分比、内存的使用大小，显然这也是符合逻辑的。
- 开启AE并打开项目之后，可以明显的看到表中有几根线开始下跌，这几根线代表的是不活跃内存、内存未使用的百分比、内存未使用的大小，显然这也是符合逻辑的。
- 最后关闭了AE，可以看到内存资源的占用又恢复了正常。空闲日常占用的量是不到20G的，进行特效渲染的时候大概是要占用到50G内存以上。

![截屏2022-12-30 14.34.11](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2014.34.11.png)

磁盘占用：

- 最上面的一根线代表总空间，2TB，符合实际。
- 中间有一段开始下载一个较大的文件，然后看到磁盘占用开始上涨，未使用空间减少，这也是符合逻辑的。

![截屏2022-12-30 14.44.52](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2014.44.52.png)

#### 二、Nginx部分

##### 第一种配置：使用默认策略（round-robin）

round-robin的策略就是轮流来，有服务器1，服务器2作为后端接受请求的，对于请求，就第一次交给server1，第二次交给server2，第三次交给server1，第四次交给server2，以此类推。

我这里监听端口设置为80，所以只需要直接访问localhost就可以得到结果。

具体的配置文件如下：

```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    upstream myapp{
     server 127.0.0.1:8080;
     server 127.0.0.1:8090;
    }


    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            proxy_pass http://myapp;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    include servers/*;
}
```

连续两次点击访问这个localhost，得到的结果：

![截屏2022-12-30 23.03.38](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2023.03.38.png)

![截屏2022-12-30 23.02.52](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2023.02.52.png)

解释原因：首先因为是RR轮流来的策略，所以对于用户访问，会依次交给1、2、1、2的顺序，所以服务器找不到对应的session。（上一个服务器，比如服务器1存的session，下一次访问的时候是服务器2处理的，所以找不到session，所以每次都是new）



##### 第二种配置：使用默认策略（round-robin+权重配置）

这次在配置的时候 `server 127.0.0.1:8080 weight=3;` ，给第一个服务器加上一个3的权重。

所以假如进行访问：第一次server1，第二次server1，第三次server1，第四次server2。之后重复循环：第五次server1，第六次server1，第七次server1，第八次server2。

至于访问的效果：第一次会创建一个new session，之后两次就是old session，session保持不变，然后第四次的时候就会访问到server2，这时候会继续创建一个new session。

```
worker_processes  1;
events {
    worker_connections  1024;
}

http {
    upstream myapp{
     #ip_hash;
     #least_conn;
     server 127.0.0.1:8080 weight=3;
     server 127.0.0.1:8090;
    }

    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            proxy_pass http://myapp;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    include servers/*;
}

```

第一次：

![截屏2022-12-30 23.13.10](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2023.13.10.png)

第二次、第三次访问：

![截屏2022-12-30 23.14.52](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2023.14.52.png)

第四次：

![截屏2022-12-30 23.15.08](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2023.15.08.png)

##### 第三种配置：使用默认策略（ip Hash）

解释原因：因为采用的是ip Hash，会利用访问用户的IP计算一个Hash值，然后根据Hash值确定是哪个服务器处理请求。

由于电脑的ip没变，所以一直访问的都是服务器一，所以session也可以维护。

```
worker_processes  1;
events {
    worker_connections  1024;
}

http {
    upstream myapp{
     ip_hash;
     server 127.0.0.1:8080;
     server 127.0.0.1:8090;
    }

    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            proxy_pass http://myapp;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    include servers/*;
}
```

第一次：

![截屏2022-12-30 23.16.56](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2023.17.51.png)

第二次到第n次

![截屏2022-12-30 23.18.11](./assets/%E6%88%AA%E5%B1%8F2022-12-30%2023.18.11.png)
