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
var os = require('os');
var gomidashiUser = 'Unknown'
require('date-utils');
var serialport = require('serialport');
var portName = "COM5";

const sp = new serialport('COM5', {
    baudRate: 9600,
    parser: serialport.parsers.readline('\n')
});
//const sp = serial.pipe(new Readline({ delimiter: '\r\n' }));
//var sp = new SerialPort(portName, {
    //baudRate: 9600,
    //dataBits: 8,
    //parity: 'none',
    //stopBits: 1,
  //  flowControl: false,
    //parser: serialport.parsers.readline("\n")
//});


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
        cronTime: '*/10 * * * * 1,3,5',
        onTick: () => {
            sp.write(new Buffer("getdata;"), function (err, results) {
                if (err) {
                    console.log('Err: ' + err);
                    console.log('Results: ' + results);
                }
            });

        },
        start: true,
        timeZone: 'Asia/Tokyo'
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
        if (usersRows != 0) {
            connection.query('UPDATE FROM gomidashi SET kaisuu = kaisuu + 1 WHERE userid = \'' + message.user + '\'', function (error, results, fields) { })
        }
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

// 予定の登録
controller.hears(['(.*)月(.*)日(.*)時に(.*)の予定'], 'direct_message,direct_mention,mention', function(bot, message) {
    var month = message.match[1];
    var day = message.match[2];
    var time = message.match[3];
    var yotei = message.match[4];
    var dt = new Date();
    var year = dt.toFormat("YYYY");
    var datetime = year + '-' + month + '-' + day + ' ' + time + ':00:00';

    connection.query('SELECT DATE_FORMAT(time,\'%Y/%m/%d %H:%i\') AS time, yotei FROM remind WHERE time = cast(\'' + datetime + '\'as datetime)', function(error, results, fields) {
      var usersRows = JSON.parse(JSON.stringify(results));
      console.log(usersRows);

      if(usersRows != 0) {
        bot.reply(message, usersRows[0].time + 'には' + usersRows[0].yotei + 'の予定があります');
      } else {
        connection.query('INSERT INTO remind (time,yotei)VALUES(cast(\'' + datetime + '\'as datetime),\'' + yotei +'\')', function (error, results, fields) {
            if (err) { console.log('err: ' + err); }
            console.log(results);

        })
        bot.reply(message, month + '月' + day + '日' + time + '時に' + yotei + 'の予定を登録しました');
      }

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
controller.hears(['(.*)曜日の(.*)限に(.*)の授業','(.*)曜の(.*)限に(.*)の授業','(.*)曜日の(.*)限に(.*)の授業を登録','(.*)曜の(.*)限に(.*)の授業を登録'], 'direct_message,direct_mention,mention', function(bot, message) {

  var youbi = message.match[1];
  var period = message.match[2];
  var lecture_name = message.match[3];

  connection.query('SELECT * FROM lecture WHERE youbi = \'' + youbi + '\' AND period = \'' + period + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    var usersRows = JSON.parse(JSON.stringify(results));
    console.log(usersRows);

    if(usersRows != 0) {
      bot.reply(message, youbi + '曜日の' + period + '限には' + usersRows[0].lecture_name + 'の授業があります');
    } else {
      connection.query('INSERT INTO lecture (youbi,period,lecture_name)VALUES(\'' + youbi + '\',' + period + ',\'' + lecture_name + '\')', function (error, results, fields) {
          if (err) { console.log('err: ' + err); }
          console.log(results);
      })

      bot.reply(message, youbi + '曜日の' + period + '限に' + lecture_name+ 'の授業を登録しました');
    }

  })

});


// 授業の確認
controller.hears(['(.*)曜日の授業','(.*)曜の授業'], 'direct_message,direct_mention,mention', function(bot, message) {

  var youbi = message.match[1];

  connection.query('SELECT period, lecture_name FROM lecture WHERE youbi = \'' + youbi + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    var usersRows = JSON.parse(JSON.stringify(results));
    console.log(usersRows);

    for(var i = 0; i < 6; i++) {
      if(usersRows[i] != null) {
        bot.say({
          channel: 'DA9G57ZJL',
          text: usersRows[i].period + '限に' + usersRows[i].lecture_name + 'の授業があります',
          username: 'slack_bot'
        });
      }
    }

  })

});


// 予定の確認
controller.hears(['(.*)月(.*)日の予定'], 'direct_message,direct_mention,mention', function(bot, message) {

  var month = message.match[1];
  var day = message.match[2];
  var dt = new Date();
  var year = dt.toFormat("YYYY");
  var datetime = year + '-' + month + '-' + day + ' ' + '00:00:00';
  var datetime2 = year + '-' + month + '-' + day + ' ' + '23:00:00';

  connection.query('SELECT DATE_FORMAT(time,\'%Y/%m/%d %H:%i\') AS time, yotei FROM remind WHERE time BETWEEN cast(\'' + datetime + '\'as datetime) AND cast(\'' + datetime2 + '\'as datetime)', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    var usersRows = JSON.parse(JSON.stringify(results));
    console.log(usersRows);

    for(var i = 0; i < 24; i++) {
      if(usersRows[i] != null) {
        bot.say({
          channel: 'DA9G57ZJL',
          text: usersRows[i].time + 'に' + usersRows[i].yotei + 'の予定があります',
          username: 'slack_bot'
        });
      }
    }

  })

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

  connection.query('SELECT * FROM remind WHERE yotei = \'' + yotei + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    var usersRows = JSON.parse(JSON.stringify(results));
    console.log(usersRows);

    if(usersRows == 0) {
      bot.say({
        channel: 'DA9G57ZJL',
        text: yotei + 'の予定はありません',
        username: 'slack_bot'
      });
      return;
    }
  })

  connection.query('UPDATE remind SET noti_time = cast(\'' + datetime + '\'as datetime) WHERE yotei = \'' + yotei + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: yotei + 'の予定の通知時間を' + month + '月' + day + '日' + hour + '時に設定しました',
      username: 'slack_bot'
    });
  })

});

