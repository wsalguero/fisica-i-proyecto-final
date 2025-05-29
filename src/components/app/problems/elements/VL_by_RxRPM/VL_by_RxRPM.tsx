import { FormEvent, useEffect, useState } from 'react';

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
        <form key={formKey} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-md rounded-md w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-blue-600">Calcular Velocidad Lineal (v)</h2>

            <div className="flex flex-col">
                <label htmlFor="radio" className="text-sm font-medium text-gray-700 mb-1">Radio (m):</label>
                <input type="number" id="radio" name="radio" step="any" placeholder="Ej: 0.5" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="rpm" className="text-sm font-medium text-gray-700 mb-1">RPM:</label>
                <input type="number" id="rpm" name="rpm" placeholder="Ej: 180" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Calcular</button>

            {prevInputs && (
                <div className="text-sm text-gray-500 mt-2">
                    Últimos valores ingresados: <br />
                    <strong>Radio:</strong> {prevInputs.radio} m &nbsp;&nbsp;
                    <strong>RPM:</strong> {prevInputs.rpm}
                </div>
            )}

            {vL && (
                <p className="text-sm text-gray-500 mt-1">
                    Resultado preliminar: <strong className="text-blue-600">{vL}</strong>
                </p>
            )}
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
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 w-full max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>

            {v && r && w ? (
                <div className="space-y-4 text-gray-800">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600">1. Calcular ω (velocidad angular)</h3>
                        <p className="italic text-sm bg-gray-100 p-2 rounded">
                            ω = 2π × f = <strong>{parseFloat(w).toFixed(2)} rad/s</strong>
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-blue-600">2. Aplicar fórmula v = ω × r</h3>
                        <p className="italic text-sm bg-gray-100 p-2 rounded">
                            v = {parseFloat(w).toFixed(2)} × {r} = <strong>{v} m/s</strong>
                        </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg font-bold text-blue-700 mb-2">📘 Resultado Final:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Velocidad Lineal (v):</strong> {v} m/s</li>
                            <li><strong>Radio:</strong> {r} m</li>
                            <li><strong>Velocidad Angular (ω):</strong> {parseFloat(w).toFixed(2)} rad/s</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se ha ingresado ningún dato.</p>
            )}
        </div>
    );
};

export default VL_by_RxRPM;
