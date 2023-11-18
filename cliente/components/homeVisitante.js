import { Nunito } from "next/font/google"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

const nunito = Nunito({
    subsets: ['latin-ext'],
    weight: '900'
})


const HomeVisitante = () => {

    const { data: session, status } = useSession();
    const [visitanteInfo, setVisitanteInfo] = useState([]);

    async function obtDatosVisitante(sesionUser) {
        try {
            if (sesionUser) {
                console.log(sesionUser)
                const response = await axios.get(`http://localhost:8080/datosvisitante/${sesionUser}`);
                const jsonDatos = await response.data;
                console.log(jsonDatos);
                setVisitanteInfo(jsonDatos);
                return jsonDatos
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            // La sesión está disponible
            obtDatosVisitante(session.user)
        }
    }, [session]);

    return (
        <>
            <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-8 pb-14">
                <div className={`${nunito.className} mt-5 flex justify-center items-center lg:col-start-2 lg:col-span-2 sm:col-span-1`}>
                    <div className="bg-gray-200 rounded-lg min-h-96 text-center p-4">
                        <div>
                            <h1 className="text-5xl mb-8 text-pink-800">¿En qué se convierte tu ayuda?</h1>
                        </div>
                        <span className="text-2xl text-pink-900"> Cada aporte que hagas se invertira en 4 instancias esenciales para nuestros residentes: Alimentos y cuidados, salud, mejoras en infraestructura y colaboración a la problemática social</span>
                    </div>
                </div>
                <div className={`${nunito.className} mt-5 flex justify-center lg:col-start-4 lg:col-span-1 sm:col-span-1`}>
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
            <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-8 bg-color_navbar pb-10">
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-2 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-xl mb-4 pt-5 text-white">Fundación Las Rosas</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a target="blank" href="https://www.fundacionlasrosas.cl">
                                <img src="/fund.svg" alt="" className="p-8" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-3 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-xl mb-4 pt-5 text-white">Ver bitacora del residente</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href={`/ficha_residente?rut_res=${visitanteInfo.rut_res}`}>
                                <img src="/undraw_diary_re_4jpc.svg" alt="" className="p-10" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${nunito.className} lg:row-start-1 lg:col-start-4 lg:col-span-1 flex justify-center items-center`}>
                    <div className="rounded-lg min-h-96 text-center p-4">
                        <div className="">
                            <h1 className="text-xl mb-4 pt-5 text-white">Reserva una visita</h1>
                        </div>
                        <div className="bg-white w-[300px] h-[300px] flex justify-center items-center rounded-2xl shadow-lg hover:scale-105 hover:duration-300 ease-in-out">
                            <a href="/reserva">
                                <img src="/booking.svg" alt="" className="p-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-8 pb-10">

            </div>
        </>
    )
}

export default HomeVisitante