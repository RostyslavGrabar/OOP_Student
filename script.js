function Group(number){
    let groupLeader;
    this.number = number;
    this.groupLeader = groupLeader;
    this.students = [];
    this.lessons = [];
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

Group.prototype.addLesson = function(lesson){
    this.lessons[lesson.lessonName] ={
        "lessonTeacher" : lesson.teacher,
        "marks" : {},
        "exam" : {},
        "raiting" : {},
    }
    for (let i = 0; i < this.students.length; i++) {
        this.lessons[lesson.lessonName]["marks"][this.students[i].surname] = 0;
        this.lessons[lesson.lessonName]["exam"][this.students[i].surname] = 0;
        this.lessons[lesson.lessonName]["raiting"][this.students[i].surname] = 0;
    }
}

Group.prototype.setMarks = function(surname, lesson, marks){
    if(typeof(marks) === "number"){
        marks = [marks];
    }
    if(this.lessons[lesson]["marks"][surname] === 0){
        this.lessons[lesson]["marks"][surname] = [];
    }
    this.lessons[lesson]["marks"][surname] = this.lessons[lesson]["marks"][surname].concat(marks);
    this.setLessonRaiting(surname, lesson, marks);
}

Group.prototype.setExam = function(surname, lesson, mark){

    this.lessons[lesson]["exam"][surname] = mark;
    this.setLessonRaiting(surname, lesson, mark);
}

Group.prototype.setLessonRaiting = function(surname, lesson){
    let mainRaiting = 0;
    let avg = this.lessons[lesson]["marks"][surname].reduce((a, b) => (a + b)) / this.lessons[lesson]["marks"][surname].length;
    this.lessons[lesson]["raiting"][surname] = this.lessons[lesson]["exam"][surname] + avg;
    for (let i = 0; i < this.students.length; i++) {
        if(this.students[i].surname === surname){

            if(this.students[i]["raiting"] === 0){
                this.students[i]["raiting"] = {};
            }

            this.students[i]["raiting"][lesson] = this.lessons[lesson]["raiting"][surname];
            for (const key in this.students[i]["raiting"]) {
                if ( key !== "Main") {
                    mainRaiting += this.students[i]["raiting"][key];
                }
            }
            this.students[i]["raiting"]["Main"] = mainRaiting;
        }
    }
}



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
    this.raiting = 0;


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

function Teacher(name, surname){
    this.name = name;
    this.surname = surname;
}

function Lesson(lessonName, teacher){
    this.lessonName = lessonName;
    this.teacher = teacher;
}

function validate(argumentsFunc, len){
    if(argumentsFunc === undefined || argumentsFunc.length !== len){
        return false;
    }
    for (let i = 0; i < argumentsFunc.length; i++) {
        if(typeof(argumentsFunc[i]) === "object"){
            for (let j = 0; j < argumentsFunc[j].length; j++) {
                if(typeof(argumentsFunc[i][j]) === "string"){
                    argumentsFunc[i][j] = argumentsFunc[i].trim();
                }
                if(argumentsFunc[i][j] === ''){
                    return false;
                }
            }
        }else {
            if(typeof(argumentsFunc[i]) === "string"){
                argumentsFunc[i] = argumentsFunc[i].trim();
            }
            if(argumentsFunc[i] === ''){                            
                return false;
            }
        }

    }
}

// room
function createRoom(number){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    rooms.push(new Rooms(number))
}

// student
function createStudent(groupNum, name, surname, lastName, numberOfStudentTicket, birthdayYear, address, sex, familyStatus, stipend, room){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
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

function addHobby(surname, hobby){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let correctSurname = false;

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

// group
function createGroup(number){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    groups.push(new Group(number))
}

function groupLeader(groupNum, surname){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
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

// teacher
function createTeacher(name, surname){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    teachers.push(new Teacher(name, surname));
}

// lesson
function createLesson(lessonName, teacherSurname){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let correcrTeacherSurname = false;
    for (let i = 0; i < teachers.length; i++) {
        if(teacherSurname == teachers[i].surname){
            lessons.push(new Lesson(lessonName, teachers[i]));
            correcrTeacherSurname = true;
        }
    }
    if(!correcrTeacherSurname){
        console.error(`teacher ${teacherSurname} does not exist , lesson not created`);
        return false;
    }
}

function addLessonToGroup(lessonName, groupNum){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let correctLesson = false;
    let correctGroup = false;


    for (let i = 0; i < lessons.length; i++) {
        if(lessonName  == lessons[i].lessonName){
            correctLesson = true;
            for (let j = 0; j < groups.length; j++) {
                if(groupNum  == groups[j].number){
                    correctGroup = true;
                    groups[j].addLesson(lessons[i]);
                }
            }
        }
    }
    if(!correctLesson){
        console.error(`lesson ${lessonName} does not exist , lesson not created`);
        return false;
    }
    if(!correctGroup){
        console.error(`group ${groupNum} does not exist , lesson not created`);
        return false;
    }
}

function funcSetMark(param ,groupNum, surname, lessonName, marks){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }

    let correctLesson = false;
    let correctGroup = false;
    let correctStudent = false;

    for (let i = 0; i < groups.length; i++) {
        if(groupNum == groups[i].number){
            correctGroup = true;
        }
        for (const key in groups[i].lessons) {
            if (key == lessonName) {
                correctLesson = true;
                for (let j = 0; j < groups[i].students.length; j++) {
                    if(surname === groups[i].students[j].surname){
                        correctStudent = true;
                        if(param === "marks"){
                            groups[i].setMarks(surname, lessonName, marks);
                        } else if(param === "exam"){
                            groups[i].setExam(surname, lessonName, marks);
                        } else {
                            console.error(`inncorect parameter ${param}, grades are not delivered`);
                            return false;
                        }
                    }                    
                }                
            }
        }        
    }
    if(!correctLesson){
        console.error(`lesson ${lessonName} does not exist , grades are not delivered`);
        return false;
    }
    if(!correctGroup){
        console.error(`group ${groupNum} does not exist , grades are not delivered`);
        return false;
    }
    if(!correctStudent){
        console.error(`student ${surname} does not exist , grades are not delivered`);
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
        res += "============================== \n";      
    }
    res += "\n"
    return res;
}

groups = [];
createGroup(1);
createGroup(2);

rooms = [];
createRoom(1);
createRoom(2);
createRoom(3);

teachers = [];
createTeacher("Sidor", "Sidorov");
createTeacher("Andrew", "Andreev");
createTeacher("Oleh", "Olehov");

lessons = [];
createLesson("Math", "Sidorov");
createLesson("Literature", "Andreev");
createLesson("IT", "Olehov");

createStudent(1, 'Ivan', 'Ivanov', 'Ivanovich', 0001, 2000, 'Lviv', 'man', 'unmarried', 1000, 1);
createStudent(1, 'Petya', 'Petrov', 'Petrovich', 0002, 2001, 'Kiev', 'man', 'married', 1000, 1);
createStudent(1, 'Vasya', 'Vasylyov', 'Vasylyovich', 0003, 1999, 'Odessa', 'man', 'unmarried', 1000, 1);
createStudent(1, 'Nataly', 'Ivanova', 'Ivanivna', 0004, 1999, 'Kharkiv', 'woman', 'unmarried', 1000, 2);
groupLeader(1, 'Vasylyov');
addHobby('Ivanov', 'football');


createStudent(2, 'Yuliya', 'Petrova', 'Petrivna', 0005, 2000, 'Khmelnytskyi', 'woman', 'married', 1000, 2);
createStudent(2, 'Anna', 'Vasylyova', 'Vasylivna', 0006, 2001, 'Uzhhorod', 'woman', 'unmarried', 1000, 2);
groupLeader(2, 'Petrova');
addHobby('Petrova', 'computer games');

addLessonToGroup("Math", 1);
addLessonToGroup("Literature", 1);

addLessonToGroup("IT", 2);
addLessonToGroup("Math", 2);

funcSetMark('marks', 1, 'Ivanov', "Math", [1, 2, 3]);
funcSetMark('exam', 1, 'Ivanov', "Math", 2);
funcSetMark('marks', 1, 'Ivanov', "Literature", [5, 5, 5]);
funcSetMark('exam', 1, 'Ivanov', "Literature", 5);

funcSetMark('marks', 1, 'Petrov', "Math", [3, 3, 3]);
funcSetMark('exam', 1, 'Petrov', "Math", 3);
funcSetMark('marks', 1, 'Petrov', "Literature", [4, 4, 4]);
funcSetMark('exam', 1, 'Petrov', "Literature", 4);


funcSetMark('marks', 1, 'Vasylyov', "Math", [5, 5, 3]);
funcSetMark('exam', 1, 'Vasylyov', "Math", 4);
funcSetMark('marks', 1, 'Vasylyov', "Literature", [5, 4, 3]);
funcSetMark('exam', 1, 'Vasylyov', "Literature", 4);

funcSetMark('marks', 1, 'Ivanova', "Math", [5, 5, 5]);
funcSetMark('exam', 1, 'Ivanova', "Math", 5);
funcSetMark('marks', 1, 'Ivanova', "Literature", [5, 5, 5]);
funcSetMark('exam', 1, 'Ivanova', "Literature", 5);

funcSetMark('marks', 2, 'Petrova', "Math", [2, 2, 2]);
funcSetMark('exam', 2, 'Petrova', "Math", 2);
funcSetMark('marks', 2, 'Petrova', "IT", [2, 2, 2]);
funcSetMark('exam', 2, 'Petrova', "IT", 2);

funcSetMark('marks', 2, 'Vasylyova', "Math", [4, 4, 4]);
funcSetMark('exam', 2, 'Vasylyova', "Math", 4);
funcSetMark('marks', 2, 'Vasylyova', "IT", [5, 5, 5]);
funcSetMark('exam', 2, 'Vasylyova', "IT", 5);

// task 1 Cписок студентів по групах (result)
console.log(showStudents());



console.log(groups);
