import React, {useContext} from "react";
import {NavBar} from "./NavBar";
import {AuthContext} from "../../context/AuthContext";
import {connect} from "react-redux";
import {getPostsByCategory} from "../../redux/actions";


const NavBarContainer = (props) => {
    const auth = useContext(AuthContext)

    const categoryChoosingHandler = (category) => {
        props.getPostsByCategory(category, 1)
    }

    return <NavBar isAuthenticated={auth.isAuthenticated} userName={auth.userName} likedPosts={props.likedPosts}
                   comments={props.comments} role={props.role} categoryChoosingHandler = {categoryChoosingHandler}
    />
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        likedPosts: state.userData.likedPosts,
        comments: state.userData.comments,
        role: state.userData.role
    }
}

const mapDispatchToProps = {
    getPostsByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer)