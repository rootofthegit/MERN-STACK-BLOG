import React from "react";
import {Test} from "./Test"
import {PostsPage} from "../Posts/PostsPage/PostsPage";

export const TestContainer = () => {
    const text = "Ну нихуя себе!"

    return <><PostsPage /><Test text={text} show={true}/></>
}