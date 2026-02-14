require("express")().listen(1343);
const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.TOKEN); // UYGULAMA TOKEN'INIZI GİRMEYİ UNUTMAYIN! - İŞLEMLERİ DİKKATLİ YAPIN.
const fetch = require("node-fetch");
const fs = require('fs')

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot 7/24 Aktif Hacım!');
});

app.listen(3000, () => {
  console.log('Bot kapıları açtı, 3000 portundan dinliyoruz!');
});

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Login success! | App/Logined [Online] | Shard 1/1 Online")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`.help | ${db.get("linkler").length} Aktif BOT!`)
  console.log(`Bot Aktif!`)
})

// Zed sizi seviyor.

client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == ".ekle") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("Bu site daha önce veri tabanına eklenmiş durumda, geçersiz işlem.")
    message.channel.send("Uptime edilecek hedef site veri tabanına eklendi.");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("Başarısız!" + e)
  })
  }
})

// Zed sizi seviyor.

client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == ".say") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} Aktif`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == ".help") {
let embed = new Discord.RichEmbed()
.setColor('GREY')
.addField(`Uptime Bot`, `Bot'a hedef siteyi girerek sürekli uptime olmasını sağlarsınız.`)
.addField(`Genel Komutlar`,`

**.yardım** *-* Yardım menüsü
**.ekle** *-* Veri tabanına site eklersiniz
**.say** *-* Sistemde kaç site olduğunu listeler
`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`2026 © Uptime Bot | Raxion on the deadline.`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})

// Zed sizi seviyor.

client.on("message", async message => {

  if(!message.content.startsWith("u.eval")) return;
  if(!["id","id"].includes(message.author.id)) return;
  var args = message.content.split(".eval")[1]
  if(!args) return message.channel.send("Hyr! :(")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  
  const log = message => {
  console.log(`${message}`);
}
  
// Zed sizi seviyor...
  
