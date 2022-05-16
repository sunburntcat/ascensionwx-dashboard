import Dashboard from "../components/Dashboard"
// import Overview from "../components/Overview"
import dynamic from 'next/dynamic';
const MapOverview = dynamic(() => import("../components/MapOverview"), {
    loading: () => "Loading...",
    ssr: false
  });

export default function Map() {
    
    return (
        <div className="justify-center">
            <Dashboard>
                <h1 className="mt-10 text-center text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block text-[#C416EC] xl:inline">Kanda Weather Stations</span>{' '}
                    <span className="block xl:inline">in the world.</span>
                </h1>

                
            </Dashboard>
            <main className="w-8/12 h-[40rem] mt-10 ml-auto mr-auto rounded  shadow-lg border border-gray-200 bg-white">
                <MapOverview className={""}/>
            </main>
            <br/>
        </div>
        
    )
} 