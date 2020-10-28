function Rooms(number){
    this.number = number;
    this.place = 3;
}

function Student(name, surname, lastName, numberOfStudentTicket, birthdayYear, address, sex, familyStatus, stipend){
    let room;
    this.name = name;
    this.surname = surname;
    this.lastName = lastName;
    this.numberOfStudentTicket = numberOfStudentTicket;
    this.birthdayYear = birthdayYear;
    this.address = address;
    this.sex = sex;
    this.familyStatus = familyStatus;
    this.stipend = stipend;
    this.room = room;


    Object.defineProperty(this, "room", {
        set: function(value){
            let correctRoom = false;
            let isPlace = false;
            for (let i = 0; i < rooms.length; i++) {
                if(value === rooms[i].number){
                    correctRoom = true;
                    if(rooms[i].place > 0){
                        rooms[i].place--;
                        isPlace = true;
                        room = value;
                    }
                }
            }
            if(!correctRoom){
                console.error("the room does not exist");
                return false;
            }
            if(!isPlace){
                console.error("this room is full");
                return false;
            }
            
        },
        get: function(){
            return room;
        }
    })    
}

Student.prototype.setGroupLeader = function(){
    this.groupLeader = true;
}

function createRoom(number){
    rooms.push(new Rooms(number))
}

function createStudent( name, surname, lastName, numberOfStudentTicket, birthdayYear, address, sex, familyStatus, stipend, room){
    student = new Student(name, surname, lastName, numberOfStudentTicket, birthdayYear, address, sex, familyStatus, stipend);
    student.room = room;
}

rooms = [];
createRoom(1);
createRoom(2);
createRoom(3);

createStudent('Ivan', 'Ivanov', 'Ivanovich', 0001, 2000, 'Lviv', 'men', 'unmarried', 1000,1);
createStudent('Petya', 'Petrov', 'Petrovich', 0002, 2001, 'Kiev', 'men', 'married', 1000,1);
createStudent('Vasya', 'Vasylyov', 'Vasylyovich', 0003, 1999, 'Odessa', 'men', 'unmarried', 1000,1);
createStudent('Nataly', 'Ivanova', 'Ivanivna', 0004, 1999, 'Kharkiv', 'women', 'unmarried', 1000,1);
createStudent('Yuliya', 'Petrova', 'Petrivna', 0005, 2000, 'Khmelnytskyi', 'women', 'married', 1000,2);
createStudent('Anna', 'Vasylyova', 'Vasylivna', 0006, 2001, 'Uzhhorod', 'women', 'unmarried', 1000, 2);
console.log(rooms);
