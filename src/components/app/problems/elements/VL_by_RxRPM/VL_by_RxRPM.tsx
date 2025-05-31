import { FormEvent, useEffect, useState } from 'react';
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa';

// PROBLEM ID: 3
const VL_by_RxRPM = () => <></>;

VL_by_RxRPM.Form = () => {
    const [vL, setVL] = useState<string>("");
    const [prevInputs, setPrevInputs] = useState<{ rpm: number, radio: number } | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const rpm = parseFloat(form.get("rpm") as string);
        const radio = parseFloat(form.get("radio") as string);
        setPrevInputs({ rpm, radio });

        const frecuencia = rpm / 60;
        const omega = 2 * Math.PI * frecuencia;
        const velocidadLineal = omega * radio;

        localStorage.setItem("VL_by_RxRPM__v", velocidadLineal.toString());
        localStorage.setItem("VL_by_RxRPM__r", radio.toString());
        localStorage.setItem("VL_by_RxRPM__w", omega.toString());
        localStorage.setItem("resolved_problem_ID", "3");

        setVL(velocidadLineal.toFixed(2) + " m/s");

        window.dispatchEvent(new Event("update:VL_by_RxRPM__v"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} className={`${module.Form}`} onSubmit={handleSubmit}>
            <div className={`bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4 ${module.FormContainer}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Calcular Velocidad Lineal (v)</h2>

                <div className={`${module.inputsRow}`}>
                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="radio" className="text-sm font-medium text-gray-700 mb-1">Radio (m):</label>
                        <input
                            type="number"
                            id="radio"
                            name="radio"
                            step="any"
                            placeholder="Ej: 0.5"
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            required
                        />
                    </div>
                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="rpm" className="text-sm font-medium text-gray-700 mb-1">RPM:</label>
                        <input
                            type="number"
                            id="rpm"
                            name="rpm"
                            placeholder="Ej: 180"
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
                {prevInputs && (
                    <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md">
                        <h3 className="text-blue-700 font-bold text-lg mb-1">Datos ingresados</h3>
                        <p className="text-sm text-gray-700">
                            <strong>Radio:</strong> {prevInputs.radio} m &nbsp;&nbsp;
                            <strong>RPM:</strong> {prevInputs.rpm}
                        </p>
                    </div>
                )}

                {vL && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md mt-2">
                        <h3 className="text-green-700 font-bold text-lg mb-1">Resultado</h3>
                        <p className="text-sm text-gray-700">
                            Resultado preliminar: <strong className="text-blue-600">{vL}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>

    );
};

VL_by_RxRPM.GraphNode = () => {
    return (
        <div>
            <h3>Graph Node for VL by RxRPM</h3>
        </div>
    );
};

VL_by_RxRPM.Solution = () => {
    const [v, setV] = useState<string | null>(null);
    const [r, setR] = useState<string | null>(null);
    const [w, setW] = useState<string | null>(null);

    useEffect(() => {
        const fetchValues = () => {
            setV(localStorage.getItem("VL_by_RxRPM__v"));
            setR(localStorage.getItem("VL_by_RxRPM__r"));
            setW(localStorage.getItem("VL_by_RxRPM__w"));
        };

        fetchValues();
        window.addEventListener("update:VL_by_RxRPM__v", fetchValues);
        return () => window.removeEventListener("update:VL_by_RxRPM__v", fetchValues);
    }, []);

    return (
        <div className={`${module.Form} bg-white border border-gray-200 shadow-md rounded-md w-full`}>
            <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" /> Solución paso a paso
                </h2>

                {v && r && w ? (
                    <div className="space-y-6 text-gray-800">

                        {/* Paso 1 */}
                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">1. Calcular ω (velocidad angular)</h3>
                            <p className="text-sm text-gray-600">
                                La fórmula es:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                ω = 2π × f = <strong>{parseFloat(w).toFixed(2)} rad/s</strong>
                            </div>
                        </section>

                        {/* Paso 2 */}
                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">2. Calcular v (velocidad lineal)</h3>
                            <p className="text-sm text-gray-600">
                                Usamos la fórmula v = ω × r:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                v = {parseFloat(w).toFixed(2)} × {r} = <strong>{v} m/s</strong>
                            </div>
                        </section>

                        {/* Resultado final */}
                        <section className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" /> Resultado Final:
                            </h3>
                            <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Velocidad lineal (v):</strong> {v} m/s</li>
                                <li><strong>Radio:</strong> {r} m</li>
                                <li><strong>Velocidad angular (ω):</strong> {parseFloat(w).toFixed(2)} rad/s</li>
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

export default VL_by_RxRPM;
