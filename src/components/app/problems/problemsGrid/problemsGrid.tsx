import { FC, useEffect, useState } from 'react'
import module from './problemsGrid.module.css'
import { FaChevronLeft, FaSearch } from 'react-icons/fa'
import ProgressBar from '@ramonak/react-progress-bar'
import { FaTableCells, FaX } from 'react-icons/fa6'
import { MdTableRows } from 'react-icons/md'
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
    calcs: string[],
    tagName: string;
}


interface IProblemsGrid {
    problems: IProblem[]
    sekeerValue?: string[]
    sortBy?: string
    pageSize: number
    idProblemResolved: number
}

const ProblemsGrid: FC<IProblemsGrid> = ({ problems, idProblemResolved }) => {

    const [typeView, setTypeView] = useState<"cells" | "rows">("rows")

    const [isFocusInSeeker, setIsFocusInSeeker] = useState(false)
    const [cleanSekeer, setCleanSeeker] = useState(false);
    const [focusedProblemId, setFocusedProblemId] = useState<number | null>(null);
    const [problemResolved, setProblemResolved] = useState<boolean>(false);
    const [showSolution, setShowSolution] = useState(false);
    const [problemResolvedId, setProblemResolvedId] = useState<number>(0);

    useEffect(() => {
        const sekeer = document.getElementById("SekeerInput") as HTMLInputElement;
        sekeer.value = ""
        setIsFocusInSeeker(false)


    }, [cleanSekeer])

    const handleInputSekeer = () => {
        setIsFocusInSeeker(true)
        setCleanSeeker(false)
    }


    const unFocusInProblem = (focusedProblemId: number, tagName: string) => {

        if (problemResolvedId !== focusedProblemId || problemResolved || problemResolvedId > 0) {

            Swal.fire({
                title: '¿Quieres salir de este problema?',
                text: 'Deberas ingresar los datos de nuevo.',
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
                    return;
                }
            });
        } else {
            setFocusedProblemId(null)
            setProblemResolved(false)
        }
    }

    return (
        <div className='w-full h-full'>
            <div className={`${module.ProblemsFilter} flex flex-wrap items-center justify-between bg-white shadow-sm rounded p-4 gap-4`}>
                <ul className='flex gap-4'>
                    <li className={`bg-gray-200 rounded-l p-2 border border-gray-300`}>
                        <button className={`text-gray-500 hover:text-gray-700`} onClick={() => (setTypeView("cells"))}><FaTableCells /></button>
                    </li>
                    <li className={`bg-white rounded-l p-2 border border-gray-300`}>
                        <button className={`text-gray-500 hover:text-gray-700`} onClick={() => (setTypeView("rows"))}><MdTableRows /></button>
                    </li>
                </ul>

                <div className={`flex rounded bg-white shadow-sm justify-end`} id="ProblemsSeeker">
                    <div className='flex items-center justify-center'>
                        <input type="text" placeholder="Search" className={``} onInput={() => handleInputSekeer()} id="SekeerInput" />

                        {isFocusInSeeker ?

                            <a
                                className={`bg-white rounded-l border border-gray-300 p-2 hover:bg-gray-50`}
                                onClick={() => setCleanSeeker(true)}
                                type='button'
                            >
                                <FaX className={`text-gray-400 hover:text-gray-500 `} />
                            </a>
                            :
                            <a
                                className={`bg-white rounded-l border border-gray-300 p-2 hover:bg-gray-50`}
                                type='button'
                            >
                                <FaSearch className={`text-gray-400 hover:text-gray-500`} />
                            </a>
                        }
                    </div>
                </div>
            </div>

            <section id='ProblemsGrid'>

                {typeView === "cells" && (
                    <>
                        <table>
                            <tbody>
                                {problems.map((problem, index) => (
                                    <tr key={index}>
                                        <td className={``}>
                                            <div className={``}>
                                                <div className={``}>{problem.title}</div>
                                                <div className={``}>{problem.description}</div>
                                                <div className={``}>Dificulty: {problem.dificulty}</div>
                                                <button onClick={problem.functionToResolve} className={`bg-blue-500 text-white rounded p-2`}>Resolve</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {typeView === "rows" && (
                    <div className={``}>
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
                                    className={`relative flex flex-col shadow-sm rounded transition-all duration-300 ease-in-out h-[60vh] ${isFocused ? module.problemFocused : module.problemNoFocus} `}
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
                                            ${showSolution && idProblemResolved === problem.id ? "hidden" : ""}`
                                        }

                                            style={{
                                                width: problemResolvedId === problem.id && problemResolved ? "calc(100% - 25px)" : "100%",
                                            }}

                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <div className="w-1/2">
                                                    <h1 className="text-gray-800">{problem.title}</h1>
                                                    <p>{problem.description}</p>
                                                </div>
                                                <div className="text-gray-500 flex items-center gap-2">
                                                    <ProgressBar completed={problem.dificulty} maxCompleted={100} />

                                                    {isFocused && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                unFocusInProblem(problem.id, problem.tagName);
                                                            }}
                                                            className="rounded p-2 cursor-pointer"
                                                        >
                                                            <FaX className="text-red-400 hover:text-red-500" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`${module.ProblemsNodesParentContainer} mt-4`}>
                                                <div className={`${module.ProblemsNodeContainer}`}>{problem.form}</div>
                                                <div className={`${module.ProblemsNodeContainer}`}>{problem.graphNode}</div>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex transition-all duration-500 ease-in-out h-full ${showSolution && idProblemResolved === problem.id ? "w-full" : ""}`}
                                        >
                                            {
                                                problemResolvedId === problem.id && (
                                                    <>
                                                        <div className={`flex`}>
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
                )
                }
            </section >
        </div >
    )
}

export default ProblemsGrid