import {post} from '../api'

export async function signIn({email, password}) {
  return post('/users/login', {
    user: {email, password}
  })
}

export async function signUp({name, email, phone, password}) {
  return post('/users/register', {
    user: {name, email, phone, password}
  })
}

export async function resetPassword({email}) {
  return post('/users/reset_password', {
    user: {email}
  })
}
