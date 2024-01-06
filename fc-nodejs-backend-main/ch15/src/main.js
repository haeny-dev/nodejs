// @ts-check

const { Sequelize, DataTypes } = require('sequelize')

async function main() {
  const sequelize = new Sequelize({
    database: 'fc21',
    username: 'myuser',
    password: 'mypass',
    dialect: 'postgres',
    host: 'localhost',
  })

  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  const City = sequelize.define(
    'city',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  User.belongsTo(City)

  await sequelize.sync({
    force: true,
  })

  const newCity = await City.build({
    name: 'Seoul',
  }).save()

  await User.build({
    name: 'Coco',
    age: 20,
    cityId: newCity.getDataValue('id'),
  }).save()

  await sequelize.authenticate()
  await sequelize.close()
}

main()
