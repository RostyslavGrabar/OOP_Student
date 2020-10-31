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
    function roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }
    let avg = this.lessons[lesson]["marks"][surname].reduce((a, b) => (a + b)) / this.lessons[lesson]["marks"][surname].length;
    this.lessons[lesson]["raiting"][surname] = this.lessons[lesson]["exam"][surname] + avg;
    for (let i = 0; i < this.students.length; i++) {
        if(this.students[i].surname === surname){

            if(this.students[i]["raiting"] === 0){
                this.students[i]["raiting"] = {};
            }

            this.students[i]["raiting"][lesson] = this.lessons[lesson]["raiting"][surname];
            for (const key in this.students[i]["raiting"]) {
                if ( key !== "main") {
                    mainRaiting += this.students[i]["raiting"][key];
                }
            }
            this.students[i]["raiting"]["main"] = roundToTwo(mainRaiting);
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

Student.prototype.setStipend = function(){
    if(this.raiting.main >= 10 && this.raiting.main < 15){
        this.stipend = 1000;
    } else if(this.raiting.main >= 15){
        this.stipend = 2000;
    } else {
        this.stipend = 0;
    }
}

function Teacher(name, surname){
    this.name = name;
    this.surname = surname;
}

function Lesson(lessonName, teacher){
    this.lessonName = lessonName;
    this.teacher = teacher;
}

function Book(name, autorName, autorSurname){
    this.name = name;
    this.autorName = autorName;
    this.autorName = autorSurname;
}

function Library(){
    this.nums = 0000;
    this.books = {};
    this.students = [];
}

Library.prototype.addBooks = function(name, autorName, autorSurname, count, price){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let book = new Book(name, autorName, autorSurname);
    numbers = [];
    for (let i = 0; i < count; i++) {
        this.nums++;
        this.nums = this.nums.toString().padStart(4, '0');
        numbers[this.nums] = "present";  
    }
    this.books[book.name] = {
        "autorName" : autorName,
        "autorSurname" : autorSurname,
        "count" : count,
        "isPresent" : numbers,
        "price" : price,
    }
}

Library.prototype.getBook = function(studentName, studentSurname, bookName, autorName, autorSurname, year){
    let correctBook = false;   
    let numberBook; 
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    groups.forEach(item => {
        item.students.forEach(element => {
            if(element.surname.indexOf(studentSurname) != -1 && element.name.indexOf(studentName) != -1){
                correctStudent = true;
            }            
        })
    });
    if(!correctStudent){
        console.error(`student ${surname} ${name} is not defined`);
        return false;
    }

    for (const key in this.books) {
        if(key === bookName && this.books[key]['autorName'] === autorName && this.books[key]['autorSurname'] == autorSurname){
            correctBook = true;
            if(this.books[key]['count'] > 0){
                this.books[key]['count']--;
                book: for(value in this.books[key]['isPresent']){
                    if(this.books[key]['isPresent'][value] == 'present'){  
                        numberBook = value;
                        this.books[key]['isPresent'][value] = {
                            surname : studentSurname,
                            name : studentName,                            
                        } 
                        break book;
                    }
                }
                for (let i = 0; i <  this.students.length; i++) {
                    if((this.students[i]["studentSurname"] == studentSurname) && (this.students[i]["studentName"] == studentName)){
                        if(this.students[i].debt + this.books[key]["price"] > 100){
                            console.error(`limit exceeded`);
                            return false;
                        }else {
                            this.students[i].debt += this.books[key]["price"];
                            this.students[i].books.push({[numberBook] : year});
                        }
                        return true;
                    }                   
                }
                let student = {
                    "studentSurname" : studentSurname,
                    "studentName" : studentName,
                    "books" : [{[numberBook] : year}],
                    "debt" : this.books[key]["price"],
                }
                this.students.push(student);
            } else {
                correctBook = false;
            }
        }
    }
    if(!correctBook){
        console.error(`book ${bookName} is not defined`);
        return false;
    }
}

Library.prototype.giveBook = function(studentName, studentSurname, bookName, autorName, autorSurname){
    let numberBook;     
    let correctBook = false;
    let correctStudent = false;    
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    for (const key in this.books) {
        if(key === bookName && this.books[key]['autorName'] === autorName && this.books[key]['autorSurname'] == autorSurname){
            book: for(value in this.books[key]['isPresent']){
                if(this.books[key]['isPresent'][value]['surname'] == studentSurname && this.books[key]['isPresent'][value]['name'] == studentName){                        
                    correctBook = true;                
                    this.books[key]['isPresent'][value] = "present";
                    this.books[key]['count']++;
                    numberBook = value;
                    break book;
                }
            }
            for (let i = 0; i <  this.students.length; i++) {                
                if((this.students[i]["studentSurname"] === studentSurname) && (this.students[i]["studentName"] === studentName)){
                    correctStudent = true;
                    this.students[i].debt -= this.books[key]["price"];
                    let returnedBook = this.students[i].books.filter(item => !item[numberBook])
                    this.students[i].books = returnedBook;
                    return true;
                }                   
            }
        }
    }
    if(!correctStudent){
        console.error(`student ${studentSurname} ${studentName} is not defined in Library`);
        return false;
    }
    if(!correctBook){
        console.error(`book ${bookName} is not defined`);
        return false;
    }
}


// ======= functions - work with object ========
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
                if(argumentsFunc[i][j] === '' || argumentsFunc[i][j] === undefined){
                    return false;
                }
            }
        }else {
            if(typeof(argumentsFunc[i]) === "string"){
                argumentsFunc[i] = argumentsFunc[i].trim();
            }
            if(argumentsFunc[i] === '' || argumentsFunc[i] === undefined){                            
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

function addHobby(surname, name, hobby){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let correctStudent = false;
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].students.length; j++) {
            if(surname == groups[i].students[j].surname && name == groups[i].students[j].name){
                groups[i].students[j].hobby = hobby;
                correctStudent = true;
            }
        }
    }
    if(!correctStudent){
        console.error(`student ${surname} ${name} is not defined`);
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

function groupLeader(groupNum, surname, name){
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
                if(surname == groups[i].students[j].surname && name == groups[i].students[j].name){
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
        console.error(`student does not exist ${surname} ${name} in ${groupNum} group, group Leader not created`);
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
function createLesson(lessonName, teacherSurname, teacherName){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let correcrTeacher = false;
    for (let i = 0; i < teachers.length; i++) {
        if(teacherSurname === teachers[i].surname && teacherName === teachers[i].name){
            lessons.push(new Lesson(lessonName, teachers[i]));
            correcrTeacher = true;
        }
    }
    if(!correcrTeacher){
        console.error(`teacher ${teacherSurname} ${teacherName} does not exist , lesson not created`);
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

function funcSetMark(param ,groupNum, surname, name, lessonName, marks){
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
                    if(surname === groups[i].students[j].surname && name === groups[i].students[j].name){
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
        console.error(`student ${surname} ${surname} does not exist , grades are not delivered`);
        return false;
    }
}

// Stipend
function funcSetStipend(){
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].students.length; j++) {
            groups[i].students[j].setStipend();
        }
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

// task 2 Cписок студентів які мають рейтинг від X до Y
function showStudentsWithSomeRaiting(x, y){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    res = "============== TASK 2 ================" + "\n";
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].students.length; j++) {
            if(groups[i].students[j].raiting.main >= +x, groups[i].students[j].raiting.main <= +y){
                res +="Group N" + groups[i].number + "\n";
                res +="Raiting = " + groups[i].students[j].raiting.main + "\n";
                res += "Student: " + groups[i].students[j].surname + " " + groups[i].students[j].name + "\n";  
                res += "============================== \n";      
            }   
        }
        // res += "============================== \n";      
    }
    res += "\n"
    return res;
}

// task 3 Cписок студентів та книг що не повернені більше року (з підсумовуванням кількості книг та грошового боргу студента)
function showDebt(){
    let date = new Date();
    let studentsDebt = [];
    let student;
    let arr;
    date = date.getFullYear();
    res = "============== TASK 3 ================" + "\n";
    for (let i = 0; i < library.students.length; i++) {
        for (let j = 0; j < library.students[i].books.length; j++) {
            for(const key in library.students[i].books[j]){
                arr = [];
                if(date - library.students[i].books[j][key] >= 1) {
                    arr = studentsDebt.filter(item => item.surname == library.students[i].studentSurname && item.name == library.students[i].studentName);
                    if(arr.length == 0){
                        student = {
                            ["surname"] : library.students[i].studentSurname,
                            ["name"] : library.students[i].studentName,
                            ["books"] : {[key] : library.students[i].books[j][key]},
                            ["debt"] : library.students[i].debt,
                            ["count"] : library.students[i].books.length
                        }
                        studentsDebt.push(student);
                    } else {
                        studentsDebt.forEach(element => {
                            if(element["surname"] == library.students[i].studentSurname && element["name"] == library.students[i].studentName){
                                element["books"][key] = library.students[i].books[j][key]
                            }
                        });
                    }
                }
            } 
        }
    }
    for (let i = 0; i < studentsDebt.length; i++) {
        res += "Student: " + studentsDebt[i].surname + " " + studentsDebt[i].name + "\n";
        res += "Count books: " + studentsDebt[i].count + "\n" + "Books: \n";
        

        for (const key in studentsDebt[i].books) {
            for (const value in library.books) {
                for (const book in library.books[value].isPresent) {
                    if( key == book){
                        res += "(Book Num " + key + ") " + value + " " + library.books[value]["autorName"] +" " + library.books[value]["autorSurname"]  + "\n";
                    }
                }
            }
        }
        res += '\n'

        
    }
    res += "\n"
    return res;
}

// task 4 Довідка для студента про його рейтинг та розмір стипендії
function showRaitingStipend(surname, name){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    correctStudent = false;
    res = "============== TASK 4 ================" + "\n";
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].students.length; j++) {
            if(groups[i].students[j].surname === surname && groups[i].students[j].name === name){
                correctStudent = true;
                res +="Group N" + groups[i].number + "\n";
                res += "Student: " + groups[i].students[j].surname + " " + groups[i].students[j].name + "\n";  
                res +="Raiting = " + groups[i].students[j].raiting.main + "\n";
                res +="Stipend = " + groups[i].students[j].stipend + "\n";
                res += "============================== \n";      
            }   
        }     
    }
    if(!correctStudent){
        console.log("============== TASK 4 ================" + "\n");
        console.error(`student ${surname} does not exist`);
        return false;
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
createLesson("Math", "Sidorov", "Sidor");
createLesson("Literature", "Andreev", "Andrew");
createLesson("IT", "Olehov", "Oleh");

library = new Library();
library.addBooks("Захар Беркут" , "Іван", "Франко", 5, 20);
library.addBooks("Тарас Бульба" , "Микола", "Гоголь", 3, 30);
library.addBooks("Тигролови" , "Іван", "Багряний", 7, 50);
library.addBooks("Лісова пісня" , "Леся", "Українка", 9, 40);

createStudent(1, 'Ivan', 'Ivanov', 'Ivanovich', 0001, 2000, 'Lviv', 'man', 'unmarried', 1000, 1);
createStudent(1, 'Petya', 'Petrov', 'Petrovich', 0002, 2001, 'Kiev', 'man', 'married', 1000, 1);
createStudent(1, 'Vasya', 'Vasylyov', 'Vasylyovich', 0003, 1999, 'Odessa', 'man', 'unmarried', 1000, 1);
createStudent(1, 'Nataly', 'Ivanova', 'Ivanivna', 0004, 1999, 'Kharkiv', 'woman', 'unmarried', 1000, 2);
groupLeader(1, 'Vasylyov', 'Vasya');
addHobby('Ivanov', 'Ivan', 'football');


createStudent(2, 'Yuliya', 'Petrova', 'Petrivna', 0005, 2000, 'Khmelnytskyi', 'woman', 'married', 1000, 2);
createStudent(2, 'Anna', 'Vasylyova', 'Vasylivna', 0006, 2001, 'Uzhhorod', 'woman', 'unmarried', 1000, 2);
groupLeader(2, 'Petrova', 'Yuliya');
addHobby('Petrova', 'Yuliya', 'computer games');

addLessonToGroup("Math", 1);
addLessonToGroup("Literature", 1);

addLessonToGroup("IT", 2);
addLessonToGroup("Math", 2);

funcSetMark('marks', 1, 'Ivanov', 'Ivan', "Math", [1, 2, 3]);
funcSetMark('exam', 1, 'Ivanov', 'Ivan', "Math", 2);
funcSetMark('marks', 1, 'Ivanov', 'Ivan', "Literature", [5, 5, 5]);
funcSetMark('exam', 1, 'Ivanov', 'Ivan', "Literature", 5);

funcSetMark('marks', 1, 'Petrov', 'Petya', "Math", [3, 3, 3]);
funcSetMark('exam', 1, 'Petrov', 'Petya', "Math", 3);
funcSetMark('marks', 1, 'Petrov', 'Petya', "Literature", [4, 4, 4]);
funcSetMark('exam', 1, 'Petrov', 'Petya', "Literature", 4);


funcSetMark('marks', 1, 'Vasylyov', 'Vasya', "Math", [5, 5, 3]);
funcSetMark('exam', 1, 'Vasylyov', 'Vasya', "Math", 4);
funcSetMark('marks', 1, 'Vasylyov', 'Vasya', "Literature", [5, 4, 3]);
funcSetMark('exam', 1, 'Vasylyov', 'Vasya', "Literature", 4);

funcSetMark('marks', 1, 'Ivanova', 'Nataly', "Math", [5, 5, 5]);
funcSetMark('exam', 1, 'Ivanova', 'Nataly', "Math", 5);
funcSetMark('marks', 1, 'Ivanova', 'Nataly', "Literature", [5, 5, 5]);
funcSetMark('exam', 1, 'Ivanova', 'Nataly', "Literature", 5);

funcSetMark('marks', 2, 'Petrova', 'Yuliya', "Math", [2, 2, 2]);
funcSetMark('exam', 2, 'Petrova', 'Yuliya', "Math", 2);
funcSetMark('marks', 2, 'Petrova', 'Yuliya', "IT", [2, 2, 2]);
funcSetMark('exam', 2, 'Petrova', 'Yuliya', "IT", 2);

funcSetMark('marks', 2, 'Vasylyova', 'Anna', "Math", [4, 4, 4]);
funcSetMark('exam', 2, 'Vasylyova', 'Anna', "Math", 4);
funcSetMark('marks', 2, 'Vasylyova', 'Anna', "IT", [5, 5, 5]);
funcSetMark('exam', 2, 'Vasylyova', 'Anna', "IT", 5);

funcSetStipend();

library.getBook('Nataly', 'Ivanova', "Захар Беркут",  "Іван", "Франко", 2015);
library.getBook('Nataly', 'Ivanova', "Захар Беркут",  "Іван", "Франко", 2017);
library.getBook('Nataly', 'Ivanova', "Тигролови",  "Іван", "Багряний", 2019);

library.getBook('Anna', 'Vasylyova', "Захар Беркут",  "Іван", "Франко", 2020);
library.getBook('Anna', 'Vasylyova', "Захар Беркут",  "Іван", "Франко", 2020);
library.getBook('Anna', 'Vasylyova', "Тигролови",  "Іван", "Багряний", 2020);

library.getBook('Vasya', 'Vasylyov', "Тарас Бульба" , "Микола", "Гоголь", 2020);
library.getBook('Vasya', 'Vasylyov', "Тарас Бульба" , "Микола", "Гоголь", 2020);
library.getBook('Vasya', 'Vasylyov', "Тарас Бульба" , "Микола", "Гоголь", 2018);

library.giveBook('Anna', 'Vasylyova', "Захар Беркут",  "Іван", "Франко");

// task 1 Cписок студентів по групах (result)
console.log(showStudents());

// task 2 студентів які мають рейтинг від X до Y (result)
console.log(showStudentsWithSomeRaiting(10, 17));

// task 3 Cписок студентів та книг що не повернені більше року (з підсумовуванням кількості книг та грошового боргу студента) (result)
console.log(showDebt());

// task 4 Довідка для студента про його рейтинг та розмір стипендії (result)
console.log(showRaitingStipend("Ivanov" , "Ivan"));
console.log(showRaitingStipend("Vasylyova", 'Anna'));