import { useState } from "react";
import { GiroTierra, ProblemsGrid, RadioYRPM } from "../../components/app";
import { IProblem } from "../../components/app/problems/problemsGrid/problemsGrid";
import { problemaRadioyRPM, resolverTierraMCU } from "../../functions/problems";


const Resolve = () => {

    const [solucionYRPM, setSolucionYRPM] = useState<{
        f: number;
        vARad: number | string;
        vALin: number | string;
        radio: number;
        rpm: number;
    } | null>(null);

    const [solucionGiroTierra, setSolucionGiroTierra] = useState<{
        f: number;
        vT: number | string;
        ang30d: number | string;
        aC: number | string;
    } | null>(null);

    const [idProblemResolved, setIdProblemResolved] = useState<number>(0);

    const submitRadioYRPM = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const radio = parseFloat(form.get("radio") as string);
        const rpm = parseFloat(form.get("rpm") as string);
        const { frecuencia, velocidadAngular, velocidadLineal } = problemaRadioyRPM(radio, rpm);

        setSolucionYRPM({
            f: frecuencia,
            vARad: `${velocidadAngular.toFixed(2)}`,
            vALin: `${velocidadLineal.toFixed(2)}`,
            radio,
            rpm,
        });
        setIdProblemResolved(1);
    };

    const submitGiroTierra = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const radio = parseFloat(form.get("radio") as string);
        const dias = parseFloat(form.get("dias") as string);

        // Resolver
        const {
            velocidadAngular,
            velocidadTangencial,
            angulo30Dias,
            aceleracionCentripeta,
        } = resolverTierraMCU(radio, dias);

        setSolucionGiroTierra({
            f: velocidadAngular,
            vT: velocidadTangencial,
            ang30d: angulo30Dias,
            aC: aceleracionCentripeta,
        });

        setIdProblemResolved(2);
    };



    const problems: IProblem[] = [
        {
            id: 1,
            title: "Velocidad con radio y RPM",
            description: "Description of problem 1",
            dificulty: 40,
            functionToResolve: function (): void {
                submitRadioYRPM;
            },
            form: <RadioYRPM.Form onSubmit={submitRadioYRPM} problem_id={1} />,
            solution: solucionYRPM ? (
                <RadioYRPM.Solution
                    f={solucionYRPM.f}
                    vARad={`${solucionYRPM.vARad}`}
                    vALin={`${solucionYRPM.vALin}`}
                    radio={solucionYRPM.radio}
                    rpm={solucionYRPM.rpm}
                />
            ) : (
                <div className="text-gray-400 italic">Calcula para ver la solución...</div>
            )
            ,
            calcs: ["Hii", "Hii", "Hii"],
            graphNode: <RadioYRPM.GraphNode radio={0.5} rpm={180} />
        },
        {
            id: 2,
            title: "Giro de la Tierra",
            description: "Cálculo de ω, velocidad tangencial, ángulo recorrido y aceleración centrípeta",
            dificulty: 40,
            functionToResolve: () => { }, // Este no lo necesitás si se calcula desde el form

            form: <GiroTierra.Form onSubmit={submitGiroTierra} problem_id={2} />,

            solution: solucionGiroTierra ? (
                <GiroTierra.Solution
                    va={Number(solucionGiroTierra.f)}
                    vl={Number(solucionGiroTierra.vT)}
                    theta30={Number(solucionGiroTierra.ang30d)}
                    a={Number(solucionGiroTierra.aC)}
                    f={Number(solucionGiroTierra.f)}
                    ac={Number(solucionGiroTierra.aC)}
                />
            ) : (
                <div className="text-gray-400 italic">Calcula para ver la solución...</div>
            ),

            calcs: [],
            graphNode: <GiroTierra.GraphNode />,
        }


    ];


    return (
        <>
            <div className="w-full h-full">
                <h1 className={`text-2xl font-bold`}>Resolviendo problemas</h1>
                <p className={`text-gray-500`}>Aquí puedes resolver problemas de Movimiento circular uniforme (m.c.u.)</p>
            </div>

            <div className="w-full h-full">
                <ProblemsGrid problems={problems} pageSize={10} idProblemResolved={idProblemResolved} />
            </div>

        </>
    )
}

export default Resolve;