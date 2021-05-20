const app = require('../app')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function getUsername () {
  return new Promise((resolve) => {
    readline.question('Benutzername: ', (name) => {
      resolve(name)
    })
  })
}

async function main () {
  console.log('Erteile Admin Berechtigung für...')
  const username = await getUsername()

  const User = app.service('users')

  let foundUser
  try {
    foundUser = (await User.find({ query: { name: username } })).data[0]
  } catch (error) {
    console.error('no user found: ', error)
    return process.exit(2)
  }

  if (!foundUser) {
    console.error('no user found')
    return process.exit(2)
  }

  const Rights = app.service('rights')

  let foundRights
  try {
    foundRights = (await Rights.find({ query: { name: 'isAdmin' } })).data[0]
    console.log(foundRights)
  } catch (error) {
    console.error('no rights found: ', error)
    return process.exit(5)
  }

  try {
    const updatedRecord = await User.patch(foundUser.id, {
      rights: foundRights
    })
    console.log(updatedRecord)
    console.log(`admin right for ${username} successful created`)
  } catch (error) {
    console.error('admin right not added, error: ', error)
    return process.exit(1)
  }

  return process.exit(0)
}

main()
