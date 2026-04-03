import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react"
import Header from "./Header"
import { createIssueReport } from "../utils/reportStore";
import { CAMPUS_BLOCKS, normalizeCampusBlock } from "../utils/campusBlocks";
import { getCurrentUser } from "../utils/session";
import {
    BAIET_CAMPUS_CENTER,
    BAIET_MAP_OPTIONS,
    getBlockPoint,
} from "../utils/campusMap";

const Reportissue = () => {
    const [isfile, setisfile] = useState(null)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [block, setBlock] = useState(CAMPUS_BLOCKS[0]);
    const [spot, setSpot] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const [selectedPoint, setSelectedPoint] = useState(() => getBlockPoint(CAMPUS_BLOCKS[0]));
    const [locationMode, setLocationMode] = useState("block");
    const [locationStatus, setLocationStatus] = useState("Trying to detect your current location...");
    const handlefile = (e) => {
        const selectedffile = e.target.files[0]
        if (selectedffile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setisfile(typeof reader.result === "string" ? reader.result : null)
            }
            reader.readAsDataURL(selectedffile)
        }
        else {
            setisfile(null)
        }
    }
    const handleremove = () => {
        setisfile(null)
    }

    useEffect(() => {
        if (locationMode !== "gps") {
            setSelectedPoint(getBlockPoint(block))
            setLocationStatus(`Using ${block} center until browser location is available.`)
        }
    }, [block])

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationMode("block")
            setSelectedPoint(getBlockPoint(block))
            setLocationStatus("Browser location is unavailable. Using selected block center.")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setSelectedPoint({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setLocationMode("gps")
                setLocationStatus("Current device location tagged automatically.")
            },
            () => {
                setLocationMode("block")
                setSelectedPoint(getBlockPoint(block))
                setLocationStatus("Location permission denied. Using selected block center.")
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        )
    }, [])

    const detectCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationMode("block")
            setSelectedPoint(getBlockPoint(block))
            setLocationStatus("Browser location is unavailable. Using selected block center.")
            return
        }

        setLocationStatus("Refreshing current location...")
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setSelectedPoint({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setLocationMode("gps")
                setLocationStatus("Current device location tagged automatically.")
            },
            () => {
                setLocationMode("block")
                setSelectedPoint(getBlockPoint(block))
                setLocationStatus("Could not read current location. Using selected block center.")
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    }

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim() || !block.trim() || !selectedPoint) {
            setSubmitMessage("Please fill title, description, and block.");
            return;
        }

        const normalizedBlock = normalizeCampusBlock(block);
        const currentUser = getCurrentUser();

        try {
            const report = await createIssueReport({
                type: title.trim(),
                category: title.trim(),
                description: description.trim(),
                block: normalizedBlock,
                spot: spot.trim(),
                latitude: selectedPoint.lat,
                longitude: selectedPoint.lng,
                reporterId: currentUser?.id || "",
                reporterEmail: currentUser?.email || "",
                contactInfo: currentUser?.email || "",
                assigneeContact: "",
                images: isfile
                    ? [{ src: isfile, name: "uploaded-image.jpg" }]
                    : [{ src: "/backgroundimg.jpg", name: "no-image.jpg" }],
            });
            setSubmitMessage(`Report submitted successfully. ID: ${report.reportNumber}`);
            setTitle("");
            setDescription("");
            setBlock(CAMPUS_BLOCKS[0]);
            setSpot("");
            setSelectedPoint(getBlockPoint(CAMPUS_BLOCKS[0]));
            setisfile(null);
        } catch (error) {
            setSubmitMessage(error.message || "Unable to submit report.");
        }
    };

    return (
        <>
            <Header />
            <div className="reportissue">
                <div className="report-head">
                    <h1>Report Your Issue</h1>
                    <p>Describe the issue, choose the block, and we will auto-tag the complaint using your current device location.</p>
                </div>
                <div className="report-ctn">
                    <div className="report-form-side">
                        <div className="title-inp">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="desc-inp">
                            <label htmlFor="desc">Description</label>
                            <input type="text" id="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="loc-inp">
                            <label htmlFor="block">Block</label>
                            <select id="block" value={block} onChange={(e) => setBlock(e.target.value)}>
                                {CAMPUS_BLOCKS.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="loc-inp">
                            <label htmlFor="spot">Specific Spot (optional)</label>
                            <input
                                type="text"
                                id="spot"
                                placeholder="e.g. 2nd Floor Corridor"
                                value={spot}
                                onChange={(e) => setSpot(e.target.value)}
                            />
                        </div>
                        <div className="img-inp">
                            <label htmlFor="img">Image</label>
                            <input type="file" accept="image/*" onChange={handlefile} id="img" />
                        </div>
                        {isfile && (
                            <div className="img-prev">
                                <img src={isfile} alt="Preview" />
                                <button type="button" onClick={handleremove}>x</button>
                            </div>)}
                        <div className="emg-btn">
                            <input type="checkbox" id="img" />
                            <label htmlFor="emg">Mark As Emergency</label>
                        </div>
                        <div className="sub-btn">
                            <button type="button" onClick={handleSubmit}>Sumbit</button>
                        </div>
                    </div>

                    <div className="report-map-side">
                        <div className="map-picker-card">
                            <div className="map-picker-head">
                                <label>Auto-Tagged Campus Location</label>
                                <span>Location is captured from your device when permission is enabled.</span>
                            </div>
                            <div className="report-map-shell">
                                <LoadScript googleMapsApiKey="AIzaSyAg-DiGUEFgQYZYT2zgQ1JInN7vlx7O4cY">
                                    <GoogleMap
                                        mapContainerStyle={{ width: "100%", height: "100%" }}
                                        center={selectedPoint || BAIET_CAMPUS_CENTER}
                                        zoom={17}
                                        options={BAIET_MAP_OPTIONS}
                                    >
                                        {selectedPoint ? <Marker position={selectedPoint} /> : null}
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                            <div className="map-pin-summary">
                                <div>
                                    <strong>Location Source</strong>
                                    <span>{locationMode === "gps" ? "Current Device Location" : `${block} Block Center`}</span>
                                </div>
                                <div>
                                    <strong>Tagged Coordinates</strong>
                                    <span>
                                        {selectedPoint
                                            ? `${selectedPoint.lat.toFixed(6)}, ${selectedPoint.lng.toFixed(6)}`
                                            : "No location selected"}
                                    </span>
                                </div>
                            </div>
                            <p className="map-picker-note">
                                {locationStatus}
                            </p>
                            <button type="button" className="map-refresh-btn" onClick={detectCurrentLocation}>
                                Refresh Current Location
                            </button>
                        </div>
                    </div>
                    {submitMessage ? <p className="auth-alert">{submitMessage}</p> : null}
                </div>
            </div>
        </>
    )
}
export default Reportissue;
