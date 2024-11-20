function exa2() {

    /*
    
    Intro:
    
        Since we already have some of the additional
        information about our users, it's a good idea
        to output it in a nice way.
    
    Exercise:
    
        Fix type errors in logPerson function.
    
        logPerson function should accept both User and Admin
        and should output relevant information according to
        the input: occupation for User and role for Admin.
    
    */

    console.table("\n\nOnline exercises:")
    console.log("Online exercises:")

    interface User {
        name: string;
        age: number;
        occupation: string;
    }

    interface Admin {
        name: string;
        age: number;
        role: string;
    }

    type Person = User | Admin;

    const persons: Person[] = [
        {
            name: 'Max Mustermann',
            age: 25,
            occupation: 'Chimney sweep'
        },
        {
            name: 'Jane Doe',
            age: 32,
            role: 'Administrator'
        },
        {
            name: 'Kate Müller',
            age: 23,
            occupation: 'Astronaut'
        },
        {
            name: 'Bruce Willis',
            age: 64,
            role: 'World saver'
        }
    ];

    function logPerson1(person: Person) {
        let additionalInformation: string;
        if ("role" in person) { /// THIS IF STATEMENT SEEMS COOL!
            additionalInformation = person.role;
        } else {
            additionalInformation = person.occupation;
        }
        console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
    }



    function logPerson(person: Person) {
        let additionalInformation: string = '';
        if ("role" in person) {
            additionalInformation = "role: " + (<Admin>person).role;
        }
        if ("occupation" in person) {
            additionalInformation = "occupation: " + (<User>person).occupation;
        }
        console.log(` - ${person.name.padEnd(25, " ")} \t\t${person.age}, \t\t${additionalInformation}`);
    }

    persons.forEach(logPerson);

    // In case you are stuck:
    // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing


}


// OMMITING VARIABLE ON TYPES!!!!
function exa4OmittingVariableNames() {
    /*

Intro:

    Time to filter the data! In order to be flexible
    we filter users using a number of criteria and
    return only those matching all of the criteria.
    We don't need Admins yet, we only filter Users.

Exercise:

    Without duplicating type structures, modify
    filterUsers function definition so that we can
    pass only those criteria which are needed,
    and not the whole User information as it is
    required now according to typing.

Higher difficulty bonus exercise:

    Exclude "type" from filter criteria.

*/

    interface User {
        type: 'user';
        name: string;
        age: number;
        occupation: string;
    }

    interface Admin {
        type: 'admin';
        name: string;
        age: number;
        role: string;
    }

    type Person = User | Admin;

    const persons: Person[] = [
        { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
        {
            type: 'admin',
            name: 'Jane Doe',
            age: 32,
            role: 'Administrator'
        },
        {
            type: 'user',
            name: 'Kate Müller',
            age: 23,
            occupation: 'Astronaut'
        },
        {
            type: 'admin',
            name: 'Bruce Willis',
            age: 64,
            role: 'World saver'
        },
        {
            type: 'user',
            name: 'Wilson',
            age: 23,
            occupation: 'Ball'
        },
        {
            type: 'admin',
            name: 'Agent Smith',
            age: 23,
            role: 'Administrator'
        }
    ];

    const isAdmin = (person: Person): person is Admin => person.type === 'admin';
    const isUser = (person: Person): person is User => person.type === 'user';

    function logPerson(person: Person) {
        let additionalInformation = '';
        if (isAdmin(person)) {
            additionalInformation = person.role;
        }
        if (isUser(person)) {
            additionalInformation = person.occupation;
        }
        console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
    }

    function filterUsers(persons: Person[], criteria: Partial<Omit<User, 'type'>>): User[] {
        return persons.filter(isUser).filter((user) => {
            const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, 'type'>)[];
            return criteriaKeys.every((fieldName) => {
                return user[fieldName] === criteria[fieldName];
            });
        });
    }

    console.log('Users of age 23:');

    filterUsers(
        persons,
        {
            age: 23
        }
    ).forEach(logPerson);

    // In case you are stuck:
    // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types

}



