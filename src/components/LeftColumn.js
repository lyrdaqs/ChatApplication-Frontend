import React from 'react';

function LeftColumn(props) {
    return (
        <div>
            <div className="w3-col m3">
                <div className="w3-card w3-round w3-white">
                    <div className="w3-container">
                        <h4 className="w3-center">My Profile</h4>
                        <p className="w3-center"></p>
                        <hr></hr>
                            <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
                            <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
                            <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
                    </div>
                </div>
                <br></br>
                    <div className="w3-card w3-round">
                        <div className="w3-white">
                            <button className="w3-button w3-block w3-theme-l1 w3-left-align"><i
                                className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups
                            </button>
                            <div id="Demo1" className="w3-hide w3-container">
                                <p>Some text..</p>
                            </div>
                            <button className="w3-button w3-block w3-theme-l1 w3-left-align"><i
                                className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events
                            </button>
                            <div id="Demo2" className="w3-hide w3-container">
                                <p>Some other text..</p>
                            </div>
                            <button className="w3-button w3-block w3-theme-l1 w3-left-align"><i
                                className="fa fa-users fa-fw w3-margin-right"></i> My Photos
                            </button>
                            <div id="Demo3" className="w3-hide w3-container">
                                <div className="w3-row-padding">
                                    <br></br>
                                        <div className="w3-half">

                                        </div>
                                        <div className="w3-half">

                                        </div>
                                        <div className="w3-half">

                                        </div>
                                        <div className="w3-half">

                                        </div>
                                        <div className="w3-half">

                                        </div>
                                        <div className="w3-half">

                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>

                        <div className="w3-card w3-round w3-white w3-hide-small">
                            <div className="w3-container">
                                <p>Interests</p>
                                <p>
                                    <span className="w3-tag w3-small w3-theme-d5">News</span>
                                    <span className="w3-tag w3-small w3-theme-d4">W3Schools</span>
                                    <span className="w3-tag w3-small w3-theme-d3">Labels</span>
                                    <span className="w3-tag w3-small w3-theme-d2">Games</span>
                                    <span className="w3-tag w3-small w3-theme-d1">Friends</span>
                                    <span className="w3-tag w3-small w3-theme">Games</span>
                                    <span className="w3-tag w3-small w3-theme-l1">Friends</span>
                                    <span className="w3-tag w3-small w3-theme-l2">Food</span>
                                    <span className="w3-tag w3-small w3-theme-l3">Design</span>
                                    <span className="w3-tag w3-small w3-theme-l4">Art</span>
                                    <span className="w3-tag w3-small w3-theme-l5">Photos</span>
                                </p>
                            </div>
                        </div>
                    <br></br>
                    <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                        <span className="w3-button w3-theme-l3 w3-display-topright">
                          <i className="fa fa-remove"></i>
                        </span>
                        <p><strong>Hey!</strong></p>
                        <p>People are looking at your profile. Find out who.</p>
                    </div>
                </div>
        </div>
    );
}

export default LeftColumn;