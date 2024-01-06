# Chapter07. MySQL

## 📌 7.1 데이터베이스란?

- 데이터베이스

  - 관련성을 가지며 중복이 없는 데이터들의 집합이다.
  - 이러한 데이터베이스를 관리하는 시스템을 DBMS(DataBase Management System)라고 부른다.

- RDBMS(Relational DBMS)
  - 관계형 DBMS
  - Oracle, MySQL, MSSQL 등이 있다.

## 📌 7.2 MySQL 설치하기

- homebrew 로 설치

  ```
  brew install mysql
  ```

- mysql 실행

  ```
  brew services start mysql
  ```

- root 비밀번호 설정
  ```
  mysql_secure_installation
  ```
- root 계정 실행
  ```
  mysql -h localhost -u root -p
  ```

## 📌 7.3 워크벤치 설치하기

- homebrew 로 설치

  ```
  brew install --cask mysqlworkbench
  ```

## 📌 7.4 데이터베이스 및 테이블 생성하기

- 데이터베이스 생성하기

  ```sql
  CREATE SCHEMA 'nodejs' DEFAULT CHARACTER SET utf8;
  ```

- 테이블 생성하기

  ```sql
  CREATE TABLE nodejs.users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    UNIQUE INDEX name_UNIQUE (name ASC)
  )
  COMMENT = '사용자 정보'
  DEFAULT CHARACTER SET = utf8
  ENGINE = InnoDB;
  ```

  - 컬럼에 대한 설정
  - _자료형_

    - `INT`
    - : 정수를 의미한다. 소수까지 저장하고 싶다면 FLOAT, DOUBLE 자료형을 사용하면 된다.
    - `VARCHAR(자릿수)`
    - : `CHAR` 라는 자료형도 있고, CHAR는 고정 길이고, VARCHAR는 가변 길이를 가진다.
    - `TEXT`
    - : 긴 글을 저장할 때 사용하며, 수백 자 이내의 문자열은 보통 VARCHAR로 많이 처리하고, 그보다 길면 TEXT로 처리한다.
    - `TINYINT`
    - : -128부터 127까지의 정수를 저장할 때 사용한다. 1 또는 0만 저장한다면 boolean값과 같은 역할을 할 수 있다.
    - `DATETIME`
    - : 날짜와 시간에 대한 정보를 담고 있고, 날짜 정보만 담는 DATE와 시간 정보만 담는 TIME 자료형도 있다.
    - 이 외에도 많은 자료형이 있다.

  - _옵션_

    - `NULL` or `NOT NULL`
    - : 빈칸을 허용할지 여부를 묻는 옵션이다.
    - `AUTO_INCREMENT`
    - : 자동으로 증가하는 값을 넣어주는 옵션이다.
    - `UNSIGNED`
    - : 숫자 자료형에 적용되는 옵션이다.
    - : 숫자 자료형은 기본적으로 음수 범위를 지원하는데, 예를 들어 INT는 -2147483648 ~ 2147483647 까지의 숫자를 저장할 수 있다. UNSIGNED 가 적용되어 있다면 음수는 무시되고 0 ~ 4294967295 까지 저장할 수 있다.
    - : FLOAT 과 DOUBLE 에는 적용 불가능하다.
    - `ZEROFILL`
    - : 숫자의 자릿수가 고정되어 있을 때 사용할 수 있다.
    - : 자료형으로 INT 대신 INT(자릿수)처럼 표현하는 경우에 ZEROFILL을 설정해둔다면 비어 있는 자리에 모두 0을 넣는다.
    - `DEFAULT now()`
    - : 데이터베이스 저장 시 해당 컬럼에 값이 없다면 MySQL이 기본값을 대신 넣는다.
    - : now()는 현재 시각을 넣으라는 뜻이다.
    - : now() 대신 CURRENT_TIMESTAMP를 적어도 같은 뜻이 된다.
    - `PRIMARY KEY`
    - : 해당 컬럼이 기본 키인 경우 설정한다.
    - `UNIQUE INDEX`
    - : 해당 값이 고유해야 하는지에 대한 옵션이다.
    - : 기본키도 사실 고유해야 하지만 PRIMARY KEY는 자동으로 UNIQUE INDEX를 포함하므로 따로 적지 않아도 된다.

  - 테이블에 대한 설정
    - `COMMENT`
    - : 테이블에 대한 보충 설명을 의마한다. 이 테이블이 무슨 역할을 하는지 적어두면 된다.
    - `DEFAULT CHARACTER SET`
    - : utf8로 설정하지 않으면 한글이 입력되지 않는다.
    - `ENGINE`
    - : 여러 가지가 있지만, MyISAM과 InnoDB가 제일 많이 사용된다.