// 授業の通知時間の設定
controller.hears(['授業を(.*)時に通知','(.*)時に授業を通知'], 'direct_message,direct_mention,mention', function(bot, message) {

  var hour = message.match[1];

  connection.query('UPDATE lecture noti_time = \'' + hour + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: '授業の通知時間を前日の' + hour + '時に設定しました',
      username: 'slack_bot'
    });
  })

});

// 予定の通知
// var cronJob = require('cron').CronJob;
// var dt = new Date();
// var datetime = dt.toFormat("YYYY-MM-DD HH:00:00");
//
// var remind = new cronJob({
//   cronTime: "00 00 * * * *",
//   onTick: () => {
//     connection.query('SELECT DATE_FORMAT(time,\'%Y/%m/%d %H:%i\') AS time, yotei FROM remind WHERE noti_time = cast(\'' + datetime + '\'as datetime)', function(error, results, fields) {
//       if (err) { console.log('err: ' + err); }
//
//       var usersRows = JSON.parse(JSON.stringify(results));
//       console.log(usersRows);
//
//       if(usersRows == 0) {
//         return;
//       } else {
//         bot.say({
//           channel: 'DA9G57ZJL',
//           text: usersRows[0].time + 'に' + usersRows[0].yotei + 'の予定があります',
//           username: 'slack_bot'
//         });
//       }
//     })
//   },
//   start: true,
//   timeZone: 'Asia/Tokyo'
// })

// 授業の通知
// var dt = new Date();
// var youbi = dt.getDay();
// var pre_youbi = 0;
//   var lecture_youbi = new Array("日","月","火","水","木","金","土");
//   var notice_time = 0;
//
//   // 前日の曜日を設定
//   if(youbi == 0) {
//     pre_youbi = 6;
//   } else {
//     pre_youbi = youbi - 1;
//   }
//
//   if(err) {
//     throw new Error('Could not connect to Slack');
//   }
//
//   connection.query('SELECT * FROM lecture WHERE youbi = \'' + lecture_youbi[youbi] + '\'', function(error, results, fields) {
//     if (err) { console.log('err: ' + err); }
//
//     var usersRows = JSON.parse(JSON.stringify(results));
//     console.log(usersRows);
//
//     // 授業がなければ何もしない
//     if(usersRows == 0) {
//       return;
//     }
//
//     if(usersRows[0].noti_time == null) {
//       notice_time = 22;
//     } else {
//       notice_time = usersRows[0].noti_time;
//     }
//
//     new mycron.Cronjob({
//       cronTime: "00 00 " + notice_time + " * * " + pre_youbi,
//       onTick: () => {
//         bot.say({
//           channel: 'DA9G57ZJL',
//           text: '明日は',
//           username: 'slack_bot'
//         });
//
//         for(var i = 0; i < 6; i++) {
//           if(usersRows[i] != null) {
//             bot.say({
//               channel: 'DA9G57ZJL',
//               text: usersRows[i].period + '限に' + usersRows[i].lecture_name + 'の授業があります',
//               username: 'slack_bot'
//             })
//           }
//         }
//
//       },
//       start: true,
//       timeZone: 'Asia/Tokyo'
//     });
//
//   })

// 予定の削除
controller.hears(['(.*)月(.*)日(.*)時の予定を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var month = message.match[1];
  var day = message.match[2];
  var hour = message.match[3];
  var dt = new Date();
  var year = dt.toFormat("YYYY");
  var datetime = year + '-' + month + '-' + day + ' ' + hour + ':00:00';

  connection.query('DELETE FROM remind WHERE time = cast(\'' + datetime + '\'as datetime)', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: month + '月' + day + '日' + hour + '時' + 'の予定を削除しました',
      username: 'slack_bot'
    });
  })

});

controller.hears(['(.*)の予定を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var yotei = message.match[1];

  connection.query('DELETE FROM remind WHERE yotei = \'' + yotei + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: yotei + 'の予定を削除しました',
      username: 'slack_bot'
    });
  })

});

controller.hears(['すべての予定の削除','全ての予定の削除','全予定の削除','予定の全削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  connection.query('DELETE FROM remind', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: 'すべての予定を削除しました',
      username: 'slack_bot'
    });
  })

});

// 授業の削除
controller.hears(['(.*)曜日の(.*)限の授業を削除','(.*)曜の(.*)限の授業を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var youbi = message.match[1];
  var period = message.match[2];

  connection.query('DELETE FROM lecture WHERE youbi = \'' + youbi + '\' AND period = \'' + period + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: youbi + '曜日の' + period + '限の授業を削除しました',
      username: 'slack_bot'
    });
  })

});

controller.hears(['(.*)の授業を削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  var lecture = message.match[1];

  connection.query('DELETE FROM lecture WHERE lecture_name = \'' + lecture + '\'', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: lecture + 'の授業を削除しました',
      username: 'slack_bot'
    });
  })

});

controller.hears(['すべての授業の削除','全ての授業の削除','全授業の削除','授業の全削除'], 'direct_message,direct_mention,mention', function(bot, message) {

  connection.query('DELETE FROM lecture', function(error, results, fields) {
    if (err) { console.log('err: ' + err); }

    bot.say({
      channel: 'DA9G57ZJL',
      text: 'すべての授業を削除しました',
      username: 'slack_bot'
    });
  })

});

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
