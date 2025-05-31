import { FormEvent, useEffect, useState } from 'react';
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import module from '../problems.module.css';

// PROBLEM ID: 5
const WA_by_VR = () => <></>;

WA_by_VR.Form = () => {
    const [w, setW] = useState<string>("");
    const [prevInputs, setPrevInputs] = useState<{ v: number, r: number } | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const v = parseFloat(form.get("v") as string);
        const r = parseFloat(form.get("r") as string);
        setPrevInputs({ v, r });

        const omega = v / r;

        localStorage.setItem("WA_by_VR__w", omega.toString());
        localStorage.setItem("WA_by_VR__v", v.toString());
        localStorage.setItem("WA_by_VR__r", r.toString());
        localStorage.setItem("resolved_problem_ID", "5");

        setW(omega.toFixed(2) + " rad/s");

        window.dispatchEvent(new Event("update:WA_by_VR__w"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className={`${module.Form}`}>
            <div className={`bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4 ${module.FormContainer}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Calcular Velocidad Angular (ω)</h2>

                <div className={module.inputsRow}>
                    <div className={`${module.inputGroup} flex flex-col`}>
                        <label htmlFor="v" className="text-sm font-medium text-gray-700 mb-1">Velocidad Lineal (m/s):</label>
                        <input
                            type="number"
                            id="v"
                            name="v"
                            step="any"
                            placeholder="Ej: 2.21"
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
                            placeholder="Ej: 0.5"
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
                            <strong>v:</strong> {prevInputs.v} m/s &nbsp;&nbsp;
                            <strong>r:</strong> {prevInputs.r} m
                        </p>
                    </div>
                )}

                {w && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md mt-2">
                        <h3 className="text-green-700 font-bold text-lg mb-1">Resultado</h3>
                        <p className="text-sm text-gray-700">
                            Resultado preliminar: <strong className="text-blue-600">{w}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>

    );
};

WA_by_VR.GraphNode = () => {
    return <div><h3>Graph Node for ω = v / r</h3></div>;
};


WA_by_VR.Solution = () => {
    const [w, setW] = useState<string | null>(null);
    const [r, setR] = useState<string | null>(null);
    const [v, setV] = useState<string | null>(null);

    useEffect(() => {
        const fetchValues = () => {
            setW(localStorage.getItem("WA_by_VR__w"));
            setV(localStorage.getItem("WA_by_VR__v"));
            setR(localStorage.getItem("WA_by_VR__r"));
        };

        fetchValues();
        window.addEventListener("update:WA_by_VR__w", fetchValues);
        return () => window.removeEventListener("update:WA_by_VR__w", fetchValues);
    }, []);

    return (
        <div className={`${module.Form} bg-white border border-gray-200 shadow-md rounded-md w-full`}>
            <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" /> Solución paso a paso
                </h2>

                {w && r && v ? (
                    <div className="space-y-6 text-gray-800">

                        {/* Paso 1 */}
                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">1. Aplicar fórmula</h3>
                            <p className="text-sm text-gray-600">
                                Usamos la relación entre velocidad lineal y velocidad angular:
                            </p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                ω = v / r
                            </div>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit italic">
                                ω = {v} / {r} = <strong>{parseFloat(w).toFixed(2)} rad/s</strong>
                            </div>
                        </section>

                        {/* Resultado final */}
                        <section className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" /> Resultado Final:
                            </h3>
                            <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Velocidad Angular (ω):</strong> {parseFloat(w).toFixed(2)} rad/s</li>
                                <li><strong>Velocidad Lineal:</strong> {v} m/s</li>
                                <li><strong>Radio:</strong> {r} m</li>
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


export default WA_by_VR;
