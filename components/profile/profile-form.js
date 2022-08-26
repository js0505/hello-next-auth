import { useRef } from "react"
import classes from "./profile-form.module.css"
async function changePassword(newPassword, oldPassword) {
	const response = await fetch("/api/auth/change-password", {
		method: "PATCH",
		body: JSON.stringify({ newPassword, oldPassword }),
		headers: {
			"Content-Type": "application/json",
		},
	})

	const data = await response.json()

	if (!response.ok) {
		console.log(response.statusText)
		// throw new Error(data.message || "Something wrong")
	}

	return data
}
function ProfileForm() {
	const newPasswordInputRef = useRef()
	const oldPasswordInputRef = useRef()

	async function submitHandler(e) {
		e.preventDefault()

		const newPassword = newPasswordInputRef.current.value
		const oldPassword = oldPasswordInputRef.current.value

		const result = await changePassword(newPassword, oldPassword)
		console.log(result)
	}
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input type="password" id="new-password" ref={newPasswordInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="old-password">Old Password</label>
				<input type="password" id="old-password" ref={oldPasswordInputRef} />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	)
}

export default ProfileForm
