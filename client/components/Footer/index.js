import React from 'react';
import '../../public/stylesheets/style.css';
class Footer extends React.Component {
  render(){
    var year = new Date().getFullYear()
        return (
        	   <footer className="pos-relative-b">
                <div className="container">
                    <p className="Copyright">@{year} Copyright. AR BulkPak. All Rights Reserved</p>
                </div>
            </footer>
           )
    }
}
export default Footer;
