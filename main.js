const CoinGecko = require('coingecko-api');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require("dotenv").config();

//========================

const coin = 'ethereum'
const CoinGeckoClient = new CoinGecko();
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, ],});

//========================

var getData = async() => {
    let data = await CoinGeckoClient.coins.fetch(coin, {});
    let coin_name = data.data.name
    let coingecko_rank = data.data.coingecko_rank
    let coin_price = data.data.market_data.current_price.usd
    let circulating_supply = data.data.market_data.circulating_supply
    return { coin_name, coingecko_rank, coin_price, circulating_supply }
};

client.once('ready', async() => {
    let values = await getData()
    client.user.setUsername(`${values.coin_name} Price Bot`);
	console.log(`✅ Ready! Logged in as ${client.user.tag}`);
});

client.on('ready', async() => {
    let values = await getData()
    //client.user.setUsername(`${values.coin_name}`);
    client.user.setActivity(`${values.coin_price}$`, { type: ActivityType.Watching });
    client.user.setAvatar('https://i.ibb.co/X4rcZnf/Whats-App-Image-2022-12-27-at-22-40-12.jpg');

    console.log("📙 Coin Name ==> " + values.coin_name)
    console.log("💰 Coin Price ==> " + values.coin_price)
    console.log("🚚 Circulating Supply ==> " + values.circulating_supply)
    console.log("🥇 Coingecko Rank ==> " + values.coingecko_rank)

});

client.login(process.env.DISCORD_TOKEN);
