const qrcode = require('qrcode-terminal')
const {Client,LocalAuth}=require('whatsapp-web.js')

const whatsapp = new Client({
    authStrategy:new LocalAuth() 
})

whatsapp.on('qr',qr=>{
    qrcode.generate(qr,{
       small:true 
    })
})


whatsapp.on('message',async message =>{
    if(message.body === "hello"|| message.body === "HELLO"||message.body === "Hi")
    message.reply("Hello I am Soupayan")
})



whatsapp.on('ready',()=>{
    console.log("Hi ")
})



whatsapp.initialize()