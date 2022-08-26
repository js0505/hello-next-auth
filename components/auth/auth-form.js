import { useRef, useState } from "react"
import classes from "./auth-form.module.css"
import { signIn } from "next-auth/client"
import { useRouter } from "next/router"

async function createUser(email, password) {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: {
			"Content-Type": "application/json",
		},
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || "Something wrong")
	}

	return data
}

function AuthForm() {
	const [isLogin, setIsLogin] = useState(true)
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const router = useRouter()

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState)
	}

	async function submitHandler(e) {
		e.preventDefault()
		const enteredEmail = emailInputRef.current.value
		const enteredPassword = passwordInputRef.current.value

		if (isLogin) {
			// signIn 함수의 두번째 인자로 나가는 객체가 nextAuth 라우트의 authorize 함수 인자로 들어감

			/**  result 객체 샘플
      error: null
      ok: true
      status: 200
       url: "http://localhost:3000/auth" */

			const result = await signIn("credentials", {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			})

			// 로그인이 정상적으로 됐을 때
			if (!result.error) {
				router.replace("/profile")
			}
		} else {
			try {
				const result = await createUser(enteredEmail, enteredPassword)
				console.log(result)
			} catch (e) {
				console.log(e)
			}
		}
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? "Login" : "Create Account"}</button>
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	)
}

export default AuthForm
