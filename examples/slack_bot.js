/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node slack_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it is running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('../lib/Botkit.js');
var mycron = require('../node_modules/cron/lib/cron.js')
var mycron1 = require('../node_modules/cron/lib/cron.js')

var mycron2 = require('../node_modules/cron/lib/cron.js')
var mycron3 = require('../node_modules/cron/lib/cron.js')
var mycron4 = require('../node_modules/cron/lib/cron.js')

var os = require('os');
var gomidashiUser = 'Unknown'
require('date-utils');
var serialport = require('serialport');
var portName = "COM5";

const sp = new serialport('COM5', {
    baudRate: 9600,
    parser: serialport.parsers.readline('\n')
});


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '172.16.0.28',
    user: 'slack_bot',
    password: 'slack_bot',
    database: 'slack_bot'
});
var err;
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM remind', function (error, results, fields) {
    if (err) { console.log('err: ' + err); }
    var usersRows = JSON.parse(JSON.stringify(results));
    console.log(usersRows);

})



const fs = require('fs');
const mkdirp = require('mkdirp');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'credentials.json';

const default_lTE_time = 15 //listTomorrowEvents()の通知時刻

var member = [
	[
	 "U8ZUEBLAX",
         "fujita",
	],
	[
	"UA51W8GUX",
        "goto",
	],
	[
	"U901G8WCU",
        "honda",
	],
	[
	"UA3DS9QE5",
        "kitamura",
	],
	[
	"UA51ZCYUF",
        "koda",
	],
	[
	"U8ZUE5Y8K",
        "konishi",
	],
	[
	"UA44E98TX",
        "kurono",
	],
	[
	"U90T3DZ0W",
        "maeda",
	],
	[
	"U902HMAN6",
        "shibuya",
	],
	[
	"U905CLDB7",
        "shirasawa",
	],
	[
	"U90T180S2",
        "tanaka",
	],
	[
	"U8ZUW06JX",
        "utani",
	],
	[
	"U91JHJG23",
        "yoshikawa",
	]
];


var holiday = [
        [1949, 9999, 1, 1, "元日"],
        [1967, 9999, 2, 11, "建国記念の日"],
        [2007, 9999, 4, 29, "昭和の日"],
        [1949, 9999, 5, 3, "憲法記念日"],
        [2007, 9999, 5, 4, "みどりの日"],
        [1949, 9999, 5, 5, "こどもの日"],
        [2016, 9999, 8, 11, "山の日"],
        [1948, 9999, 11, 3, "文化の日"],
        [1948, 9999, 11, 23, "勤労感謝の日"],
        [1989, 9999, 12, 23, "天皇誕生日"]
     ];

var holiday_week =[
	[2000, 9999, 1, [2, 1], "成人の日"],
	[2003, 9999, 7, [3, 1], "海の日"],
	[2003, 9999, 9, [3, 1], "敬老の日"],
        [2000, 9999, 10, [2, 1], "体育の日"]

];

var locations =
[{       "user_name":"utani",
         "latlon": "lat=34.46&lon=135.25",
         "location_name": "伊丹"
    }/*,
{       "user":"",
         "latlon": "",
         "name": ""
    },
{       "user":"",
         "latlon": "",
         "name": ""
    },
{       "user":"",
         "latlon": "",
         "name": ""
    },*/
];

var matsugasakiholiday =[
{"minute":20,"hour":5},
{"minute":42,"hour":5},
{"minute":57,"hour":5},
{"minute":12,"hour":6},
{"minute":26,"hour":6},
{"minute":36,"hour":6},
{"minute":46,"hour":6},
{"minute":55,"hour":6},
{"minute":5,"hour":7},
{"minute":14,"hour":7},
{"minute":23,"hour":7},
{"minute":33,"hour":7},
{"minute":41,"hour":7},
{"minute":49,"hour":7},
{"minute":56,"hour":7},
{"minute":3,"hour":8},
{"minute":10,"hour":8},
{"minute":16,"hour":8},
{"minute":22,"hour":8},
{"minute":28,"hour":8},
{"minute":34,"hour":8},
{"minute":40,"hour":8},
{"minute":46,"hour":8},
{"minute":52,"hour":8},
{"minute":58,"hour":8},
{"minute":4,"hour":9},
{"minute":10,"hour":9},
{"minute":16,"hour":9},
{"minute":22,"hour":9},
{"minute":29,"hour":9},
{"minute":35,"hour":9},
{"minute":42,"hour":9},
{"minute":48,"hour":9},
{"minute":55,"hour":9},
{"minute":2,"hour":10},
{"minute":9,"hour":10},
{"minute":17,"hour":10},
{"minute":24,"hour":10},
{"minute":32,"hour":10},
{"minute":39,"hour":10},
{"minute":47,"hour":10},
{"minute":54,"hour":10},
{"minute":2,"hour":11},
{"minute":9,"hour":11},
{"minute":17,"hour":11},
{"minute":24,"hour":11},
{"minute":32,"hour":11},
{"minute":39,"hour":11},
{"minute":47,"hour":11},
{"minute":54,"hour":11},
{"minute":2,"hour":12},
{"minute":9,"hour":12},
{"minute":17,"hour":12},
{"minute":24,"hour":12},
{"minute":32,"hour":12},
{"minute":39,"hour":12},
{"minute":47,"hour":12},
{"minute":54,"hour":12},
{"minute":2,"hour":13},
{"minute":9,"hour":13},
{"minute":17,"hour":13},
{"minute":24,"hour":13},
{"minute":32,"hour":13},
{"minute":39,"hour":13},
{"minute":47,"hour":13},
{"minute":54,"hour":13},
{"minute":2,"hour":14},
{"minute":9,"hour":14},
{"minute":17,"hour":14},
{"minute":24,"hour":14},
{"minute":32,"hour":14},
{"minute":39,"hour":14},
{"minute":47,"hour":14},
{"minute":54,"hour":14},
{"minute":2,"hour":15},
{"minute":9,"hour":15},
{"minute":16,"hour":15},
{"minute":24,"hour":15},
{"minute":31,"hour":15},
{"minute":39,"hour":15},
{"minute":46,"hour":15},
{"minute":54,"hour":15},
{"minute":2,"hour":16},
{"minute":9,"hour":16},
{"minute":17,"hour":16},
{"minute":24,"hour":16},
{"minute":32,"hour":16},
{"minute":39,"hour":16},
{"minute":47,"hour":16},
{"minute":54,"hour":16},
{"minute":2,"hour":17},
{"minute":8,"hour":17},
{"minute":14,"hour":17},
{"minute":20,"hour":17},
{"minute":26,"hour":17},
{"minute":32,"hour":17},
{"minute":38,"hour":17},
{"minute":44,"hour":17},
{"minute":50,"hour":17},
{"minute":56,"hour":17},
{"minute":2,"hour":18},
{"minute":8,"hour":18},
{"minute":14,"hour":18},
{"minute":20,"hour":18},
{"minute":26,"hour":18},
{"minute":34,"hour":18},
{"minute":41,"hour":18},
{"minute":49,"hour":18},
{"minute":57,"hour":18},
{"minute":4,"hour":19},
{"minute":12,"hour":19},
{"minute":19,"hour":19},
{"minute":27,"hour":19},
{"minute":34,"hour":19},
{"minute":42,"hour":19},
{"minute":49,"hour":19},
{"minute":57,"hour":19},
{"minute":4,"hour":20},
{"minute":12,"hour":20},
{"minute":19,"hour":20},
{"minute":27,"hour":20},
{"minute":34,"hour":20},
{"minute":42,"hour":20},
{"minute":50,"hour":20},
{"minute":0,"hour":21},
{"minute":9,"hour":21},
{"minute":19,"hour":21},
{"minute":29,"hour":21},
{"minute":39,"hour":21},
{"minute":49,"hour":21},
{"minute":59,"hour":21},
{"minute":9,"hour":22},
{"minute":19,"hour":22},
{"minute":29,"hour":22},
{"minute":39,"hour":22},
{"minute":49,"hour":22},
{"minute":59,"hour":22},
{"minute":11,"hour":23},
{"minute":21,"hour":23},
{"minute":33,"hour":23},
{"minute":41,"hour":23},
{"minute":11,"hour":0}
]

