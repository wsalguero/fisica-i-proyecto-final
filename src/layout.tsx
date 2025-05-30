import { Outlet } from "react-router-dom"
import TopMenu from "./components/app/navigation/topMenu/topMenu"

const Layout = () => {
    return (
        <>

            <header className="w-full bg-white shadow-md rounded-sm">
                <TopMenu />
            </header>
            <main className="w-full h-full">
                <Outlet />
            </main>

            <footer>
                <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
                    <p className="text-sm">© 2023 - All rights reserved</p>
                </div>
            </footer>
        </>
    )
}

export default Layout