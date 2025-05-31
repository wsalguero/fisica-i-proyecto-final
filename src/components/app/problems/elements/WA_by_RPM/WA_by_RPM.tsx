import { FormEvent, useEffect, useRef, useState } from "react";
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle, FaPause, FaPlay } from "react-icons/fa";
import { BsSpeedometer2 } from "react-icons/bs";
import gsap from "gsap";

// PROBLEM ID: 6
const WA_by_RPM = () => <></>;

WA_by_RPM.Form = () => {
    const [omega, setOmega] = useState<string>("");
    const [prevRPM, setPrevRPM] = useState<number | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const rpm = parseFloat(form.get("rpm") as string);
        setPrevRPM(rpm);

        const w = (2 * Math.PI * rpm) / 60;

        localStorage.setItem("WA_by_RPM__w", w.toString());
        localStorage.setItem("WA_by_RPM__rpm", rpm.toString());
        localStorage.setItem("resolved_problem_ID", "6");

        setOmega(w.toFixed(2) + " rad/s");

        window.dispatchEvent(new Event("update:WA_by_RPM__w"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className={`${module.Form}`}>
            <div className={`bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4 ${module.FormContainer}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Calcular Velocidad Angular (ω)</h2>

                <div className={module.inputsRow}>
                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="rpm" className="text-sm font-medium text-gray-700 mb-1">RPM:</label>
                        <input
                            type="number"
                            id="rpm"
                            name="rpm"
                            step="any"
                            placeholder="Ej: 120"
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
                {prevRPM !== null && (
                    <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md">
                        <h3 className="text-blue-700 font-bold text-lg mb-1">Dato ingresado</h3>
                        <p className="text-sm text-gray-700">
                            <strong>RPM:</strong> {prevRPM}
                        </p>
                    </div>
                )}

                {omega && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md mt-2">
                        <h3 className="text-green-700 font-bold text-lg mb-1">Resultado</h3>
                        <p className="text-sm text-gray-700">
                            Resultado  : <strong className="text-blue-600">{omega}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>

    );
};

WA_by_RPM.GraphNode = () => {
    const wheelRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const [lastValidOmega, setLastValidOmega] = useState<number | null>(null);
    const [paused, setPaused] = useState<boolean>(false);
    const tagName = "wa-by-rpm";

    const startAnimation = (omega: number) => {
        gsap.killTweensOf(wheelRef.current);
        if (wheelRef.current) {
            tweenRef.current = gsap.to(wheelRef.current, {
                rotate: "+=360",
                duration: Math.max(0.5, Math.min(30, 60 / omega)),
                ease: "linear",
                repeat: -1,
            });
        }
    };

    const updateFromStorage = () => {
        const value = localStorage.getItem("WA_by_RPM__w");
        if (value) {
            const omega = parseFloat(value);
            setLastValidOmega(omega);
            startAnimation(omega);
            setPaused(false);
        } else {
            if (tweenRef.current) {
                tweenRef.current.pause();
            } else if (lastValidOmega !== null) {
                startAnimation(lastValidOmega);
                (tweenRef.current as gsap.core.Tween | null)?.pause();
            }
            setPaused(true);
        }
    };

    const toggleAnimation = () => {
        if (!tweenRef.current && lastValidOmega !== null) {
            startAnimation(lastValidOmega);
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

        window.addEventListener("update:WA_by_RPM__w", updateFromStorage);
        window.addEventListener("problem:pauseAnimation", pauseOne);
        window.addEventListener("problem:pauseAllAnimations", pauseAll);

        return () => {
            window.removeEventListener("update:WA_by_RPM__w", updateFromStorage);
            window.removeEventListener("problem:pauseAnimation", pauseOne);
            window.removeEventListener("problem:pauseAllAnimations", pauseAll);
            gsap.killTweensOf(wheelRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-6">
            {lastValidOmega !== null ? (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg shadow px-6 py-4 text-center w-fit">
                    <h3 className="text-lg font-semibold">Velocidad angular detectada</h3>
                    <p className="text-xl font-bold">{lastValidOmega.toFixed(2)} rad/s</p>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se han ingresado datos.</p>
            )}

            <div ref={wheelRef} className="text-[6rem] text-purple-500 transition-transform duration-500 ease-linear border-2 border-purple-300 rounded-full p-8 flex items-center justify-center">
                <BsSpeedometer2 />
            </div>

            {lastValidOmega !== null && (
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

WA_by_RPM.Solution = () => {
    const [w, setW] = useState<string | null>(null);
    const [rpm, setRPM] = useState<string | null>(null);

    useEffect(() => {
        const load = () => {
            setW(localStorage.getItem("WA_by_RPM__w"));
            setRPM(localStorage.getItem("WA_by_RPM__rpm"));
        };
        load();
        window.addEventListener("update:WA_by_RPM__w", load);
        return () => window.removeEventListener("update:WA_by_RPM__w", load);
    }, []);

    return (
        <div className={`${module.Form} bg-white border border-gray-200 shadow-md rounded-md w-full`}>
            <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" /> Solución paso a paso
                </h2>

                {w && rpm ? (
                    <div className="space-y-6 text-gray-800">

                        <section className="space-y-2">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Para obtener la <strong>velocidad angular (ω)</strong> a partir de RPM, primero convertimos a frecuencia:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                ω = 2π × f = 2π × ({rpm} / 60)
                            </div>
                            <p className="text-sm text-gray-700">
                                Resultado:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                ω = <strong>{w} rad/s</strong>
                            </div>
                        </section>

                        <section className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" /> Resultado Final:
                            </h3>
                            <p className="text-sm">
                                <strong>Velocidad angular (ω):</strong> {w} rad/s
                            </p>
                        </section>

                    </div>
                ) : (
                    <p className="italic text-gray-400">Aún no se ingresaron datos.</p>
                )}
            </div>
        </div>
    );
};


export default WA_by_RPM;
