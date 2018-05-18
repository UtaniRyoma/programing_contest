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
var os = require('os');
require('date-utils');



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

const default_lTE_time = 21 //listTomorrowEvents()の通知時刻

//var message = "";

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
    connection.query('INSERT INTO remind (time,yotei)VALUES(cast(\'' + datetime + '\'as datetime),\'' + yotei +'\')', function (error, results, fields) {
        if (err) { console.log('err: ' + err); }
        console.log(results);

    })

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
  var lecture = message.match[3];
  console.log('INSERT INTO lecture (period,youbi,lecture)VALUES(' + period + ',\'' + youbi + '\',\'' + lecture +'\')');

  connection.query('INSERT INTO lecture (period,youbi,lecture)VALUES(' + period + ',\'' + youbi + '\',\'' + lecture +'\')', function (error, results, fields) {
      if (err) { console.log('err: ' + err); }
      console.log(results);

  })

  bot.reply(message, youbi + '曜日の' + period + '限の' + lecture + 'の授業を登録しました');
});


// 授業の確認
controller.hears(['(.*)曜日の授業'], 'direct_message,direct_mention,mention', function(bot, message) {

  var youbi = message.match[1];
  // var youbi = 'Tu';
  var jugyo = "";

  connection.query('SELECT period FROM lecture WHERE youbi = \'' + youbi + '\'', function (error, results, fields) {
      if (err) { console.log('err: ' + err); }
      console.log('SELECT period FROM lecture WHERE youbi = \'' + youbi + '\'');
      console.log(results);
      jugyo = results.toString();
      console.log(jugyo);
  })

  bot.reply(message, youbi + '曜日の授業を登録しました');
});

/*ラボのカレンダー予定を閲覧*/
controller.hears(['ラボの予定'], 'direct_message,direct_mention,mention', function(bot, message) {

  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    //authorize(JSON.parse(content), list10Events, message);
    authorize(JSON.parse(content), list10Events, message);
  });
});

// /*ラボのカレンダー予定を追加*/
// controller.hears(['(.*)年(.*)月(.*)日(.*)から(.*)の予定'], 'direct_message,direct_mention,mention', function(bot, message) {
//
//   // Load client secrets from a local file.
//   fs.readFile('client_secret.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Drive API.
//     authorize(JSON.parse(content), listEvents, message);
//   });
// });


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
      var lab_events = ":smiley: Upcoming 10 events:\n";
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        lab_events += start + event.summary + "\n";
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
        lab_events += start + event.summary + "\n";
      });
      bot.say({
          channel: 'UA3DS9QE5',
          text: lab_events,
      });
    }
  });
}
