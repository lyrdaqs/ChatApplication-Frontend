import React, {useState} from 'react';
import {commentCreateAction} from "../actions/socialMediaActions"
import { useDispatch} from 'react-redux'

function CommentWrap(props) {
    const dispatch = useDispatch()
    const [caption, setCaption] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(commentCreateAction({content:caption},props.post_id))
    }

    return (
        <div>
            <div className="container">
                <div className="be-comment-block">
                    <h1 className="comments-title">Comments ({props.len})</h1>
                    {props.children}
                    <form onSubmit={(e)=>{submitHandler(e)}} className="form-block">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <div className="form-group fl_icon">
                                    <div className="icon"><i className="fa fa-user"></i></div>
                                    <input className="form-input" type="text" placeholder="Your name"></input>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 fl_icon">
                                <div className="form-group fl_icon">
                                    <div className="icon"><i className="fa fa-envelope-o"></i></div>
                                    <input className="form-input" type="text" placeholder="Your email"></input>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <textarea onChange={(e) => setCaption(e.target.value)}
                                              className="text-dark form-input" required="" placeholder="Your text"></textarea>
                                </div>
                            </div>
                            <button type="submit" style={{color: '#fff'}} className="btn btn-primary pull-right">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommentWrap;