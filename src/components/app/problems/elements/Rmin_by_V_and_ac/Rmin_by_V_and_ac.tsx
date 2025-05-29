import { FormEvent, useEffect, useState } from "react";

// PROBLEM ID: 8
const Rmin_by_V_and_ac = () => <></>;

Rmin_by_V_and_ac.Form = () => {
    const [r, setR] = useState<string>("");
    const [prevInputs, setPrevInputs] = useState<{ v: number, g: number } | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const v_kmh = parseFloat(form.get("v") as string);
        const g = parseFloat(form.get("g") as string);
        const v_ms = v_kmh * 1000 / 3600;
        const aMax = 8 * g;

        const rMin = Math.pow(v_ms, 2) / aMax;

        setPrevInputs({ v: v_kmh, g });

        localStorage.setItem("Rmin_by_V_and_ac__v", v_kmh.toString());
        localStorage.setItem("Rmin_by_V_and_ac__g", g.toString());
        localStorage.setItem("Rmin_by_V_and_ac__r", rMin.toString());
        localStorage.setItem("resolved_problem_ID", "8");

        setR(rMin.toFixed(2) + " m");

        window.dispatchEvent(new Event("update:Rmin_by_V_and_ac__r"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-md shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-600">Radio mínimo por velocidad y aceleración soportada</h2>

            <div className="flex flex-col">
                <label htmlFor="v" className="text-sm font-medium text-gray-700 mb-1">Velocidad (km/h):</label>
                <input type="number" id="v" name="v" step="any" placeholder="Ej: 2300" required className="p-2 border border-gray-300 rounded" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="g" className="text-sm font-medium text-gray-700 mb-1">Valor de g (m/s²):</label>
                <input type="number" id="g" name="g" step="any" placeholder="Ej: 9.81" required className="p-2 border border-gray-300 rounded" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Calcular</button>

            {prevInputs && (
                <div className="text-sm text-gray-500 mt-2">
                    Últimos valores ingresados: <br />
                    Velocidad: {prevInputs.v} km/h &nbsp;&nbsp; g: {prevInputs.g} m/s²
                </div>
            )}

            {r && (
                <p className="text-sm text-gray-500">Resultado preliminar: <strong className="text-blue-600">{r}</strong></p>
            )}
        </form>
    );
};

Rmin_by_V_and_ac.GraphNode = () => <div><h3>Graph Node para Radio mínimo de giro</h3></div>;

Rmin_by_V_and_ac.Solution = () => {
    const [r, setR] = useState<string | null>(null);
    const [v, setV] = useState<string | null>(null);
    const [g, setG] = useState<string | null>(null);

    useEffect(() => {
        const load = () => {
            setR(localStorage.getItem("Rmin_by_V_and_ac__r"));
            setV(localStorage.getItem("Rmin_by_V_and_ac__v"));
            setG(localStorage.getItem("Rmin_by_V_and_ac__g"));
        };
        load();
        window.addEventListener("update:Rmin_by_V_and_ac__r", load);
        return () => window.removeEventListener("update:Rmin_by_V_and_ac__r", load);
    }, []);

    return (
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>
            {r && v && g ? (
                <div className="mt-4 space-y-4 text-gray-800">
                    <p className="bg-gray-100 p-2 rounded italic">1. Calcular velocidad en m/s:<br />
                        v = {v} × 1000 / 3600 = <strong>{(parseFloat(v) * 1000 / 3600).toFixed(2)} m/s</strong></p>

                    <p className="bg-gray-100 p-2 rounded italic">2. a<sub>max</sub> = 8 × {g} = <strong>{(8 * parseFloat(g)).toFixed(2)} m/s²</strong></p>

                    <p className="bg-gray-100 p-2 rounded italic">3. r = v² / a<sub>c</sub> = <strong>{r}</strong></p>
                </div>
            ) : <p className="italic text-gray-400">Aún no se ingresaron datos.</p>}
        </div>
    );
};

export default Rmin_by_V_and_ac;
