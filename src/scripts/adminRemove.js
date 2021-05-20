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
  console.log('Entferne Admin Berechtigung für...')
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

  try {
    const updatedRecord = await User.patch(foundUser.id, {
      rights: null
    })
    console.log(updatedRecord)
    console.log(`admin right for ${username} successful removed`)
  } catch (error) {
    console.error('admin right not removed, error: ', error)
    return process.exit(1)
  }

  return process.exit(0)
}

main()
