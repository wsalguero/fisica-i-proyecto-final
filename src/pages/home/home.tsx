import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaAtom, FaToolbox, FaUsers } from "react-icons/fa"
import module from "./home.module.css"

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    const containerRef = useRef(null)
    const flechasRef = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animar spans como flechas
            gsap.to(".flecha", {
                opacity: 0,
                y: -100,
                duration: 1,
                scrollTrigger: {
                    trigger: "#portada",
                    start: "bottom 80%",
                    end: "bottom top",
                    scrub: true,
                },
            })

            gsap.to("#titulo-proyecto", {
                y: -500,
                scale: 1.3,
                opacity: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: "#portada",
                    start: "bottom 90%",
                    end: "bottom top",
                    scrub: true,
                },
            })

        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="text-white w-full overflow-x-hidden ">
            {/* Portada */}
            <section id="portada" className="h-screen flex items-center justify-center md:px-10 px-0 overflow-hidden w-full">
                <div className="flex gap-10 w-full">

                    {/* Columna de rombos */}
                    <div className={`flex flex-col gap-4 w-1/4 justify-center items-center ${module.RombosContainer}`}>
                        {[...Array(6)].map((_, i) => (
                            <span
                                key={i}
                                ref={(el) => (flechasRef.current[i] = el)}
                                className={`flecha h-80 w-80 border-8 border-blue-500 rotate-45 ${module.FlechaGlow}`}
                            />

                        ))}
                    </div>

                    {/* Contenido principal */}
                    <div className="w-full md:w-3/4">
                        <div className={`w-full h-full ${module.PortadaContenidoContainer}`}>

                            {/* Texto + ícono */}
                            <div className="w-full md:w-1/2 h-full flex flex-col justify-center gap-4">
                                <h1
                                    className={`text-5xl font-extrabold drop-shadow-md ${module.TituloPortada} text-center mb-4`}
                                    id="titulo-proyecto"
                                >
                                    PROYECTO FINAL
                                </h1>

                                <div className="flex items-center justify-center gap-4">

                                    <p className="text-xl text-blue-800 leading-relaxed">
                                        Equipo #4 <br />
                                        <span className="text-purple-400 font-light">Ingeniería en Sistemas</span>
                                    </p>

                                    <FaAtom className={`text-[5rem] text-violet-500 animate-spin-slow ${module.IconoTituloProyecto}`} />
                                </div>
                            </div>

                            <ul className="flex md:flex-col gap-2 w-full md:w-auto justify-center px-5 mt-10 md:mt-0">
                                <li className={`m-2 ${module.BotonesPortadaLi}`}>
                                    <a href="/resolve" className={module.BotonesPortada}>
                                        Simulador
                                        <FaToolbox className="inline ml-2" />
                                    </a>
                                </li>
                                <li className={`m-2 ${module.BotonesPortadaLi}`}>
                                    <a href="/team" className={module.BotonesPortada}>
                                        Equipo
                                        <FaUsers className="inline ml-2" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home
