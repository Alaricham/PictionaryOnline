// Server settings

const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    cors = require('cors'),
    io = require('socket.io')(http);


// Dictionary DB mockup

const englishBeginner01 = ['wind', 'water', 'tree',
    'rock', 'fire', 'dog', 'cow', 'cat',
    'mouse', 'tiger', 'man', 'owl', 'fish',
    'run', 'jump', 'fly', 'bird', 'ant', 'bee', 'monkey', 'hide', 'see', 'eat', 'drink'
];

const frenchBeginner01 = ['vent', 'eau', 'arbre',
    'pierre', 'fire', 'chien', 'vache', 'chat',
    'triste', 'heureux', 'homme', 'feu', 'poisson',
    'toilette', 'mettre', 'porte', 'oiseau', 'sortir', 'mourir', 'courir', 'fermer', 'voir', 'manger', 'boire'
];
const spanishBeginner01 = ['viento', 'agua', 'arbol',
    'piedra', 'fuego', 'perro', 'vaca', 'gato',
    'raton', 'tiger', 'hombre', 'buho', 'pez',
    'correr', 'brincar', 'volar', 'pajaro', 'hormiga', 'abeja', 'mono', 'esconder', 'ver', 'comer', 'beber'
];
const japaneseBeginner01 = ['kaze', 'mizu', 'ki',
    'ishi', 'kasai', 'inu', 'ushi', 'neko',
    'hito', 'tora', 'tomadachi', 'fukurou', 'sakana',
    'aruku', 'shisai', 'tobu', 'tori', 'ari', 'hachi', 'niku', 'nezumi', 'miru', 'taberu', 'nomu'
];



// Initialization Functions Tools

const generateRandomNumber = (arr) => {
    return Math.floor(Math.random() * arr.length)
}

const getWord = (list) => {
    let arr = eval(list);
    return arr[generateRandomNumber(arr)]
}

// Game Functions

const findContext = (Language, Room) => {
    let language, room;
    users.rooms.forEach((indexLanguage, indexNum1) => {
        if (indexLanguage.language === Language) {
            language = indexNum1
            indexLanguage.channels.forEach((indexRoom, indexNum2) => {
                if (indexRoom.name === Room) {
                    room = indexNum2;
                }
            })
        }
    })
    return {
        languageIndex: language,
        roomIndex: room
    };

}

// Constructors 

function Channel(name, channel) {
    this.interval;
    this.room = channel + "-" + name;
    this.name = name;
    this.users = [];
    this.round = 1;
    this.timer = 120000;
    this.userAtCanvas = 'none';
    this.runCondition = false;
    this.word = getWord(channel + name);
    this.intervalRunning = false;
    this.roundWon = false;
    this.points = 200;
    this.rotationNumber = 0;

    this.nextUser = function () {
        if ((this.users.length - 1) === this.rotationNumber) {
            this.rotationNumber = 0;
            this.userAtCanvas = this.users[this.rotationNumber].name;
        } else {
            this.rotationNumber++;
            this.userAtCanvas = this.users[this.rotationNumber].name;
        }
    }


    this.resetRound = function (argTime) {
        this.timer = argTime || 120000;
        this.points = 200;
        this.word = getWord(channel + name);
        this.roundWon = false;
        this.guessNum = 0;
        this.nextUser()
        io.sockets.in(this.room).emit('wordGuess', this.word)
        io.sockets.in(this.room).emit('noCanvas')
        io.sockets.in(this.room).emit('round', this.round)
        io.sockets.in(this.room).emit('clear')
        io.to(this.userAtCanvas).emit('userAtCanvas')

    }

    this.pickWinner = function () {
        let list = this.users;
        list.sort((a, b) => {
            if (a.points < b.points) {
                return 1
            }
            if (a.points > b.points) {
                return -1
            }
            return 0
        })
        io.sockets.in(this.room).emit('winner', list[0].user);
    }

    this.checkGuessNum = function () {
        if (this.users.length - 1 === this.guessNum) {
            this.roundWon = true;
            this.checkEndRound()
        }
    }


    this.checkEndRound = function () {
        if (this.roundWon && this.round !== 5) {
            this.round++;
            return this.resetRound()
        } else {
            this.pickWinner()
            return this.resetGame()

        }
    }

    this.resetPoints = () => {
        this.users.forEach(user => {
            user.points = 0;
        })
        console.log('Points reset in ', this.room);
    }


    this.resetGame = function () {
        this.round = 1;
        this.resetPoints();
        this.resetRound(120000);
        io.sockets.in(this.room).emit('restart')
    }

    this.runGame = function () {
        this.conditionGame()
        if (this.runCondition) {
            this.checkGuessNum()
            if (this.timer === 0) {
                if (this.round === 5) {
                    this.pickWinner()
                    this.resetGame()
                } else {
                    this.round++;
                    this.resetRound()
                }
            } else {
                this.timer -= 1000;
                io.sockets.in(this.room).emit('timer', this.timer)
            }
        }
    }

    this.conditionGame = function () {
        if (typeof this.users == 'undefined' || !(this.users.length > 0)) {
            return

        } else if (this.users.length >= 2 && !this.runCondition) {
            this.runCondition = true;
            this.intervalRunning = true;
            this.interval = setInterval(function () {
                this.runGame()
            }.bind(this), 1000)
            this.resetGame()
            console.log('reseting', this.room)

        } else if (this.users.length < 2 && this.intervalRunning) {
            this.runCondition = false;
            this.intervalRunning = false;
            this.userAtCanvas = 'none'
            clearInterval(this.interval);
            console.log('waiting ', this.room)
            io.sockets.in(this.room).emit('awaiting');
        }
    }


}

