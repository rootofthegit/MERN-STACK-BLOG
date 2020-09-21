import React from "react";
import {Switch, Route} from 'react-router-dom'
import {LoginContainer} from "./components/Auth/Login/LoginContainer"
import {RegisterContainer} from "./components/Auth/Register/RegisterContainer";
import {PostPageContainer} from "./components/Posts/PostPage/PostPageContainer";
import {TestContainer} from "./components/Test/TestContainer";
import {PostsPageContainer} from "./components/Posts/PostsPage/PostsPageContainer";
import {PostAddingContainer} from "./components/PostAdding/PostAddingContainer";


export const useRoutes = () => {

    return (
        <Switch>
            <Route path="/" exact>
                <PostsPageContainer/>
            </Route>

            <Route path="/posts/:id">
                <PostPageContainer/>
            </Route>
            <Route path="/addpost">
                <PostAddingContainer/>
            </Route>
            <Route path="/login">
                <LoginContainer/>
            </Route>

            <Route path="/register">
                <RegisterContainer/>
            </Route>

            <Route path="/test">
                <TestContainer/>
            </Route>
        </Switch>
    )
}