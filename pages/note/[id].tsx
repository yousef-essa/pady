import {Box, Divider, Editable, EditablePreview, EditableTextarea, Flex, Input} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import createDocumentObject, {DocumentObject} from "../../common/document/DocumentObject";
import {getItem, setItem} from "../../common/utility/StorageHelper";
import {NextRouter, useRouter} from 'next/router'
import HeaderComponent from "../../components/header/HeaderComponent";
import {loadingPage} from "../../common/utility/Utility";

const DEFAULT_DOCUMENT_NOTE_TEXT = "Your notes goes here...";

function updateValue(target: HTMLTextAreaElement, content: string) {
    target.value = content
}

function DocumentTitle(props: { name: string; onTitleUpdate: Function } ) {
    const currentTitle = props.name
    console.log("documentTitle: title = " + currentTitle)

    return <Input w={"min-content"} mt={5}
                  fontSize="2xl" variant="flushed"
                  defaultValue={currentTitle}
                  onKeyDown={event => {
                      console.log(event.key)
                      if (event.key === "Enter") {
                          props.onTitleUpdate(event.currentTarget.value)
                      }
                  }}
                  onBlur={event => {
                      let updatedValue = event.currentTarget.value;
                      if (props.name == updatedValue) {
                          return
                      }
                      props.onTitleUpdate(updatedValue)
                  }}
    />
}

function updatePreviewText(submitValue: string) {
    let previewSpanElement = document.getElementById("preview") as HTMLSpanElement;
    previewSpanElement.innerText = submitValue
}

function DocumentContent(props: { content: string, onContentUpdate: Function }) {
    return <Box w="100%" h="100vh">
        <Editable
            h={"100vh"} fontSize="3xl"
            defaultValue={props.content}
            selectAllOnFocus={false}
            placeholder={DEFAULT_DOCUMENT_NOTE_TEXT}
            onSubmit={(submitValue) => {
                props.onContentUpdate(submitValue)
            }}
        >
            <EditablePreview id="preview" h="100vh" w="100%"/>
            <EditableTextarea
                id="text-area"
                h="100%" overflow="hidden"
                resize="none" rows={1}
                // to initiate an initial update
                // for small displays user input
                onFocus={event => {
                    let target = event.target as HTMLTextAreaElement;
                    autoGrow(target)
                    updateValue(target, props.content);
                }}
                onInput={event => {
                    autoGrow(event.target as HTMLTextAreaElement)
                }}
            />
        </Editable>
    </Box>
}

function loadNote(firstTime: boolean, router: NextRouter, key: string, setObject: (value: (((prevState: { loading: boolean; title: string; content: string }) => { loading: boolean; title: string; content: string }) | { loading: boolean; title: string; content: string })) => void, setFirstTime: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!firstTime || !router.isReady) {
            return
        }

        console.log("Attempting to find object from key " + key)
        const object: DocumentObject = getItem(key) as DocumentObject

        console.log("Found object: " + JSON.stringify(object))

        const title: string = object.title;
        const content: string = object.content;
        console.log(key + ": Fetched title " + title + " for content " + content)

        if (object != undefined) {
            setObject({
                loading: true,
                title: title,
                content: content
            })
        } else {
            throw new Error("This document does not exist.")
        }

        setFirstTime(false)
    })
}

function onUpdate(object: { loading: boolean; title: string; content: string }, key: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (object == undefined || object.title == "") {
            return
        }

        console.log(key + ": updating object " + JSON.stringify(object))

        if (!object.loading) {
            setItem(key, createDocumentObject(object.title, object.content))
        }
    }, [object])
}

function DocumentPage() {
    const [object, setObject] = useState({
        loading: false,
        title: "",
        content: ""
    })

    const [firstTime, setFirstTime] = useState(true)
    const router = useRouter()

    console.log('router: ' + JSON.stringify(router.asPath))
    const key = router.asPath.replace("/note/", "")

    console.log("document page key: " + key)

    // loads the note
    loadNote(firstTime, router, key, setObject, setFirstTime);
    onUpdate(object, key);

    if (object == undefined || object.title == "") {
        return loadingPage("Loading your note document...");
    }

    return <Box ml="2em">
        <HeaderComponent/>

        <Box overflow="hidden">
            <Flex direction="column">
                <DocumentTitle name={object.title} onTitleUpdate={(newlyTitle: string) => {
                    setObject({
                        loading: false,
                        title: newlyTitle,
                        content: object.content
                    })
                }}/>
                <Divider/>

                <DocumentContent content={object.content} onContentUpdate={(newContent: string) => {
                    // updates the preview element to
                    // mimic the everything about
                    // the input's text & spacing
                    updatePreviewText(newContent)

                    // updates the object
                    setObject({
                        loading: false,
                        title: object.title,
                        content: newContent
                    })
                }}/>
            </Flex>
        </Box>
    </Box>;
}

function autoGrow(target: HTMLTextAreaElement) {
    target.style.height = "5px"
    target.style.height = (target.scrollHeight + 5) + "px"
}

export default DocumentPage