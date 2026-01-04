
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Header from "./Header";
 const INITAIL_PROBLEM=[
    {
        img:"public/broken street light.jpg",
        problem:"Street Light Broken",
        date:"complaint: 3 Week ago"

    },
    {   img:"public/garbage overflow.jpg",
        problem:"Garbage Overflow",
        date:"complaint: 4 Week ago"
    }
]
const Transparencymap=()=>{
    const center={
        lat:11.2321,
        lng:77.1067
    }
        return(
            <>
            <Header/>
            <div className="map-ctn">
          <LoadScript googleMapsApiKey="AIzaSyAg-DiGUEFgQYZYT2zgQ1JInN7vlx7O4cY" >
            <GoogleMap mapContainerClassName="map-container"
            center={center}
            zoom={12}>
                <Marker position={center}/>

            </GoogleMap>

          </LoadScript>
          </div>
          <div className="card-ctn">
                <h2>Neighbourhood Complaints</h2>
          <div className="card">
          {INITAIL_PROBLEM.map((el,i)=>(
            <div className="cards"> 
            <img src={el.img} />
             <h3>{el.problem}</h3>
             <span>{el.date}</span>
             </div>
          ))}
         <button>View More Complaints</button>
          </div>
          </div>
          </>
        );
    }
export default Transparencymap;