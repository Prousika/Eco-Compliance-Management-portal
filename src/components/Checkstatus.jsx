import { FaFile } from "react-icons/fa"
import Header from "./Header"
const INITAIL_DATA=[
  {
    Date:"29-9-25",
    Type:"Pothole",
    Status:"Ongoing",
    Progress:"75%"
  },
  {
    Date:"29-9-25",
    Type:"Pothole",
    Status:"Ongoing",
    Progress:"75%"
  }
]
const Checkstatus=()=>{
    return(
    <>
    <Header/>
    <div className="checkstatus">
        <div className="checkstatus-cnt">
            <div className="filter-action-ctn">
                <h3>Filter & Action</h3>
                <div className="sumbit-newreport-btn">
                  <button>+   Submit New Report</button>
                </div>
                <div className="filter-input">
                    <input type="text" />
                </div>
                <div className="filterby-status">
                    <h3>Status</h3>
                  <div className="status-ongoing">
                    <span>🟡Ongoing</span>
                    </div>
                  <div className="status-completed">
                   <span> 🟢Completed</span>
                   </div>
                  <div className="status-pending">
                    <span>🔴Pending</span>
                    </div>
                </div>
            </div>
        </div>
        <section className="recent-report">
          <div className="recent-report-ctn">
              <h2>Your Recent Report </h2>
              <div className="abt-recent-report">
                <p>Track progress and details of your report </p>
              </div>
              <div className="data-recent-report">
                <table className="Table-ctn">
                  <thead className="table-hdr">
                    <tr className="hdr-tr">
                      <th>Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-data">
                    {INITAIL_DATA.map((el,index)=>{
                    return(
                    <tr className="data-tr">
                      <td className="date-data">{el.Date}</td>
                      <td className="typeof-data">{el.Type}</td>
                      <td className="status-data"><div className="status-data-clr">{el.Status}</div></td>
                      <td className="progress-data"><div className="progress-data-clr">{el.Progress}</div></td>
                      <td className="action-data"><button className="action-data-btn">View</button></td>
                    </tr>)})}
                  </tbody>
                </table>
              </div>
          </div>
        </section>
        <section className="checkstatus-details">
          <div className="details-ctn">
            <div className="details-hdr">
              <h4>Summary</h4>
              <h4>Feedback</h4>
            </div>
            <div className="details-data">
             <div className="report-details-num">
               <span><FaFile/>Report Details:</span>
             </div>
             <div className="status-rpt">
              <span>Status:</span>
             </div>
             <div className="details-summary">
              <h3>Summary</h3>
              <div className="summary-data">
                <div className="summary-date">
               <span>Date:</span>
               </div>
               <div className="summary-type">
              <span>Type:</span>
               </div>
               <div className="summary-loc">
                <span>Location:</span>
               </div>
               <div className="summary-ass-name">
                <span>Assigned Worker:</span>
               </div>
               <div className="summary-contact">
              <span>Contact:</span>
               </div>
              </div>
             </div>
             <div className="details-tracker">
                 <div className="details-trk-hdr">
                  <h3>Update</h3>
                 </div>
                 <div className="details-updt">
                    <h4>30-10-25</h4>
                    <span>.Worker Alllocated</span>
                 </div>
             </div>
              <div className="details-description">
               <div className="description-hdr">
                <h3>Description</h3>
               </div>
               <div className="description-content">
                <p>Pothole Found Near School Need Immediate Action</p>
               </div>
              </div>
              <div className="details-attachment">
                <div className="attachment-hdr">
                  <h3>Attachments</h3>
                </div>
              <div className="attachment-pic"> 
                
              </div>
              </div>
            </div>
          </div>

        </section>
    </div>
    </>

    )
}
export default Checkstatus;