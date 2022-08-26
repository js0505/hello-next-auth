import { getSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AuthForm from "../components/auth/auth-form"

function AuthPage() {
  // 클라이언트 에서 인증여부 확인해서 페이지 접속유무 처리
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				router.replace("/")
			} else {
				setIsLoading(false)
			}
		})
	}, [router])

	if (isLoading) {
		return <p>Loading..</p>
	}
	return <AuthForm />
}

export default AuthPage
