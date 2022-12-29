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
    let coin_symbol = data.data.symbol
    let marketcap_rank = data.data.market_cap_rank
    let coin_price = data.data.market_data.current_price.usd
    let circulating_supply = data.data.market_data.circulating_supply
    let hash_algorithm = data.data.hashing_algorithm
    let genesis_date = data.data.genesis_date
    let price_volatility = data.data.market_data.price_change_percentage_24h

    //Uppercase first char of coin_symbol
    let coinSymbolUpperCase = coin_symbol.charAt(0).toUpperCase() + coin_symbol.slice(1)

    return { coin_name, marketcap_rank, coin_price, circulating_supply, coinSymbolUpperCase, hash_algorithm, genesis_date, price_volatility }
};

client.once('ready', async() => {
    let values = await getData()
    client.user.setUsername(`${values.coinSymbolUpperCase} Price Bot`);
	console.log(`✅ Ready! Logged in as ${client.user.tag}`);
});

client.on('ready', async() => {
    let values = await getData()
    //client.user.setUsername(`${values.coin_name}`);
    client.user.setActivity(`${values.coin_price}$ => ${values.price_volatility}`, { type: ActivityType.Watching });
    client.user.setAvatar('https://i.ibb.co/X4rcZnf/Whats-App-Image-2022-12-27-at-22-40-12.jpg');

    console.log("📙 Coin Name ==> " + values.coin_name)
    console.log("🆔 Coin ID ==> " + values.coinSymbolUpperCase)
    console.log("💰 Coin Price ==> " + values.coin_price + "$")
    console.log("📊 Price Volatility ==> " + values.price_volatility + "%")
    console.log("🚚 Circulating Supply ==> " + values.circulating_supply)
    console.log("#️⃣ Hash Algorithm ==> " + values.hash_algorithm)
    console.log("🥇 Marketcap Rank ==> " + values.marketcap_rank)
    console.log("📅 Genesis Date ==> " + values.genesis_date)

});

client.login(process.env.DISCORD_TOKEN);