// Users Object -- Contains individual game mechanics' methods, data and variables.

users = {};
users.userNum = 0;
users.rooms = [{
    language: 'english',
    channels: []
},
{
    language: 'french',
    channels: []
},
{
    language: 'spanish',
    channels: []
},
{
    language: 'japanese',
    channels: []
}];

users.rooms[0].channels.push(new Channel('Beginner01', users.rooms[0].language))

users.rooms[1].channels.push(new Channel('Beginner01', users.rooms[1].language))

users.rooms[2].channels.push(new Channel('Beginner01', users.rooms[2].language))

users.rooms[3].channels.push(new Channel('Beginner01', users.rooms[3].language))


// Sockets & Events

io.on('connection', (socket) => {
    console.log('User connected...')

    socket.on('disconnect', () => {
        console.log('User disconnected...')
        if (socket.context) {
            let { languageIndex, roomIndex } = socket.context,
                { users: usersNested } = users.rooms[languageIndex].channels[roomIndex];

            usersNested.forEach((user, i) => {
                if (user.name === socket.id) {
                    let list = []
                    usersNested.pop(i);
                    users.userNum--;
                    console.log('number of users connected', users.userNum)
                    usersNested.forEach(user => list.push(user.user))
                    console.log(list)
                    io.sockets.in(socket.language + '-' + socket.channel).emit('userList', list);
                }
            })
        }
    })


    socket.on('clear', () => {
        io.sockets.in(socket.language + '-' + socket.channel).emit('clear');
    })

    socket.on('channelList', channelNameReq => {
        let data = [];
        users.rooms.forEach(channel => {
            if (channel.language === channelNameReq) {
                channel.channels.forEach(channel => {
                    data.push(channel.name)
                })
                io.to(socket.id).emit('channelList', data);
            }
        })
    })

    socket.on('userList', data => {
        let context = findContext(data.language, data.channel),
            { languageIndex, roomIndex } = context,
            { users: usersNested } = users.rooms[languageIndex].channels[roomIndex],
            list = [];
        usersNested.forEach(user => list.push(user.user))
        io.to(socket.id).emit('userList', list);

    })

    socket.on('addUser', user => {
        let context = findContext(user.language, user.channel),
            { languageIndex, roomIndex } = context,
            { users: usersNested } = users.rooms[languageIndex].channels[roomIndex],
            { channels } = users.rooms[languageIndex],
            list = [];

        users.userNum++;
        socket.username = user.name;
        socket.context = context
        socket.language = user.language;
        socket.channel = user.channel
        channels[roomIndex].users.push({
            name: socket.id,
            user: socket.username,
            points: 0
        })
        socket.join(user.language + '-' + user.channel)
        usersNested.forEach(user => list.push(user.user))
        console.log(socket.username, 'just connected to', user.language + '-' + user.channel);
        console.log('number of users connected ', users.userNum)
        io.sockets.in(user.language + '-' + user.channel).emit('userList', list);
        channels[roomIndex].conditionGame()
    })

    socket.on('message', data => {
        const { languageIndex, roomIndex } = socket.context,
            channelPath = users.rooms[languageIndex].channels[roomIndex];

        if (data === channelPath.word) {
            io.sockets.in(socket.language + '-' + socket.channel).emit('correctGuess', {
                text: socket.username + ' just guessed!',
                user: 'ALERT'
            })
            channelPath.users.forEach(user => {
                if (user.name === socket.id) {
                    user.points += users.rooms[languageIndex].channels[roomIndex].points;
                    io.to(socket.id).emit('guess', user.points);
                }
            })
            channelPath.guessNum++;
        } else {
            io.sockets.in(socket.language + '-' + socket.channel).emit('new message', {
                text: data,
                user: socket.username
            })
        }

    })

    socket.on('drawing', data => {
        socket.broadcast.to(socket.language + '-' + socket.channel).emit('new drawing', {
            drawData: data,
            user: socket.username
        })
    })

})

var path = require('path');

app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

http.listen(3000, () => {
    console.log('App listening...')
})