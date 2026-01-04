import { useState } from "react"
import Header from "./Header"

const Reportissue = () => {
    const [isfile, setisfile] = useState(null)
    const handlefile = (e) => {
        const selectedffile = e.target.files[0]
        if (selectedffile) {
            setisfile(URL.createObjectURL(selectedffile))
        }
        else {
            setisfile(null)
        }
    }
    const handleremove = () => {
        setisfile(null)
    }
    return (
        <>
            <Header />
            <div className="reportissue">
                <h1>Report Your Issue</h1>
                <div className="report-ctn">
                    <div className="title-inp">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" />
                    </div>
                    <div className="desc-inp">
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" />
                    </div>
                    <div className="loc-inp">
                        <label htmlFor="loc">Location</label>
                        <input type="text" id="loc" placeholder="Auto-fill Location" />
                    </div>
                    <div className="img-inp">
                        <label htmlFor="img">Image</label>
                        <input type="file" accept="image/*" onChange={handlefile} id="img" />
                    </div>
                    {isfile && (
                        <div className="img-prev">
                            <img src={isfile} alt="Preview" />
                            <button onClick={handleremove}>x</button>
                        </div>)}
                    <div className="emg-btn">
                        <input type="checkbox" id="img" />
                        <label htmlFor="emg">Mark As Emergency</label>
                    </div>
                    <div className="sub-btn">
                        <button>Sumbit</button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Reportissue;