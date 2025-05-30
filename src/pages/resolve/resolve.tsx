import { useEffect, useState } from "react";
import ProblemsGrid, { IProblem } from "../../components/app/problems/problemsGrid/problemsGrid";
import VaR_by_RxRPM from "../../components/app/problems/elements/VaR_by_RxRPM/VaR_by_RxRPM";
import Frecuencia_by_RPM from "../../components/app/problems/elements/Frecuencia_by_RPM/Frecuencia_by_RPM";
import VL_by_RxRPM from "../../components/app/problems/elements/VL_by_RxRPM/VL_by_RxRPM";
import VL_by_acC from "../../components/app/problems/elements/VL_by_acC/VL_by_acC";
import WA_by_VR from "../../components/app/problems/elements/WA_by_VR/WA_by_VR";
import WA_by_RPM from "../../components/app/problems/elements/WA_by_RPM/WA_by_RPM";
import AC_by_WR from "../../components/app/problems/elements/AC_by_WR/AC_by_WR";
import Rmin_by_V_and_ac from "../../components/app/problems/elements/Rmin_by_V_and_ac/Rmin_by_V_and_ac";
import Theta_by_W_and_T from "../../components/app/problems/elements/Theta_by_W_and_T/Theta_by_W_and_T";
import AC_by_V_and_R from "../../components/app/problems/elements/AC_by_V_and_R/AC_by_V_and_R";


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
        {
            id: 2,
            title: "Frecuencia por RPM",
            description: "Convierte revoluciones por minuto a frecuencia (Hz)",
            dificulty: 5,
            form: <Frecuencia_by_RPM.Form />,
            solution: <Frecuencia_by_RPM.Solution />,
            graphNode: <Frecuencia_by_RPM.GraphNode />,
            tagName: "f-rpm",
            tags: ["f", "rpm", "frecuencia"],
        },
        {
            id: 3,
            title: "Velocidad lineal por radio y RPM",
            description: "Calcula velocidad lineal a partir de radio y revoluciones por minuto",
            dificulty: 5,
            form: <VL_by_RxRPM.Form />,
            solution: <VL_by_RxRPM.Solution />,
            graphNode: <VL_by_RxRPM.GraphNode />,
            tagName: "vl-r-rpm",
            tags: ["v", "rpm", "radio", "velocidad angular", "velocidad lineal"],
        },
        {
            id: 4,
            title: "Velocidad lineal por aceleración centrípeta y radio",
            description: "Calcula velocidad lineal que se necesita para generar cierta aceleración centrípeta",
            dificulty: 6,
            form: <VL_by_acC.Form />,
            solution: <VL_by_acC.Solution />,
            graphNode: <VL_by_acC.GraphNode />,
            tagName: "vl-ac-r",
            tags: ["v", "a_c", "radio", "aceleración centrípeta", "velocidad lineal"],
        },
        {
            id: 5,
            title: "Velocidad angular por velocidad lineal y radio",
            description: "Calcula ω a partir de velocidad lineal y radio usando la fórmula ω = v / r",
            dificulty: 6,
            form: <WA_by_VR.Form />,
            solution: <WA_by_VR.Solution />,
            graphNode: <WA_by_VR.GraphNode />,
            tagName: "w-v-r",
            tags: ["w", "v", "radio", "velocidad angular", "velocidad lineal"],
        },
        {
            id: 6,
            title: "Velocidad angular por RPM",
            description: "Calcula la velocidad angular (ω) a partir de las revoluciones por minuto (RPM)",
            dificulty: 6,
            form: <WA_by_RPM.Form />,
            solution: <WA_by_RPM.Solution />,
            graphNode: <WA_by_RPM.GraphNode />,
            tagName: "w-rpm",
            tags: ["ω", "velocidad angular", "rpm", "frecuencia"],
        },
        {
            id: 7,
            title: "Aceleración centrípeta por ω y radio",
            description: "Calcula la aceleración centrípeta en el borde del objeto a partir de ω y el radio",
            dificulty: 7,
            form: <AC_by_WR.Form />,
            solution: <AC_by_WR.Solution />,
            graphNode: <AC_by_WR.GraphNode />,
            tagName: "ac-w-r",
            tags: ["a_c", "velocidad angular", "radio", "aceleración centrípeta"],
        },
        {
            id: 8,
            title: "Radio mínimo soportado por un piloto",
            description: "Calcula el radio mínimo que puede soportar un piloto sin desmayarse por aceleración centrípeta",
            dificulty: 8,
            form: <Rmin_by_V_and_ac.Form />,
            solution: <Rmin_by_V_and_ac.Solution />,
            graphNode: <Rmin_by_V_and_ac.GraphNode />,
            tagName: "r-v-g",
            tags: ["radio", "velocidad", "aceleración centrípeta", "g fuerza", "v", "g"],
        },
        {
            id: 9,
            title: "Ángulo recorrido por velocidad angular y tiempo",
            description: "Calcula el ángulo recorrido (θ) en radianes a partir de ω y t",
            dificulty: 6,
            form: <Theta_by_W_and_T.Form />,
            solution: <Theta_by_W_and_T.Solution />,
            graphNode: <Theta_by_W_and_T.GraphNode />,
            tagName: "theta-w-t",
            tags: ["ángulo", "θ", "ω", "tiempo", "radianes", "movimiento angular"],
        },
        {
            id: 10,
            title: "Aceleración centrípeta por velocidad lineal y radio",
            description: "Calcula aₙ a partir de la velocidad lineal y el radio de la órbita",
            dificulty: 7,
            form: <AC_by_V_and_R.Form />,
            solution: <AC_by_V_and_R.Solution />,
            graphNode: <AC_by_V_and_R.GraphNode />,
            tagName: "ac-v-r",
            tags: ["aceleración centrípeta", "v", "radio", "gravedad", "fuerzas", "a_c"],
        }

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
        <div className="w-full h-full lg:px-12 lg:pxy-6 px-4 py-6 space-y-6">
            <ProblemsGrid problems={problems} pageSize={10} idProblemResolved={idProblemResolved} />
        </div>
    )
}

export default Resolve;