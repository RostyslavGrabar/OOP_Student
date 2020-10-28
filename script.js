function Rooms(number){
    this.number = number;
    this.place = 3;
}

function Student(name, surname, lastName, numberOfStudentTicket, birthdayYear, address, sex, familyStatus, stipend){
    let room;
    let hobby;
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
    this.hobby = hobby;


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
                room = false;
                return false;
            }
            if(!isPlace){
                console.error("this room is full");
                room = false;
                return false;
            }
            
        },
        get: function(){
            return room;
        }
    }),    
    Object.defineProperty(this, "hobby", {
        set: function(value){
            hobby = value.trim();
        },
        get: function(){
            return hobby;
        }
    })    
}

Student.prototype.setGroupLeader = function(){
    this.groupLeader = true;
}

function Group(number){
    let groupLeader;
    this.number = number;
    this.groupLeader = groupLeader;
    this.students = [];
    Object.defineProperty(this, "groupLeader", {
        set: function(value){
            if(groupLeader){
                console.error("in this group the groupLeader is already  appointed");
                return false;
            }
            value.setGroupLeader();
            groupLeader = value;
        },
        get: function(){
            return groupLeader;
        }
    })   
}



function createGroup(number){
    groups.push(new Group(number))
}

function createRoom(number){
    rooms.push(new Rooms(number))
}

function createStudent(groupNum, name, surname, lastName, numberOfStudentTicket, birthdayYear, address, sex, familyStatus, stipend, room){
    let corectGroup = false;
    for (let i = 0; i < groups.length; i++) {
        if(groupNum == groups[i].number){
            let student = new Student(name, surname, lastName, numberOfStudentTicket, birthdayYear, address, sex, familyStatus, stipend);
            student.room = room;
            groups[i].students.push(student);
            corectGroup = true;
        }
    }
    if(!corectGroup){
        console.error(`group does not exist, student ${surname} not created`);
        return false;
    }
}

function groupLeader(groupNum, surname){
    let corectGroup = false;
    let corectStudent = false;
    for (let i = 0; i < groups.length; i++) {
        if(groupNum == groups[i].number){
            corectGroup = true;
            for (let j = 0; j < groups[i].students.length; j++) {
                if(surname == groups[i].students[j].surname){
                    corectStudent = true;
                    groups[i].groupLeader = groups[i].students[j];                    
                }                
            }
        }
    }
    if(!corectGroup){
        console.error(`${groupNum} group does not exist, group Leader not created`);
        return false;
    }
    if(!corectStudent){
        console.error(`student does not exist ${surname} in ${groupNum} group, group Leader not created`);
        return false;
    }
}

function addHobby(surname, hobby){
    let correctSurname = false;
    if(surname === '' || hobby === ''){
        console.error(`inncorect data`);
        return false;
    }
    surname = surname.trim();
    hobby = hobby.trim();
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].students.length; j++) {
            if(surname == groups[i].students[j].surname){
                groups[i].students[j].hobby = hobby;
                correctSurname = true;
            }
        }
    }
    if(!correctSurname){
        console.error(`student ${surname} is not defined`);
        return false;
    }
}

// task 1 Cписок студентів по групах
function showStudents(){
    res = "============== TASK 1 ================" + "\n";
    for (let i = 0; i < groups.length; i++) {
        res += "Group number: " + groups[i].number + "\n";
        res += "Students: \n";
        for (let j = 0; j < groups[i].students.length; j++) {
            if(!groups[i].students[j].groupLeader){
                res += (j+1) +") " + groups[i].students[j].surname + " " + groups[i].students[j].name + "\n";
            } else {
                res += (j+1)+") " + groups[i].groupLeader.surname + " " + groups[i].groupLeader.name + " - " + "(Group Leader) \n";
            }
        }  
        res += "============================== \n"      
    }
    return res;
}

groups = [];
createGroup(1);
createGroup(2);
createGroup(3);

rooms = [];
createRoom(1);
createRoom(2);
createRoom(3);

createStudent(1, 'Ivan', 'Ivanov', 'Ivanovich', 0001, 2000, 'Lviv', 'men', 'unmarried', 1000, 1);
createStudent(1, 'Petya', 'Petrov', 'Petrovich', 0002, 2001, 'Kiev', 'men', 'married', 1000, 1);
createStudent(1, 'Vasya', 'Vasylyov', 'Vasylyovich', 0003, 1999, 'Odessa', 'men', 'unmarried', 1000, 1);
createStudent(1, 'Nataly', 'Ivanova', 'Ivanivna', 0004, 1999, 'Kharkiv', 'women', 'unmarried', 1000, 2);
groupLeader(1, 'Vasylyov');
addHobby('Ivanov', 'football');


createStudent(2, 'Yuliya', 'Petrova', 'Petrivna', 0005, 2000, 'Khmelnytskyi', 'women', 'married', 1000, 2);
createStudent(2, 'Anna', 'Vasylyova', 'Vasylivna', 0006, 2001, 'Uzhhorod', 'women', 'unmarried', 1000, 2);
groupLeader(2, 'Petrova');
addHobby('Petrova', 'computer games');

// task 1 Cписок студентів по групах (result)
console.log(showStudents());
