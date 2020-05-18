import React from 'react';
import './Campaign.css'

export default function Campaign(res) {
    console.log(res)
    const {campaignId, data: { emailBody, emailSchedule, emailSubject, emailTo, senderEmail, senderName }} = res.data
    const displayEmails = emails => {
        let allEmail = ''
        emails.map(email => allEmail = `${allEmail ? `${allEmail}, ${email}` : email}`)
        console.log(emails)
        return allEmail
    }
    const displayDate = date => {
       return date.map(data => (
        <div className="block">
           <div>
                <span className="title">Date:</span>
               <span className="date"> {data.date}</span>
           </div>
           <div>
                <span className="title">Time:</span>
               <span className="date"> {data.time}</span>
           </div>
           </div>
       ))
    }
  return (
    <div style={{padding:'1em',margin:'0 auto'}}>
        <div  className="campaign">
           <div className="block">
               <span className="title">Campaign Id:</span>
               <span className="body"> {campaignId}</span>
           </div>
           <div className="block">
               <span className="title">Name:</span>
               <span className="body"> {senderName}</span>
           </div>
           <div className="block">
               <span className="title">Email:</span>
               <span className="body"> {senderEmail}</span>
           </div>
          <div className="block">
               <span className="title">To:</span>
               <span className="body"> {displayEmails(emailTo)}</span>
           </div>
           <div className="block">
               <span className="title">Subject:</span>
               <span className="body"> {emailSubject}</span>
           </div>
           <div className="block">
                <span className="title">Body:</span>
               <span className="body"> {emailBody}</span>
           </div>
           <div className="block">
               <span className="title">Schedule on:</span>
                {displayDate(emailSchedule)}
           </div>
        </div>
    </div>
  )
}
