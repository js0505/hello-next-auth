import { MongoClient } from "mongodb"

async function connectToDatabase() {
	const client = await MongoClient.connect("mongodb://127.0.0.1", {
		dbName: "nextAuth",
		useUnifiedTopology: true,
	})

	return client
}

export default connectToDatabase
