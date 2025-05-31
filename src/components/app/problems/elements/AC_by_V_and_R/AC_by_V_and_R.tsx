import { FormEvent, useEffect, useRef, useState } from "react";
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle, FaPause, FaPlay } from "react-icons/fa";
import { GiRadarDish } from "react-icons/gi";
import gsap from "gsap";

// PROBLEM ID: 10
const AC_by_V_and_R = () => <></>;

AC_by_V_and_R.Form = () => {
    const [ac, setAc] = useState<string>("");
    const [prevInputs, setPrevInputs] = useState<{ v: number, r: number } | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const v = parseFloat(form.get("v") as string);
        const r = parseFloat(form.get("r") as string);
        const acValue = Math.pow(v, 2) / r;

        setPrevInputs({ v, r });

        localStorage.setItem("AC_by_V_and_R__v", v.toString());
        localStorage.setItem("AC_by_V_and_R__r", r.toString());
        localStorage.setItem("AC_by_V_and_R__ac", acValue.toString());
        localStorage.setItem("resolved_problem_ID", "10");

        setAc(acValue.toExponential(3) + " m/s²");

        window.dispatchEvent(new Event("update:AC_by_V_and_R__ac"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className={`${module.Form}`}>
            <div className={`bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4 ${module.FormContainer}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Calcular aceleración centrípeta (aₙ)</h2>

                <div className={module.inputsRow}>
                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="v" className="text-sm font-medium text-gray-700 mb-1">Velocidad lineal (m/s):</label>
                        <input
                            type="number"
                            id="v"
                            name="v"
                            step="any"
                            placeholder="Ej: 29861"
                            required
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        />
                    </div>

                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="r" className="text-sm font-medium text-gray-700 mb-1">Radio (m):</label>
                        <input
                            type="number"
                            id="r"
                            name="r"
                            step="any"
                            placeholder="Ej: 1.5e11"
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
                            v = {prevInputs.v} m/s, r = {prevInputs.r} m
                        </p>
                    </div>
                )}

                {ac && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md mt-2">
                        <h3 className="text-green-700 font-bold text-lg mb-1">Resultado</h3>
                        <p className="text-sm text-gray-700">
                            Resultado  : <strong className="text-blue-600">{ac}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>
    );
};


AC_by_V_and_R.GraphNode = () => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const [lastValidAc, setLastValidAc] = useState<number | null>(null);
    const [paused, setPaused] = useState<boolean>(false);
    const tagName = "ac-v-r";

    const startAnimation = (ac: number) => {
        gsap.killTweensOf(nodeRef.current);
        if (nodeRef.current) {
            tweenRef.current = gsap.to(nodeRef.current, {
                y: "-=20",
                yoyo: true,
                repeat: -1,
                duration: Math.max(0.2, 3 / ac), // entre más ac, más rápido
                ease: "power1.inOut"
            });
        }
    };

    const updateFromStorage = () => {
        const value = localStorage.getItem("AC_by_V_and_R__ac");
        if (value) {
            const acValue = parseFloat(value);
            setLastValidAc(acValue);
            startAnimation(acValue);
            setPaused(false);
        } else {
            if (tweenRef.current) {
                tweenRef.current.pause();
            } else if (lastValidAc !== null) {
                startAnimation(lastValidAc);
                (tweenRef.current as gsap.core.Tween | null)?.pause();
            }
            setPaused(true);
        }
    };

    const toggleAnimation = () => {
        if (!tweenRef.current && lastValidAc !== null) {
            startAnimation(lastValidAc);
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

        window.addEventListener("update:AC_by_V_and_R__ac", updateFromStorage);
        window.addEventListener("problem:pauseAnimation", pauseOne);
        window.addEventListener("problem:pauseAllAnimations", pauseAll);

        return () => {
            window.removeEventListener("update:AC_by_V_and_R__ac", updateFromStorage);
            window.removeEventListener("problem:pauseAnimation", pauseOne);
            window.removeEventListener("problem:pauseAllAnimations", pauseAll);
            gsap.killTweensOf(nodeRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
            {lastValidAc !== null ? (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg shadow px-6 py-4 text-center w-fit">
                    <h3 className="text-lg font-semibold">Aceleración centrípeta detectada</h3>
                    <p className="text-xl font-bold">{lastValidAc.toExponential(2)} m/s²</p>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se han ingresado datos.</p>
            )}

            <div ref={nodeRef} className="text-[5rem] text-purple-500 transition-transform duration-500 ease-linear border-2 border-purple-300 rounded-full p-8 flex items-center justify-center">
                <GiRadarDish />
            </div>

            {lastValidAc !== null && (
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
AC_by_V_and_R.Solution = () => {
    const [ac, setAc] = useState<string | null>(null);
    const [v, setV] = useState<string | null>(null);
    const [r, setR] = useState<string | null>(null);

    useEffect(() => {
        const load = () => {
            setAc(localStorage.getItem("AC_by_V_and_R__ac"));
            setV(localStorage.getItem("AC_by_V_and_R__v"));
            setR(localStorage.getItem("AC_by_V_and_R__r"));
        };
        load();
        window.addEventListener("update:AC_by_V_and_R__ac", load);
        return () => window.removeEventListener("update:AC_by_V_and_R__ac", load);
    }, []);

    return (
        <div className={`${module.Form} bg-white border border-gray-200 shadow-md rounded-md w-full`}>
            <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" /> Solución paso a paso
                </h2>

                {ac && v && r ? (
                    <div className="space-y-6 text-gray-800">

                        {/* Explicación teórica */}
                        <section className="space-y-2">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                La <strong>aceleración centrípeta</strong> es la aceleración que mantiene un objeto en una trayectoria circular. Se calcula con la fórmula:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                a<sub>c</sub> = v² / r
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Donde:
                                <br />
                                <strong>v</strong> es la velocidad lineal (en m/s)
                                <br />
                                <strong>r</strong> es el radio de la trayectoria (en m)
                            </p>
                        </section>

                        {/* Sustitución y desarrollo */}
                        <section className="space-y-2">
                            <p className="font-medium text-gray-700">Sustituyendo los valores obtenidos:</p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                a<sub>c</sub> = {v}² / {r}
                            </div>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                a<sub>c</sub> = <strong>{ac}</strong> m/s²
                            </div>
                        </section>

                        {/* Resultado final */}
                        <section className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" /> Resultado Final:
                            </h3>
                            <p className="text-sm">
                                <strong>Aceleración centrípeta (a<sub>c</sub>):</strong> {ac} m/s²
                            </p>
                        </section>

                    </div>
                ) : (
                    <p className="italic text-gray-400">Aún no se han ingresado datos.</p>
                )}
            </div>
        </div>
    );
};

export default AC_by_V_and_R;
