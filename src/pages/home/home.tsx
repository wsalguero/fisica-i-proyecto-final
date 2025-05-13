const Home = () => {
    return (
        <div className="px-6 py-10 space-y-40 relative text-black">

            {/* Botón (queda por si acaso, pero puedes comentar si aún no lo usás) */}
            <button
                className="fixed top-5 right-5 z-50 px-4 py-2 bg-red-600 text-white rounded-md shadow-md"
                onClick={() => { }}
            >
                Pausar animaciones
            </button>

            {/* Sección de bienvenida */}
            <section className="h-[100vh] flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold drop-shadow-sm">Simulador de MCU</h1>
                <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                    Explora y comprende el Movimiento Circular Uniforme y Variable con ejemplos interactivos y visuales.
                </p>


            </section>

            <section className="h-[100vh] text-center">
                <div className="flex items-center justify-center gap-8 p-6 rounded-xl">
                    <div className="max-w-lg text-start">
                        <h2 className="text-3xl font-bold mb-4">¿Qué es el Movimiento Circular Uniforme?</h2>
                        <p className="text-gray-700">
                            El MCU ocurre cuando un objeto gira a velocidad constante. Su trayectoria es circular y mantiene una aceleración centrípeta constante.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, earum perspiciatis suscipit animi fuga ipsam eligendi praesentium reiciendis cupiditate tempora ea maiores quos, totam cumque obcaecati voluptatibus ex. Dolorem, esse? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat labore dicta tempore aut exercitationem et sint in ipsum esse adipisci sequi quidem, corrupti quis reprehenderit rem, rerum tenetur sit obcaecati?
                        </p>
                    </div>


                    <div>
                        <nav>
                            <ul className="">
                                <li
                                    className="px-4 py-2 bg-blue-200 text-white rounded-md hover:bg-blue-400 transition-colors mb-2"
                                >
                                    <a
                                        href="/resolve"
                                    >
                                        Resolver problemas
                                    </a>
                                </li>
                                <li
                                    className="px-4 py-2 bg-blue-200 text-white rounded-md hover:bg-blue-400 transition-colors"
                                >
                                    <a
                                        href="/team"
                                    >
                                        Conoce al equipo
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
