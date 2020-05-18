import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import {
    MessageBar,
    MessageBarType,
  } from 'office-ui-fabric-react';
import {Link} from 'react-router-dom'


import { connect } from 'react-redux'
import { ecCheck, clearCheck } from '../../redux/campaign/campaign.actions'

import Camapign from '../../components/Campaign/Campaign'
import { checkEmail } from '../../utils/utils'
import '../landing/page.css'

class CheckCampaign extends Component {
    state = {
        id:'',
        email:'',
        err: {
            email:'',
        }
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

    handleChange = (e) => {
        this.setError(e.target.name,'')
        this.setState({[e.target.name]:e.target.value})
    }


    handleSubmit = () => {
        const { id, email } = this.state
        if(checkEmail(email.trim())) {
            return this.setError('email','Please provoide valid email.')
        }

        this.props.ecCheck({
            campaignId:id,
            senderEmail:email,
        })
    }


    setError = (name,msg) => this.setState((state)=>({err:{...state.errors,[name]:msg}}))

    componentWillUnmount() {
        this.props.clearCheck()
    }

render() {
  const { id, email, err } = this.state
  const { data, errors, isLoading }= this.props
  return (
    <div className="_page">
    <h2 style={{margin:'1em .2em 0 .2em'}}>Check Your Campaign</h2>
    {(errors || data) &&
    <div style={{margin:'1em .2em 0 .2em'}}> 
        <MessageBar
        messageBarType={errors ? MessageBarType.error : MessageBarType.success}
        isMultiline={false}
        >
            {errors || data.message}
            {data &&
            <>
            <p style={{margin:'.2em 0'}}>Campaign Id: {data.campaignId}</p> 
            </>
            }
        </MessageBar>        
    </div>}
    <div style={{padding:'1em'}}>
               
        <TextField 
            name="id" 
            label="Campaign Id" 
            value={id} 
            onChange={this.handleChange} 
            required 
            autoFocus={true} 
        />
        <TextField 
            label="Sender Email" 
            value={email} 
            errorMessage={err.email} 
            required
            name="email"
            onChange={this.handleChange}
        />
    </div>
    <div style={{padding:'1em',margin:'0 auto'}}>
        <DefaultButton
            toggle
            checked={false}
            text={isLoading ? <Spinner size={SpinnerSize.xSmall} /> : 'Submit'}
            onClick={this.handleSubmit}
            allowDisabledFocus
            disabled={!id.trim() || !email.trim() || isLoading}
            style={{width:'100%'}}
        />
    </div>
    <div style={{padding:'1em',textAlign:'right'}}>
    <Link to="/">
        Don't have a campaign yet ? Create Here!
    </Link>
    </div>
    {data && <Camapign data={data} />}
    </div>
  )}
}

function mapStateToProps({
    checkEc:{
        data,
        errors,
        isLoading
    }}) {
    return {
        data,
        errors,
        isLoading 
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ecCheck: (data) => dispatch(ecCheck({...data})),
        clearCheck: () => dispatch(clearCheck())

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckCampaign);