var matsugasakiweekday =[
{"minute":20,"hour":5},
{"minute":42,"hour":5},
{"minute":57,"hour":5},
{"minute":12,"hour":6},
{"minute":25,"hour":6},
{"minute":37,"hour":6},
{"minute":47,"hour":6},
{"minute":55,"hour":6},
{"minute":4,"hour":7},
{"minute":11,"hour":7},
{"minute":19,"hour":7},
{"minute":26,"hour":7},
{"minute":33,"hour":7},
{"minute":40,"hour":7},
{"minute":45,"hour":7},
{"minute":50,"hour":7},
{"minute":54,"hour":7},
{"minute":59,"hour":7},
{"minute":3,"hour":8},
{"minute":8,"hour":8},
{"minute":13,"hour":8},
{"minute":17,"hour":8},
{"minute":21,"hour":8},
{"minute":25,"hour":8},
{"minute":30,"hour":8},
{"minute":33,"hour":8},
{"minute":37,"hour":8},
{"minute":41,"hour":8},
{"minute":45,"hour":8},
{"minute":49,"hour":8},
{"minute":53,"hour":8},
{"minute":57,"hour":8},
{"minute":1,"hour":9},
{"minute":5,"hour":9},
{"minute":10,"hour":9},
{"minute":14,"hour":9},
{"minute":19,"hour":9},
{"minute":23,"hour":9},
{"minute":27,"hour":9},
{"minute":31,"hour":9},
{"minute":35,"hour":9},
{"minute":39,"hour":9},
{"minute":44,"hour":9},
{"minute":49,"hour":9},
{"minute":54,"hour":9},
{"minute":59,"hour":9},
{"minute":5,"hour":10},
{"minute":11,"hour":10},
{"minute":17,"hour":10},
{"minute":22,"hour":10},
{"minute":27,"hour":10},
{"minute":32,"hour":10},
{"minute":37,"hour":10},
{"minute":41,"hour":10},
{"minute":45,"hour":10},
{"minute":49,"hour":10},
{"minute":55,"hour":10},
{"minute":2,"hour":11},
{"minute":9,"hour":11},
{"minute":17,"hour":11},
{"minute":24,"hour":11},
{"minute":32,"hour":11},
{"minute":39,"hour":11},
{"minute":47,"hour":11},
{"minute":54,"hour":11},
{"minute":2,"hour":12},
{"minute":9,"hour":12},
{"minute":17,"hour":12},
{"minute":24,"hour":12},
{"minute":32,"hour":12},
{"minute":39,"hour":12},
{"minute":47,"hour":12},
{"minute":54,"hour":12},
{"minute":2,"hour":13},
{"minute":9,"hour":13},
{"minute":17,"hour":13},
{"minute":24,"hour":13},
{"minute":32,"hour":13},
{"minute":39,"hour":13},
{"minute":47,"hour":13},
{"minute":54,"hour":13},
{"minute":2,"hour":14},
{"minute":9,"hour":14},
{"minute":17,"hour":14},
{"minute":24,"hour":14},
{"minute":32,"hour":14},
{"minute":39,"hour":14},
{"minute":47,"hour":14},
{"minute":54,"hour":14},
{"minute":2,"hour":15},
{"minute":9,"hour":15},
{"minute":17,"hour":15},
{"minute":24,"hour":15},
{"minute":32,"hour":15},
{"minute":39,"hour":15},
{"minute":46,"hour":15},
{"minute":52,"hour":15},
{"minute":58,"hour":15},
{"minute":4,"hour":16},
{"minute":10,"hour":16},
{"minute":16,"hour":16},
{"minute":21,"hour":16},
{"minute":26,"hour":16},
{"minute":31,"hour":16},
{"minute":36,"hour":16},
{"minute":41,"hour":16},
{"minute":46,"hour":16},
{"minute":51,"hour":16},
{"minute":56,"hour":16},
{"minute":1,"hour":17},
{"minute":6,"hour":17},
{"minute":11,"hour":17},
{"minute":16,"hour":17},
{"minute":21,"hour":17},
{"minute":26,"hour":17},
{"minute":31,"hour":17},
{"minute":36,"hour":17},
{"minute":41,"hour":17},
{"minute":46,"hour":17},
{"minute":51,"hour":17},
{"minute":56,"hour":17},
{"minute":1,"hour":18},
{"minute":6,"hour":18},
{"minute":11,"hour":18},
{"minute":16,"hour":18},
{"minute":21,"hour":18},
{"minute":26,"hour":18},
{"minute":31,"hour":18},
{"minute":36,"hour":18},
{"minute":41,"hour":18},
{"minute":46,"hour":18},
{"minute":51,"hour":18},
{"minute":56,"hour":18},
{"minute":2,"hour":19},
{"minute":8,"hour":19},
{"minute":14,"hour":19},
{"minute":20,"hour":19},
{"minute":26,"hour":19},
{"minute":32,"hour":19},
{"minute":38,"hour":19},
{"minute":44,"hour":19},
{"minute":50,"hour":19},
{"minute":57,"hour":19},
{"minute":4,"hour":20},
{"minute":12,"hour":20},
{"minute":19,"hour":20},
{"minute":27,"hour":20},
{"minute":34,"hour":20},
{"minute":42,"hour":20},
{"minute":50,"hour":20},
{"minute":0,"hour":21},
{"minute":9,"hour":21},
{"minute":19,"hour":21},
{"minute":29,"hour":21},
{"minute":39,"hour":21},
{"minute":49,"hour":21},
{"minute":59,"hour":21},
{"minute":9,"hour":22},
{"minute":19,"hour":22},
{"minute":29,"hour":22},
{"minute":39,"hour":22},
{"minute":49,"hour":22},
{"minute":59,"hour":22},
{"minute":11,"hour":23},
{"minute":21,"hour":23},
{"minute":33,"hour":23},
{"minute":41,"hour":23},
{"minute":11,"hour":0}
]

