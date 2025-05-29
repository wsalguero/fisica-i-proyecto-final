import { FormEvent, useEffect, useState } from "react";

// PROBLEM ID: 7
const AC_by_WR = () => <></>;

AC_by_WR.Form = () => {
    const [ac, setAc] = useState<string>("");
    const [prevInputs, setPrevInputs] = useState<{ w: number, r: number } | null>(null);
    const [formKey, setFormKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const w = parseFloat(form.get("w") as string);
        const r = parseFloat(form.get("r") as string);
        setPrevInputs({ w, r });

        const ac = Math.pow(w, 2) * r;

        localStorage.setItem("AC_by_WR__ac", ac.toString());
        localStorage.setItem("AC_by_WR__w", w.toString());
        localStorage.setItem("AC_by_WR__r", r.toString());
        localStorage.setItem("resolved_problem_ID", "7");

        setAc(ac.toFixed(2) + " m/s²");

        window.dispatchEvent(new Event("update:AC_by_WR__ac"));
        window.dispatchEvent(new Event("problem:resolved"));

        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-md shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-600">Calcular a<sub>c</sub> (centrípeta)</h2>

            <div className="flex flex-col">
                <label htmlFor="w" className="text-sm font-medium text-gray-700 mb-1">Velocidad angular (rad/s):</label>
                <input type="number" id="w" name="w" step="any" placeholder="Ej: 4π" required className="p-2 border border-gray-300 rounded" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="r" className="text-sm font-medium text-gray-700 mb-1">Radio (m):</label>
                <input type="number" id="r" name="r" step="any" placeholder="Ej: 0.1" required className="p-2 border border-gray-300 rounded" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Calcular</button>

            {prevInputs && (
                <p className="text-sm text-gray-500 mt-2">
                    Últimos valores ingresados: <br />
                    ω: {prevInputs.w} rad/s &nbsp;&nbsp; r: {prevInputs.r} m
                </p>
            )}

            {ac && (
                <p className="text-sm text-gray-500">Resultado preliminar: <strong className="text-blue-600">{ac}</strong></p>
            )}
        </form>
    );
};

AC_by_WR.GraphNode = () => <div><h3>Graph Node para a<sub>c</sub> por ω²r</h3></div>;

AC_by_WR.Solution = () => {
    const [ac, setAc] = useState<string | null>(null);
    const [r, setR] = useState<string | null>(null);
    const [w, setW] = useState<string | null>(null);

    useEffect(() => {
        const load = () => {
            setAc(localStorage.getItem("AC_by_WR__ac"));
            setW(localStorage.getItem("AC_by_WR__w"));
            setR(localStorage.getItem("AC_by_WR__r"));
        };
        load();
        window.addEventListener("update:AC_by_WR__ac", load);
        return () => window.removeEventListener("update:AC_by_WR__ac", load);
    }, []);

    return (
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>
            {ac && w && r ? (
                <div className="mt-4 space-y-4 text-gray-800">
                    <p className="bg-gray-100 p-2 rounded italic">a<sub>c</sub> = ω² × r = ({w})² × {r}</p>
                    <p className="bg-gray-100 p-2 rounded italic">a<sub>c</sub> = <strong>{ac} m/s²</strong></p>
                </div>
            ) : <p className="italic text-gray-400">Aún no se ingresaron datos.</p>}
        </div>
    );
};

export default AC_by_WR;
