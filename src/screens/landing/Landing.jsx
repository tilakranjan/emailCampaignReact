import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import DateTimePicker from 'react-datetime-picker';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import {
    MessageBar,
    MessageBarType,
  } from 'office-ui-fabric-react';
import {Link} from 'react-router-dom'


import { connect } from 'react-redux'
import { ecAdd, clearAdd } from '../../redux/campaign/campaign.actions'
import { convertDate, convertTime, checkEmail } from '../../utils/utils';

import './page.css'

class Landing extends Component {
    state = {
        name:'',
        email:'',
        to:'',
        subject:'',
        body:'',
        date: [],
        errors: {
            email:'',
            to:'',
        },
        datePicker: [{id:1}],
        numOfDatePicker:1
    }

    handleChange = (e) => {
        this.setError(e.target.name,'')
        this.setState({[e.target.name]:e.target.value})
    }

    onChange = (d,i) => {
        const { date } = this.state
        let temp = [...date]
        if(i - 1 < date.length) {
            temp.splice(i-1,1,d)
        } else {
            temp.push(d)
        }
        return this.setState(() => ({date: temp}))
    }

    removeDate = (i) => {
        const { date } = this.state
        let temp = [...date]
            temp.splice(i,1)
        return this.setState(() => ({date: temp}))
    }

    handleSubmit = () => {
        const { name, email, to, subject, body, date } = this.state
        const emails = to.split(',')
        const invalidEmail = emails.filter(email => checkEmail(email.trim()))
        if(checkEmail(email.trim())) {
            return this.setError('email','Please provoide valid email.')
        }
        if(invalidEmail.length > 0) {
            return this.setError('to','Please provoide valid email(s).')
        }
        let dates = [];
        date.map(date => dates.push({
            date: convertDate(date),
            time: convertTime(date)
            }))
        this.props.ecAdd({
            senderName:name,
            senderEmail:email,
            emailTo:emails,
            emailSubject:subject,
            emailBody:body,
            emailSchedule: dates
        })
    }

    setError = (name,msg) => this.setState((state)=>({errors:{...state.errors,[name]:msg}}))
    componentWillUnmount() {
        this.props.clearAdd()
    }

    componentDidUpdate(prevProps) {
        const { data }= this.props

        if(prevProps.data !== data) {
            this.setState({
                id:'',
                email:'', 
            })
        }
    }

    displayeDatePicker = () => {
        const { date, datePicker } = this.state

        return datePicker.map((data,i) => {
            return (
            <div style={{margin:'.4em 0'}} key={data.id}>
            <DateTimePicker
                value={date[i]}
                onChange={(date)=>this.onChange(date,data.id)}   
            />
            <button className="addBtn" disabled={datePicker.length > i + 1 || !date[i]} onClick={date => this.addDatePicker(date,i)}>Add</button>
            <button className="addBtn remove" disabled={i < 1} onClick={()=> this.removeDatePicker(data.id, i)}>Remove</button>
            </div>
        )})
    }

    addDatePicker = () => this.setState(state => ({datePicker: [...state.datePicker,{id:state.numOfDatePicker + 1}],numOfDatePicker: state.numOfDatePicker + 1}))
    removeDatePicker = (i,idx) => {
        this.removeDate(idx)
        const { datePicker } = this.state
        let temp = [...datePicker]
        const index = temp.findIndex(item => item.id === i)
        temp.splice(index,1)
        return this.setState(() => ({datePicker: temp}))
    }

render() {
  const { name, email, to, subject, body, date, errors } = this.state
  const { submitSuccess, submitFail, submitting} = this.props
  return (
    <div className="_page">
    <h2 style={{margin:'1em .2em 0 .2em'}}>Add an email campaign</h2>
    {(submitSuccess || submitFail) &&
    <div style={{margin:'1em .2em 0 .2em'}}> 
        <MessageBar
        messageBarType={submitFail ? MessageBarType.error : MessageBarType.success}
        isMultiline={false}
        >
            {(submitSuccess && submitSuccess.message) || submitFail}
            {submitSuccess &&
            <>
            <p style={{margin:'.2em 0'}}>Campaign Id: {submitSuccess.campaignId}</p> 
            </>
            }
        </MessageBar>        
    </div>}
    <div style={{padding:'1em'}}>
               
        <TextField 
            name="name" 
            label="Sender Name" 
            value={name} 
            onChange={this.handleChange} 
            required 
            autoFocus={true} 
        />
        <TextField 
            label="Sender Email" 
            errorMessage={errors.email} 
            required
            name="email"
            onChange={this.handleChange}
        />
        <TextField 
            label="Email To"
            name="to"
            onChange={this.handleChange} 
            errorMessage={errors.to} 
            required />
        <TextField 
            label="Email Subject"
            name="subject"
            onChange={this.handleChange} 
            required/>
        <TextField 
            label="Email Body"
            name="body"
            onChange={this.handleChange} 
            multiline 
            resizable={false} 
            required/>

        <Label htmlFor={'date-time-picker'} required >Schedule</Label>
            {this.displayeDatePicker()}
        <p style={{color:'#999',fontSize:'.8em',fontWeight:'300'}}>Note: A list of emails can be provided as receiver email by using comma to seperate between email.</p>
        
    </div>
    <div style={{padding:'1em',margin:'0 auto'}}>
        <DefaultButton
            toggle
            checked={false}
            text={submitting ? <Spinner size={SpinnerSize.xSmall} /> : 'Submit'}
            onClick={this.handleSubmit}
            allowDisabledFocus
            disabled={!name.trim() || !email.trim() || !to.trim() || !subject.trim() || !body.trim() || date.length === 0 || submitting}
            style={{width:'100%'}}
        />
    </div>
    <div style={{padding:'1em',textAlign:'right'}}>
    <Link to="/check/campaign">
        Already have a campaign ? Check Here!
    </Link>
    </div>
    </div>
  )}
}

function mapStateToProps({
    addEc:{
        submitFail,
        submitSuccess,
        submitting}
    }) {
    return {
        submitFail,
        submitSuccess,
        submitting  
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ecAdd: (data) => dispatch(ecAdd({...data})),
        clearAdd: () => dispatch(clearAdd())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Landing);
