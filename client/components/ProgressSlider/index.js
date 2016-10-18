import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProfileView} from 'components/ProfileView';
var util = require('utils/request');

export class ProgressSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getProgressData(profile_id){
        var formState = this;
        var param = {action: 'progress', profile_id: profile_id}
        util.getSetData(param, function (data) {
            if (data.status == "success") {
                formState.setState({
                    progressbar: data.progress
                })
                return true;
            }
        });
    }

    componentDidMount() {
       var profile_id = this.props.profileId;
        this.getProgressData(profile_id);

    }

   shouldComponentUpdate(nextProps, nextState) {
       if (nextProps.stateUpdate) {
           var profile_id = nextProps.profileId;
           this.getProgressData(profile_id);
       }
      // return nextState.count !== this.state.count;
      return true;
   }





    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <h4>Progress</h4>
                    <div className="progress">
                        <div className="progress-bar"  style={{width:(this.state.progressbar)+'%'}}
                             data-progress={(this.state.progressbar)+'%'}></div>
                    </div>
                </div>
            </div>

        )
}}
