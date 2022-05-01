import TopHeader from "../components/TopHeader"
import Dashboard from "../components/Dashboard"

const navigation = [
    { name: 'Overview', href: '/' },
    { name: 'Graph', href: '/graph' },
    { name: 'Map', href: '/map' },
  ]


export default function Graph() {
    return (
    <Dashboard>
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Graph</span>{' '}
                    <span className="block text-[#C416EC] xl:inline">Graph</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Kanda data has been collected from local stations which are equiped with weather sensors connected to the Internet. All the data are store into the Telos Blockchain.
                    The blue markers are the Telos node of the blockchain and the gray markers are the sensors.
                    
                </p>
                <div className="mt-10 sm:mt-16 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                    <a
                        href="https://kandaweather.org"
                        target="_blank"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#C416EC] hover:bg-[#8C01AA] md:py-4 md:text-lg md:px-10"
                    >
                        Graph
                    </a>
                    </div>
                </div>
            </div>
        </main>
    </Dashboard>
            
    )
}