- 테이블 정보확인

  ```sql
  DESC users;
  ```

- 테이블 삭제

  ```sql
  DROP TABLE users;
  ```

## 📌 7.5 CRUD 작업하기

- Create(생성)

  ```sql
  INSERT INTO nodejs.users(name, age, married, comment) VALUES('zero', 24, 0, '자기소개1');
  INSERT INTO nodejs.users(name, age, married, comment) VALUES('nero', 32, 1, '자기소개2');
  INSERT INTO nodejs.comments(commenter, comment) VALUES(1, '안녕하세요. zero의 댓글입니다.');
  ```

- Read(조회)

  ```sql
  SELECT * FROM nodejs.users;
  SELECT * FROM nodejs.comments;

  SELECT name, married FROM nodejs.users;

  SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
  SELECT id, name FROM nodejs.users WHERE married = 0 OR age > 30;

  SELECT id, name FROM nodejs.users ORDER BY age DESC;
  SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1;
  SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;
  ```

- Update(수정)

  ```sql
  UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
  ```

- Delete(삭제)
  ```sql
  DELETE FROM nodejs.users WHERE id = 2;
  ```

## 📌 7.6 시퀄라이즈 사용하기

- 노드에서 MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리이다.
- 시퀄라이즈는 ORM(Object-relational Mapping)으로 분류된다.
  - 시퀄라이즈를 사용하는 이유는 자바스크립트 구문을 알아서 SQL로 바꿔주기 때문이다.

### ➕ 7.6.4 쿼리 알아보기

- `create`

  ```sql
  INSERT INTO nodejs.users(name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1')
  ```

  ```javascript
  const User = require('../models')
  User.create({
    name: 'zero',
    age: 24,
    married: 0,
    comment: '자기소개1',
  })
  ```

- `findAll`

  ```sql
  SELECT * FROM nodejs.users
  ```

  ```javascript
  User.findAll({})
  ```

- `findOne`

  ```sql
  SELECT * FROM nodejs.users LIMIT 1
  ```

  ```javascript
  User.findOne({})
  ```

- `attributes` 옵션

  ```sql
  SELECT name, married FROM nodejs.users
  ```

  ```javascript
  User.findAll({
    attributes: ['name', 'married'],
  })
  ```

- `where` 옵션

  ```sql
  SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30
  ```

  ```javascript
  const { Op } = require('sequelize')
  User.findAll({
    attributes: ['name', 'age'],
    where: {
      married: true,
      age: {
        [Op.gt]: 30,
      },
    },
  })
  ```

- `Op.or`

  ```sql
  SELECT id, name FROM users WHERE married = 0 OR age > 30
  ```

  ```javascript
  User.findAll({
    attributes: ['id', 'name'],
    where: {
      [Op.or]: [
        { married: false },
        {
          age: {
            [Op.gt]: 30,
          },
        },
      ],
    },
  })
  ```

- `order` 옵션

  ```sql
  SELECT id, name FROM users ORDER BY age DESC
  ```

  ```javascript
  User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
  })
  ```

- `LIMIT`

  ```sql
  SELECT id, name FROM users ORDER BY age DESC LIMIT 1
  ```

  ```javascript
  User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
  })
  ```

- `OFFSET`

  ```sql
  SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1
  ```

  ```javascript
  User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
    offset: 1,
  })
  ```

- `update`

  ```sql
  UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2
  ```

  ```javascript
  User.update(
    {
      comment: '바꿀 내용',
    },
    {
      where: { id: 2 },
    }
  )
  ```

- `destroy`

  ```sql
  DELETE FROM nodejs.users WHERE id = 2
  ```

  ```javascript
  User.destroy({
    where: { id: 2 },
  })
  ```

### ➕ 7.6.4.1 관계 쿼리

- `User` 모델과 `Comment` 모델이 hasMany-belongTo 관계에 있을 때
- 사용자를 가져오면서 그 사람의 댓글까지 가져오고 싶을 경우

  ```javascript
  const user = await User.findOne({
    include: [
      {
        model: Comment,
      },
    ],
  })

  const comments = user.getComments()
  ```

  - 관계를 설정했다면 getComments(조회), setComments(수정), addComment(하나 생성), addComments(여러 개 생성), removeComments(삭제) 메서드를 지원한다.

### ➕ 7.6.4.2 SQL 쿼리하기

- 직접 SQL문을 통해 쿼리할 수 도 있다.

```javascript
const [result, metadata] = await sequelize.query('SELECT * FROM comments')
```
