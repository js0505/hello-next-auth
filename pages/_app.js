import { Provider } from "next-auth/client"
import Layout from "../components/layout/layout"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    // 컴포넌트 어딘가의 props에서 session prop 이 있는걸 가져다 사용
    // 프로바이더로 감싸는게 권장하는 최적화 방법.
		<Provider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp
