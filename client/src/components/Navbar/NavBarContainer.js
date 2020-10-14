import React, {useContext} from "react";
import {NavBar} from "./NavBar";
import {AuthContext} from "../../context/AuthContext";
import {connect} from "react-redux";

const NavBarContainer = (props) => {
    const auth = useContext(AuthContext)

    return <NavBar isAuthenticated={auth.isAuthenticated} userName={auth.userName} likedPosts={props.likedPosts}
                   comments={props.comments}/>
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        likedPosts: state.userData.likedPosts,
        comments: state.userData.comments
    }
}

export default connect(mapStateToProps, null)(NavBarContainer)