import React from "react";
import {Switch, Route} from 'react-router-dom'
import {LoginContainer} from "./components/Auth/Login/LoginContainer"
import {RegisterContainer} from "./components/Auth/Register/RegisterContainer";
import {PostsPage} from "./components/Posts/PostsPage/PostsPage";
import {PostPageContainer} from "./components/Posts/PostPage/PostPageContainer";


export const useRoutes = () => {

    return (
        <Switch>
            <Route path="/" exact>
                <PostsPage/>
            </Route>

            <Route path="/post/:id">
                <PostPageContainer/>
            </Route>

            <Route path="/login">
                <LoginContainer/>
            </Route>

            <Route path="/register">
                <RegisterContainer/>
            </Route>

        </Switch>
    )
}