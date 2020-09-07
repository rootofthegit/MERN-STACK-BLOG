import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export const Footer = () => {

    return (
        <div style={{backgroundColor: "black", padding: 20, color: "white"}}>
            <Container maxWidth="lg" style={{textAlign: 'center'}} >
                <Typography>Copyright (c) 2020 PRIKOL.fun</Typography>
            </Container>
        </div>
    )
}