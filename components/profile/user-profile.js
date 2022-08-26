import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"

import ProfileForm from "./profile-form"
import classes from "./user-profile.module.css"

function UserProfile() {
	// 클라이언트 측에서 세션상태 확인 후 페이지 접속 가능여부 파악

	// const [isLoading, setIsLoading] = useState(true)
	// const [loadedSession, setLoadedSession] = useState()

	// // Redirect away if NOT auth

	// useEffect(() => {
	// 	getSession().then((session) => {
	// 		if (!session) {
	// 			window.location.href = "/auth"
	// 		} else {
	// 			setIsLoading(false)
	// 		}
	// 		// setLoadedSession(session)
	// 	})
	// }, [])

	// if (isLoading) {
	// 	return <p className={classes.profile}>Loading...</p>
	// }
	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm />
		</section>
	)
}

export default UserProfile
