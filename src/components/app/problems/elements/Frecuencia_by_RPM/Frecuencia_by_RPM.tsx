import { FormEvent, useEffect, useState } from 'react'
import module from '../problems.module.css';

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
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 w-full max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>

            {f ? (
                <div className="space-y-4 text-gray-800">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600">1. Calcular la frecuencia (f)</h3>
                        <p>La frecuencia se obtiene dividiendo el RPM entre 60:</p>
                        <p className="mt-1 italic text-sm bg-gray-100 p-2 rounded">
                            f = RPM / 60 = <strong>{f} Hz</strong>
                        </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg font-bold text-blue-700 mb-2">📘 Resultado Final:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Frecuencia (f):</strong> {f} Hz</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se ha ingresado ningún dato.</p>
            )}
        </div>
    );
};

export default Frecuencia_by_RPM;
