---
sidebar_position: 6
---

### 作业五 Redis缓存

#### 一、什么放在缓存里面

仔细考虑了一下哪些内容需要放在缓存里面，按照上课讲的，那就是：

- 经常用到的东西
- 经常涉及到写入操作的，而很少涉及到读的操作的

那这么一说，显然就是我们的Book表了，Book的读取是最多的（打开网站都涉及到读操作），写入只有在管理员操作书信息的时候会变，所以放在缓存里面很合适！那么我数据库实际上还有用户表User，Order表，OrderItem表，那这些表怎么样呢？我考虑了一下：

- 用户表，涉及到用户的信息，密码敏感内容，如果放在没密码的Redis还有一定的危险，而且，如果说一个用户登录了一次，我就把用户的相关信息放在缓存里面，但是后面鉴权依赖的是session，也不会涉及到数据库的读取操作了，所以如果每次登录一下，就放一次Redis，意义不大。
- Order表和OrderItem，这两个表主要面向的是写操作，就是用户下订单的时候，涉及到写入操作，而且更多的情况是，下单完成后用户看到下单成功就已经足够了，而如果这时候把订单信息存储缓存里面，反而浪费空间（没必要对于一个不是经常用到的内容写到Redis里面。

当然，BookDAO里面还有很多操作：

- 比如根据关键词查询书籍名称，这些我认为也没有必要放入Redis（除非是XXX热搜榜，不然每个用户搜索的关键词都具有偶然性，放入缓存没有必要）
- 再比如根据购买数量排名，这些排名数据会动态更新，每次查询的时候都要保证最新而且属于经常变化的，所以不放入Redis。

#### 二、BookDao层的代码

##### 1、查询操作

基本逻辑就是：

- 先去缓存里面找，找到了就返回给服务层
- 找不到，去数据库查询，然后在写入Redis里面

```java
    // Redis:通过ID获取书的信息的时候，book + [ID] 作为Redis存储的Key，
    // value为book转化为JSON字符串的内容
    // 操作逻辑：先在缓存里面找一下，找到了就直接返回，没找到就去数据库，并把找到的写入缓存
    @Override
    @Transactional(propagation = Propagation.SUPPORTS, rollbackFor=Exception.class)
    public Book getOneBookByID(Integer id){
        Book book;
        Object p = redisUtil.get("book"+id);
        if(p == null){
            book = bookRepository.getOne(id);
            redisUtil.set("book" + id, JSONArray.toJSON(book));
            System.out.println("通过数据库拿到的一本书");
        }
        else {
            book = JSONArray.parseObject(p.toString(),Book.class);
            System.out.println("通过Redis拿到的一本书");
        }
        return book;
    }
```

##### 2、修改/增加操作

基本逻辑就是：

- 先去缓存里面找，找到了就更新缓存
- 找不到，去数据库查询，然后在写入Redis里面
- 作为一个事务，如果失败了能够回滚，避免不一致

```java
    // Redis:保存一本书的时候，去Redis里面查找一下，如果不存在，就直接写入数据库
    // 如果存在，就要更新Redis的内容，然后再写入数据库
    @Override
		@Transactional
    public Book saveOneBook(Book newOneBook){
        Object p = redisUtil.get("book"+newOneBook.getID());
        if(p != null){
            redisUtil.set("book" + newOneBook.getID(), JSONArray.toJSON(newOneBook));
        }
        return bookRepository.save(newOneBook);
    }
```

##### 3、删除操作

基本逻辑就是：

- 去缓存里面找，找到了就删掉
- 然后再去删除数据库相关的条目

```
    // 删除书的操作，先删除缓存
    @Override
    public void deleteOneBookByID(Integer id){
        redisUtil.del("book"+id);
        bookRepository.deleteById(id);
    }
```

##### 4、完整的BookDAO的代码

放在文末，作为附录hhh。



#### 三、问题解释

##### （一）首次读写、后续读写

- 这里我通过SystemOUT打印，如果是通过数据库拿的，就打印数据库获取的书
- 可以看到，第一次拿的时候，是从数据库拿的，这是因为通过Redis拿发现没有，所以从数据库拿，拿好之后放入了Redis里面
- 然后第二次拿（我是刷新了网页几次，可以看到，就看到了通过Redis缓存拿到的书）

![截屏2022-10-29 21.47.16](./assets/%E6%88%AA%E5%B1%8F2022-10-29%2021.47.16.png)

![截屏2022-10-29 21.49.12](./assets/%E6%88%AA%E5%B1%8F2022-10-29%2021.49.12.png)

```java
    public Book getOneBookByID(Integer id){
        Book book;
        Object p = redisUtil.get("book"+id);
        if(p == null){
            book = bookRepository.getOne(id);
            redisUtil.set("book" + id, JSONArray.toJSON(book));
            System.out.println("通过数据库拿到的一本书");
        }
        else {
            book = JSONArray.parseObject(p.toString(),Book.class);
            System.out.println("通过Redis拿到的一本书");
        }
        return book;
    }
```

