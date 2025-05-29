import { FormEvent, useEffect, useState } from "react";

// PROBLEM ID: 9
const Theta_by_W_and_T = () => <></>;

Theta_by_W_and_T.Form = () => {
    const [theta, setTheta] = useState<string>("");
    const [prevInputs, setPrevInputs] = useState<{ w: number, t: number } | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const w = parseFloat(form.get("w") as string);
        const t = parseFloat(form.get("t") as string);
        const angle = w * t;

        setPrevInputs({ w, t });

        localStorage.setItem("Theta_by_W_and_T__w", w.toString());
        localStorage.setItem("Theta_by_W_and_T__t", t.toString());
        localStorage.setItem("Theta_by_W_and_T__theta", angle.toString());
        localStorage.setItem("resolved_problem_ID", "9");

        setTheta(angle.toFixed(3) + " rad");

        window.dispatchEvent(new Event("update:Theta_by_W_and_T__theta"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-md shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-600">Ángulo recorrido (θ) por ω y t</h2>

            <div className="flex flex-col">
                <label htmlFor="w" className="text-sm font-medium text-gray-700 mb-1">Velocidad angular ω (rad/día):</label>
                <input type="number" id="w" name="w" step="any" placeholder="Ej: 0.0172" required className="p-2 border border-gray-300 rounded" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="t" className="text-sm font-medium text-gray-700 mb-1">Tiempo t (días):</label>
                <input type="number" id="t" name="t" step="any" placeholder="Ej: 30" required className="p-2 border border-gray-300 rounded" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Calcular</button>

            {prevInputs && (
                <div className="text-sm text-gray-500 mt-2">
                    ω: {prevInputs.w} rad/día &nbsp;&nbsp; t: {prevInputs.t} días
                </div>
            )}

            {theta && (
                <p className="text-sm text-gray-500">Resultado preliminar: <strong className="text-blue-600">{theta}</strong></p>
            )}
        </form>
    );
};

Theta_by_W_and_T.GraphNode = () => <div><h3>Graph Node para θ = ω × t</h3></div>;

Theta_by_W_and_T.Solution = () => {
    const [theta, setTheta] = useState<string | null>(null);
    const [w, setW] = useState<string | null>(null);
    const [t, setT] = useState<string | null>(null);

    useEffect(() => {
        const load = () => {
            setTheta(localStorage.getItem("Theta_by_W_and_T__theta"));
            setW(localStorage.getItem("Theta_by_W_and_T__w"));
            setT(localStorage.getItem("Theta_by_W_and_T__t"));
        };
        load();
        window.addEventListener("update:Theta_by_W_and_T__theta", load);
        return () => window.removeEventListener("update:Theta_by_W_and_T__theta", load);
    }, []);

    return (
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>
            {theta && w && t ? (
                <div className="space-y-4 text-gray-800">
                    <p className="bg-gray-100 p-2 rounded italic">θ = {w} × {t} = <strong>{theta} rad</strong></p>
                </div>
            ) : <p className="italic text-gray-400">Aún no se ingresaron datos.</p>}
        </div>
    );
};

export default Theta_by_W_and_T;
