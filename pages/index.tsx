import type {NextPage} from 'next'
import {
    Box,
    Button,
    Center,
    Divider,
    Editable,
    EditablePreview,
    EditableTextarea,
    Flex,
    Heading,
    Input
} from "@chakra-ui/react";
import React, {ReactNode} from "react";
import HeaderComponent from "../components/header/HeaderComponent";

let pageName = "Note title"

const Home: NextPage = () => {
    let page: ReactNode = documentPage(pageName)

    return <Box ml="2em">
        <HeaderComponent/>

        {page}
    </Box>
}

function documentPage(pageName: string) {
    return <Box overflow="hidden">
        <Flex direction="column">
            <Input w={"min-content"} mt={5}
                   fontSize="2xl" variant="flushed"
                   defaultValue={pageName}/>

            <Divider/>

            <Box w="100%" h="100vh">
                <Editable
                    h={"fit-content"} fontSize="3xl"
                    defaultValue="Your notes goes here..."
                    selectAllOnFocus={false}
                    onSubmit={updatePreviewTextToAccurateText}
                >
                    <EditablePreview id="preview" w="100%"/>
                    <EditableTextarea
                        h="100%" overflow="hidden"
                        resize="none" rows={1}
                        // to initiate an initial update
                        // for small displays user input
                        onFocus={event => {
                            autoGrow(event.target as HTMLTextAreaElement)
                        }}
                        onInput={event => {
                            autoGrow(event.target as HTMLTextAreaElement)
                        }}
                    />
                </Editable>
            </Box>
        </Flex>
    </Box>;
}

function updatePreviewTextToAccurateText(event: string) {
    let preview = document.getElementById("preview") as HTMLSpanElement;
    preview.innerText = event
}

function autoGrow(target: HTMLTextAreaElement) {
    target.style.height = "5px"
    target.style.height = (target.scrollHeight + 5) + "px"
}

export default Home