##### （二）关掉Redis

- 由于我在Util写的代码中，增加了TryCatch报错机制，也就是说如果**连不上Redis或者没找到，都会返回NULL**
- 所以，如果连不上Redis的话，就会抛出异常，这个时候只能通过数据库获取数据，但是前端不会感受到任何的异常
- 这样的设计，也保证了稳定性，可靠性（也就是说哪怕Redis崩了用户前端都可以正常获取到书籍信息）尽管速度上可能有细微差别。

先来说一下我的操作顺序：

1. 关掉Redis
2. 刷新书籍的页面
3. 收到控制台的报错（Spring还在运行，没有因此崩溃退出，中止）

![截屏2022-10-29 21.54.33](./assets/%E6%88%AA%E5%B1%8F2022-10-29%2021.54.33.png)

那么我们来解释一下里面的内容：

- 首先是红色的部分就是一个异常，里面蓝色就是对应的我写的读取书籍数据的Controler，提示了报错的代码出现的位置：

  ```
  2022-10-29 21:54:09.974  INFO 13007 --- [ecutorLoop-1-11] i.l.core.protocol.ConnectionWatchdog     : Reconnecting, last destination was localhost/127.0.0.1:6379
  2022-10-29 21:54:10.008  WARN 13007 --- [ioEventLoop-4-2] i.l.core.protocol.ConnectionWatchdog     : Cannot reconnect: io.netty.channel.AbstractChannel$AnnotatedConnectException: Connection refused: localhost/127.0.0.1:6379
  org.springframework.dao.QueryTimeoutException: Redis command timed out; nested exception is io.lettuce.core.RedisCommandTimeoutException: Command timed out after 300 millisecond(s)
  	at XXX(上面的报错点信息)
  ```

- 完整的报错头是这样的（截图最顶部，长度不够截不了），第一条是从断开Redis的瞬间就开始了，自动开始重新连接，并提示上次连接的位置是localhost/127.0.0.1:6379

- 第二条是重新连接的结果，结果还是失败了，Connection refused连接被拒绝。

- 第三条对应的是我的查询操作，我打开书籍详情页面，后端会逐层调用到DAO，里面提示Redis CMD超时了，就是表示由于Redis断开连接，无法查询

- 最后的**通过数据库读取到书籍**，是我写的SystemOUT打印的文本，说明通过Redis失败的时候，经过我设计的检测逻辑，会改变策略，从数据库中读取信息，保证前端用户收得到内容。

#### 四、相关Redis配置代码

- 具体来说包括两个，一个是配置类，一个是Util类，Dao通过调用Util，实现相关的写操作和读操作。

```java
@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport {
    /**
     * retemplate相关配置
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {

        RedisTemplate<String, Object> template = new RedisTemplate<>();
        // 配置连接工厂
        template.setConnectionFactory(factory);
        //使用Jackson2JsonRedisSerializer来序列化和反序列化redis的value值（默认使用JDK的序列化方式）
        Jackson2JsonRedisSerializer jacksonSeial = new Jackson2JsonRedisSerializer(Object.class);

        ObjectMapper om = new ObjectMapper();
        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会跑出异常
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jacksonSeial.setObjectMapper(om);

        // 值采用json序列化
        template.setValueSerializer(jacksonSeial);
        //使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());

        // 设置hash key 和value序列化模式
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(jacksonSeial);
        template.afterPropertiesSet();

        return template;
    }
    /**
     * 对hash类型的数据操作
     */
    @Bean
    public HashOperations<String, String, Object> hashOperations(RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForHash();
    }
    /**
     * 对redis字符串类型数据操作
     */
    @Bean
    public ValueOperations<String, Object> valueOperations(RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForValue();
    }
    /**
     * 对链表类型的数据操作
     */
    @Bean
    public ListOperations<String, Object> listOperations(RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForList();
    }
    /**
     * 对无序集合类型的数据操作
     */
    @Bean
    public SetOperations<String, Object> setOperations(RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForSet();
    }
    /**
     * 对有序集合类型的数据操作
     */
    @Bean
    public ZSetOperations<String, Object> zSetOperations(RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForZSet();
    }
}
```

```java
@Component
public class RedisUtil {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public RedisUtil(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }


    /**
     * 删除（通过Key）
     * @param key 可以传一个值 或多个
     */
    @SuppressWarnings("unchecked")
    public void del(String ... key){
        if(key!=null&&key.length>0){
            if(key.length==1){
                redisTemplate.delete(key[0]);
            }else{
                redisTemplate.delete(CollectionUtils.arrayToList(key));
            }
        }
    }

    /**
     * 获取（通过Key）
     * @param key 键
     * @return 值
     */
    public Object get(String key){
        try {
            return key==null?null:redisTemplate.opsForValue().get(key);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 放入Redis
     * @param key 键
     * @param value 值
     * @return true成功 false失败
     */
    public boolean set(String key,Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
```