const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize, // static init 메서드의 매개변수와 연결되는 옵션이다. 나중에 model/index.js에서 연결한다.
        timestamps: false, // true 이면 자동으로 createdAt, updatedAt 컬럼을 추가한다.
        underscored: false, // 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 camel case로 만드는데, 이를 snake case로 바꾸는 옵션이다.
        modelName: 'User', // 모델 이름을 설정할 수 있다. 노드 프로젝트에서 사용한다.
        tableName: 'users', // 실제 데이터베이스의 테이블 이름이 된다. 기본적으로는 모델 이름을 소문자 및 복수형으로 만든다.
        paranoid: false, // true 이면 자동으로 deletedAt 이라는 컬럼이 생긴다. 로우를 삭제할 때 완전히 지워지지 않고 지운 시각이 기록된다.
        charset: 'utf8',
        collate: 'utf8_general_ci', // charset과 collate 를 각각 이와 같이 설정해야 한글이 입력된다.
      }
    )
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' })
  }
}
