import { getSession } from "next-auth/client"
import UserProfile from "../components/profile/user-profile"

function ProfilePage() {
	return <UserProfile />
}

// 서버에서 페이지 요청 시에 세션을 확인해서 인증여부 파악
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		}
	}

	return {
		props: {
			session,
		},
	}
}

export default ProfilePage
