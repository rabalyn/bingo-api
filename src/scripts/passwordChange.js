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

function getNewPassword () {
  return new Promise((resolve) => {
    readline.question('Neues Password: ', (password) => {
      resolve(password)
    })
  })
}

async function main () {
  console.log('Ändere Passwort für...')
  const username = await getUsername()
  const newPassword = await getNewPassword()

  if (newPassword.length < 12) {
    console.error('Passwort muss mindestens 12 Zeichen lang sein.')
    return process.exit(3)
  }

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
    await User.patch(foundUser.id, {
      password: newPassword
    })
    console.log(`password for ${username} successful updated`)
  } catch (error) {
    console.error('password not changed, error: ', error)
    return process.exit(1)
  }

  return process.exit(0)
}

main()
