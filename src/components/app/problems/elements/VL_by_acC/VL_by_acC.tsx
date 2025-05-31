import { FormEvent, useEffect, useRef, useState } from 'react';
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle, FaPause, FaPlay } from 'react-icons/fa';
import { GiSpeedometer } from 'react-icons/gi';
import gsap from "gsap";

// PROBLEM ID: 4
const VL_by_acC = () => <></>;

VL_by_acC.Form = () => {
    const [vL, setVL] = useState<string>("");
    const [prevInputs, setPrevInputs] = useState<{ ac: number, radio: number } | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const ac = parseFloat(form.get("ac") as string);
        const radio = parseFloat(form.get("radio") as string);
        setPrevInputs({ ac, radio });

        const velocidadLineal = Math.sqrt(ac * radio);

        localStorage.setItem("VL_by_acC__v", velocidadLineal.toString());
        localStorage.setItem("VL_by_acC__r", radio.toString());
        localStorage.setItem("VL_by_acC__ac", ac.toString());
        localStorage.setItem("resolved_problem_ID", "4");

        setVL(velocidadLineal.toFixed(2) + " m/s");

        window.dispatchEvent(new Event("update:VL_by_acC__v"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className={`${module.Form}`}>
            <div className={`bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4 ${module.FormContainer}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Velocidad Lineal para una a<sub>c</sub> dada</h2>

                <div className={module.inputsRow}>
                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="radio" className="text-sm font-medium text-gray-700 mb-1">Radio (m):</label>
                        <input
                            type="number"
                            id="radio"
                            name="radio"
                            step="any"
                            placeholder="Ej: 0.5"
                            required
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        />
                    </div>

                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="ac" className="text-sm font-medium text-gray-700 mb-1">Aceleración centrípeta (m/s²):</label>
                        <input
                            type="number"
                            id="ac"
                            name="ac"
                            step="any"
                            placeholder="Ej: 9.8"
                            required
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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
                {prevInputs && (
                    <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md">
                        <h3 className="text-blue-700 font-bold text-lg mb-1">Datos ingresados</h3>
                        <p className="text-sm text-gray-700">
                            <strong>Radio:</strong> {prevInputs.radio} m &nbsp;&nbsp;
                            <strong>a<sub>c</sub>:</strong> {prevInputs.ac} m/s²
                        </p>
                    </div>
                )}

                {vL && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md mt-2">
                        <h3 className="text-green-700 font-bold text-lg mb-1">Resultado</h3>
                        <p className="text-sm text-gray-700">
                            Resultado  : <strong className="text-blue-600">{vL}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>

    );
};

VL_by_acC.GraphNode = () => {
    const wheelRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const [lastValidV, setLastValidV] = useState<number | null>(null);
    const [paused, setPaused] = useState<boolean>(false);
    const tagName = "vl-by-ac-c";

    const startAnimation = (v: number) => {
        gsap.killTweensOf(wheelRef.current);
        if (wheelRef.current) {
            tweenRef.current = gsap.to(wheelRef.current, {
                rotate: "+=360",
                duration: Math.max(0.5, Math.min(30, 60 / v)),
                ease: "linear",
                repeat: -1,
            });
        }
    };

    const updateFromStorage = () => {
        const value = localStorage.getItem("VL_by_acC__v");
        if (value) {
            const velocidad = parseFloat(value);
            setLastValidV(velocidad);
            startAnimation(velocidad);
            setPaused(false);
        } else {
            if (tweenRef.current) {
                tweenRef.current.pause();
            } else if (lastValidV !== null) {
                startAnimation(lastValidV);
                (tweenRef.current as gsap.core.Tween | null)?.pause();
            }
            setPaused(true);
        }
    };

    const toggleAnimation = () => {
        if (!tweenRef.current && lastValidV !== null) {
            startAnimation(lastValidV);
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

        window.addEventListener("update:VL_by_acC__v", updateFromStorage);
        window.addEventListener("problem:pauseAnimation", pauseOne);
        window.addEventListener("problem:pauseAllAnimations", pauseAll);

        return () => {
            window.removeEventListener("update:VL_by_acC__v", updateFromStorage);
            window.removeEventListener("problem:pauseAnimation", pauseOne);
            window.removeEventListener("problem:pauseAllAnimations", pauseAll);
            gsap.killTweensOf(wheelRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
            {lastValidV !== null ? (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg shadow px-6 py-4 text-center w-fit">
                    <h3 className="text-lg font-semibold">Velocidad detectada</h3>
                    <p className="text-xl font-bold">{lastValidV.toFixed(2)} m/s</p>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se han ingresado datos.</p>
            )}

            <div ref={wheelRef} className="text-[6rem] text-purple-500 transition-transform duration-500 ease-linear border-2 border-purple-300 rounded-full p-8 flex items-center justify-center">
                <GiSpeedometer />
            </div>

            {lastValidV !== null && (
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

VL_by_acC.Solution = () => {
    const [v, setV] = useState<string | null>(null);
    const [r, setR] = useState<string | null>(null);
    const [ac, setAc] = useState<string | null>(null);

    useEffect(() => {
        const fetchValues = () => {
            setV(localStorage.getItem("VL_by_acC__v"));
            setR(localStorage.getItem("VL_by_acC__r"));
            setAc(localStorage.getItem("VL_by_acC__ac"));
        };

        fetchValues();
        window.addEventListener("update:VL_by_acC__v", fetchValues);
        return () => window.removeEventListener("update:VL_by_acC__v", fetchValues);
    }, []);

    return (
        <div className={`${module.Form} bg-white border border-gray-200 shadow-md rounded-md w-full`}>
            <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" /> Solución paso a paso
                </h2>

                {v && r && ac ? (
                    <div className="space-y-6 text-gray-800">

                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">1. Fórmula de aceleración centrípeta</h3>
                            <p className="text-sm text-gray-600">
                                Partimos de la ecuación:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                a<sub>c</sub> = v² / r → v = √(a<sub>c</sub> × r)
                            </div>
                        </section>

                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">2. Sustituimos y resolvemos</h3>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                v = √({ac} × {r}) = <strong>{v} m/s</strong>
                            </div>
                        </section>

                        <section className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" /> Resultado Final:
                            </h3>
                            <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Velocidad lineal (v):</strong> {v} m/s</li>
                                <li><strong>Radio (r):</strong> {r} m</li>
                                <li><strong>Aceleración centrípeta (a<sub>c</sub>):</strong> {ac} m/s²</li>
                            </ul>
                        </section>

                    </div>
                ) : (
                    <p className="italic text-gray-400">Aún no se ha ingresado ningún dato.</p>
                )}
            </div>
        </div>
    );
};

export default VL_by_acC;
