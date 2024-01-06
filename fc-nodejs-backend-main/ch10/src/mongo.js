// @ts-check

const { MongoClient } = require('mongodb')

const MONGO_DB_PASSWORD = ''

const uri = `mongodb+srv://dbHaeny:${MONGO_DB_PASSWORD}@cluster0.djxf6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function main() {
  await client.connect()

  const users = client.db('fc21').collection('users')
  const cities = client.db('fc21').collection('cities')

  await users.deleteMany({})
  await cities.deleteMany({})

  await cities.insertMany([
    {
      name: '서울',
      population: 1000,
    },
    {
      name: '부산',
      population: 350,
    },
  ])

  await users.insertMany([
    {
      name: 'Foo',
      birthYear: 2000,
      contacts: [
        {
          type: 'phone',
          number: '+821000001111',
        },
        {
          type: 'home',
          number: '+821033334444',
        },
      ],
      city: '서울',
    },
    {
      name: 'Bar',
      birthYear: 1995,
      contacts: [
        {
          type: 'phone',
        },
      ],
      city: '부산',
    },
    {
      name: 'Baz',
      birthYear: 1990,
      city: '부산',
    },
    {
      name: 'Poo',
      birthYear: 1993,
      city: '서울',
    },
  ])
  /*
  await users.deleteOne({
    name: 'Baz',
  })

  await users.updateOne(
    {
      name: 'Baz',
    },
    {
      $set: {
        name: 'Boo',
      },
    }
  )

  const cursor = users.find(
    {
      birthYear: {
        $gte: 1990,
      },
    },
    {
      sort: {
        birthYear: 1,
      },
    }
  )
  
  const cursor = users.find({
    'contacts.type': 'phone',
  })
  */
  const cursor = users.aggregate([
    {
      $lookup: {
        from: 'cities',
        localField: 'city',
        foreignField: 'name',
        as: 'city_info',
      },
    },
    {
      $match: {
        $and: [
          {
            'city_info.population': {
              $gte: 500,
            },
          },
          {
            birthYear: {
              $gte: 1995,
            },
          },
        ],
      },
    },
    {
      $count: 'num_users',
    },
  ])

  await cursor.forEach(console.log)

  await client.close()
}

main()
