import React from 'react';
import '../../public/stylesheets/style.css';
class Footer extends React.Component {
  render(){
    var year = new Date().getFullYear()
        return (
        	   <footer className="pos-relative-b">
                <div className="container">
                    <p className="Copyright">@{year} Copyright. A&R Bulk-Pak, Inc. All Rights Reserved</p>
                </div>
            </footer>
           )
    }
}
export default Footer;