var demachiyanagi_yodo_weekday =[
{"minute":0,"hour":5},
{"minute":22,"hour":5},
{"minute":34,"hour":5},
{"minute":41,"hour":5},
{"minute":52,"hour":5},
{"minute":0,"hour":6},
{"minute":6,"hour":6},
{"minute":10,"hour":6},
{"minute":15,"hour":6},
{"minute":18,"hour":6},
{"minute":23,"hour":6},
{"minute":26,"hour":6},
{"minute":32,"hour":6},
{"minute":36,"hour":6},
{"minute":42,"hour":6},
{"minute":45,"hour":6},
{"minute":51,"hour":6},
{"minute":55,"hour":6},
{"minute":1,"hour":7},
{"minute":3,"hour":7},
{"minute":9,"hour":7},
{"minute":12,"hour":7},
{"minute":19,"hour":7},
{"minute":24,"hour":7},
{"minute":32,"hour":7},
{"minute":35,"hour":7},
{"minute":38,"hour":7},
{"minute":43,"hour":7},
{"minute":47,"hour":7},
{"minute":53,"hour":7},
{"minute":55,"hour":7},
{"minute":3,"hour":8},
{"minute":5,"hour":8},
{"minute":17,"hour":8},
{"minute":24,"hour":8},
{"minute":27,"hour":8},
{"minute":36,"hour":8},
{"minute":39,"hour":8},
{"minute":46,"hour":8},
{"minute":49,"hour":8},
{"minute":55,"hour":8},
{"minute":59,"hour":8},
{"minute":6,"hour":9},
{"minute":9,"hour":9},
{"minute":15,"hour":9},
{"minute":19,"hour":9},
{"minute":25,"hour":9},
{"minute":29,"hour":9},
{"minute":39,"hour":9},
{"minute":44,"hour":9},
{"minute":49,"hour":9},
{"minute":53,"hour":9},
{"minute":59,"hour":9},
{"minute":5,"hour":10},
{"minute":9,"hour":10},
{"minute":16,"hour":10},
{"minute":26,"hour":10},
{"minute":36,"hour":10},
{"minute":39,"hour":10},
{"minute":46,"hour":10},
{"minute":49,"hour":10},
{"minute":56,"hour":10},
{"minute":59,"hour":10},
{"minute":6,"hour":11},
{"minute":9,"hour":11},
{"minute":16,"hour":11},
{"minute":19,"hour":11},
{"minute":26,"hour":11},
{"minute":29,"hour":11},
{"minute":36,"hour":11},
{"minute":39,"hour":11},
{"minute":46,"hour":11},
{"minute":49,"hour":11},
{"minute":59,"hour":11},
{"minute":6,"hour":12},
{"minute":9,"hour":12},
{"minute":16,"hour":12},
{"minute":19,"hour":12},
{"minute":26,"hour":12},
{"minute":29,"hour":12},
{"minute":36,"hour":12},
{"minute":46,"hour":12},
{"minute":49,"hour":12},
{"minute":56,"hour":12},
{"minute":59,"hour":12},
{"minute":6,"hour":13},
{"minute":9,"hour":13},
{"minute":16,"hour":13},
{"minute":19,"hour":13},
{"minute":26,"hour":13},
{"minute":29,"hour":13},
{"minute":36,"hour":13},
{"minute":39,"hour":13},
{"minute":46,"hour":13},
{"minute":49,"hour":13},
{"minute":56,"hour":13},
{"minute":59,"hour":13},
{"minute":9,"hour":14},
{"minute":16,"hour":14},
{"minute":19,"hour":14},
{"minute":26,"hour":14},
{"minute":29,"hour":14},
{"minute":36,"hour":14},
{"minute":39,"hour":14},
{"minute":46,"hour":14},
{"minute":53,"hour":14},
{"minute":58,"hour":14},
{"minute":3,"hour":15},
{"minute":8,"hour":15},
{"minute":13,"hour":15},
{"minute":18,"hour":15},
{"minute":23,"hour":15},
{"minute":28,"hour":15},
{"minute":38,"hour":15},
{"minute":43,"hour":15},
{"minute":48,"hour":15},
{"minute":53,"hour":15},
{"minute":58,"hour":15},
{"minute":3,"hour":16},
{"minute":8,"hour":16},
{"minute":13,"hour":16},
{"minute":18,"hour":16},
{"minute":23,"hour":16},
{"minute":33,"hour":16},
{"minute":38,"hour":16},
{"minute":43,"hour":16},
{"minute":48,"hour":16},
{"minute":53,"hour":16},
{"minute":58,"hour":16},
{"minute":3,"hour":17},
{"minute":13,"hour":17},
{"minute":18,"hour":17},
{"minute":23,"hour":17},
{"minute":28,"hour":17},
{"minute":33,"hour":17},
{"minute":38,"hour":17},
{"minute":43,"hour":17},
{"minute":46,"hour":17},
{"minute":51,"hour":17},
{"minute":54,"hour":17},
{"minute":58,"hour":17},
{"minute":3,"hour":18},
{"minute":8,"hour":18},
{"minute":14,"hour":18},
{"minute":16,"hour":18},
{"minute":21,"hour":18},
{"minute":24,"hour":18},
{"minute":29,"hour":18},
{"minute":34,"hour":18},
{"minute":39,"hour":18},
{"minute":44,"hour":18},
{"minute":49,"hour":18},
{"minute":55,"hour":18},
{"minute":59,"hour":18},
{"minute":9,"hour":19},
{"minute":15,"hour":19},
{"minute":19,"hour":19},
{"minute":24,"hour":19},
{"minute":29,"hour":19},
{"minute":39,"hour":19},
{"minute":44,"hour":19},
{"minute":49,"hour":19},
{"minute":55,"hour":19},
{"minute":59,"hour":19},
{"minute":3,"hour":20},
{"minute":8,"hour":20},
{"minute":11,"hour":20},
{"minute":14,"hour":20},
{"minute":21,"hour":20},
{"minute":24,"hour":20},
{"minute":33,"hour":20},
{"minute":36,"hour":20},
{"minute":44,"hour":20},
{"minute":48,"hour":20},
{"minute":54,"hour":20},
{"minute":0,"hour":21},
{"minute":4,"hour":21},
{"minute":9,"hour":21},
{"minute":12,"hour":21},
{"minute":16,"hour":21},
{"minute":21,"hour":21},
{"minute":24,"hour":21},
{"minute":33,"hour":21},
{"minute":36,"hour":21},
{"minute":43,"hour":21},
{"minute":48,"hour":21},
{"minute":53,"hour":21},
{"minute":1,"hour":22},
{"minute":4,"hour":22},
{"minute":14,"hour":22},
{"minute":16,"hour":22},
{"minute":24,"hour":22},
{"minute":27,"hour":22},
{"minute":36,"hour":22},
{"minute":39,"hour":22},
{"minute":45,"hour":22},
{"minute":51,"hour":22},
{"minute":53,"hour":22},
{"minute":4,"hour":23},
{"minute":10,"hour":23},
{"minute":20,"hour":23},
{"minute":25,"hour":23},
{"minute":30,"hour":23},
{"minute":40,"hour":23},
{"minute":44,"hour":23},
{"minute":58,"hour":23},
{"minute":0,"hour":0},
{"minute":19,"hour":0}
]
var demachiyanagi_yodo_holiday =[
{"minute":0,"hour":5},
{"minute":22,"hour":5},
{"minute":34,"hour":5},
{"minute":39,"hour":5},
{"minute":51,"hour":5},
{"minute":1,"hour":6},
{"minute":10,"hour":6},
{"minute":16,"hour":6},
{"minute":19,"hour":6},
{"minute":28,"hour":6},
{"minute":31,"hour":6},
{"minute":41,"hour":6},
{"minute":46,"hour":6},
{"minute":53,"hour":6},
{"minute":56,"hour":6},
{"minute":4,"hour":7},
{"minute":6,"hour":7},
{"minute":14,"hour":7},
{"minute":17,"hour":7},
{"minute":24,"hour":7},
{"minute":27,"hour":7},
{"minute":34,"hour":7},
{"minute":37,"hour":7},
{"minute":40,"hour":7},
{"minute":44,"hour":7},
{"minute":47,"hour":7},
{"minute":54,"hour":7},
{"minute":57,"hour":7},
{"minute":3,"hour":8},
{"minute":8,"hour":8},
{"minute":15,"hour":8},
{"minute":18,"hour":8},
{"minute":25,"hour":8},
{"minute":28,"hour":8},
{"minute":35,"hour":8},
{"minute":38,"hour":8},
{"minute":45,"hour":8},
{"minute":48,"hour":8},
{"minute":54,"hour":8},
{"minute":58,"hour":8},
{"minute":2,"hour":9},
{"minute":8,"hour":9},
{"minute":15,"hour":9},
{"minute":18,"hour":9},
{"minute":25,"hour":9},
{"minute":29,"hour":9},
{"minute":36,"hour":9},
{"minute":39,"hour":9},
{"minute":46,"hour":9},
{"minute":49,"hour":9},
{"minute":55,"hour":9},
{"minute":0,"hour":10},
{"minute":3,"hour":10},
{"minute":10,"hour":10},
{"minute":17,"hour":10},
{"minute":20,"hour":10},
{"minute":25,"hour":10},
{"minute":30,"hour":10},
{"minute":33,"hour":10},
{"minute":40,"hour":10},
{"minute":47,"hour":10},
{"minute":50,"hour":10},
{"minute":55,"hour":10},
{"minute":0,"hour":11},
{"minute":3,"hour":11},
{"minute":10,"hour":11},
{"minute":17,"hour":11},
{"minute":20,"hour":11},
{"minute":25,"hour":11},
{"minute":30,"hour":11},
{"minute":33,"hour":11},
{"minute":40,"hour":11},
{"minute":47,"hour":11},
{"minute":50,"hour":11},
{"minute":55,"hour":11},
{"minute":59,"hour":11},
{"minute":3,"hour":12},
{"minute":9,"hour":12},
{"minute":16,"hour":12},
{"minute":19,"hour":12},
{"minute":26,"hour":12},
{"minute":29,"hour":12},
{"minute":36,"hour":12},
{"minute":39,"hour":12},
{"minute":46,"hour":12},
{"minute":49,"hour":12},
{"minute":56,"hour":12},
{"minute":59,"hour":12},
{"minute":6,"hour":13},
{"minute":9,"hour":13},
{"minute":16,"hour":13},
{"minute":19,"hour":13},
{"minute":26,"hour":13},
{"minute":29,"hour":13},
{"minute":36,"hour":13},
{"minute":39,"hour":13},
{"minute":46,"hour":13},
{"minute":49,"hour":13},
{"minute":56,"hour":13},
{"minute":59,"hour":13},
{"minute":6,"hour":14},
{"minute":9,"hour":14},
{"minute":16,"hour":14},
{"minute":19,"hour":14},
{"minute":26,"hour":14},
{"minute":29,"hour":14},
{"minute":36,"hour":14},
{"minute":39,"hour":14},
{"minute":46,"hour":14},
{"minute":49,"hour":14},
{"minute":56,"hour":14},
{"minute":59,"hour":14},
{"minute":5,"hour":15},
{"minute":9,"hour":15},
{"minute":15,"hour":15},
{"minute":18,"hour":15},
{"minute":25,"hour":15},
{"minute":28,"hour":15},
{"minute":35,"hour":15},
{"minute":38,"hour":15},
{"minute":45,"hour":15},
{"minute":48,"hour":15},
{"minute":52,"hour":15},
{"minute":54,"hour":15},
{"minute":2,"hour":16},
{"minute":5,"hour":16},
{"minute":8,"hour":16},
{"minute":15,"hour":16},
{"minute":18,"hour":16},
{"minute":22,"hour":16},
{"minute":24,"hour":16},
{"minute":32,"hour":16},
{"minute":35,"hour":16},
{"minute":38,"hour":16},
{"minute":45,"hour":16},
{"minute":48,"hour":16},
{"minute":52,"hour":16},
{"minute":54,"hour":16},
{"minute":2,"hour":17},
{"minute":5,"hour":17},
{"minute":8,"hour":17},
{"minute":15,"hour":17},
{"minute":18,"hour":17},
{"minute":22,"hour":17},
{"minute":24,"hour":17},
{"minute":32,"hour":17},
{"minute":35,"hour":17},
{"minute":38,"hour":17},
{"minute":45,"hour":17},
{"minute":48,"hour":17},
{"minute":52,"hour":17},
{"minute":54,"hour":17},
{"minute":2,"hour":18},
{"minute":6,"hour":18},
{"minute":9,"hour":18},
{"minute":16,"hour":18},
{"minute":19,"hour":18},
{"minute":26,"hour":18},
{"minute":29,"hour":18},
{"minute":36,"hour":18},
{"minute":39,"hour":18},
{"minute":46,"hour":18},
{"minute":49,"hour":18},
{"minute":56,"hour":18},
{"minute":0,"hour":19},
{"minute":6,"hour":19},
{"minute":12,"hour":19},
{"minute":13,"hour":19},
{"minute":21,"hour":19},
{"minute":24,"hour":19},
{"minute":30,"hour":19},
{"minute":36,"hour":19},
{"minute":39,"hour":19},
{"minute":41,"hour":19},
{"minute":48,"hour":19},
{"minute":50,"hour":19},
{"minute":0,"hour":20},
{"minute":2,"hour":20},
{"minute":9,"hour":20},
{"minute":12,"hour":20},
{"minute":21,"hour":20},
{"minute":24,"hour":20},
{"minute":32,"hour":20},
{"minute":36,"hour":20},
{"minute":42,"hour":20},
{"minute":47,"hour":20},
{"minute":53,"hour":20},
{"minute":59,"hour":20},
{"minute":4,"hour":21},
{"minute":12,"hour":21},
{"minute":14,"hour":21},
{"minute":24,"hour":21},
{"minute":26,"hour":21},
{"minute":36,"hour":21},
{"minute":38,"hour":21},
{"minute":48,"hour":21},
{"minute":50,"hour":21},
{"minute":0,"hour":22},
{"minute":2,"hour":22},
{"minute":12,"hour":22},
{"minute":14,"hour":22},
{"minute":24,"hour":22},
{"minute":26,"hour":22},
{"minute":36,"hour":22},
{"minute":38,"hour":22},
{"minute":47,"hour":22},
{"minute":50,"hour":22},
{"minute":58,"hour":22},
{"minute":3,"hour":23},
{"minute":10,"hour":23},
{"minute":20,"hour":23},
{"minute":25,"hour":23},
{"minute":30,"hour":23},
{"minute":40,"hour":23},
{"minute":44,"hour":23},
{"minute":58,"hour":23},
{"minute":0,"hour":0},
{"minute":19,"hour":0}
]

