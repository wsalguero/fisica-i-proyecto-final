import { Outlet } from "react-router-dom"
import TopMenu from "./components/app/navigation/topMenu/topMenu"

const Layout = () => {
    return (
        <>

            {/* <header>
                <TopMenu />

            </header> */}
            <main className="w-full h-full lg:px-24">
                <Outlet />
            </main>

            <footer></footer>
        </>
    )
}

export default Layout