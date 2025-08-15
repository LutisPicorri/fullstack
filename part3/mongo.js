/*
 Usage:
  List all entries:
    node mongo.js <password>

  Add a new entry:
    node mongo.js <password> "Anna" "040-1234556"

 Notes:
  - Replace the placeholders for <username>, <cluster-url>, and <appName> with your Atlas values.
  - Do NOT hardcode or commit your password. Pass it as the first argument.
*/

const mongoose = require('mongoose')

const args = process.argv

if (args.length < 3) {
  console.log('Usage:')
  console.log('  node mongo.js <password>                 # list all entries')
  console.log('  node mongo.js <password> "Name" "Number"  # add new entry')
  process.exit(1)
}

const password = args[2]
const nameArg = args[3]
const numberArg = args[4]

const username = 'lutis'
const clusterUrl = 'cluster0.q6bjkha.mongodb.net'
const appName = 'Cluster0'

const url = `mongodb+srv://${username}:${password}@${clusterUrl}/phonebookApp?retryWrites=true&w=majority&appName=${appName}`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

async function run() {
  try {
    await mongoose.connect(url)

    if (nameArg && numberArg) {
      const person = new Person({ name: nameArg, number: numberArg })
      await person.save()
      console.log(`added ${nameArg} number ${numberArg} to phonebook`)
    } else if (!nameArg && !numberArg) {
      const persons = await Person.find({})
      console.log('phonebook:')
      persons.forEach(p => console.log(`${p.name} ${p.number}`))
    } else {
      console.log('Provide both name and number to add a new entry, or only the password to list.')
      process.exitCode = 1
    }
  } catch (err) {
    console.error('Error:', err.message)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
  }
}

run()