var demachiyanagi_eizan_weekday =[
{"minute":33,"hour":5},
{"minute":42,"hour":5},
{"minute":51,"hour":5},
{"minute":2,"hour":6},
{"minute":8,"hour":6},
{"minute":18,"hour":6},
{"minute":24,"hour":6},
{"minute":33,"hour":6},
{"minute":41,"hour":6},
{"minute":44,"hour":6},
{"minute":53,"hour":6},
{"minute":58,"hour":6},
{"minute":4,"hour":7},
{"minute":9,"hour":7},
{"minute":13,"hour":7},
{"minute":18,"hour":7},
{"minute":24,"hour":7},
{"minute":29,"hour":7},
{"minute":33,"hour":7},
{"minute":40,"hour":7},
{"minute":44,"hour":7},
{"minute":50,"hour":7},
{"minute":54,"hour":7},
{"minute":1,"hour":8},
{"minute":4,"hour":8},
{"minute":10,"hour":8},
{"minute":13,"hour":8},
{"minute":17,"hour":8},
{"minute":23,"hour":8},
{"minute":29,"hour":8},
{"minute":32,"hour":8},
{"minute":35,"hour":8},
{"minute":40,"hour":8},
{"minute":45,"hour":8},
{"minute":51,"hour":8},
{"minute":54,"hour":8},
{"minute":2,"hour":9},
{"minute":7,"hour":9},
{"minute":14,"hour":9},
{"minute":22,"hour":9},
{"minute":27,"hour":9},
{"minute":32,"hour":9},
{"minute":42,"hour":9},
{"minute":47,"hour":9},
{"minute":53,"hour":9},
{"minute":1,"hour":10},
{"minute":7,"hour":10},
{"minute":10,"hour":10},
{"minute":20,"hour":10},
{"minute":27,"hour":10},
{"minute":30,"hour":10},
{"minute":40,"hour":10},
{"minute":47,"hour":10},
{"minute":52,"hour":10},
{"minute":0,"hour":11},
{"minute":7,"hour":11},
{"minute":12,"hour":11},
{"minute":20,"hour":11},
{"minute":27,"hour":11},
{"minute":32,"hour":11},
{"minute":40,"hour":11},
{"minute":47,"hour":11},
{"minute":52,"hour":11},
{"minute":0,"hour":12},
{"minute":7,"hour":12},
{"minute":12,"hour":12},
{"minute":20,"hour":12},
{"minute":27,"hour":12},
{"minute":32,"hour":12},
{"minute":40,"hour":12},
{"minute":47,"hour":12},
{"minute":52,"hour":12},
{"minute":0,"hour":13},
{"minute":7,"hour":13},
{"minute":12,"hour":13},
{"minute":20,"hour":13},
{"minute":27,"hour":13},
{"minute":32,"hour":13},
{"minute":40,"hour":13},
{"minute":47,"hour":13},
{"minute":52,"hour":13},
{"minute":0,"hour":14},
{"minute":7,"hour":14},
{"minute":12,"hour":14},
{"minute":20,"hour":14},
{"minute":27,"hour":14},
{"minute":32,"hour":14},
{"minute":40,"hour":14},
{"minute":47,"hour":14},
{"minute":52,"hour":14},
{"minute":0,"hour":15},
{"minute":7,"hour":15},
{"minute":12,"hour":15},
{"minute":20,"hour":15},
{"minute":27,"hour":15},
{"minute":32,"hour":15},
{"minute":40,"hour":15},
{"minute":47,"hour":15},
{"minute":52,"hour":15},
{"minute":0,"hour":16},
{"minute":7,"hour":16},
{"minute":12,"hour":16},
{"minute":20,"hour":16},
{"minute":27,"hour":16},
{"minute":32,"hour":16},
{"minute":40,"hour":16},
{"minute":47,"hour":16},
{"minute":52,"hour":16},
{"minute":57,"hour":16},
{"minute":0,"hour":17},
{"minute":9,"hour":17},
{"minute":12,"hour":17},
{"minute":20,"hour":17},
{"minute":25,"hour":17},
{"minute":32,"hour":17},
{"minute":37,"hour":17},
{"minute":40,"hour":17},
{"minute":48,"hour":17},
{"minute":52,"hour":17},
{"minute":0,"hour":18},
{"minute":4,"hour":18},
{"minute":12,"hour":18},
{"minute":16,"hour":18},
{"minute":21,"hour":18},
{"minute":26,"hour":18},
{"minute":32,"hour":18},
{"minute":37,"hour":18},
{"minute":41,"hour":18},
{"minute":50,"hour":18},
{"minute":53,"hour":18},
{"minute":2,"hour":19},
{"minute":6,"hour":19},
{"minute":14,"hour":19},
{"minute":23,"hour":19},
{"minute":27,"hour":19},
{"minute":35,"hour":19},
{"minute":38,"hour":19},
{"minute":43,"hour":19},
{"minute":53,"hour":19},
{"minute":56,"hour":19},
{"minute":3,"hour":20},
{"minute":8,"hour":20},
{"minute":13,"hour":20},
{"minute":23,"hour":20},
{"minute":33,"hour":20},
{"minute":38,"hour":20},
{"minute":43,"hour":20},
{"minute":53,"hour":20},
{"minute":3,"hour":21},
{"minute":8,"hour":21},
{"minute":13,"hour":21},
{"minute":23,"hour":21},
{"minute":33,"hour":21},
{"minute":38,"hour":21},
{"minute":43,"hour":21},
{"minute":53,"hour":21},
{"minute":5,"hour":22},
{"minute":13,"hour":22},
{"minute":24,"hour":22},
{"minute":28,"hour":22},
{"minute":40,"hour":22},
{"minute":44,"hour":22},
{"minute":50,"hour":22},
{"minute":1,"hour":23},
{"minute":12,"hour":23},
{"minute":20,"hour":23},
{"minute":25,"hour":23},
{"minute":40,"hour":23},
{"minute":50,"hour":23},
{"minute":0,"hour":0}
]

var demachiyanagi_eizan_holiday =[
{"minute":33,"hour":5},
{"minute":42,"hour":5},
{"minute":55,"hour":5},
{"minute":2,"hour":6},
{"minute":15,"hour":6},
{"minute":22,"hour":6},
{"minute":35,"hour":6},
{"minute":42,"hour":6},
{"minute":54,"hour":6},
{"minute":0,"hour":7},
{"minute":6,"hour":7},
{"minute":10,"hour":7},
{"minute":15,"hour":7},
{"minute":22,"hour":7},
{"minute":30,"hour":7},
{"minute":37,"hour":7},
{"minute":45,"hour":7},
{"minute":52,"hour":7},
{"minute":0,"hour":8},
{"minute":7,"hour":8},
{"minute":15,"hour":8},
{"minute":22,"hour":8},
{"minute":30,"hour":8},
{"minute":37,"hour":8},
{"minute":45,"hour":8},
{"minute":52,"hour":8},
{"minute":0,"hour":9},
{"minute":7,"hour":9},
{"minute":15,"hour":9},
{"minute":22,"hour":9},
{"minute":30,"hour":9},
{"minute":37,"hour":9},
{"minute":45,"hour":9},
{"minute":52,"hour":9},
{"minute":0,"hour":10},
{"minute":7,"hour":10},
{"minute":15,"hour":10},
{"minute":22,"hour":10},
{"minute":30,"hour":10},
{"minute":37,"hour":10},
{"minute":45,"hour":10},
{"minute":52,"hour":10},
{"minute":0,"hour":11},
{"minute":7,"hour":11},
{"minute":15,"hour":11},
{"minute":22,"hour":11},
{"minute":30,"hour":11},
{"minute":37,"hour":11},
{"minute":45,"hour":11},
{"minute":52,"hour":11},
{"minute":0,"hour":12},
{"minute":7,"hour":12},
{"minute":15,"hour":12},
{"minute":22,"hour":12},
{"minute":30,"hour":12},
{"minute":37,"hour":12},
{"minute":45,"hour":12},
{"minute":52,"hour":12},
{"minute":0,"hour":13},
{"minute":7,"hour":13},
{"minute":15,"hour":13},
{"minute":22,"hour":13},
{"minute":30,"hour":13},
{"minute":37,"hour":13},
{"minute":45,"hour":13},
{"minute":52,"hour":13},
{"minute":0,"hour":14},
{"minute":7,"hour":14},
{"minute":15,"hour":14},
{"minute":22,"hour":14},
{"minute":30,"hour":14},
{"minute":37,"hour":14},
{"minute":45,"hour":14},
{"minute":52,"hour":14},
{"minute":0,"hour":15},
{"minute":7,"hour":15},
{"minute":15,"hour":15},
{"minute":22,"hour":15},
{"minute":30,"hour":15},
{"minute":37,"hour":15},
{"minute":45,"hour":15},
{"minute":52,"hour":15},
{"minute":0,"hour":16},
{"minute":7,"hour":16},
{"minute":15,"hour":16},
{"minute":22,"hour":16},
{"minute":30,"hour":16},
{"minute":37,"hour":16},
{"minute":45,"hour":16},
{"minute":52,"hour":16},
{"minute":0,"hour":17},
{"minute":7,"hour":17},
{"minute":15,"hour":17},
{"minute":22,"hour":17},
{"minute":30,"hour":17},
{"minute":37,"hour":17},
{"minute":45,"hour":17},
{"minute":52,"hour":17},
{"minute":0,"hour":18},
{"minute":7,"hour":18},
{"minute":13,"hour":18},
{"minute":22,"hour":18},
{"minute":30,"hour":18},
{"minute":37,"hour":18},
{"minute":43,"hour":18},
{"minute":52,"hour":18},
{"minute":3,"hour":19},
{"minute":8,"hour":19},
{"minute":13,"hour":19},
{"minute":23,"hour":19},
{"minute":33,"hour":19},
{"minute":38,"hour":19},
{"minute":43,"hour":19},
{"minute":53,"hour":19},
{"minute":3,"hour":20},
{"minute":8,"hour":20},
{"minute":13,"hour":20},
{"minute":23,"hour":20},
{"minute":33,"hour":20},
{"minute":38,"hour":20},
{"minute":43,"hour":20},
{"minute":53,"hour":20},
{"minute":3,"hour":21},
{"minute":7,"hour":21},
{"minute":13,"hour":21},
{"minute":23,"hour":21},
{"minute":36,"hour":21},
{"minute":43,"hour":21},
{"minute":50,"hour":21},
{"minute":0,"hour":22},
{"minute":11,"hour":22},
{"minute":23,"hour":22},
{"minute":27,"hour":22},
{"minute":40,"hour":22},
{"minute":44,"hour":22},
{"minute":50,"hour":22},
{"minute":1,"hour":23},
{"minute":12,"hour":23},
{"minute":20,"hour":23},
{"minute":25,"hour":23},
{"minute":40,"hour":23},
{"minute":50,"hour":23},
{"minute":0,"hour":0}
]


var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM(function(err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
    new mycron.CronJob({
        cronTime: '00 00 10 * * 5',
        onTick: () => {
            bot.say({
                channel: 'team_c_2018',
                text: ':smiley: ごみを出しましょう'
            });
        },
        start: true,
        timeZone: 'Asia/Tokyo'
    });

    new mycron1.CronJob({
        cronTime: '00 00 10 * * *',
        onTick: () => {
            myGoogleNews(googleQuery, function (err, res) {
                if (err) console.error(err)
                bot.say({
                    channel: 'team_c_2018',
                    text: '本日のHIに関するニュースです．'
                });
                res.links.forEach(function (item) {
                    bot.say({
                        channel: 'team_c_2018',
                        text: item.title + ' - ' + item.href
                    });
                });
            });
        },
        start: true,
        timeZone: 'Asia/Tokyo'
    });
    new mycron2.CronJob({
        cronTime: '00 00 * * * *',
        onTick: () => {
            var dt1 = new Date();
            var year = dt1.getFullYear();
            var month = dt1.getMonth()+1;
            var day = dt1.getDate();
            var hour = (dt1.getUTCHours() + 9) % 24;
            var datetime = year + "-" + month + '-' + day + ' ' + hour + ":00:00"

            connection.query('SELECT userid, DATE_FORMAT(time,\'%Y/%m/%d %H:%i\') AS time, yotei FROM remind WHERE noti_time = \'' + datetime + '\'', function (error, results, fields) {
                if (err) { console.log('err: ' + err); }
                var usersRows = JSON.parse(JSON.stringify(results));
                for(var i = 0; i < 13; i++) {
                    if(usersRows[i] == null) {
                        break;
                    } else {
                        bot.say({
                            channel: usersRows[i].userid,
                            text: usersRows[i].time + 'に' + usersRows[i].yotei + 'の予定があります'
                        });
                    }
                }
            });
        },
        start: true,
        timeZone: 'Asia/Tokyo'
    });
    new mycron3.CronJob({
        cronTime: '00 13 * * * *',
        onTick: () => {
            var dt2 = new Date();
            var youbi = dt2.getDay();
            var hour = (dt2.getUTCHours() + 9) % 24;
            var post_youbi = (youbi + 1) % 7;
            var lecture_youbi = new Array("日","月","火","水","木","金","土");

            connection.query('SELECT * FROM lecture WHERE youbi = \'' + lecture_youbi[post_youbi] + '\' AND noti_time = ' + hour + '', function (error, results, fields) {
                if (err) { console.log('err: ' + err); }
                var usersRows = JSON.parse(JSON.stringify(results));
                for(var i = 0; i < 80; i++) {
                    if(usersRows[i] == null) {
                        break;
                    } else {
                        bot.say({
                            channel: usersRows[i].userid,
                            text: usersRows[i].period + '限に' + usersRows[i].lecture_name + 'の授業があります'
                        });
                    }
                }
            });
        },
        start: true,
        timeZone: 'Asia/Tokyo'
    });
    new mycron4.CronJob({
      cronTime: '00 00 ' + default_lTE_time +' * * *',
      onTick: () => {
        fs.readFile('client_secret.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Drive API.
          //authorize(JSON.parse(content), list10Events, message);
          authorize(JSON.parse(content), listTomorrowEvents);
        });
      },
      start: true,
      timeZone: 'Asia/Tokyo'
    });
});

