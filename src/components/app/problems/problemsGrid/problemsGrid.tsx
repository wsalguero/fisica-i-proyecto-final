import { FC, useEffect, useState } from 'react'
import module from './problemsGrid.module.css'
import { FaChevronCircleDown, FaChevronLeft, FaSearch, FaSearchMinus } from 'react-icons/fa'
import ProgressBar from '@ramonak/react-progress-bar'
import { FaX } from 'react-icons/fa6'
import Swal from 'sweetalert2'

export interface IProblem {
    id: number
    title: string
    description: string
    dificulty: number
    graphNode?: JSX.Element
    functionToResolve?: () => void
    tags?: string[]
    form: JSX.Element
    solution: JSX.Element
    tagName: string;
}


interface IProblemsGrid {
    problems: IProblem[]
    sekeerValue?: string[]
    sortBy?: string
    pageSize: number
    idProblemResolved: number
}

const ProblemsGrid: FC<IProblemsGrid> = ({ problems, idProblemResolved = 0 }) => {

    const [isMobile, setIsMobile] = useState(false);

    const [cleanSekeer, setCleanSeeker] = useState(false);
    const [focusedProblemId, setFocusedProblemId] = useState<number | null>(null);
    const [problemResolved, setProblemResolved] = useState<boolean>(false);
    const [showSolution, setShowSolution] = useState(false);
    const [problemResolvedId, setProblemResolvedId] = useState<number>(0);
    const [clearSearch, setClearSearch] = useState(false);
    const [invalidSeekerValue, setInvalidSeekerValue] = useState(false);
    const [mobileShowTags, setMobileShowTags] = useState(false);

    useEffect(() => {
        const sekeer = document.getElementById("SekeerInput") as HTMLInputElement;
        sekeer.value = ""
        setClearSearch(false);

        document.getElementById("SekeerInput")?.focus();

    }, [cleanSekeer])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    const handleInputSekeer = () => {
        setCleanSeeker(false)
        setClearSearch(false);

    }

    const unFocusInProblem = (focusedProblemId: number, tagName: string) => {
        ;

        if (problemResolvedId !== focusedProblemId || problemResolved || problemResolvedId > 0) {

            Swal.fire({
                title: '¿Quieres salir de este problema?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    setFocusedProblemId(null)
                    setProblemResolved(false)
                    setProblemResolvedId(0)
                    setShowSolution(false)

                    const inputsByProblem = document.querySelectorAll(`input[data-tagname="${tagName}"]`);

                    inputsByProblem.forEach((input) => {
                        if (input instanceof HTMLInputElement) {
                            input.value = "";
                        }
                    });

                    localStorage.clear();

                    return;
                }
            });
        } else {
            setFocusedProblemId(null)
            setProblemResolved(false)

            const inputsByProblem = document.querySelectorAll(`input[data-tagname="${tagName}"]`);

            inputsByProblem.forEach((input) => {
                if (input instanceof HTMLInputElement) {
                    input.value = "";
                }
            });

            localStorage.clear();
        }

    }

    const handleInputSearch = () => {
        const sekeerInput = document.getElementById("SekeerInput") as HTMLInputElement | null;
        if (sekeerInput?.value === "") {
            setInvalidSeekerValue(true);
            return;

        }

        function hideRows() {
            const sekeer = document.getElementById("SekeerInput") as HTMLInputElement;
            const value = sekeer.value.toLowerCase();
            const problemsGrid = document.getElementById("ProblemsGrid") as HTMLDivElement;
            const problems = problemsGrid.querySelectorAll(`.ProblemsGrid__ProblemParentNode`);


            problems.forEach((problem) => {


                const title = problem.querySelector(`.ProblemsGrid__ProblemTitle`)?.textContent?.toLowerCase() || "";
                const description = problem.querySelector(`.ProblemsGrid__ProblemDescription`)?.textContent?.toLowerCase() || "";

                if (title.includes(value) || description.includes(value)) {
                    problem.classList.remove("hidden");
                } else {
                    problem.classList.add("hidden");
                }
            });
        }

        if (problemResolved || problemResolvedId > 0) {
            Swal.fire({
                title: '¿Quieres salir de este problema?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    setFocusedProblemId(null)
                    setProblemResolved(false)
                    setProblemResolvedId(0)
                    setShowSolution(false)
                    setClearSearch(true);

                    const inputsFromProblems = document.querySelectorAll(`input[data-fromproblem="true"]`);

                    inputsFromProblems.forEach((input) => {
                        if (input instanceof HTMLInputElement) {
                            input.value = "";
                        }
                    });

                    localStorage.clear();

                    setTimeout(() => {
                        hideRows();
                    }, 0);

                    return;
                }
            });
        }
        else {
            setClearSearch(true);
            setTimeout(() => {
                hideRows();
            }, 0);
        }
    }

    const handleClearSearh = () => {

        function showRows() {
            const sekeer = document.getElementById("SekeerInput") as HTMLInputElement;
            sekeer.value = ""
            setCleanSeeker(true)
            setClearSearch(false);

            const problemsGrid = document.getElementById("ProblemsGrid") as HTMLDivElement;
            const problems = problemsGrid.querySelectorAll(`.ProblemsGrid__ProblemParentNode`);

            problems.forEach((problem) => {
                problem.classList.remove("hidden");
            });
        }

        if (problemResolved || problemResolvedId > 0) {
            Swal.fire({
                title: '¿Quieres salir de este problema?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(() => {
                        showRows();
                    }, 0);
                }
            });
        }
        else {
            showRows();
        }
    }

    const getColorByDificulty = (dificulty: number): string => {
        if (dificulty <= 3) return "#4ade80";   // Verde
        if (dificulty <= 6) return "#facc15";   // Amarillo
        if (dificulty <= 8) return "#fb923c";   // Naranja
        return "#ef4444";                       // Rojo
    };

    return (
        <div className='w-full h-full'>
            <div className={`${module.ProblemsFilter} flex items-center justify-between bg-white shadow-sm rounded lg:gap-4 mb-5`}>
                <div className="h-full lg:p-4 p-2">
                    <h1 className={`lg:text-2xl text-[1.3rem] font-bold`}>Simulador de problemas</h1>
                </div>

                <div className={`h-full flex rounded shadow-sm justify-end ${module.SekeerContainer}`} id="ProblemsSeeker">
                    <div className='flex items-center justify-center h-full'>
                        <input type="text" placeholder="Buscar solucion" className={`${module.SekeerInput} ${invalidSeekerValue ? "border-red-300" : "border-purple-500"}`} onInput={() => handleInputSekeer()} id="SekeerInput" />

                        <button
                            className={`bg-white px-4 h-full flex items-center justify-center text-purple-500 hover:text-purple-700 transition`}
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                if (clearSearch) {
                                    handleClearSearh();
                                    return;
                                }
                                handleInputSearch();
                            }}
                        >
                            {clearSearch ? (
                                <FaSearchMinus className={`text-gray-400 hover:text-gray-500 `} />
                            ) : <FaSearch className={`text-gray-400 hover:text-gray-500`} />}
                        </button>

                    </div>
                </div>
            </div>

            <section id='ProblemsGrid' className={`w-full ${module.ProblemsGrid}`}>

                <div className={`flex flex-col gap-5 align-items-center justify-center ${module.ProblemsGridContainer}`}>
                    {problems.map((problem, index) => {
                        const isFocused = focusedProblemId === problem.id;
                        useEffect(() => {
                            if (idProblemResolved > 0) {
                                setProblemResolved(true);
                                setProblemResolvedId(idProblemResolved);
                            }
                        }, [idProblemResolved]);


                        return (
                            <div
                                key={index}
                                className={`relative flex flex-col shadow-sm rounded ease-in-out h-auto ProblemsGrid__ProblemParentNode ${isFocused ? module.problemFocused : module.problemNoFocus} ${!isMobile ? module.ProblemMainNode : module.ProblemMainNodeMobile}  transition-all duration-300 ease-in-out `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (problemResolvedId !== problem.id && problemResolved && problemResolvedId > 0) {
                                        unFocusInProblem(problem.id, problem.tagName);
                                        return;
                                    }
                                    setFocusedProblemId(problem.id);
                                }}
                            >

                                <div className={`${module.ProblemContainer}`}>
                                    <div className={`${module.ProblemContentContainer} transition-all duration-300 ease-in-out h-full 
                                            ${showSolution && idProblemResolved === problem.id ? "hidden" : "flex"}`
                                    }
                                        style={{
                                            width: problemResolvedId === problem.id && problemResolved && !isMobile ? "calc(100% - 25px)" : "100%",
                                        }}
                                    >
                                        <div className={`${module.ProblemContentHeader} w-full ${showSolution ? "hidden" : ""}`}>
                                            {/* Título + Tags + Descripción */}
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="flex items-center flex-wrap gap-2 w-full">
                                                    <div className={`${isMobile ? "flex intems-center justify-between w-full px-1 items-center" : ""}`}>
                                                        <h1 className={`text-gray-800  font-bold ProblemsGrid__ProblemTitle ${module.ProblemTitle}`}>
                                                            {problem.title}
                                                        </h1>

                                                        {isFocused && isMobile ?
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();

                                                                    if (problemResolvedId === problem.id && problemResolved && problemResolvedId > 0) {
                                                                        unFocusInProblem(problem.id, problem.tagName);
                                                                        return;
                                                                    } else {
                                                                        const inputsByProblem = document.querySelectorAll(`input[data-tagname="${problem.tagName}"]`);

                                                                        inputsByProblem.forEach((input) => {
                                                                            if (input instanceof HTMLInputElement) {
                                                                                input.value = "";
                                                                            }
                                                                        });
                                                                        localStorage.clear();

                                                                    }
                                                                    setFocusedProblemId(null);
                                                                    setProblemResolved(false);
                                                                }}
                                                                className="p-2 bg-red-100 hover:bg-red-200 hover:border-red-400 rounded-full transition-al flex items-center justify-center"
                                                            >
                                                                <FaX className="text-red-400 hover:text-red-600 text-sm" />
                                                            </button>
                                                            : null}
                                                    </div>
                                                    {
                                                        !isMobile && (
                                                            <>
                                                                {problem.tags && problem.tags.length > 0 && (
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {problem.tags.map((tag, index) => (
                                                                            <span
                                                                                key={index}
                                                                                className={`bg-purple-200 hover:bg-purple-300 text-gray-700 rounded-full px-3 py-1 font-semibold transition-all ${module.ProblemTag}`}
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <p className="text-gray-500 text-sm ProblemsGrid__ProblemDescription px-1 mt-2 lg:mt-0 lg:px-0">{problem.description}</p>

                                                <div className='flex w-full items-start justify-between mt-2 px-1 lg:px-0 gap-2'>
                                                    {
                                                        isMobile && (
                                                            <>
                                                                {problem.tags && problem.tags.length > 0 && (

                                                                    <div className='w-1/2'>

                                                                        <div className='w-full flex items-center mb-2'>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();

                                                                                    if (focusedProblemId === problem.id) {
                                                                                        setMobileShowTags(!mobileShowTags);
                                                                                    }
                                                                                }}
                                                                                className="flex justify-between items-center rounded-md shadow-sm text-purple-500 hover:text-purple-700 transition-all w-full p-2 h-[3rem] bg-white border border-purple-200 hover:border-purple-300"
                                                                            >
                                                                                Ver Tags
                                                                                <FaChevronCircleDown className={`transition-transform duration-300 ease-in-out ${mobileShowTags && focusedProblemId === problem.id ? 'rotate-180' : ''}`} />
                                                                            </button>
                                                                        </div>
                                                                        <div className={`
                                                                            flex flex-wrap gap-2 transition-all duration-300 ease-in-out 
                                                                            ${mobileShowTags && focusedProblemId === problem.id ? 'max-h-40 ' : 'max-h-0 overflow-hidden'}`
                                                                        }>
                                                                            {problem.tags.map((tag, index) => (
                                                                                <span
                                                                                    key={index}
                                                                                    className={`bg-purple-200 hover:bg-purple-300 text-gray-700 rounded-full px-3 py-1 font-semibold transition-all ${module.ProblemTag}`}
                                                                                >
                                                                                    {tag}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        isMobile && problemResolvedId === problem.id && (
                                                            <div className='w-1/2 h-full flex items-center justify-end'>

                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        if (problem.id === problemResolvedId) {

                                                                            setShowSolution(!showSolution);
                                                                        }
                                                                    }}
                                                                    className={`${module.ViewSolutionButton} h-[3rem] p-2 cursor-pointer bg-white transition-all duration-300 ease-in-out  text-center
                                                                            ${showSolution ? module.ButtonSolutionOpen : module.ButtonSolutionClose}`}
                                                                >
                                                                    <FaChevronCircleDown className={`transition-transform duration-300 ease-in-out ${showSolution ? 'rotate-180' : ''}`} />
                                                                    Ver Solución
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 ml-auto">
                                                {
                                                    !isMobile && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <span className="font-bold">Dificultad:</span>
                                                            <div className="w-32">
                                                                <ProgressBar
                                                                    completed={problem.dificulty * 10}
                                                                    maxCompleted={100}
                                                                    bgColor={getColorByDificulty(problem.dificulty)}
                                                                    height="10px"
                                                                    baseBgColor="#e5e7eb" // Tailwind gray-200
                                                                    labelClassName="hidden" // Oculta el % si no lo querés
                                                                    isLabelVisible={false}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {isFocused && !isMobile ?
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();

                                                            if (problemResolvedId === problem.id && problemResolved && problemResolvedId > 0) {
                                                                unFocusInProblem(problem.id, problem.tagName);
                                                                return;
                                                            } else {
                                                                const inputsByProblem = document.querySelectorAll(`input[data-tagname="${problem.tagName}"]`);

                                                                inputsByProblem.forEach((input) => {
                                                                    if (input instanceof HTMLInputElement) {
                                                                        input.value = "";
                                                                    }
                                                                });
                                                                localStorage.clear();

                                                            }
                                                            setFocusedProblemId(null);
                                                            setProblemResolved(false);
                                                        }}
                                                        className="p-2 bg-red-100 hover:bg-red-200 hover:border-red-400 rounded-full transition-all"
                                                    >
                                                        <FaX className="text-red-400 hover:text-red-600 text-lg" />
                                                    </button>
                                                    : null}
                                            </div>
                                        </div>
                                        <div className={`${module.ProblemsNodesParentContainer} px-1`}>
                                            <div className={`${module.ProblemsNodeContainer}`}>{problem.form}</div>
                                            <div className={`${module.ProblemsNodeContainer}`}>{problem.graphNode}</div>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex transition-all duration-500 ease-in-out h-full pd-2 overflow ${showSolution && idProblemResolved === problem.id ? "w-full" : ""}`}
                                    >
                                        {
                                            problemResolvedId === problem.id && (
                                                <>
                                                    <div className={`flex`}>
                                                        {
                                                            !isMobile && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setShowSolution(!showSolution);
                                                                    }}
                                                                    className={`${module.ViewSolutionButton} w-[25px] h-full p-2 cursor-pointer bg-white transition-all duration-300 ease-in-out  text-center
                                                                            ${showSolution ? module.ButtonSolutionOpen : module.ButtonSolutionClose}`}
                                                                >
                                                                    <FaChevronLeft className={`transition-transform duration-300 ease-in-out ${showSolution ? 'rotate-180' : ''}`} />
                                                                </button>
                                                            )
                                                        }

                                                    </div>
                                                    {(showSolution && idProblemResolved === problem.id) ? (
                                                        <div style={{}} className='w-full h-full overflow-y-auto transition-all duration-300 ease-in-out'>
                                                            <button
                                                                className="absolute top-2 right-6 text-gray-500 hover:text-red-500"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowSolution(false);
                                                                }}
                                                            >
                                                                <FaX />
                                                            </button>
                                                            <div className='w-full h-full transition-all duration-300 ease-in-out'>
                                                                {problem.solution}
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section >
        </div >
    )
}

export default ProblemsGrid