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
    calcs: string[]
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

    const unFocusInProblem = (focusedProblemId: number) => {

        if (problemResolved && problemResolvedId !== focusedProblemId) {

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
                    // Swal.fire('¡Eliminado!', 'Tu elemento ha sido eliminado.', 'success');
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
                                href='javascript:void()'
                                type='button'
                            >
                                <FaX className={`text-gray-400 hover:text-gray-500 `} />
                            </a>
                            :
                            <a
                                className={`bg-white rounded-l border border-gray-300 p-2 hover:bg-gray-50`}
                                href='javascript:void()'
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
                                    className={`relative flex flex-col bg-white shadow-sm rounded p-4 m-2 transition-all duration-300 ease-in-out  ${isFocused ? module.problemFocused : module.problemRow}`}
                                    onClick={() => setFocusedProblemId(problem.id)}
                                >

                                    <div className={`$`}>
                                        <div>
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
                                                                unFocusInProblem(problem.id);
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

                                                {(showSolution && idProblemResolved === problem.id) ? (
                                                    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 p-6 rounded shadow-2xl z-50 flex flex-col items-center justify-center">
                                                        <button
                                                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowSolution(false);
                                                            }}
                                                        >
                                                            <FaX />
                                                        </button>
                                                        {problem.solution}
                                                    </div>

                                                ) : null}

                                            </div>
                                        </div>
                                        {
                                            problemResolvedId === problem.id && (
                                                <div>
                                                    <button
                                                        className="w-[25px] rounded p-2 cursor-pointer bg-gray-200 hover:bg-gray-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setShowSolution(!showSolution);
                                                        }}
                                                    >
                                                        <FaChevronLeft />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    )
}

export default ProblemsGrid