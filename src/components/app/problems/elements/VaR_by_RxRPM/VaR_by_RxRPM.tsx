import React, { useEffect, useState } from 'react'
import module from '../problems.module.css';
import { FaBookOpen, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
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
        <form key={formKey} className={`${module.Form}`} onSubmit={handleSubmit}>
            {/* FORMULARIO */}
            <div className={`bg-[#f3f4f6] border border-purple-200 rounded-xl p-6 shadow-md mb-4 ${module.FormContainer}`}>
                <div className={module.inputsRow}>
                    <div className={`${module.inputGroup} flex flex-col`}>
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
                    <div className={`${module.inputGroup} flex flex-col`}>
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
            <div className={`${module.ResultsContainer}`}>
                {prevRPM !== null && (
                    <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md">
                        <h3 className="flex items-center gap-2 text-blue-700 font-bold text-lg">
                            Datos ingresados
                        </h3>

                        <ul className="mt-2 text-sm text-gray-700 space-y-1">
                            <li><span className="font-medium">RPM:</span> {prevRPM} rpm</li>
                            <li><span className="font-medium">Radio:</span> {prevR} m</li>
                        </ul>
                    </div>
                )}

                {vA && (
                    <div className="bg-white border border-green-300 rounded-xl shadow-sm p-5 w-full transition hover:shadow-md">
                        <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
                            Resultado
                        </h3>
                        <p className="text-sm text-gray-700 mt-2">
                            Resultado: <strong className="text-blue-600">{vA}</strong>
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
    const [velocidadAngular, setVelocidadAngular] = useState<string | null>(null);

    useEffect(() => {
        const fetchValue = () => {
            const stored = localStorage.getItem("VaR_by_RxRPM__velocidadAngular");
            setVelocidadAngular(stored);
        };

        fetchValue();
        window.addEventListener("update:VaR_by_RxRPM__velocidadAngular", fetchValue);
        return () => {
            window.removeEventListener("update:VaR_by_RxRPM__velocidadAngular", fetchValue);
        };
    }, []);

    return (
        <div className={`${module.Form} bg-white border border-gray-200 shadow-md rounded-md w-full`}>
            <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" /> Solución paso a paso
                </h2>

                {velocidadAngular ? (
                    <div className="space-y-6 text-gray-800">

                        {/* Explicación teórica */}
                        <section className="space-y-2">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                En este problema de movimiento circular uniforme calculamos la velocidad angular <strong>ω</strong> a partir del radio y las revoluciones por minuto (RPM).
                                Utilizamos dos fórmulas principales: una para convertir RPM a frecuencia, y otra para calcular ω usando la frecuencia.
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Recordá que la <strong>velocidad angular</strong> indica cuántos radianes recorre el objeto por segundo al girar.
                            </p>
                        </section>

                        {/* Paso 1 */}
                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">1. Calcular la frecuencia (<em>f</em>)</h3>
                            <p>Fórmula básica:</p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit">
                                f = RPM / 60
                            </div>
                        </section>

                        {/* Paso 2 */}
                        <section className="space-y-2">
                            <h3 className="text-lg font-semibold text-blue-600">2. Calcular la velocidad angular (<em>ω</em>)</h3>
                            <p>Aplicamos la fórmula:</p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit">
                                ω = 2πf
                            </div>
                            <p className="mt-1">Resultado del cálculo:</p>
                            <div className="bg-gray-100 p-3 rounded text-sm font-mono w-fit">
                                ω = {velocidadAngular} rad/s
                            </div>
                        </section>

                        {/* Tabla de fórmulas */}
                        <section className="mt-6">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
                                <FaInfoCircle className="text-blue-500" /> Fórmulas utilizadas
                            </h3>
                            <table className="w-full text-sm text-left border border-gray-300 rounded overflow-hidden">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-2 border border-gray-300">Nombre</th>
                                        <th className="p-2 border border-gray-300">Fórmula</th>
                                        <th className="p-2 border border-gray-300">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 border">Frecuencia (f)</td>
                                        <td className="p-2 border">f = RPM / 60</td>
                                        <td className="p-2 border">Convierte RPM a Hz.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Velocidad angular (ω)</td>
                                        <td className="p-2 border">ω = 2πf</td>
                                        <td className="p-2 border">Transforma frecuencia en radianes por segundo.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Resultado Final */}
                        <section className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-green-600" /> Resultado Final:
                            </h3>
                            <p className="text-sm">
                                <strong>Velocidad angular (ω):</strong> {velocidadAngular} rad/s
                            </p>
                        </section>
                    </div>
                ) : (
                    <p className="text-gray-400 italic">Aún no se ha ingresado ningún dato.</p>
                )}
            </div>
        </div>
    );
};


export default VaR_by_RxRPM