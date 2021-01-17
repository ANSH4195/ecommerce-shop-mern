import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'jd@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Freddy Mercury',
    email: 'fm@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users
