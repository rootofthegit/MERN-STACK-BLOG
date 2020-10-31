import React, {useContext} from "react";
import {NavBar} from "./NavBar";
import {AuthContext} from "../../context/AuthContext";
import {connect} from "react-redux";
import {getPosts, getPostsByCategory, showAlert} from "../../redux/actions";
import {useHistory} from "react-router-dom";



const NavBarContainer = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const categoryChoosingHandler = (category, categoryName) => {
        history.push(`/category/${category}`)
        props.getPostsByCategory(category, categoryName, 1)
    }

    const getPostsHandler = () => {
        props.getPosts(1)

    }

    const showAlert = () => {
        props.showAlert('Пасхальный... xy!', 'info')
    }

    return <NavBar isAuthenticated={auth.isAuthenticated} userName={auth.userName} likedPosts={props.likedPosts}
                   comments={props.comments} role={props.role} categoryChoosingHandler = {categoryChoosingHandler}
                   alert={props.alert} showAlert = {showAlert} getPostsHandler = {getPostsHandler}
    />
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        likedPosts: state.userData.likedPosts,
        comments: state.userData.comments,
        role: state.userData.role,
        alert: state.app.alert
    }
}

const mapDispatchToProps = {
    getPosts, getPostsByCategory, showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer)