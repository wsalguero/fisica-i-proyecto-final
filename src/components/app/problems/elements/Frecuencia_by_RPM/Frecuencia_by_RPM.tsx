import { FormEvent, useEffect, useRef, useState } from 'react'
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle, FaPause, FaPlay } from 'react-icons/fa';
import { BsSoundwave } from 'react-icons/bs';
import gsap from "gsap";

// PROBLEM ID: 2
const Frecuencia_by_RPM = () => {
    return <></>
}

Frecuencia_by_RPM.Form = () => {
    const [frecuencia, setFrecuencia] = useState<string>("");
    const [prevRPM, setPrevRPM] = useState<number | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const rpm = parseFloat(form.get("rpm") as string);
        setPrevRPM(rpm);

        const f = rpm / 60;

        localStorage.setItem("Frecuencia_by_RPM__f", f.toString());
        localStorage.setItem("resolved_problem_ID", "2");

        setFrecuencia(f.toFixed(2) + " Hz");

        window.dispatchEvent(new Event("update:Frecuencia_by_RPM__f"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} className={`${module.Form}`} onSubmit={handleSubmit}>
            <div className={`bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4 ${module.FormContainer}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Calcular Frecuencia (f)</h2>

                <div className={`${module.inputsRow}`}>
                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="rpm" className="text-sm font-medium text-gray-700 mb-1">RPM:</label>
                        <input
                            type="number"
                            id="rpm"
                            name="rpm"
                            placeholder="Ej: 120"
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            required
                        />
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <button type="submit" className="mt-6 bg-[#2563eb] hover:bg-[#1e40af] transition-colors text-white font-semibold px-6 py-2 rounded-md shadow">
                        Calcular
                    </button>
                </div>
            </div>

            <div className={`${module.ResultsContainer}`}>
                {prevRPM !== null && (
                    <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md">
                        <h3 className="flex items-center gap-2 text-blue-700 font-bold text-lg">
                            Datos ingresados
                        </h3>
                        <p className="mt-2 text-sm text-gray-700">
                            RPM: <strong>{prevRPM}</strong>
                        </p>
                    </div>
                )}

                {frecuencia && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md">
                        <h3 className="flex items-center gap-2 text-green-700 font-bold text-lg">
                            Resultado
                        </h3>
                        <p className="text-sm text-gray-700 mt-2">
                            Resultado: <strong className="text-blue-600">{frecuencia}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>
    );
};

Frecuencia_by_RPM.GraphNode = () => {
    const waveRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const [lastValidF, setLastValidF] = useState<number | null>(null);
    const [paused, setPaused] = useState<boolean>(false);

    const tagName = "frecuencia-by-rpm";

    const startAnimation = (f: number) => {
        gsap.killTweensOf(waveRef.current);
        if (waveRef.current) {
            tweenRef.current = gsap.to(waveRef.current, {
                y: "-=20",
                duration: Math.max(0.2, Math.min(3, 1 / f)),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });
        }
    };

    const updateFromStorage = () => {
        const value = localStorage.getItem("Frecuencia_by_RPM__f");
        if (value) {
            const f = parseFloat(value);
            setLastValidF(f);
            startAnimation(f);
            setPaused(false);
        } else {
            if (tweenRef.current) {
                tweenRef.current.pause();
            } else if (lastValidF !== null) {
                startAnimation(lastValidF);
                (tweenRef.current as gsap.core.Tween | null)?.pause();
            }
            setPaused(true);
        }
    };

    const toggleAnimation = () => {
        if (!tweenRef.current && lastValidF !== null) {
            startAnimation(lastValidF);
            setPaused(false);
            return;
        }

        if (tweenRef.current) {
            const isPaused = tweenRef.current.paused();
            tweenRef.current.paused(!isPaused);
            setPaused(!paused);
        }
    };

    useEffect(() => {
        updateFromStorage();

        const pauseOne = (e: Event) => {
            const event = e as CustomEvent<{ tag: string }>;
            if (event.detail?.tag === tagName) {
                tweenRef.current?.pause();
                setPaused(true);
            }
        };

        const pauseAll = () => {
            tweenRef.current?.pause();
            setPaused(true);
        };

        window.addEventListener("update:Frecuencia_by_RPM__f", updateFromStorage);
        window.addEventListener("problem:pauseAnimation", pauseOne);
        window.addEventListener("problem:pauseAllAnimations", pauseAll);

        return () => {
            window.removeEventListener("update:Frecuencia_by_RPM__f", updateFromStorage);
            window.removeEventListener("problem:pauseAnimation", pauseOne);
            window.removeEventListener("problem:pauseAllAnimations", pauseAll);
            gsap.killTweensOf(waveRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
            {lastValidF !== null ? (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg shadow px-6 py-4 text-center w-fit">
                    <h3 className="text-lg font-semibold">Frecuencia detectada</h3>
                    <p className="text-xl font-bold">{lastValidF.toFixed(2)} Hz</p>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se han ingresado datos.</p>
            )}

            <div ref={waveRef} className="text-[6rem] text-purple-500 transition-transform duration-500 ease-linear border-2 border-purple-300 rounded-full p-8 flex items-center justify-center">
                <BsSoundwave />
            </div>

            {lastValidF !== null && (
                <button
                    onClick={toggleAnimation}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md border shadow-sm text-white transition 
                    ${paused ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}`}
                >
                    {paused ? <FaPlay /> : <FaPause />}
                    {paused ? "Reanudar" : "Pausar"}
                </button>
            )}
        </div>
    );
};

Frecuencia_by_RPM.Solution = () => {
    const [f, setF] = useState<string | null>(null);

    useEffect(() => {
        const fetchValue = () => {
            const stored = localStorage.getItem("Frecuencia_by_RPM__f");
            setF(stored);
        };

        fetchValue();

        window.addEventListener("update:Frecuencia_by_RPM__f", fetchValue);
        return () => {
            window.removeEventListener("update:Frecuencia_by_RPM__f", fetchValue);
        };
    }, []);

    return (
        <div className={`${module.Form} bg-white border border-gray-200 shadow-md rounded-md w-full`}>
            <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" /> Solución paso a paso
                </h2>

                {f ? (
                    <div className="space-y-6 text-gray-800">

                        {/* Paso único */}
                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">1. Calcular la frecuencia (<em>f</em>)</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                La frecuencia indica cuántas vueltas por segundo da un objeto en movimiento circular. Se calcula a partir de las revoluciones por minuto (RPM) usando la fórmula:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                f = RPM / 60
                            </div>
                            <p className="text-sm text-gray-700 mt-1">
                                Resultado:
                                <br />
                                <span className="bg-gray-100 p-2 rounded inline-block mt-1">
                                    <strong>{f} Hz</strong>
                                </span>
                            </p>
                        </section>

                        {/* Resultado final */}
                        <section className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" /> Resultado Final:
                            </h3>
                            <p className="text-sm">
                                <strong>Frecuencia (f):</strong> {f} Hz
                            </p>
                        </section>
                    </div>
                ) : (
                    <p className="text-gray-400 italic">Aún no se ha ingresado ningún dato.</p>
                )}
            </div>
        </div>
    );
};

export default Frecuencia_by_RPM;
