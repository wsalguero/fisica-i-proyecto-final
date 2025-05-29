import { FormEvent, useEffect, useState } from "react";

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
        <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 shadow-md rounded-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-600">Calcular aceleración centrípeta (aₙ)</h2>

            <div className="flex flex-col">
                <label htmlFor="v" className="text-sm font-medium text-gray-700 mb-1">Velocidad lineal (m/s):</label>
                <input type="number" id="v" name="v" step="any" placeholder="Ej: 29861" required className="p-2 border border-gray-300 rounded" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="r" className="text-sm font-medium text-gray-700 mb-1">Radio (m):</label>
                <input type="number" id="r" name="r" step="any" placeholder="Ej: 1.5e11" required className="p-2 border border-gray-300 rounded" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Calcular</button>

            {prevInputs && (
                <p className="text-sm text-gray-500 mt-2">
                    Últimos valores: v = {prevInputs.v} m/s, r = {prevInputs.r} m
                </p>
            )}

            {ac && (
                <p className="text-sm text-gray-500">Resultado preliminar: <strong className="text-blue-600">{ac}</strong></p>
            )}
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
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>
            {ac && v && r ? (
                <div className="space-y-4 text-gray-800">
                    <p className="bg-gray-100 p-2 rounded italic">a<sub>c</sub> = {v}² / {r}</p>
                    <p className="bg-gray-100 p-2 rounded italic">a<sub>c</sub> = <strong>{ac}</strong></p>
                </div>
            ) : <p className="italic text-gray-400">Aún no se han ingresado datos.</p>}
        </div>
    );
};

export default AC_by_V_and_R;
