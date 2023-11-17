const FooterPage = () => {

    return (
        <footer className=" bg-color_navbar">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-white sm:text-center ">© 2023 <a href="#" className="hover:underline">CZIV</a>. Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">

                        <a href="#" className="text-gray-500 hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterPage