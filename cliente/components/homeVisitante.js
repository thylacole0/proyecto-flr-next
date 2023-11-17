import { Nunito } from "next/font/google"

const nunito = Nunito({
    subsets: ['latin-ext'],
    weight: '900'
})


const HomeVisitante = () => {
    return (
        <div className="grid grid-cols-5">
            <div className={`${nunito.className} mt-5 flex justify-center items-center col-start-2 col-span-2`}>
                <div className="bg-gray-200 rounded-lg min-h-96 text-center p-4">
                    <div>
                        <h1 className="text-5xl mb-8">¿En qué se convierte tu ayuda?</h1>
                    </div>
                    <span className="text-2xl"> Cada aporte que hagas se invertira en 4 instancias esenciales para nuestros residentes: Alimentos y cuidados, salud, mejoras en infraestructura y colaboración a la problemática social</span>
                </div>
            </div>
            <div className={`${nunito.className} mt-5 flex justify-center col-start-4 col-span-1`}>
                <div className="bg-white rounded-lg min-h-96 text-center p-4 shadow-2xl w-[400px] hover:scale-105 hover:duration-300 ease-in-out">
                    <div className="mb-10 p-2">
                        <h1 className="text-4xl sm:text-5xl font-bold text-pink-800">Donar</h1>
                        <h1 className="text-4xl sm:text-5xl font-bold text-pink-900">No Duele</h1>
                    </div>
                    <div>
                        <h2 className="text-3xl sm:text-4xl text-pink-800">Colecta</h2>
                        <h2 className="text-3xl sm:text-4xl text-pink-800 mb-3">Nacional 2023</h2>
                        <h2 className="text-xl sm:text-2xl mb-10">1,2 y 3 de diciembre</h2>
                        <a className="text-lg sm:text-xl hover:text-pink-800 border-b-2 border-black hover:border-pink-800" href="https://www.fundacionlasrosas.cl/colecta/" target="blank">Haz tu donación aqui</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeVisitante