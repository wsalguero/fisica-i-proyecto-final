import { FormEvent, useEffect, useState } from "react";

// PROBLEM ID: 6
const WA_by_RPM = () => <></>;

WA_by_RPM.Form = () => {
    const [omega, setOmega] = useState<string>("");
    const [prevRPM, setPrevRPM] = useState<number | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const rpm = parseFloat(form.get("rpm") as string);
        setPrevRPM(rpm);

        const w = (2 * Math.PI * rpm) / 60;

        localStorage.setItem("WA_by_RPM__w", w.toString());
        localStorage.setItem("WA_by_RPM__rpm", rpm.toString());
        localStorage.setItem("resolved_problem_ID", "6");

        setOmega(w.toFixed(2) + " rad/s");

        window.dispatchEvent(new Event("update:WA_by_RPM__w"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-md shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-600">Calcular Velocidad Angular (ω)</h2>

            <div className="flex flex-col">
                <label htmlFor="rpm" className="text-sm font-medium text-gray-700 mb-1">RPM:</label>
                <input type="number" id="rpm" name="rpm" step="any" placeholder="Ej: 120" required className="p-2 border border-gray-300 rounded" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Calcular</button>

            {prevRPM !== null && (
                <p className="text-sm text-gray-500 mt-2">
                    Último valor ingresado: <strong>{prevRPM} rpm</strong>
                </p>
            )}

            {omega && (
                <p className="text-sm text-gray-500">Resultado preliminar: <strong className="text-blue-600">{omega}</strong></p>
            )}
        </form>
    );
};

WA_by_RPM.GraphNode = () => <div><h3>Graph Node para ω por RPM</h3></div>;

WA_by_RPM.Solution = () => {
    const [w, setW] = useState<string | null>(null);
    const [rpm, setRPM] = useState<string | null>(null);

    useEffect(() => {
        const load = () => {
            setW(localStorage.getItem("WA_by_RPM__w"));
            setRPM(localStorage.getItem("WA_by_RPM__rpm"));
        };
        load();
        window.addEventListener("update:WA_by_RPM__w", load);
        return () => window.removeEventListener("update:WA_by_RPM__w", load);
    }, []);

    return (
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>
            {w && rpm ? (
                <div className="mt-4 space-y-4 text-gray-800">
                    <p className="bg-gray-100 p-2 rounded italic">ω = 2π × f = 2π × ({rpm} / 60)</p>
                    <p className="bg-gray-100 p-2 rounded italic">ω = <strong>{w} rad/s</strong></p>
                </div>
            ) : <p className="italic text-gray-400">Aún no se ingresaron datos.</p>}
        </div>
    );
};

export default WA_by_RPM;
