import { useState } from "react"
import Header from "./Header"
import { getReports, saveReports } from "../utils/reportStore";

const Reportissue = () => {
    const [isfile, setisfile] = useState(null)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
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

    const handleSubmit = () => {
        if (!title.trim() || !description.trim() || !location.trim()) {
            setSubmitMessage("Please fill title, description and location.");
            return;
        }

        const reports = getReports();
        const newIndex = reports.length + 1;
        const reportId = `RPT-${String(10000 + newIndex).slice(-5)}`;
        const today = new Date().toISOString().slice(0, 10);

        const newReport = {
            reportNumber: reportId,
            date: today,
            type: title.trim(),
            category: title.trim(),
            status: "Pending",
            progress: 0,
            tone: "pending",
            location: location.trim(),
            block: location.split("-")[0]?.trim() || "Unknown Block",
            assignedWorker: "Team Allocation Pending",
            department: "Unassigned",
            ecoMember: "",
            contactInfo: "",
            internalNotes: "",
            description: description.trim(),
            timeline: [{ date: today, text: "Report created and queued" }],
            images: isfile
                ? [{ src: isfile, name: "uploaded-image.jpg" }]
                : [{ src: "/backgroundimg.jpg", name: "no-image.jpg" }],
        };

        saveReports([newReport, ...reports]);
        setSubmitMessage(`Report submitted successfully. ID: ${reportId}`);
        setTitle("");
        setDescription("");
        setLocation("");
        setisfile(null);
    };

    return (
        <>
            <Header />
            <div className="reportissue">
                <h1>Report Your Issue</h1>
                <div className="report-ctn">
                    <div className="title-inp">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="desc-inp">
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="loc-inp">
                        <label htmlFor="loc">Location</label>
                        <input type="text" id="loc" placeholder="Auto-fill Location" value={location} onChange={(e) => setLocation(e.target.value)} />
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
                        <button type="button" onClick={handleSubmit}>Sumbit</button>
                    </div>
                    {submitMessage ? <p className="auth-alert">{submitMessage}</p> : null}

                </div>
            </div>
        </>
    )
}
export default Reportissue;
