// import React, { FC } from 'react'

// interface IForm {
//     onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//     problem_id: number;
// }


// interface IGraphNode {
//     radio?: any
//     rpm?: any
//     onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
//     onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void
//     onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void
//     onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
//     onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
//     problem_id?: number
// }

// interface ISolution {
//     radio: number
//     rpm: number
//     vARad: string
//     vALin: string
//     f: number
//     onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
//     onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void
//     onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void
//     onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
// }

// const F_by_RxRPM: FC & { Form: FC<IForm>, GraphNode: FC<IGraphNode>, Solution: FC<ISolution> } = () => {
//     return (
//         <></>
//     )
// }

// F_by_RxRPM.Form = ({ onSubmit, problem_id }) => {
//     return (
//         <form onSubmit={onSubmit} className="flex flex-col gap-4">
//             <div>
//                 <label htmlFor="radio">Radio (m):</label>
//                 <input type="number" id="radio" name="radio" required />
//             </div>
//             <div>
//                 <label htmlFor="rpm">RPM:</label>
//                 <input type="number" id="rpm" name="rpm" required />
//             </div>
//             <button type="submit">Calcular</button>
//         </form>
//     )
// }

// export default F_by_RxRPM