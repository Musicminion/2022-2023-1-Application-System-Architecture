---
sidebar_position: 12
---


### 作业十一：MongoDB和Neo4j数据库

#### 一、MongoDB部分

##### a）设计构想：

作业要求把合适的内容放在MongoDB存储，我的做法是把用户表分两部分存储：

- 一部分是用户的名字、密码、还有一些基本信息放在MySQL里面存储
- 另外一部分是用户的头像的Base64编码，放在了MongoDB里面存储

关于原因：我的书籍表格里面存放图片存储的是URL，然后使用的是阿里云存储桶，所以拆分的话意义不大，索性最终就决定把用户的头像单独放到MongoDB里面去。

##### b）表格结构

安装好MongoDB之后，用Navicat连接到数据库。我的MondoDB的表格设计也比较简单，就是通过用户名映射到对应的头像字段。

![截屏2022-12-24 12.11.56](./assets/%E6%88%AA%E5%B1%8F2022-12-24%2012.11.56.png)

##### c）代码编写之实体类

实体类的编写比较简单，仿照之前的即可，写上对应的字段名称、Get、Set方法即可。

```java
package com.zzq.ebook.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userIcon")
public class UserIcon {
    @Id
    private String _id;
  
    private String username;
    private String iconBase64;

    public UserIcon(String username, String iconBase64) {
        this.username = username;
        this.iconBase64 = iconBase64;
    }
    public String getIconBase64() {
        return iconBase64;
    }
    public String getUsername() {
        return username;
    }
    public void setIconBase64(String iconBase64) {
        this.iconBase64 = iconBase64;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
```

##### d）代码编写之Repository类

显然上面的实体必须要对应相关的Repository类，只需要写好相关的find方法即可，Spring会将它转化为对应的SQL语句，然后进行查询。

```java
package com.zzq.ebook.repository;
import com.zzq.ebook.entity.UserIcon;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserIconRepository extends MongoRepository<UserIcon, String> {
    UserIcon findUserIconByUsername(String username);
}
```



##### e）代码编写之Dao类

例如在登录的时候，会返回一个用户对象，在Dao中会做好不同的数据库的对接问题，屏蔽掉数据库差异的问题，使得服务层调用的时候，不需要知道是使用的是哪个数据库。具体代码逻辑如下：

- 去MySQL数据库查找用户
- 去MongoDB里面查找用户头像
- 如果用户头像存在，就需要单独设置一下用户头像信息
- 返回整个用户

```java
@Repository
public class UserDaoImp implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserIconRepository userIconRepository;
  
		@Override
    public User getUserByUsername(String username){
        User user = userRepository.getOne(username);
        UserIcon userIcon = userIconRepository.findUserIconByUsername(username);
        if(userIcon != null){
            user.setUserIcon(userIcon);
        }
        return user;
    }
    /*其他Dao的方法省略*/
}
```

##### f）效果演示

如下图所示(控制台打印出来的是用户的信息)：

![截屏2022-12-24 12.25.05](./assets/%E6%88%AA%E5%B1%8F2022-12-24%2012.25.05.png)

![截屏2022-12-24 12.23.06](./assets/%E6%88%AA%E5%B1%8F2022-12-24%2012.23.06.png)



#### 二、Neo4j图数据库部分

a）环境介绍

