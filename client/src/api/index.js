import ajax from './ajax'

// register interface
export const reqRegister = (user) => ajax('/register', user, 'POST')
// log in interface
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')
// update user info interface
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// get user info interface
export const reqUser = () => ajax('/user')
// create new session api
export const reqCreate = (session) => ajax('/home', session, 'POST')
// get session list 
export const reqSessionList = (end) => ajax('/sessionlist', {end})