const TelegramBot = require('node-telegram-bot-api');
var config = require('./config')
var firebase = require('firebase')

var firebase_config = config.firebase_config;
var token = config.token;
firebase.initializeApp(firebase_config);

const bot = new TelegramBot(token, {polling: true});
const img_url = 'https://cdn-images-1.medium.com/max/1200/1*b708XUPLvguJNmrpbg8oXg.jpeg'
var t_username = '';
var u_email = '';
var e_wallet = '';
var t_mobileno='';

bot.onText(/\/start/, (msg) => {
    bot.sendPhoto(msg.chat.id,img_url,{caption : "Welcome to Era Swap Airdrop! 😍😍 \nJoin Era Swap Community on Telegram and earn 3 Era Swap Tokens\n \n "}).then(() => {
        var option = {
            "reply_markup": {
                "keyboard": [["1. Join the Era Swap Telegram group", "2. Your Telegram Username", "3. Your Mobile Number"],   ["4. E-mail address" , "5. ETH address (No exchange wallet!)"]]
                }
        };
        bot.sendMessage(msg.chat.id,"Airdrop Rules ⚔️⚔️\n 1. Join the Era Swap Telegram group \n 2. Your Telegram Username \n 3. Mobile Number \n 4. E-mail address \n 5. ETH address (No exchange wallet!) \n Visit https://eraswaptoken.io for more\n",option);
    })
})
bot.on('message', (msg) => {
   var send_text1 = msg.text;
   var send_msg = "Hi";
   if(send_text1.toString().indexOf(send_msg) === 0){

        bot.sendMessage(msg.chat.id,"Hello i am smart bot from Era Swap, start the task list by replying /start");
   }

});
bot.on('message', (msg) => {
   var send_text1 = msg.text;
   var send_msg = "hi";
   if(send_text1.toString().indexOf(send_msg) === 0){

        bot.sendMessage(msg.chat.id,"Hello i am smart bot from Era Swap, start the task list by replying /start");
   }

});

bot.on('message', (msg) => {
   var send_text2 = msg.text;
   var re = /project/i;
   if(re.test(send_text2)){

        var keyboardStr = JSON.stringify({
            inline_keyboard: [
            [
                {text:'View Whitepaper',url:'https://eraswaptoken.io/pdf/era-swap-whitepaper.pdf'}
            ]
            ]
        });
        var keyboard = {reply_markup: JSON.parse(keyboardStr)};
        bot.sendMessage(msg.chat.id,"You can have a look on our whitepaper to know more about our project.",keyboard);
   }
});


var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
bot.on('message', (msg) => {
    var send_text = msg.text;
    var step1_text = '1. Join the Era Swap Telegram group'
    if (send_text.toString().indexOf(step1_text) === 0) {
        var text = 'Era Swap Telegram Group';
        var keyboardStr = JSON.stringify({
            inline_keyboard: [
            [
                {text:'Join the chat',url:'https://t.me/eraswap'}
            ]
            ]
        });
        var keyboard = {reply_markup: JSON.parse(keyboardStr)};
        bot.sendMessage(msg.chat.id,text,keyboard);
    }

    var step2_text = '2. Your Telegram Username';
    if (send_text.toString().indexOf(step2_text) === 0) {
        bot.sendMessage(msg.chat.id, "Please Enter Your Telegram Username (@username)")
    }

    if(send_text.toString().charAt(0) === '@') {
        t_username = send_text;
                var option = {
            "reply_markup": {
                "keyboard": [["1. Join the Era Swap Telegram group", "2. Your Telegram Username", "3. Your Mobile Number"],   ["4. E-mail address" , "5. ETH address (No exchange wallet!)"]]
                }
        };
        bot.sendMessage(msg.chat.id, "Hello "+send_text, option);

    }

    var step3_text = '3. Your Mobile Number';
    if (send_text.toString().indexOf(step3_text) === 0) {
        bot.sendMessage(msg.chat.id, "Please Enter Your Mobile Number, please maintain the format for example for India it will be like +91XXXXXXXXXX");
    }

    if(send_text.length === 13) {
        t_mobileno = send_text;
                var option = {
            "reply_markup": {
                "keyboard": [["1. Join the Era Swap Telegram group", "2. Your Telegram Username", "3. Your Mobile Number"],   ["4. E-mail address" , "5. ETH address (No exchange wallet!)"]]
                }
        };
        bot.sendMessage(msg.chat.id, "Your Number is "+send_text, option);

    }

    var step4_text = '4. E-mail address';
    if(send_text.toString().indexOf(step4_text) === 0) {
        bot.sendMessage(msg.chat.id, "Enter your email address")
    }
    
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

    
    if(re.test(send_text)) {
        u_email = send_text;
        var option = {
            "reply_markup": {
                "keyboard": [["1. Join the Era Swap Telegram group", "2. Your Telegram Username", "3. Your Mobile Number"],   ["4. E-mail address" , "5. ETH address (No exchange wallet!)"]]
                }
        };
        bot.sendMessage(msg.chat.id, "Email address: "+send_text, option)
    }
    
    var step5_text = '5. ETH address (No exchange wallet!)';
    if(send_text.toString().indexOf(step5_text) === 0) {
        bot.sendMessage(msg.chat.id, "Make sure that you have an erc20 wallet (0x) 🔑");
    }
    var re_eth = /^0x[a-fA-F0-9]{40}$/g
    if(re_eth.test(send_text)) {
        e_wallet = send_text;
        bot.sendMessage(msg.chat.id, 'Confirm❓', {
            reply_markup: {
              keyboard: [
               [{"text": "Yes ✅"}],
               [{"text": "Cancel ❌"}]
            ],
            resize_keyboard: true
            }
         })
    }
    var confirm = 'Yes ✅';
    if(send_text.toString().indexOf(confirm) === 0) {
            var db = firebase.database().ref();
            db.child(e_wallet.toLocaleLowerCase()).once('value', snap => {
                if(!snap.exists()) {
                    db.child(e_wallet.toLocaleLowerCase()).update({
                        telegram_username: t_username,
                        email: u_email,
                        mobilenumber: t_mobileno,
                        wallet: e_wallet.toLocaleLowerCase(),
                        status: 'pending',
                        createAt: Date.now()
                    }).then(() => {
                        bot.sendMessage(msg.chat.id, "Thank'you 🙏🙏 \n"); 
                        bot.sendMessage(msg.chat.id, `Telegram username: ${t_username} \n Email: ${u_email} \n Ethereum wallet: ${e_wallet} \n Visit https://eraswaptoken.io for more.\n`).then(() => {
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                     bot.sendMessage(msg.chat.id, "This wallet is already in use");

                }
            })
    }
    var calcel = 'Cancel ❌';
    if(send_text.toString().indexOf(calcel) === 0) {
        bot.sendMessage(msg.chat.id, "Good bye ✌️✌️"); 
    }
});

