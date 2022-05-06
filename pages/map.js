import Dashboard from "../components/Dashboard"

export default function Map() {
    return (
        <Dashboard>
            <main className="rounded overflow-hidden shadow-lg border border-gray-200 bg-white">
                <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">Map</span>{' '}
                        <span className="block text-[#C416EC] xl:inline">Map</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Kanda data has been collected from local stations which are equiped with weather sensors connected to the Internet. All the data are store into the Telos Blockchain.
                        The blue markers are the Telos node of the blockchain and the gray markers are the sensors.
                        
                    </p>
                    <div className="mt-10 sm:mt-16 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">

                        </div>
                    </div>
                </div>
            </main>
        </Dashboard>
    )
}