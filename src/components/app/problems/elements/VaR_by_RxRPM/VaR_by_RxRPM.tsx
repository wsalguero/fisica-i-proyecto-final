import React, { useEffect } from 'react'
import { FaCalculator, FaCheck } from 'react-icons/fa';

// PROBLEM ID: 1
const VaR_by_RxRPM = () => {
    return (
        <></>
    )
}

VaR_by_RxRPM.Form = () => {
    const [vA, setVA] = React.useState<string>("");
    const [prevRPM, setPrevRPM] = React.useState<number | null>(null);
    const [prevR, setPrevR] = React.useState<number | null>(null);
    const [formKey, setFormKey] = React.useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const rpm = parseFloat(form.get("rpm") as string);
        setPrevRPM(rpm);
        setPrevR(parseFloat(form.get("radio") as string));

        const frecuencia = rpm / 60;
        const velocidadAngular = 2 * Math.PI * frecuencia;

        localStorage.setItem("VaR_by_RxRPM__velocidadAngular", velocidadAngular.toString());
        localStorage.setItem("resolved_problem_ID", "1");

        setVA(velocidadAngular.toFixed(2) + " rad/s");
        window.dispatchEvent(new Event("update:VaR_by_RxRPM__velocidadAngular"));
        window.dispatchEvent(new Event("problem:resolved"));
        setFormKey(prev => prev + 1);
    };

    return (
        <form key={formKey} className="flex flex-col w-full md:px-4" onSubmit={handleSubmit}>
            {/* FORMULARIO */}
            <div className="bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="radio" className="text-sm font-semibold text-blue-800 mb-1">
                            Radio (m):
                        </label>
                        <input
                            type="number"
                            id="radio"
                            name="radio"
                            step="any"
                            placeholder="Ej: 0.5"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            required
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="rpm" className="text-sm font-semibold text-blue-800 mb-1">
                            RPM:
                        </label>
                        <input
                            type="number"
                            id="rpm"
                            name="rpm"
                            placeholder="Ej: 180"
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            required
                        />
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <button
                        type="submit"
                        className="mt-6 bg-[#2563eb] hover:bg-[#1e40af] transition-colors text-white font-semibold px-6 py-2 rounded-md shadow"
                    >
                        Calcular
                    </button>
                </div>
            </div>

            {/* RESULTADOS */}
            <div className="flex flex-col md:flex-row gap-4 mt-2">
                {prevRPM !== null && (
                    <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-5 w-full md:w-1/2 transition hover:shadow-md">
                        <h3 className="flex items-center gap-2 text-blue-700 font-bold text-lg">
                            <FaCalculator className="text-blue-500" /> Datos ingresados
                        </h3>

                        <ul className="mt-2 text-sm text-gray-700 space-y-1">
                            <li><span className="font-medium">RPM:</span> {prevRPM} rpm</li>
                            <li><span className="font-medium">Radio:</span> {prevR} m</li>
                        </ul>
                    </div>
                )}

                {vA && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full md:w-1/2 transition hover:shadow-md">
                        <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
                            <FaCheck className="text-blue-500" /> Resultado
                        </h3>
                        <p className="text-sm text-gray-700 mt-2">
                            Resultado preliminar: <strong className="text-blue-600">{vA}</strong>
                        </p>
                    </div>
                )}
            </div>
        </form>

    );
};



VaR_by_RxRPM.GraphNode = () => {
    return (
        <div>
            <h3>Graph Node for VaR by RxRPM</h3>
        </div>
    )
}


VaR_by_RxRPM.Solution = () => {
    const [velocidadAngular, setVelocidadAngular] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchValue = () => {
            const stored = localStorage.getItem("VaR_by_RxRPM__velocidadAngular");
            setVelocidadAngular(stored);
        };

        fetchValue(); // Inicial

        window.addEventListener("update:VaR_by_RxRPM__velocidadAngular", fetchValue);
        return () => {
            window.removeEventListener("update:VaR_by_RxRPM__velocidadAngular", fetchValue);
        };
    }, []);

    return (
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 w-full max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>

            {velocidadAngular ? (
                <div className="space-y-4 text-gray-800">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600">1. Calcular la frecuencia (f)</h3>
                        <p>La frecuencia se calcula a partir del RPM:</p>
                        <p className="mt-1 italic text-sm bg-gray-100 p-2 rounded">
                            f = RPM / 60
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-blue-600">2. Calcular la velocidad angular (ω)</h3>
                        <p>Usamos la fórmula: <strong>ω = 2πf</strong></p>
                        <p className="mt-1 italic text-sm bg-gray-100 p-2 rounded">
                            ω = {velocidadAngular} rad/s
                        </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg font-bold text-blue-700 mb-2">📘 Resultado Final:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Velocidad angular (ω):</strong> {velocidadAngular} rad/s</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400 italic">Aún no se ha ingresado ningún dato.</p>
            )}
        </div>
    );
};

export default VaR_by_RxRPM