import React, { FC, useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { FaRegDotCircle } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

import module from "./radioYRPM.module.css"

interface IForm {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    problem_id: number;
}

interface IGraphNode {
    radio?: any
    rpm?: any
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
    problem_id?: number
}

interface ISolution {
    radio: number
    rpm: number
    vARad: string
    vALin: string
    f: number
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const RadioYRPM: FC & { Form: FC<IForm>, GraphNode: FC<IGraphNode>, Solution: FC<ISolution> } = () => {
    return (
        <></>
    )
}

RadioYRPM.Form = ({ onSubmit, problem_id }) => {
    return (
        <form onSubmit={onSubmit} className={`${module.Form}`}>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Ingresar datos</h2>
            <input
                type="hidden"
                id="problem_id"
                name="problem_id"
                value={problem_id}
            />
            <div className="flex flex-col">
                <label htmlFor="radio" className="text-sm font-medium text-gray-700 mb-1">
                    Radio (m)
                </label>
                <input
                    type="number"
                    id="radio"
                    name="radio"
                    step="any"
                    placeholder="Ej: 0.5"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="rpm" className="text-sm font-medium text-gray-700 mb-1">
                    RPM (revoluciones por minuto)
                </label>
                <input
                    type="number"
                    id="rpm"
                    name="rpm"
                    placeholder="Ej: 180"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Calcular
            </button>
        </form>
    );
};

RadioYRPM.GraphNode = () => {
    const ruedaRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<gsap.core.Tween | null>(null);

    const [radio, setRadio] = useState<number>(0.5);
    const [rpm, setRpm] = useState<number>(180);
    const [isRunning, setIsRunning] = useState<boolean>(true);

    const sizePx = radio * 200;

    const iniciarAnimacion = () => {
        const el = ruedaRef.current;
        if (!el || rpm <= 0) return;

        // Detener animación previa
        animRef.current?.kill();
        gsap.set(el, { rotate: 0 }); // Reiniciar a rotación 0

        const duracion = 60 / rpm;

        animRef.current = gsap.to(el, {
            rotate: 360,
            duration: duracion,
            ease: "linear",
            repeat: -1,
            transformOrigin: "center center",
        });
    };

    useEffect(() => {
        if (isRunning) iniciarAnimacion();
        else animRef.current?.pause();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rpm, isRunning]); // Se reinicia solo si cambia rpm o se reanuda

    const toggleAnimation = () => {
        if (isRunning) {
            animRef.current?.pause();
        } else {
            animRef.current?.resume() ?? iniciarAnimacion();
        }
        setIsRunning(!isRunning);
    };

    return (
        <div className="flex flex-col gap-4 items-center p-6 rounded-lg shadow-lg bg-white border border-gray-200 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-700">Simulación de rueda</h2>

            <div
                ref={ruedaRef}
                className="relative flex items-center justify-center border-[10px] border-gray-800 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 shadow-inner"
                style={{
                    width: `${sizePx}px`,
                    height: `${sizePx}px`,
                }}
            >
                <FaX className="text-white text-4xl drop-shadow" />
            </div>

            <div className="w-full flex flex-col gap-4 mt-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="radio">
                        Radio (m)
                    </label>
                    <input
                        id="radio"
                        type="number"
                        step="any"
                        value={radio}
                        onChange={(e) => setRadio(parseFloat(e.target.value))}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="rpm">
                        RPM
                    </label>
                    <input
                        id="rpm"
                        type="number"
                        value={rpm}
                        onChange={(e) => setRpm(parseFloat(e.target.value))}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={toggleAnimation}
                    className={`mt-2 px-4 py-2 rounded text-white transition-colors ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    {isRunning ? "Pausar animación" : "Reanudar animación"}
                </button>
            </div>
        </div>
    );
};

RadioYRPM.Solution = ({ vARad, vALin, f, radio }) => {
    return (
        <div className="flex flex-col gap-6 bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-700">Solución paso a paso</h2>

            <div className="space-y-4 text-gray-800">
                <div>
                    <h3 className="text-lg font-semibold text-blue-600">1. Calcular la frecuencia (f)</h3>
                    <p>
                        Dado que la rueda gira a <strong>RPM conocida</strong>, se convierte a Hz con:
                    </p>
                    <p className="mt-1 italic text-sm bg-gray-100 p-2 rounded">
                        f = RPM ÷ 60 = <strong>{f} Hz</strong>
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-600">2. Calcular la velocidad angular (ω)</h3>
                    <p>
                        Usamos la fórmula: <strong>ω = 2πf</strong>
                    </p>
                    <p className="mt-1 italic text-sm bg-gray-100 p-2 rounded">
                        ω = 2π × {f} = <strong>{vARad} rad/s</strong>
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-blue-600">3. Calcular la velocidad lineal (v)</h3>
                    <p>
                        Usamos la fórmula: <strong>v = ω × r</strong>
                        (con radio r = {radio})
                    </p>
                    <p className="mt-1 italic text-sm bg-gray-100 p-2 rounded">
                        v = {vARad} × {radio} = <strong>{vALin} m/s</strong>
                    </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">📘 Resumen Final:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Frecuencia (f):</strong> {f} Hz</li>
                        <li><strong>Velocidad angular (ω):</strong> {vARad} rad/s</li>
                        <li><strong>Velocidad lineal (v):</strong> {vALin} m/s</li>
                        <li><strong>Radio:</strong> {radio} m</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RadioYRPM