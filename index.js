require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const Binance = require("node-binance-api");

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.SECRET,
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Crypto", { type: "Crypto" });
});

client.on("message", (msg) => {
  if (msg.content.toUpperCase() === "DOGE-HELP") {
    const msgHelp = new Discord.MessageEmbed()
    .addField('COMANDOS', 'DOGE -> Entrega el precio del DOGECOIN en el momento actual')
    msg.channel.send(msgHelp)
  }
  if (msg.content.toUpperCase() === "DOGE") {
    binance.prices("DOGEUSDT", (error, ticker) => {
      msg.channel.send(`Price of DOGECOIN: ${ticker.DOGEUSDT}`);
    });
  }
  if (msg.content.toUpperCase() === "DOGELOOP") {
    if (msg.channel.name === "dogecoin-record") {
      msg.channel.send("INICIANDO LOOP...");
      binance.websockets.candlesticks(["DOGEUSDT"], "1m", (candlesticks) => {
        let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
        let {
          o: open,
          h: high,
          l: low,
          c: close,
          v: volume,
          n: trades,
          i: interval,
          x: isFinal,
          q: quoteVolume,
          V: buyVolume,
          Q: quoteBuyVolume,
        } = ticks;
        msg.channel.send(`
              -------------------------
        open: ${open}
        "high: ${high}
        low: ${low}
        close: ${close}
        volume: ${volume}
        isFinal: ${isFinal}
        `);
      });
    } else {
      msg.channel.send("EN ESTE CANAL NO PUEDO KLAO");
    }
  }
});

client.login(process.env.PERRO_MONEDA);
