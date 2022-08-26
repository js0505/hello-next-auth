import { getSession } from "next-auth/client"
import connectToDatabase from "../../../lib/db"
import { verifyPassword, hashPassword } from "../../../lib/auth"
async function handler(req, res) {
	if (req.method !== "PATCH") {
		return
	}

	const session = await getSession({ req: req })

	// 인증되지 않은 사용저의 접근 차단
	if (!session) {
		res.status(401).json({ message: "Not auth" })
		return
	}

	const userEmail = session.user.email
	const oldPassword = req.body.oldPassword
	const newPassword = req.body.newPassword

	const client = await connectToDatabase()
	const usersCollection = client.db().collection("users")

	const user = await usersCollection.findOne({ email: userEmail })

	if (!user) {
		res.status(404).json({ message: "user not found" })
		client.close()
		return
	}
	const hashedPassword = user.password

	const isValid = await verifyPassword(oldPassword, hashedPassword)

	if (!isValid) {
		client.close()
		res.status(403).json({ message: "Invalid password " })
		return
	}

	const newHashedPassword = await hashPassword(newPassword)

	const updatedUser = await usersCollection.updateOne(
		{ email: userEmail },
		{ $set: { password: newHashedPassword } },
	)

	client.close()
	res.status(200).json({ message: "Password changed" })
}
export default handler
