const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const { MONGO_URL_DEV, MONGO_URL_PROD} = require('../urls/urls.json')
const isDev = process.env.ENV === 'dev'

const url = isDev ? MONGO_URL_DEV : MONGO_URL_PROD
var dbConn = null;

const connect = () => {
	if (dbConn) return Promise.resolve(dbConn);
    return MongoClient.connect(url, { useNewUrlParser: true })
		.then(client => {
            console.log('MongoDB Connected.');
            
			client.on('close', () => {
				console.log('MongoDB Disconnected.');
				dbConn = null;
			});
			dbConn = client.db();
			return dbConn;
		})
}

module.exports = {
	connect
}
