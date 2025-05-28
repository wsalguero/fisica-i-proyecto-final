import { useEffect, useState } from "react";
import { GiroTierra, ProblemsGrid, RadioYRPM } from "../../components/app";
import { IProblem } from "../../components/app/problems/problemsGrid/problemsGrid";
import { problemaRadioyRPM, resolverTierraMCU } from "../../functions/problems";
import VaR_by_RxRPM from "../../components/app/problems/elements/VaR_by_RxRPM/VaR_by_RxRPM";


const Resolve = () => {
    const [idProblemResolved, setIdProblemResolved] = useState<number>(0);
    const problems: IProblem[] = [
        {
            id: 1,
            title: "Velocidad Angular por Radio y RPM",
            description: "Encuentra la velocidad angular y lineal a partir del radio y las revoluciones por minuto (RPM)",
            dificulty: 10,
            form: <VaR_by_RxRPM.Form />,
            solution: <VaR_by_RxRPM.Solution />,
            graphNode: <VaR_by_RxRPM.GraphNode />,
            tagName: "va-r-rpm",
            tags: ["w", "rpm", "radio", "velocidad angular", "velocidad lineal"],
        },
    ];

    useEffect(() => {
        localStorage.clear();

        const fetchValue = () => {
            const storedProblemId = localStorage.getItem("resolved_problem_ID");
            setIdProblemResolved(storedProblemId ? parseInt(storedProblemId) : 0);
        };

        fetchValue(); // Inicial

        // 📡 Escuchar cambios
        const listener = () => fetchValue();
        window.addEventListener("problem:resolved", listener);

        return () => {
            window.removeEventListener("problem:resolved", listener);
        };
    }, []);


    return (
        <div className="w-full h-full">
            <ProblemsGrid problems={problems} pageSize={10} idProblemResolved={idProblemResolved} />
        </div>
    )
}

export default Resolve;