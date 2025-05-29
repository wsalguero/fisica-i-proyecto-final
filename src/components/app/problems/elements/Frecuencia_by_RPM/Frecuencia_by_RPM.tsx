import { FormEvent, useEffect, useState } from 'react'

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
        <form key={formKey} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-md rounded-md w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-blue-600">Calcular Frecuencia (f)</h2>

            <div className="flex flex-col">
                <label htmlFor="rpm" className="text-sm font-medium text-gray-700 mb-1">RPM:</label>
                <input type="number" id="rpm" name="rpm" placeholder="Ej: 120" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Calcular</button>

            {prevRPM !== null && (
                <p className="text-sm text-gray-500 mt-2">Último valor ingresado: <strong>{prevRPM} rpm</strong></p>
            )}

            {frecuencia && (
                <p className="text-sm text-gray-500 mt-1">Resultado preliminar: <strong className="text-blue-600">{frecuencia}</strong></p>
            )}
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
