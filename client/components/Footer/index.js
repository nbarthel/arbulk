import React from 'react';
import '../../public/stylesheets/style.css';
class Footer extends React.Component {
  render(){
        return (
        	   <footer className="pos-relative-b" style={{"margin-top" : 475}}>
                <div className="container">
                    <p className="Copyright">@2016 Copyright. AR BulkPak. All Rights Reserved</p>
                </div>
            </footer>
           )
    }
}
export default Footer;
