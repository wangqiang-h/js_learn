export default class User {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}


export function printName(user)
{
    console.log(`name is ${user.name}`)
}

export function printAge(user)
{
    console.log(`age is ${user.age}`)
}