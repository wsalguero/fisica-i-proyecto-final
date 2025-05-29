const Home = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Bienvenido al simulador de Movimiento Circular Uniforme</h1>
            <p className="text-center mt-4 text-gray-600">
                Esta aplicación te permite resolver problemas relacionados con el movimiento circular uniforme, como calcular la velocidad angular, lineal y más.
            </p>
            <div className="mt-8 flex justify-center">
                <a href="/resolve" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Comenzar a Resolver
                </a>
            </div>

            <div>
                <div>
                    <h1>Pero... Que es el MCU?</h1>
                </div>

                <div>
                    <p>
                        El Movimiento Circular Uniforme (MCU) es un tipo de movimiento en el que un objeto se desplaza a lo largo de una trayectoria circular con una velocidad constante. En este tipo de movimiento, la magnitud de la velocidad no cambia, pero la dirección del vector velocidad sí lo hace continuamente, ya que el objeto está en una trayectoria curva.
                    </p>
                </div>
            </div>

            <div>
                <div><h1>Como se descubrio el MCU?</h1></div>

                <div>
                    <p>
                        El concepto de Movimiento Circular Uniforme ha sido estudiado desde la antigüedad, pero uno de los primeros en formalizarlo fue el filósofo griego Aristóteles. Sin embargo, fue con el trabajo de científicos como Galileo Galilei y Johannes Kepler en los siglos XVI y XVII que se comenzaron a entender mejor las leyes del movimiento y la gravedad, sentando las bases para la física clásica.
                    </p>
                </div>
            </div>

            <div>
                <div><h1>¿Para qué sirve el MCU?</h1></div>

                <div>
                    <p>
                        El estudio del Movimiento Circular Uniforme es fundamental en la física y la ingeniería, ya que muchos sistemas físicos, como los satélites, ruedas y engranajes, operan bajo este principio. Comprender el MCU permite predecir el comportamiento de estos sistemas y diseñar mecanismos eficientes.
                    </p>
                </div>
            </div>

            <div>
                <div><h1>Lo vemos en nuestra vida cotidiana</h1></div>
                <div>
                    <p>
                        El Movimiento Circular Uniforme se observa en muchos aspectos de nuestra vida diaria, como en el movimiento de las ruedas de un automóvil, el giro de un carrusel o el movimiento de los planetas alrededor del sol. Estos ejemplos ilustran cómo el MCU es una parte integral de nuestro entorno y cómo las leyes del movimiento circular se aplican en diversas situaciones.
                    </p>
                </div>
            </div>

            <div>
                <div>
                    <h1>Objetivo del proyecto</h1>
                </div>
                <div>
                    <p>
                        El objetivo de este proyecto es proporcionar una herramienta interactiva para resolver problemas relacionados con el Movimiento Circular Uniforme. A través de esta aplicación, los usuarios podrán calcular la velocidad angular, lineal, el radio y otros parámetros del MCU, facilitando el aprendizaje y la comprensión de este concepto fundamental en la física.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Home;