controller.hears(['hello', 'hi','こんにちは'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});

sp.on('open', function () {
    console.log('Serial open.');
});

sp.on('data', function (input) {
    console.log('getdata');
    var buffer = new Buffer(input, 'utf8');
    var jsonData;
    try {
        jsonData = JSON.parse(buffer);
        console.log(jsonData);
        if (jsonData.a || jsonData.b || jsonData.c) {
            var gomi;
            var flag = 0;
            if (jsonData.a) {
                gomi = '燃えるゴミ'
                flag = 1;
            } if (jsonData.b) {
                if (flag) gomi = gomi + 'と燃えないゴミ'
                else {
                    gomi = '燃えないゴミ'
                    flag = 1;
                }
            } if (jsonData.c) {
                if (flag) gomi = gomi + 'とペットボトルゴミ'
                else {
                    gomi = 'ペットボトルゴミ'
                    flag = 1;
                }
            }
            connection.query('SELECT name,kaisuu FROM gomidashi ORDER BY kaisuu ASC', function (error, results, fields) {
                if (err) { console.log('err: ' + err); }
                var usersRows = JSON.parse(JSON.stringify(results));
                console.log(usersRows);
                gomidashiUser = usersRows[0].name;
                bot.say({
                    channel: 'team_c_2018',
                    text: ':smiley: '+gomi+'がいっぱいです．ごみを出しましょう．今日の担当は' + gomidashiUser + 'です．'
                });
            })
        }
    } catch (e) {
        console.log("error");
        // データ受信がおかしい場合無視する
        return;
    }

});

controller.hears(['ゴミ出ししました','ゴミ出しました','ゴミ出したよ',], 'direct_message,direct_mention,mention', function(bot, message) {
    var usersRows;
    controller.storage.users.get(message.user, function (err, user) {
        connection.query('SELECT name,kaisuu FROM gomidashi WHERE userid = \'' + message.user + '\'', function (error, results, fields) {
            console.log('SELECT name,kaisuu FROM gomidashi WHERE userid = \'' + message.user + '\'')
            if (err) { console.log('err: ' + err); }
            if (results != 0) {
                usersRows = JSON.parse(JSON.stringify(results));
                console.log(usersRows);
                if (usersRows[0].name != gomidashiUser) {
                    bot.reply(message, '担当じゃないのにありがとうございます．');
                } else {
                    bot.reply(message, 'ありがとうございます．');
                }
            } else {
                bot.reply(message, '担当じゃないのにありがとうございます．');
            }
        });
    });
});
//=======

controller.hears(['(.*)のニュース'], 'direct_message,direct_mention,mention', function (bot, message) {
    myGoogleNews(message.match[1], function (err, res) {
        if (err) console.error(err)
        res.links.forEach(function (item) {
            bot.reply(message,item.title + ' - ' + item.href);
        });
    });
});

controller.hears(['天気'], 'direct_message,direct_mention,mention', function (bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function (err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function (err, user) {
              var req = new XMLHttpRequest();		  // XMLHttpRequest オブジェクトを生成する
              req.onreadystatechange = function() {		  // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
                  if(req.readyState == 4 && req.status == 200){ // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
                      //bot.reply(message, req.responseText);		          // 取得した JSON ファイルの中身を表示
                  }
              };
              req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
              req.send(null);					    // 実際にサーバーへリクエストを送信
        if (user && user.name) {
            bot.reply(message, 'うんち!w ' + user.name + '!!');
        } else {
            bot.reply(message, 'うんち!w');
        }
    });
});

controller.hears(['(.*)月(.*)日(.*)時に(.*)の予定'], 'direct_message,direct_mention,mention', function(bot, message) {
    var month = message.match[1];
    var day = message.match[2];
    var time = message.match[3];
    var yotei = message.match[4];
    var dt = new Date();
    var year = dt.toFormat("YYYY");
    var datetime = year + '-' + month + '-' + day + ' ' + time + ':00:00';

    controller.storage.users.get(message.user, function (err, user) {
      connection.query('SELECT DATE_FORMAT(time,\'%Y/%m/%d %H:%i\') AS time, yotei FROM remind WHERE userid = \'' + message.user + '\' AND time = cast(\'' + datetime + '\'as datetime)', function(error, results, fields) {
        var usersRows = JSON.parse(JSON.stringify(results));
        console.log(usersRows);

        if(usersRows != 0) {
          bot.reply(message, usersRows[0].time + 'には' + usersRows[0].yotei + 'の予定があります');
        } else {
          connection.query('INSERT INTO remind (userid,time,yotei)VALUES(\'' + message.user + '\',cast(\'' + datetime + '\'as datetime),\'' + yotei +'\')', function (error, results, fields) {
              if (err) { console.log('err: ' + err); }
              console.log(results);

          })
          bot.reply(message, month + '月' + day + '日' + time + '時に' + yotei + 'の予定を登録しました');
        }
// =======
//     connection.query('INSERT INTO remind (time,yotei)VALUES(cast(\'' + datetime + '\'as datetime),\'' + yotei +'\')', function (error, results, fields) {
//         if (err) { console.log('err: ' + err); }
//         console.log(results);
// >>>>>>> develop_calendar

      })
    });

});

controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

    controller.hears(['うんちw'], 'direct_message,direct_mention,mention', function(bot, message) {

        bot.api.reactions.add({
            timestamp: message.ts,
            channel: message.channel,
            name: 'robot_face',
        }, function(err, res) {
            if (err) {
                bot.botkit.log('Failed to add emoji reaction :(', err);
            }
        });


        controller.storage.users.get(message.user, function(err, user) {
            if (user && user.name) {
                bot.reply(message, 'うんちw ' + user.name);
            } else {
                bot.reply(message, 'うんちw');
            }
        });
    });

    controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
        'direct_message,direct_mention,mention', function(bot, message) {

            var hostname = os.hostname();
            var uptime = formatUptime(process.uptime());

            bot.reply(message,
                ':robot_face: I am a bot named <@' + bot.identity.name +
                 '>. I have been running for ' + uptime + ' on ' + hostname + '.');

        });

      controller.hears(['make America great again'], 'direct_message,direct_mention,mention', function(bot, message) {

          bot.api.reactions.add({
              timestamp: message.ts,
              channel: message.channel,
              name: 'robot_face',
          }, function(err, res) {
              if (err) {
                  bot.botkit.log('Failed to add emoji reaction :(', err);
              }
          });


          controller.storage.users.get(message.user, function(err, user) {
              if (user && user.name) {
                  bot.reply(message, ':トランプ大統領: ' + user.name);
              } else {
                  bot.reply(message, ':トランプ大統領:');
              }
          });
      });


// 授業の登録
controller.hears(['(.*)曜日の(.*)限に(.*)の授業'], 'direct_message,direct_mention,mention', function(bot, message) {

  var youbi = message.match[1];
  var period = message.match[2];
//<<<<<<< HEAD
  var lecture_name = message.match[3];

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('SELECT * FROM lecture WHERE userid = \'' + message.user + '\' AND youbi = \'' + youbi + '\' AND period = \'' + period + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      var usersRows = JSON.parse(JSON.stringify(results));
      console.log(usersRows);

      if(usersRows != 0) {
        bot.reply(message, youbi + '曜日の' + period + '限には' + usersRows[0].lecture_name + 'の授業があります');
      } else {
        connection.query('INSERT INTO lecture (userid,youbi,period,lecture_name,noti_time)VALUES(\'' + message.user + '\', \'' + youbi + '\',' + period + ',\'' + lecture_name + '\',22)', function (error, results, fields) {
            if (err) { console.log('err: ' + err); }
            console.log(results);
        })

        bot.reply(message, youbi + '曜日の' + period + '限に' + lecture_name+ 'の授業を登録しました');
      }
// =======
//   var lecture = message.match[3];
//   console.log('INSERT INTO lecture (period,youbi,lecture)VALUES(' + period + ',\'' + youbi + '\',\'' + lecture +'\')');
//
//   connection.query('INSERT INTO lecture (period,youbi,lecture)VALUES(' + period + ',\'' + youbi + '\',\'' + lecture +'\')', function (error, results, fields) {
//       if (err) { console.log('err: ' + err); }
//       console.log(results);
// >>>>>>> develop_calendar

    })
  });

  bot.reply(message, youbi + '曜日の' + period + '限の' + lecture + 'の授業を登録しました');
});


// 授業の確認
controller.hears(['(.*)曜日の授業'], 'direct_message,direct_mention,mention', function(bot, message) {

  var youbi = message.match[1];
//<<<<<<< HEAD

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('SELECT period, lecture_name FROM lecture WHERE userid = \'' + message.user + '\' AND youbi = \'' + youbi + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      var usersRows = JSON.parse(JSON.stringify(results));
      console.log(usersRows);

      for(var i = 0; i < 6; i++) {
        if(usersRows[i] != null) {
          bot.reply(message, usersRows[i].period + '限に' + usersRows[i].lecture_name + 'の授業があります');
        }
      }

    })
  });