- Neo4j最新版的desktop，下载地址：[Neo4j桌面版下载](https://neo4j.com/download-center/#desktop)

- 安装好之后，为了便于演示操作，暂时取消了数据库的密码认证。

  ```
  # Whether requests to Neo4j are authenticated.
  # To disable authentication, uncomment this line
  dbms.security.auth_enabled=false
  ```

##### a）初始化数据

在控制器类里面写了一个测试接口，调用这个接口即可以完成数据的初始化。初始化之后的图如下所示。

（可能没有什么逻辑，我也没想出怎么这几个不同的类别之间怎么搭建关系，就随便设计了一下）

![截屏2022-12-24 12.51.53](./assets/%E6%88%AA%E5%B1%8F2022-12-24%2012.51.53.png)

```java
    @RequestMapping("/neo4j")
    public List<Book> testNeo4j(){
        // 先删除所有的内容
        bookTypeRepository.deleteAll();
        // 添加书籍类型
        BookType bookType1 = new BookType("高中教辅");
        BookType bookType2 = new BookType("科普");
        BookType bookType3 = new BookType("大学教材");
        BookType bookType4 = new BookType("名著");
        BookType bookType5 = new BookType("杂志");
        BookType bookType6 = new BookType("游戏");
        BookType bookType7 = new BookType("文学");

        // 数据准备
        bookType1.addBookID(1);
        bookType1.addBookID(21);
        bookType1.addBookID(22);

        bookType2.addBookID(2);
        bookType2.addBookID(18);
        bookType2.addBookID(20);

        bookType3.addBookID(3);
        bookType3.addBookID(5);
        bookType3.addBookID(6);
        bookType3.addBookID(7);
        bookType3.addBookID(8);
        bookType3.addBookID(9);
        bookType3.addBookID(10);

        bookType4.addBookID(11);
        bookType5.addBookID(12);
        bookType6.addBookID(13);
        bookType6.addBookID(17);
        bookType7.addBookID(14);
        bookType7.addBookID(23);

        bookType1.addRelateBookType(bookType2);
        bookType1.addRelateBookType(bookType3);
        bookType1.addRelateBookType(bookType4);

        bookType2.addRelateBookType(bookType5);
        bookType2.addRelateBookType(bookType6);
        bookType3.addRelateBookType(bookType5);
        bookType3.addRelateBookType(bookType6);
        bookType4.addRelateBookType(bookType5);
        bookType4.addRelateBookType(bookType6);

        bookType5.addRelateBookType(bookType7);
        bookType6.addRelateBookType(bookType7);
        bookType7.addRelateBookType(bookType1);


        bookTypeRepository.save(bookType1);
        bookTypeRepository.save(bookType2);
        bookTypeRepository.save(bookType3);
        bookTypeRepository.save(bookType4);
        bookTypeRepository.save(bookType5);
        bookTypeRepository.save(bookType6);
        bookTypeRepository.save(bookType7);

        return bookDao.findBooksByTagRelation("高中教辅");
    }
```

然后数据库里面也需要把相关的Tag写上去。

![截屏2022-12-24 12.54.03](./assets/%E6%88%AA%E5%B1%8F2022-12-24%2012.54.03.png)

到现在数据准备就已经完成了。

##### b）Spring相关准备

数据库连接：`application.properties` 的文件

```
spring.neo4j.uri=bolt://localhost:7687
spring.neo4j.authentication.username=neo4j
spring.neo4j.authentication.password=neo4j
```

Pom依赖文件需要加上：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-neo4j</artifactId>
        </dependency>
```

##### c）实体类

因为图数据库里面存储的都是书籍类型，所以这个实体类就叫BookType，变量说明如下：

- id：ID
- typeName：类别名称
- bookIDs：关联的所有书的ID

```java
package com.zzq.ebook.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Node
public class BookType {
    @Id
    @GeneratedValue
    private Long id;

    private String typeName;

    private List<Integer> bookIDs;

    private BookType(){}

    public BookType(String typeName){this.typeName = typeName;}

    @Relationship(type = "relateBooks")
    public Set<BookType> relateBookTypes;


    public void addRelateBookType(BookType bookType){
        if(relateBookTypes == null)
            relateBookTypes = new HashSet<>();
        relateBookTypes.add(bookType);
    }

    public void addBookID(int id){
        if(bookIDs == null)
            bookIDs = new ArrayList<>();
        for (Integer bookID : bookIDs) {
            if (bookID == id)
                return;
        }
        bookIDs.add(id);
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public void setBookIDs(List<Integer> bookIDs) {
        this.bookIDs = bookIDs;
    }

    public List<Integer> getBookIDs() {
        return bookIDs;
    }

		//为了避免死循环无限递归，比如A关联B，B关联了A，这样JSON就会出现死循环
    @JsonBackReference
    public Set<BookType> getRelateBookTypes() {
        return relateBookTypes;
    }

    @JsonBackReference
    public void setRelateBookTypes(Set<BookType> relateBookTypes) {
        this.relateBookTypes = relateBookTypes;
    }
}
```

##### d）Repository类

这个略显复杂，因为包含了一些Query语句：

> 这里需要解释一下为什么我写了两组Query语句，第一个函数是用来找一跳之内的，第二个函数用来找两跳的节点，因为如果直接在第二个函数里面写Return b,c，结果会返回两个`List<BookType> `会导致报错，也就是说返回多个值（报错信息是：More than one matching node in the record.），但是我返回的对象只能有一个，相关资料链接：[More than one matching node in the record的问题](https://community.neo4j.com/t5/drivers-stacks/get-all-direct-relationships-of-an-entity-more-than-one-matching/m-p/52132)。考虑了一下我最终解决方案是分开写。然后手动在Dao里面合并两个查找结果。当然还有的解决方案是使用Neo4jClient（具体也参考那个链接的回答，当然是英文）。

```java
package com.zzq.ebook.repository;

import com.zzq.ebook.entity.BookType;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookTypeRepository extends Neo4jRepository<BookType, Long> {

    @Query("MATCH (a:BookType)-[:relateBooks]->(b) " +
            "WHERE a.typeName = $name " +
            "RETURN b "
    )
    List<BookType> findNodeRelatedBookTypesDistance1(@Param("name") String name);

    @Query("MATCH (a:BookType)-[:relateBooks]->(b)-[:relateBooks]->(c) " +
            "WHERE a.typeName = $name " +
            "RETURN c "
    )
    List<BookType> findNodeRelatedBookTypesDistance2(@Param("name") String name);

    List<BookType> findBookTypesByTypeNameLike(String name);
}
```

##### e）Dao类

Dao的逻辑参考注释，基本能够说明查找的逻辑。

```java
		@Override
    public List<Book> findBooksByTagRelation(String tagName){
        // 先根据标签的名字取找对应的节点
        List<BookType> list0 = bookTypeRepository.findBookTypesByTypeNameLike(tagName);
        HashMap<Integer, Integer> result = new HashMap<>();
        List<Book> resultBook = new ArrayList<>();

        // 对于上面找到的节点，把所有相关的BookID放入HashSet
        for (BookType bookType : list0) {
            for (int j = 0; j < bookType.getBookIDs().size(); j++) {
                int id = bookType.getBookIDs().get(j);
                result.put(id, 1);
            }
        }

      	// 再查找一跳之内的list1保存，两跳的用list2保存，然后手动合并
        for (BookType type : list0) {
            String keyName = type.getTypeName();
            List<BookType> list1 = bookTypeRepository.findNodeRelatedBookTypesDistance1(keyName);
            List<BookType> list2 = bookTypeRepository.findNodeRelatedBookTypesDistance2(keyName);

            for (BookType bookType : list1) {
                for (int j = 0; j < bookType.getBookIDs().size(); j++) {
                    int id = bookType.getBookIDs().get(j);
                    result.put(id, 1);
                }
            }

            for (BookType bookType : list2) {
                for (int j = 0; j < bookType.getBookIDs().size(); j++) {
                    int id = bookType.getBookIDs().get(j);
                    result.put(id, 1);
                }
            }
        }
				// 合并之后根据bookid把所有的书返回到上层
        for(int id: result.keySet()){
            resultBook.add(this.getOneBookByID(id));
        }

        return resultBook;
    }
```

##### f）服务层类

```java
    public List<Book> getSearchedBooks(int type, String keyword){
        String searchKeyword = "%"+ keyword +"%";
        System.out.println(bookDao.findBooksGlobal(keyword));

        // 0-全局搜 1-书籍名搜 2-出版社搜 3-作者搜 4-描述搜索 5-根据tag关系搜索（本次作业）
        switch (type){
            case 0:
                return bookDao.findBooksGlobal(searchKeyword);
            case 1:
                return bookDao.findBooksByDisplaytitleLike(searchKeyword);
            case 2:
                return bookDao.findBooksByPublisherLike(searchKeyword);
            case 3:
                return bookDao.findBooksByAuthorLike(searchKeyword);
            case 4:
                return ToolFunction.ESHitsToBook(bookDao.findESBooksByDescription(searchKeyword));
            case 5:
                return bookDao.findBooksByTagRelation(keyword);
            default:
                break;
        }
        return null;
    }
```

##### g）效果展示

以搜索大学教材为例子，同时搜索得到类游戏相关还有杂志、文学相关的书籍，如后面的图片所示：

![截屏2022-12-24 13.27.29.png](./assets/%E6%88%AA%E5%B1%8F2022-12-24%2013.27.29.png)

![截屏2022-12-24 13.26.37.png](./assets/%E6%88%AA%E5%B1%8F2022-12-24%2013.26.37.png)
