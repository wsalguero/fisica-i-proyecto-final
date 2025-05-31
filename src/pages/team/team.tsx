const integrantes = [
    {
        nombre: "Franklin Omar Ramos Gutiérrez",
        carne: "6990-24-2253",
        correo: "framosg3@miumg.edu.gt",
        rol: "Diseñador gráfico / UX",
        descripcion: "Diseñó los mockups y definió el aspecto visual de la aplicación.",
        aprendizaje: "Aprendió sobre diseño UI adaptable y trabajo colaborativo con desarrolladores.",
    },
    {
        nombre: "Joseph Alexander Hidalgo de Paz",
        carne: "6990-24-4057",
        correo: "jhidalgo1@miumg.edu.gt",
        rol: "Maquetador HTML",
        descripcion: "Se encargó de construir la estructura principal en HTML.",
        aprendizaje: "Fortaleció sus conocimientos en semántica HTML y trabajo en equipo.",
    },
    {
        nombre: "Mario Alejandro Cosigua Pérez",
        carne: "6990-24-3754",
        correo: "mcosiguap@miumg.edu.gt",
        rol: "Tester",
        descripcion: "Realizó pruebas técnicas para validar que todo funcionara correctamente.",
        aprendizaje: "Aprendió sobre pruebas funcionales y detección de errores.",
    },
    {
        nombre: "Alex Daniel Estrada Muñoz",
        carne: "6990-24-3883",
        correo: "aestradam17@miumg.edu.gt",
        rol: "Tester",
        descripcion: "Ayudó en la revisión de lógica y pruebas técnicas de los módulos.",
        aprendizaje: "Aprendió a identificar bugs y trabajar con componentes dinámicos.",
    },
    {
        nombre: "Dorian Iván García Bojorquez",
        carne: "6990-24-25742",
        correo: "dgarciab20@miumg.edu.gt",
        rol: "Desarrollador de lógica",
        descripcion: "Implementó funciones clave junto al desarrollador principal.",
        aprendizaje: "Aprendió sobre integración de módulos y control de estado.",
    },
    {
        nombre: "William Enrique Salguero Camey",
        carne: "6990-24-3465",
        correo: "wsalguero2@miumg.edu.gt",
        rol: "Desarrollador principal",
        descripcion: "Se encargó de toda la programación, animaciones, diseño funcional, y lógica general.",
        aprendizaje: "Mejoró su dominio en React, GSAP y Tailwind, liderando el desarrollo completo.",
    },
]

const Team = () => {
    return (
        <section className="min-h-screen px-4 py-20 bg-[#0b0e2a] text-white">
            <h1 className="text-center text-4xl font-bold mb-12 drop-shadow-md text-purple-100">
                Nuestro Equipo
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrantes.map((persona, i) => (
                    <div
                        key={i}
                        className="bg-white/10 border border-purple-500 p-6 rounded-xl shadow-lg hover:shadow-purple-400 transition"
                    >
                        <h2 className="text-xl font-bold text-purple-200 mb-1">{persona.nombre}</h2>
                        <p className="text-sm text-purple-300 mb-1">{persona.rol}</p>
                        <p className="text-sm text-purple-400 mb-2">{persona.carne}</p>
                        <p className="text-sm text-purple-300 italic mb-2">{persona.descripcion}</p>
                        <p className="text-sm text-purple-200">
                            <span className="font-semibold text-white">Aprendizaje:</span> {persona.aprendizaje}
                        </p>
                        <p className="text-xs text-purple-500 mt-4">{persona.correo}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Team
