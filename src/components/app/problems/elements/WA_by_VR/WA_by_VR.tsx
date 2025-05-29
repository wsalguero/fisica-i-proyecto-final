import { FormEvent, useEffect, useState } from 'react';

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
        <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-md rounded-md w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-600">Calcular Velocidad Angular (ω)</h2>

            <div className="flex flex-col">
                <label htmlFor="v" className="text-sm font-medium text-gray-700 mb-1">Velocidad Lineal (m/s):</label>
                <input type="number" id="v" name="v" step="any" placeholder="Ej: 2.21" required className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="r" className="text-sm font-medium text-gray-700 mb-1">Radio (m):</label>
                <input type="number" id="r" name="r" step="any" placeholder="Ej: 0.5" required className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Calcular
            </button>

            {prevInputs && (
                <div className="text-sm text-gray-500 mt-2">
                    Últimos valores ingresados: <br />
                    <strong>v:</strong> {prevInputs.v} m/s &nbsp;&nbsp;
                    <strong>r:</strong> {prevInputs.r} m
                </div>
            )}

            {w && (
                <p className="text-sm text-gray-500 mt-1">
                    Resultado preliminar: <strong className="text-blue-600">{w}</strong>
                </p>
            )}
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
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 w-full max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>

            {w && r && v ? (
                <div className="space-y-4 text-gray-800">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600">1. Aplicar fórmula ω = v / r</h3>
                        <p className="italic text-sm bg-gray-100 p-2 rounded">
                            ω = {v} / {r} = <strong>{parseFloat(w).toFixed(2)} rad/s</strong>
                        </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg font-bold text-blue-700 mb-2">📘 Resultado Final:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Velocidad Angular (ω):</strong> {parseFloat(w).toFixed(2)} rad/s</li>
                            <li><strong>Velocidad Lineal:</strong> {v} m/s</li>
                            <li><strong>Radio:</strong> {r} m</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se ha ingresado ningún dato.</p>
            )}
        </div>
    );
};

export default WA_by_VR;
