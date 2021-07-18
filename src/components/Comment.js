import React, {useState} from 'react';
import { NavDropdown } from 'react-bootstrap'
import Dropdown from "react-bootstrap/Dropdown";
import CommentEditModal from "../components/CommentEditModal"
import CommentDeleteModal from "../components/CommentDeleteModal"
import {useDispatch, useSelector} from "react-redux";

function Comment(props) {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div className="be-comment">
            <div className="be-comment-content">

				<span className="be-comment-name"><a href="blog-detail-2.html">{props.user}</a>
					</span>
                <span className="be-comment-time">
					<i className="fa fa-clock-o"></i>
					{props.date}

                    {userInfo.username == props.user &&
                        <Dropdown style={{display: 'inline'}}>
                          <Dropdown.Toggle className="p-0 bg-light border-0" id="dropdown-basic">
                            <a className="ml-3">
                                <i className="far fa-ellipsis-v text-dark" style={{fontSize:'15px'}}></i>
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setModalShow(true)}>Edit Comment</Dropdown.Item>
                            <Dropdown.Item onClick={() => setModalShow2(true)}>Delete Comment</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    }

				</span>

                <p className="be-comment-text">
                    {props.content}
                </p>
            </div>
            <CommentEditModal
                post_id={props.post_id}
                comment_id={props.id}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />

              <CommentDeleteModal
                post_id={props.post_id}
                comment_id={props.id}
                show={modalShow2}
                onHide={() => setModalShow2(false)}
              />

        </div>
    );
}

export default Comment;