import { FormEvent, useEffect, useState } from "react";
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";

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
                            Resultado preliminar: <strong className="text-blue-600">{ac}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>
    );
};

AC_by_V_and_R.GraphNode = () => <div><h3>Graph Node para a<sub>c</sub> = v² / r</h3></div>;

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
