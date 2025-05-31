import { FormEvent, useEffect, useState } from 'react'
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa';

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
    return (
        <div>
            <h3>Graph Node for Frecuencia by RPM</h3>
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