// =======
//   // var youbi = 'Tu';
//   var jugyo = "";
//
//   connection.query('SELECT period FROM lecture WHERE youbi = \'' + youbi + '\'', function (error, results, fields) {
//       if (err) { console.log('err: ' + err); }
//       console.log('SELECT period FROM lecture WHERE youbi = \'' + youbi + '\'');
//       console.log(results);
//       jugyo = results.toString();
//       console.log(jugyo);
//   })
// >>>>>>> develop_calendar

  bot.reply(message, youbi + '曜日の授業を登録しました');
});

/*ラボのカレンダー予定を閲覧*/
controller.hears(['ラボの予定'], 'direct_message,direct_mention,mention', function(bot, message) {
  //=======
    // Load client secrets from a local file.
    fs.readFile('client_secret.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      //authorize(JSON.parse(content), list10Events, message);
      authorize(JSON.parse(content), list10Events, message);
    });
})

//<<<<<<< HEAD
// 予定の確認
controller.hears(['(.*)月(.*)日の予定'], 'direct_message,direct_mention,mention', function(bot, message) {

  var month = message.match[1];
  var day = message.match[2];
  var dt = new Date();
  var year = dt.toFormat("YYYY");
  var datetime = year + '-' + month + '-' + day + ' ' + '00:00:00';
  var datetime2 = year + '-' + month + '-' + day + ' ' + '23:00:00';

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('SELECT DATE_FORMAT(time,\'%Y/%m/%d %H:%i\') AS time, yotei FROM remind WHERE userid = \'' + message.user + '\' AND time BETWEEN cast(\'' + datetime + '\'as datetime) AND cast(\'' + datetime2 + '\'as datetime)', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      var usersRows = JSON.parse(JSON.stringify(results));
      console.log(usersRows);

      for(var i = 0; i < 24; i++) {
        if(usersRows[i] != null) {
          bot.reply(message, usersRows[i].time + 'に' + usersRows[i].yotei + 'の予定があります');
        }
      }

    })
  });

});

// 予定の通知時間の設定
controller.hears(['(.*)の予定を(.*)月(.*)日(.*)時に通知'], 'direct_message,direct_mention,mention', function(bot, message) {

  var yotei = message.match[1];
  var month = message.match[2];
  var day = message.match[3];
  var hour = message.match[4];
  var dt = new Date();
  var year = dt.toFormat("YYYY");
  var datetime = year + '-' + month + '-' + day + ' ' + hour + ':00:00';

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('SELECT * FROM remind WHERE userid = \'' + message.user + '\' AND yotei = \'' + yotei + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      var usersRows = JSON.parse(JSON.stringify(results));
      console.log(usersRows);

      if(usersRows == 0) {
        bot.reply(message, yotei + 'の予定はありません');
        return;
      }
    })

    connection.query('UPDATE remind SET noti_time = cast(\'' + datetime + '\'as datetime) WHERE userid = \'' + message.user + '\' AND yotei = \'' + yotei + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      bot.reply(message, yotei + 'の予定の通知時間を' + month + '月' + day + '日' + hour + '時に設定しました');
    })
  });

});

// 授業の通知時間の設定
controller.hears(['授業を(.*)時に通知','(.*)時に授業を通知'], 'direct_message,direct_mention,mention', function(bot, message) {

  var hour = message.match[1];

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('UPDATE lecture SET noti_time = \'' + hour + '\' WHERE userid = \'' + message.user + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      bot.reply(message, '授業の通知時間を前日の' + hour + '時に設定しました');
    })
  });
});

/*
mysqlにて、
テーブルlocationに
	ユーザ名を表すuser
	ユーザの地元の緯度と経度を
	lat=緯度&lon=経度
	の形で緯度と経度を表すlatlon
	latlonで表した場所の地名を表すname
	を格納しておく
テーブルmatsugasakiweekdayに平日の松ケ崎駅のダイヤを,時をhourに分をminuteに格納しておく
テーブルdemaciyanagiweekdayに平日の出町柳駅のダイヤを,時をhourに分をminuteに格納しておく
テーブルmatsugasakiholidayに休日の松ケ崎駅のダイヤを,時をhourに分をminuteに格納しておく
テーブルdematiyanagiholidayに休日の出町柳駅のダイヤを,時をhourに分をminuteに格納しておく
*/


//>>>>>>> develop_calendar


// <<<<<<< HEAD
// 予定の削除
controller.hears(['(.*)月(.*)日(.*)時の予定を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var month = message.match[1];
  var day = message.match[2];
  var hour = message.match[3];
  var dt = new Date();
  var year = dt.toFormat("YYYY");
  var datetime = year + '-' + month + '-' + day + ' ' + hour + ':00:00';

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('DELETE FROM remind WHERE userid = \'' + message.user + '\' AND time = cast(\'' + datetime + '\'as datetime)', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      bot.reply(message, month + '月' + day + '日' + hour + '時' + 'の予定を削除しました');
    })
  });
})
//=======

controller.hears(['(.*)の予定を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var yotei = message.match[1];

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('DELETE FROM remind WHERE userid = \'' + message.user + '\' AND yotei = \'' + yotei + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      bot.reply(message, yotei + 'の予定を削除しました');
    })
  });

});

// 授業の削除
controller.hears(['(.*)曜日の(.*)限の授業を削除','(.*)曜の(.*)限の授業を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var youbi = message.match[1];
  var period = message.match[2];

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('DELETE FROM lecture WHERE userid = \'' + message.user + '\' AND youbi = \'' + youbi + '\' AND period = \'' + period + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }
        bot.reply(message, youbi + '曜日の' + period + '限の授業を削除しました');
    })
  });
})

controller.hears(['(.*)の授業を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var lecture = message.match[1];

  connection.query('DELETE FROM lecture WHERE lecture_name = \'' + lecture + '\'', function(error, results, fields) {
    // bot.say({
    //   channel: 'DA9G57ZJL',
    //   text: lecture + 'の授業を削除しました',
    //   username: 'slack_bot'
    // });
    if (err) { console.log('err: ' + err); }
      bot.reply(message, lecture + 'の授業を削除しました');
  })

});




controller.hears(['すべての授業の削除','全ての授業の削除','全授業の削除','授業の全削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  controller.storage.users.get(message.user, function (err, user) {
    connection.query('DELETE FROM lecture WHERE userid = \'' + message.user + '\'', function(error, results, fields) {
      if (err) { console.log('err: ' + err); }

      bot.reply(message, 'すべての授業を削除しました');
    })
  });
})



controller.hears(['(.*)時間後の地元の天気'], 'direct_message,direct_mention,mention', function(bot, message) {
var time = Number(message.match[1]);
const http = require('http');
var location = 'lat=35.25&lon=135.46'
 var loc_name = '松ヶ崎'
let text =''
controller.storage.users.get(message.user, function(err, user) {

	for(var i=0;member.length!=i;i++){
	if(member[i][0]==message.user)mem_id = i;
	}
	/*connection.query('SELECT * FROM location WHERE user =\'' + member[mem_id][1] + '\' ;', function (error, results, fields) {
	location = results[0].latlon;
	loc_name = results[0].name;
	});*/
	for(var i=0;locations.length!=i;i++){
		if(member[mem_id][1]==locations[i].user){
			location = locations[i].latlon;
			loc_name = locations[i].name;
		}
	}
	})
var after = Math.floor(time/3)
console.log(after);
http.get("http://api.openweathermap.org/data/2.5/forecast?"+ location + "&units=metric&appid=b9fac044642cb6391c596659bc1a05cd", (response) => {
    let body = '';
	var today = new Date();
	var minutes = today.getUTCMinutes();
	var weekday = today.getUTCDay();
	var hours = (today.getUTCHours() + 9) % 24;
	hours += after* 3;
    response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
    response.on('end', () => {

                    let current = JSON.parse(body);
			 // console.log(current);
                      text =
                             hours%24 + ':' + minutes + 'の'+ loc_name +`の天気\n` +
                             // `<http://openweathermap.org/img/w/${current.weather[0].icon.replace('n', 'd')}.png?$| > ` +
                            `${current.list[after].weather[0].main}(${current.list[after].weather[0].description}) / ` +
                            `気温 ${Math.round(current.list[after].main.temp)} ℃ ` +
                            `${current.list[after].rain && current.list[after].rain['3h'] ? '/ 降雨量 ' + Math.ceil(current.list[after].rain['3h'] * 10) / 10 +

' mm ' : '' }` +
                            `${current.list[after].snow && current.list[after].snow['3h'] ? '/ 降雪量 ' + Math.ceil(current.list[after].snow['3h'] * 10) / 10 +

' mm ' : '' }`;
                    bot.reply(message, text);
		})
	});
})



controller.hears(['(.*)時間後の天気'], 'direct_message,direct_mention,mention', function(bot, message) {
var time = Number(message.match[1]);
const http = require('http');
//var location = 'lat=35.04&lon=135.85'
var location = 'lat=35.25&lon=135.46'
//var loc_name = '滋賀里駅'
 var loc_name = '松ヶ崎'
let text =''
var after = Math.floor(time/3)
console.log(after);
http.get("http://api.openweathermap.org/data/2.5/forecast?"+ location + "&units=metric&appid=b9fac044642cb6391c596659bc1a05cd", (response) => {
    let body = '';
	var today = new Date();
	var minutes = today.getUTCMinutes();
	var weekday = today.getUTCDay();
	var hours = (today.getUTCHours() + 9) % 24;
	hours += after* 3;
    response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
    response.on('end', () => {

                    let current = JSON.parse(body);
			 // console.log(current);
                      text =
                             hours%24 + ':' + minutes + 'の'+ loc_name +`の天気\n` +
                             // `<http://openweathermap.org/img/w/${current.weather[0].icon.replace('n', 'd')}.png?$| > ` +
                            `${current.list[after].weather[0].main}(${current.list[after].weather[0].description}) / ` +
                            `気温 ${Math.round(current.list[after].main.temp)} ℃ ` +
                            `${current.list[after].rain && current.list[after].rain['3h'] ? '/ 降雨量 ' + Math.ceil(current.list[after].rain['3h'] * 10) / 10 +

' mm ' : '' }` +
                            `${current.list[after].snow && current.list[after].snow['3h'] ? '/ 降雪量 ' + Math.ceil(current.list[after].snow['3h'] * 10) / 10 +

' mm ' : '' }`;
                    bot.reply(message, text);
		})
	});
})

