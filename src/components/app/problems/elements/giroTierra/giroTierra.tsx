import React, { FC } from 'react'

interface IForm {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    problem_id: number;
}

interface IGraphNode { }

interface ISolution {
    va: number
    vl: number
    theta30: number
    a: number
    f: number
    ac: number
}

const GiroTierra: FC & { Form: FC<IForm>, GraphNode: FC<IGraphNode>, Solution: FC<ISolution> } = () => {
    return (
        <></>
    )
}

GiroTierra.Form = ({ onSubmit, problem_id }) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-white shadow-md p-6 rounded-lg border border-gray-200 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Ingresar datos</h2>
            <input
                type="hidden"
                id="problem_id"
                name="problem_id"
                value={problem_id}
            />
            <div className="flex flex-col">
                <label htmlFor="radio" className="text-sm font-medium text-gray-700 mb-1">
                    Radio de la órbita (m)
                </label>
                <input
                    type="number"
                    step="any"
                    id="radio"
                    name="radio"
                    placeholder="Ej: 1.5e11"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="dias" className="text-sm font-medium text-gray-700 mb-1">
                    Tiempo (días)
                </label>
                <input
                    type="number"
                    step="any"
                    id="dias"
                    name="dias"
                    placeholder="Ej: 365.25"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <button
                type="submit"
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Calcular
            </button>
        </form>
    )
}


GiroTierra.GraphNode = () => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Gráfica de la Tierra</h2>
            <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md">
            </div>
        </div>
    )
}

GiroTierra.Solution = ({ va, vl, theta30, a }) => {
    return (
        <div className="flex flex-col gap-6 bg-white rounded-xl shadow-md p-6 border border-gray-200 w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>

            <div className="space-y-4 text-gray-800">

                <div>
                    <h3 className="text-lg font-semibold text-blue-600">1. Calcular la velocidad angular (ω)</h3>
                    <p>La Tierra da una vuelta completa (2π radianes) en 365.25 días:</p>
                    <p className="mt-1 bg-gray-100 p-2 rounded italic text-sm">
                        ω = 2π / 365.25 ≈ <strong>{va.toFixed(4)} rad/día</strong>
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-600">2. Calcular la velocidad tangencial (v)</h3>
                    <p>La velocidad tangencial se obtiene multiplicando ω por el radio orbital:</p>
                    <p className="mt-1 bg-gray-100 p-2 rounded italic text-sm">
                        v = ω × r = {va.toFixed(4)} × 1.5×10¹¹ = <strong>{vl.toLocaleString()} m/s</strong>
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-600">3. Calcular el ángulo recorrido en 30 días (θ)</h3>
                    <p>El ángulo recorrido en 30 días se calcula así:</p>
                    <p className="mt-1 bg-gray-100 p-2 rounded italic text-sm">
                        θ = ω × 30 = {va.toFixed(4)} × 30 = <strong>{theta30.toFixed(3)} rad</strong>
                    </p>
                    <p className="text-sm text-gray-500">(Equivale a ≈ 29.5°, ya que 1 rad ≈ 57.3°)</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-600">4. Calcular la aceleración centrípeta (a)</h3>
                    <p>La aceleración centrípeta se calcula con la fórmula: a = v² / r</p>
                    <p className="mt-1 bg-gray-100 p-2 rounded italic text-sm">
                        a = {vl.toLocaleString()}² / (1.5×10¹¹) ≈ <strong>{a.toExponential(2)} m/s²</strong>
                    </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">📘 Resumen Final</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li><strong>Velocidad angular (ω):</strong> {va.toFixed(4)} rad/día</li>
                        <li><strong>Velocidad tangencial (v):</strong> {vl.toLocaleString()} m/s</li>
                        <li><strong>Ángulo en 30 días (θ):</strong> {theta30.toFixed(3)} rad</li>
                        <li><strong>Aceleración centrípeta (a):</strong> {a.toExponential(2)} m/s²</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GiroTierra