---
sidebar_position: 8
---

## 第8章 jwt与SSO

### 一、JWT

- JWT就是JSON WEB Token，是一个开放标准（RFC 7519），它定义了一种紧凑且自包含的方式，用于将信息作为JSON对象在各方之间安全地传输。此信息可以被验证和信任，因为它是数字签名的。JWT可以使用秘密（使用HMAC算法）或使用RSA或ECDSA的公钥/私钥对进行签名。
- 组成：
  - Header：消息头，可能包括："alg": "HS256","typ": "JWT" 
  - Payload：载荷，iss (issuer), exp (expiration time), sub (subject), aud (audience), and others.
  - Signature：签名：根据前面的内容还有服务端的私钥签名，然后客户端就可以用公钥来验签，判断内容是否被更改过
- Base64编码：64是2的6次嘛，把要传输的文本用比特流表示出来，然后每六个一组，做一个转换，这样得到就是大小写的字母、点问号或者之类组成的纯文本。这些字符在网络上传输都是没有问题。因为一些历史渊源，一些传输协议在阐述高于128，也就是一个Byte的第一位为1的时候，一些传输协议可能会把它截断了，这就导致传输会出问题，但是base64就比较靠谱，保证传输的可靠性。

### 二、单点登录

- 降低网络钓鱼的成功率，因为用户没有经过培训，可以不经思考就到处输入密码。
- 减少不同用户名和密码组合的密码疲劳
- 减少为同一身份重新输入密码所花费的时间
- 由于减少了IT服务台关于密码的呼叫次数，从而降低了IT成本
- 所有级别的进入/退出/访问系统的安全性，无需重新提示用户
- 集中报告以实现法规遵从性。

### 三、Kerberos

- 用户单点登录的时候输入用户名密码，客户端针对密码进行哈希算法，得到一个密钥，这就是后面用来解密的secret key（注意以上操作都在客户端进行的！没有经过网络）
- 然后客户端发送一个明文的：包含用户名，发给AS（认证服务器）【注意：刚刚的密钥还有用户输入的密码没有发走，不经过网络传输非常安全】
- 然后AS（认证服务器）产生密钥，通过数据库找到的用户的密码hash一下，得到secret key
- 然后AS（认证服务器）给客户端发两个东西
  - Message A: 客户端和授权服务器（TGS）之间的通讯的session Key密钥，使用刚刚数据库找到的用户的密码hash一下，得到的secret key，进行加密。加密的结果就是Message A。客户端收到了Message A会用本地根据用户输入的密码计算的secret key来在本地解密，如果用户密码输入正确解密就成功，如果用户密码输入错误就无法解密Message A。
  - Message B:  使用TGS的密钥加密刚刚的A中的session Key密钥，作为Message B发给客户。客户拿到B之后什么都做不了，不能篡改。（为什么要一个B消息？因为TGS服务器需要防止客户自己随便发了一个session Key，所以需要客户端发来的Message B，用自己的TGS Key解密，解密成功就说明用户是可靠的经过认证的，反之就是伪造的）
- 然后客户端发送下面两个消息给TGS
  - Message C：组合message B和请求的服务资源 
  - Message D：一些敏感信息：客户端是谁、时间戳，使用TGS session Key来进行加密
- 然后TGS收到了C和D消息，TGS从C消息里面拿出B消息，使用TGS私钥解密，得到的客户端的TGS session Key，然后用这个Key解密Message D。到此为止客户端和TGS的都有了session key，可以进行加密通信。TGS接下来又会给客户端发Message E和Message F。
  - Message E：包括client ID, client network address, validity period和Client/Server Session Key，使用服务端Server的私钥（这个是以后客户端跟Server通讯的凭据，因为使用的Server的私钥加密，所以客户端无法解密）
  - Message F:  Client/Server Session Key 使用 Client/TGS Session Key加密（这个客户端可以解密）
- 接下来的事情就是：客户端和服务端Server通讯，例如某个单点登录的应用
- 客户端收到E、F，再向服务端Server发下面的两个消息
  - Message E：客户端无法解密只能原封不动的发走
  - Message G：把自己是谁 client ID, timestamp使用 Client/Server Session Key加密（Client/Server Session Key是从上一步的Message F解密得到的）
- 服务端Server收到了之后，就用自己的私钥解密Message E和G，就得到了E里面蕴含的Client/Server Session Key，然后这个 Session Key也可以解密Message G
- 从此，客户端和Server就通过Session Key可以通讯

### 四、单点登录的缺陷

- 单点故障：类比jaccount要是故障，所有系统无法登陆
- 传递的过程对于时间很敏感，一旦过期就无效
- 管理层的实现没有特别交代，具体实现取决于用户
- 一旦被攻击，所有的用户信息全部丢失
- 如果都是一个公司或者企业，例如交大sjtu.edu.cn的后缀都是一样的还比较好，但是如果跨越的范围比较广就不太适合

### 五、CAS的优点

- 多个CAS服务器集群，一旦出现崩溃，负载均衡会把请求发给存货服务器
- 读写分离并且备份
- Ticket Storage多服务器备份，大大增加可靠性