controller.hears(['明日の地元の天気(.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
var time = 0;
const http = require('http');
var location = 'lat=35.25&lon=135.46'
var loc_name = '松ヶ崎'
controller.storage.users.get(message.user, function(err, user) {
        for(var i=0;member.length!=i;i++){
	if(member[i][0]==message.user)mem_id = i;
	}
	/*connection.query('SELECT * FROM location WHERE user =\'' + member[mem_id][1] + '\' ;', function (error, results, fields) {
	location = results[0].latlon;
	loc_name = results[0].name;
	});*/
	for(var i=0;locations.length!=i;i++){
		if(member[mem_id][1]==locations[i].user){
			location = locations[i].latlon;
			loc_name = locations[i].name;
		}
	}
	}
	)


let text =''
var after = Math.floor(time/3)
console.log(after);
http.get("http://api.openweathermap.org/data/2.5/forecast?"+ location + "&units=metric&appid=b9fac044642cb6391c596659bc1a05cd", (response) => {
    let body = '';
	var today = new Date();
	var minutes = today.getUTCMinutes();
	var weekday = today.getUTCDay();
	var hours = (today.getUTCHours() + 9) % 24;
	time = 24 - hours;
	after = Math.floor(time/3)+1;
	hours += after* 3;
    response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
    response.on('end', () => {

                    let current = JSON.parse(body);
		for(var i=0;i<8;i++){
                      text +=
                             ((3*i + hours) % 24) + ':' + minutes + 'の'+ loc_name +`の天気\n` +
                             // `<http://openweathermap.org/img/w/${current.weather[0].icon.replace('n', 'd')}.png?$| > ` +
                            `${current.list[after+i].weather[0].main}(${current.list[after+i].weather[0].description}) / ` +
                            `気温 ${Math.round(current.list[after+i].main.temp)} ℃ ` +
                            `${current.list[after+i].rain && current.list[after+i].rain['3h'] ? '/ 降雨量 ' + Math.ceil(current.list[after+i].rain['3h'] * 10) /

10 + ' mm ' : '' }` +
                            `${current.list[after+i].snow && current.list[after+i].snow['3h'] ? '/ 降雪量 ' + Math.ceil(current.list[after+i].snow['3h'] * 10) /

10 + ' mm ' : '' }\n`;
                }
		    bot.reply(message, text);
		})
	});
})

controller.hears(['明日の天気(.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
var time = 0;
const http = require('http');
//var location = 'lat=35.04&lon=135.85'
var location = 'lat=35.25&lon=135.46'
//var loc_name = '滋賀里駅'
 var loc_name = '松ヶ崎'
let text =''
var after = Math.floor(time/3)
console.log(after);
http.get("http://api.openweathermap.org/data/2.5/forecast?"+ location + "&units=metric&appid=b9fac044642cb6391c596659bc1a05cd", (response) => {
    let body = '';
	var today = new Date();
	var minutes = today.getUTCMinutes();
	var weekday = today.getUTCDay();
	var hours = (today.getUTCHours() + 9) % 24;
	time = 24 - hours;
	after = Math.floor(time/3)+1;
	hours += after* 3;
    response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
    response.on('end', () => {

                    let current = JSON.parse(body);
		for(var i=0;i<8;i++){
                      text +=
                             ((3*i + hours) % 24) + ':' + minutes + 'の'+ loc_name +`の天気\n` +
                             // `<http://openweathermap.org/img/w/${current.weather[0].icon.replace('n', 'd')}.png?$| > ` +
                            `${current.list[after+i].weather[0].main}(${current.list[after+i].weather[0].description}) / ` +
                            `気温 ${Math.round(current.list[after+i].main.temp)} ℃ ` +
                            `${current.list[after+i].rain && current.list[after+i].rain['3h'] ? '/ 降雨量 ' + Math.ceil(current.list[after+i].rain['3h'] * 10) /

10 + ' mm ' : '' }` +
                            `${current.list[after+i].snow && current.list[after+i].snow['3h'] ? '/ 降雪量 ' + Math.ceil(current.list[after+i].snow['3h'] * 10) /

10 + ' mm ' : '' }\n`;
                }
		    bot.reply(message, text);
		})
	});
})

controller.hears(['(.*)地元の天気'], 'direct_message,direct_mention,mention', function(bot, message) {
var time = 0
var location = ''
var loc_name = ''
const http = require('http');
controller.storage.users.get(message.user, function(err, user) {

	for(var i=0;member.length!=i;i++){
	if(member[i][0]==message.user)mem_id = i;
	}
	/*connection.query('SELECT * FROM location WHERE user =\'' + member[mem_id][1] + '\' ;', function (error, results, fields) {
	location = results[0].latlon;
	loc_name = results[0].name;
	});*/
	for(var i=0;locations.length!=i;i++){
		if(member[mem_id][1]==locations[i].user_name){
			location = locations[i].latlon;
			loc_name = locations[i].location_name;
		}
	}
	})

let text =''
var after = Math.floor(time/3)
console.log(after);
http.get("http://api.openweathermap.org/data/2.5/forecast?"+ location + "&units=metric&appid=b9fac044642cb6391c596659bc1a05cd", (response) => {
    	let body = '';
	var today = new Date();
	var minutes = today.getUTCMinutes();
	var weekday = today.getUTCDay();
	var hours = (today.getUTCHours() + 9) % 24;
	hours += after* 3;
    response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
    response.on('end', () => {

                    let current = JSON.parse(body);
			console.log(current);
                      text =
                             hours + ':' + minutes + 'の'+ loc_name +`の天気\n` +
                             // `<http://openweathermap.org/img/w/${current.weather[0].icon.replace('n', 'd')}.png?$| > ` +
                            `${current.list[after].weather[0].main}(${current.list[after].weather[0].description}) / ` +
                            `気温 ${Math.round(current.list[after].main.temp)} ℃ ` +
                            `${current.list[after].rain && current.list[after].rain['3h'] ? '/ 降雨量 ' + Math.ceil(current.list[after].rain['3h'] * 10) / 10 +

' mm ' : '' }` +
                            `${current.list[after].snow && current.list[after].snow['3h'] ? '/ 降雪量 ' + Math.ceil(current.list[after].snow['3h'] * 10) / 10 +

' mm ' : '' }`;
                    bot.reply(message, text);
		})
	});
})


controller.hears(['(.*)天気'], 'direct_message,direct_mention,mention', function(bot, message) {
var time = 0
var location = ''
var loc_name = ''
const http = require('http');
location = 'lat=35.25&lon=135.46'
loc_name = '松ヶ崎'
	/*
	connection.query('SELECT * FROM location WHERE user =' + user.name + ' ', function (error, results, fields) {
	if(err){
		location = 'lat=35.25&lon=135.46'
		loc_name = '松ヶ崎'
	}
	location = result[0].latlon,
	loc_name = result[0].name,
	});*/

let text =''
var after = Math.floor(time/3)
console.log(after);
http.get("http://api.openweathermap.org/data/2.5/forecast?"+ location + "&units=metric&appid=b9fac044642cb6391c596659bc1a05cd", (response) => {
    let body = '';
	var today = new Date();
	var minutes = today.getUTCMinutes();
	var weekday = today.getUTCDay();
	var hours = (today.getUTCHours() + 9) % 24;
	hours += after* 3;
    response.setEncoding('utf8').on('data', (chunk) => {  body += chunk;  });
    response.on('end', () => {

                    let current = JSON.parse(body);
			 // console.log(current);
                      text =
                             hours + ':' + minutes + 'の'+ loc_name +`の天気\n` +
                             // `<http://openweathermap.org/img/w/${current.weather[0].icon.replace('n', 'd')}.png?$| > ` +
                            `${current.list[after].weather[0].main}(${current.list[after].weather[0].description}) / ` +
                            `気温 ${Math.round(current.list[after].main.temp)} ℃ ` +
                            `${current.list[after].rain && current.list[after].rain['3h'] ? '/ 降雨量 ' + Math.ceil(current.list[after].rain['3h'] * 10) / 10 +

' mm ' : '' }` +
                            `${current.list[after].snow && current.list[after].snow['3h'] ? '/ 降雪量 ' + Math.ceil(current.list[after].snow['3h'] * 10) / 10 +

' mm ' : '' }`;
                    bot.reply(message, text);
		})
	});
})


