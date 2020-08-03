import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const Card = styled.div`
    width: 400px;
    border: 1px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function NewEntry() {
    return (
        <Wrapper>
            <Card>
                <h2>Date: {Date.now()}</h2>
            </Card>
        </Wrapper>
    );
}

export default NewEntry;
