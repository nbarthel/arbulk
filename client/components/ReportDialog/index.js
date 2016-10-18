/**
* A link to a certain page, an anchor tag
*/
import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var util = require('utils/request');
import cookie from 'react-cookie';

export class ReportDialog extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        report : '',
        report_text : '',
        resultMsg : ''
    }
  }

  handleChange(e) {
    this.setState({report: e.target.value});
    if(e.target.value != ""){
      this.setState({report_text: ""});
    }
  };

  reportSend(){
    var formState = this;
    if(formState.state.report == ""){
        formState.setState({report_text: "Required"});
        return;
     }
     var params = {action : 'report',media_id:this.props.media_id,user_id : cookie.load('userId'),reason : formState.state.report}
     util.getSetData(params,function (data) {console.log(data);
        formState.setState({
          resultMsg : data.data
        })
     });
  }

  Close(){
    this.props.close();
    this.state = {
      report : '',
      report_text : '',
      resultMsg : ''
  }
}

render() {
return(
      <Dialog modal={false} open = {this.props.open} autoScrollBodyContent={true}>
        <div className="reportDialogUser">
        {this.state.resultMsg != "" && <div className="sucess_ep">{this.state.resultMsg}</div> }
          <p>Report Media</p>
          <TextField id="text-field2" className="TextareaTxt" multiLine={true} rows={7}
          value={this.state.report} onChange={this.handleChange.bind(this)}/>
          <small  className="errorMsg">{this.state.report_text}</small>
          <RaisedButton className="profileEditbtn" primary={true} label="SEND" onTouchTap={this.reportSend.bind(this)}/>
          <RaisedButton className="cancelBtnPopup" onTouchTap={this.Close.bind(this)} primary={true} label="X"/>
        </div>
  </Dialog>
 );
}
}
