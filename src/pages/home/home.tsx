import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaAtom, FaToolbox, FaUsers } from "react-icons/fa"
import module from "./home.module.css"
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis()
function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    const containerRef = useRef(null)
    const flechasRef = useRef<(HTMLSpanElement | null)[]>([])
    const arrowsGridRef = useRef<HTMLDivElement | null>(null)
    // const titleGrowRef = useRef<HTMLHeadingElement | null>(null)

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

            // Flechas grid animación
            gsap.fromTo(
                ".arrow-div",
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#que-es",
                        start: "top 80%",
                    },
                }
            )

            gsap.to("#title-expand", {
                scale: 1.4,
                scrollTrigger: {
                    trigger: "#que-es",
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                },
            })

            gsap.utils.toArray<HTMLElement>(".popup-img").forEach((el) => {
                gsap.fromTo(
                    el,
                    { scale: 0.6, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        },
                    }
                )
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

            {/* Segunda sección - ¿Qué es el MCU? */}
            <section id="que-es" className="min-h-screen py-20 px-6 md:px-12 bg-[#0b0e2a] flex flex-col md:flex-row gap-10 items-center justify-between">
                <div ref={arrowsGridRef} className={`grid grid-cols-6 gap-6 w-full md:w-1/2 ${module.ArrowsGrid}`}>
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className={`arrow-div w-6 h-6 border-r-4 border-b-4 rotate-45 border-blue-400 ${module.ArrowDiv}`}
                        ></div>
                    ))}
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2
                        id="title-expand"
                        className="text-4xl md:text-5xl font-extrabold text-purple-100 mb-6"
                    >
                        ¿QUÉ ES EL MCU?
                    </h2>
                    <p className={`"text-lg text-purple-200 leading-relaxed ${module.TextoQueEs}`}>
                        El Movimiento Circular Uniforme es un tipo de movimiento en el que un objeto se desplaza a lo largo de una trayectoria circular con velocidad constante. Aunque la magnitud de la velocidad se mantiene, su dirección cambia constantemente, generando una aceleración centrípeta.
                    </p>
                </div>
            </section>

            {/* Segunda sección - descubrimiento */}
            <section id="descubrimiento" className="flex flex-col items-center h-screen px-10 py-20">
                <h2 className={`text-5xl font-extrabold text-center mb-16 text-purple-100 drop-shadow-md ${module.TituloPortada} `}>
                    ¿CÓMO SE DESCUBRIÓ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {[
                        {
                            nombre: "Aristóteles",
                            desc: "Planteó las primeras ideas de movimiento.",
                            img: "https://cdn-icons-png.flaticon.com/128/7187/7187988.png",
                        },
                        {
                            nombre: "Galileo",
                            desc: "Propuso ideas sobre aceleración y velocidad.",
                            img: "https://cdn-icons-png.flaticon.com/128/9937/9937359.png",
                        },
                        {
                            nombre: "Kepler y Newton",
                            desc: "Describieron el movimiento de los planetas y la ley de gravitación universal.",
                            img: "https://cdn-icons-png.flaticon.com/128/5010/5010061.png",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="popup-img bg-[#0b0e2a] border border-purple-600 p-6 rounded-xl shadow-lg transition-all"
                        >
                            <img
                                src={item.img}
                                alt={item.nombre}
                                className="w-24 h-24 mx-auto mb-4 animate-bounce bg-white rounded-full"
                            />
                            <h3 className="text-xl font-semibold text-purple-200 mb-2 text-purple-100">
                                {item.nombre}
                            </h3>
                            <p className="text-purple-300 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="presentacion" className="min-h-screen flex items-center justify-center bg-[#0b0e2a] px-4 py-20">
                <a
                    href="https://www.canva.com/design/DAGo3ksVU64/w79UnpzKMMW-5SDaJmiYcQ/view?utm_content=DAGo3ksVU64&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hded397866f" // <-- Reemplazá por tu link real
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all text-lg"
                >
                    Presentación Tecnica
                </a>
            </section>


        </div>
    )
}

export default Home