controller.hears(['電車(.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
        var week = '';
	var temp = '';
	var train_time = '';
	var train_hours = '';
	var train_minutes = '';
	var station_name = '';
	var weekdays_flag = true;
	var today = new Date();
	var minutes = today.getUTCMinutes();
	var weekday = today.getUTCDay();
	var hours = (today.getUTCHours() + 9) % 24;
	var today_month = today.getMonth()+1;
	var today_day = today.getDate();
	var year = today.getFullYear();
	for(var i=0;member.length!=i;i++){
	if(member[i][0]==message.user)mem_id = i;
	}
	switch(weekday){
		case 0:
			week='日';
			weekdays_flag = false;
			break;
		case 1:
			week='月';
			break;
		case 2:
			week='火';
			break;
		case 3:
			week='水';
			break;
		case 4:
			week='木';
			break;
		case 5:
			week='金';
			break;
		case 6:
			week='土';
			weekdays_flag = false;
			break;}
for(var i=0;holiday.length!=i;i++){
	if(holiday[i][2]==today_month&&holiday[i][3]==today_day){	// 祝祭日は休日
weekdays_flag = false;
}
else if ((holiday[i][2]==today_month&&holiday[i][3]==(today_day-1))&&weekday==1){	//祝祭日が日曜日であった場合その翌日は休日
weekdays_flag = false;
}
	}

for(var i=0;holiday_week.length!=i;i++){
	if(holiday_week[i][2]==today_month&&(7*holiday_week[i][3][0]<today_day)&&(today_day<=7*(1+holiday_week[i][3][0]))&&weekday==1){	// 祝祭日は休日
weekdays_flag = false;
}
}

if(year%4==0||year%4==1){
	if(today_month==3&&today_day==20){	// 祝祭日は休日
weekdays_flag = false;
}else if(today_month==3&&today_day==21&&weekday==1){	//祝祭日が日曜日であった場合その翌日は休日
weekdays_flag = false;
}
}

if(year%4==2||year%4==3){
	if(today_month==3&&today_day==21){	// 祝祭日は休日
weekdays_flag = false;
}else if(today_month==3&&today_day==22&&weekday==1){	//祝祭日が日曜日であった場合その翌日は休日
weekdays_flag = false;
}
}

if(year%4==0){
	if(today_month==9&&today_day==22){	// 祝祭日は休日
weekdays_flag = false;
}else if(today_month==9&&today_day==24&&weekday==2){	//祝祭日が日曜日であった場合その翌日は休日
weekdays_flag = false;
}
}
if(year%4==1||year%4==2||year%4==3){
	if(today_month==9&&today_day==23){	// 祝祭日は休日
weekdays_flag = false;
}else if(today_month==9&&today_day==25&&weekday==2){	//祝祭日が日曜日あった場合その翌日は休日
weekdays_flag = false;
}
}


if(weekdays_flag==true){
console.log('weekday');
}else{
console.log('holiday');
}

	if(weekdays_flag == true){
		controller.storage.users.get(message.user, function(err, user) {
        		if(member[mem_id][1] == 'shibuya'){
				/*connection.query('SELECT * FROM demachiyanagiweekday WHERE hour <=' + hours + ';', function (error, results, fields) {
					for(var i=0; results[i]!= null;i++){
						if(results[i].hour == ( hours + 1 )){
							if((results[i].minute+60-minutes)<30){
								continue;
							}
							train_minutes = results[i].minute;
							train_hours = results[i].hour;
							break;
						}
						if((results[i].minute-minutes)<30){
							continue;
						}
						if(results[i].minute>minutes){
							train_minutes = results[i].minute;
							train_hours = results[i].hour;
							break;
						}
					}
				});*/
				for(var i=0;demachiyanagi_yodo_weekday.length!=i;i++){
							if(demachiyanagi_yodo_weekday[i].hour<hours){
							continue;
							}
							if(demachiyanagi_yodo_weekday[i].hour == ( hours + 1 )){
								if((demachiyanagi_yodo_weekday[i].minute+60-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_yodo_weekday[i].minute;
								train_hours = demachiyanagi_yodo_weekday[i].hour;
								break;
							}
							if(demachiyanagi_yodo_weekday[i].minute>minutes){
								if((demachiyanagi_yodo_weekday[i].minute-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_yodo_weekday[i].minute;
								train_hours = demachiyanagi_yodo_weekday[i].hour;
								break;
							}
				}
			}else if(member[mem_id][1] == 'fujita'){
				for(var i=0;demachiyanagi_eizan_weekday.length!=i;i++){
							if(demachiyanagi_eizan_weekday[i].hour<hours){
							continue;
							}
							if(demachiyanagi_eizan_weekday[i].hour == ( hours + 1 )){
								if((demachiyanagi_eizan_weekday[i].minute+60-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_eizan_weekday[i].minute;
								train_hours = demachiyanagi_eizan_weekday[i].hour;
								break;
							}
							if(demachiyanagi_eizan_weekday[i].minute>minutes){
								if((demachiyanagi_eizan_weekday[i].minute-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_eizan_weekday[i].minute;
								train_hours = demachiyanagi_eizan_weekday[i].hour;
								break;
							}
				}

			}else{
				/*connection.query('SELECT * FROM matsugasakiweekday WHERE hour <=' + hours + ';', function (error, results, fields) {
					for(var i=0; results[i]!= null;i++){
							if(results[i].hour == ( hours + 1 )){
								if((results[i].minute+60-minutes)<30){
									continue;
								}
								train_minutes = results[i].minute;
								train_hours = results[i].hour;
								break;
							}
							if(results[i].minute>minutes){
								if((results[i].minute-minutes)<30){
									continue;
								}
								train_minutes = results[i].minute;
								train_hours = results[i].hour;
								break;
							}
					}
				});*/
				for(var i=0;matsugasakiweekday.length!=i;i++){
							if(matsugasakiweekday[i].hour<hours){
							continue;
							}
							if(matsugasakiweekday[i].hour == ( hours + 1 )){
								if((matsugasakiweekday[i].minute+60-minutes)<30){
									continue;
								}
								train_minutes = matsugasakiweekday[i].minute;
								train_hours = matsugasakiweekday[i].hour;
								break;
							}
							if(matsugasakiweekday[i].minute>minutes){
								if((matsugasakiweekday[i].minute-minutes)<30){
									continue;
								}
								train_minutes = matsugasakiweekday[i].minute;
								train_hours = matsugasakiweekday[i].hour;
								break;
							}
				}
			}
		});
	}
	if(weekdays_flag == false){
		controller.storage.users.get(message.user, function(err, user) {

			if(member[mem_id][1] == 'fujita'||member[mem_id][1] == 'shibuya'){
				/*connection.query('SELECT * FROM demachiyanagiholiday WHERE hour <=' + hours + ';', function (error, results,fields) {
					for(var i=0; results[i]!= null;i++){
						if(results[i].hour == ( hours + 1 )){
							if((results[i].minute+60-minutes)<30){
								continue;
							}
							train_minutes = results[i].minute;
							train_hours = results[i].hour;
							break;
						}
						if(results[i].minute>minutes){
							if((results[i].minute-minutes)<30){
								continue;
							}
						train_minutes = results[i].minute;
						train_hours = results[i].hour;
						break;
						}
					}
				});*/
			for(var i=0;demachiyanagi_yodo_holiday.length!=i;i++){
							if(demachiyanagi_yodo_holiday[i].hour<hours){
							continue;
							}
							if(demachiyanagi_yodo_holiday[i].hour == ( hours + 1 )){
								if((demachiyanagi_yodo_holiday[i].minute+60-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_yodo_holiday[i].minute;
								train_hours = demachiyanagi_yodo_holiday[i].hour;
								break;
							}
							if(demachiyanagi_yodo_holiday[i].minute>minutes){
								if((demachiyanagi_yodo_holiday[i].minute-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_yodo_holiday[i].minute;
								train_hours = demachiyanagi_yodo_holiday[i].hour;
								break;
							}
				}
			}else if(member[mem_id][1] == 'fujita'){
				for(var i=0;demachiyanagi_eizan_holiday.length!=i;i++){
							if(demachiyanagi_eizan_holiday[i].hour<hours){
							continue;
							}
							if(demachiyanagi_eizan_holiday[i].hour == ( hours + 1 )){
								if((demachiyanagi_eizan_holiday[i].minute+60-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_eizan_holiday[i].minute;
								train_hours = demachiyanagi_eizan_holiday[i].hour;
								break;
							}
							if(demachiyanagi_eizan_holiday[i].minute>minutes){
								if((demachiyanagi_eizan_holiday[i].minute-minutes)<30){
									continue;
								}
								train_minutes = demachiyanagi_eizan_holiday[i].minute;
								train_hours = demachiyanagi_eizan_holiday[i].hour;
								break;
							}
				}
			}else{
	/*connection.query('SELECT * FROM matsugasakiholiday WHERE hour <=' + hours + ';', function (error, results, fields) {
			for(var i=0; results[i]!= null;i++){
				if(results[i].hour == ( hours + 1 )){
					if((results[i].minute+60-minutes)<30){
						continue;
					}
					train_minutes = results[i].minute;
					train_hours = results[i].hour;
					break;
				}
				if(results[i].minute>minutes){
					if((results[i].minute-minutes)<30){
						continue;
					}
					train_minutes = results[i].minute;
					train_hours = results[i].hour;
					break;
				}
			}

	});*/
	for(var i=0;matsugasakiholiday.length!=i;i++){
							if(matsugasakiholiday[i].hour<hours){
							continue;
							}
							if(matsugasakiholiday[i].hour == ( hours + 1 )){
								if((matsugasakiholiday[i].minute+60-minutes)<30){
									continue;
								}
								train_minutes = matsugasakiholiday[i].minute;
								train_hours = matsugasakiholiday[i].hour;
								break;
							}
							if(matsugasakiholiday[i].minute>minutes){
								if((matsugasakiholiday[i].minute-minutes)<30){
									continue;
								}
								train_minutes = matsugasakiholiday[i].minute;
								train_hours = matsugasakiholiday[i].hour;
								break;
							}
				}
		}
	})
}



controller.storage.users.get(message.user, function(err, user) {

	if(member[mem_id][1] == 'fujita'||member[mem_id][1] == 'shibuya'){
	station_name = '出町柳'
	}else{
	station_name = '松ヶ崎'
	}

});

	bot.reply(message, '次の'+ station_name+'発の電車は'+train_hours+'時'+train_minutes+'分発です');

})


/*ラボのカレンダー予定を追加*/
controller.hears(['(.*)年(.*)月(.*)日(.*)から(.*)の予定'], 'direct_message,direct_mention,mention', function(bot, message) {

  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listEvents, message);
  });
});
//>>>>>>> develop_calendar


function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, message) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
  console.log(client_id);
  console.log(client_secret);
  console.log(redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if(arguments.length == 3){
      if (err) return getAccessToken(oAuth2Client, callback, message);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, message);
    }else if(arguments.length == 2){
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    }else{
      console.log('number of arguments is inappropriate: ' + callback);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback, message) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      if(arguments.length == 3){
        callback(oAuth2Client, message);
      }else if(arguments.length == 2){
        callback(oAuth2Client);
      }else{
        console.log('number of arguments is inappropriate: ' + callback);
      }
    });
  });
}

function list10Events(auth, message) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = data.items;
    if (events.length) {
      var lab_events = "直近のラボの予定を最大10個掲示します\n";
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        lab_events += start + ' ' + event.summary + "\n";
      });
      bot.reply(message, lab_events);

    } else {
      //console.log('No upcoming events found.');
      // bot.say({
      //     channel: 'UA3DS9QE5',
      //     text: 'No upcoming events found.'
      // });
      bot.reply(messages, 'No upcoming events found.');
    }
  });
}

function listTomorrowEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  var nextDateMin = new Date();
  nextDateMin.setTime(nextDateMin.getTime() + ((24 - default_lTE_time) * 3600 * 1000));
  var nextDateMax = new Date();
  nextDateMax.setTime(nextDateMax.getTime() + ((48 - default_lTE_time) * 3600 * 1000));
  calendar.events.list({
    calendarId: 'primary',
     timeMin: nextDateMin.toISOString(),
     timeMax: nextDateMax.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = data.items;
    if (events.length) {
      var lab_events = "お疲れ様です。明日の予定を表示します。\n";
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        lab_events += start + ' ' + event.summary + "\n";
      });
      bot.say({
          channel: 'team_c_2018',
          text: lab_events,
      });
    }
  });
}
