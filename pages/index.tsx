import type {NextPage} from 'next'
import React, {useEffect, useState} from "react";
import createDocumentObject from "../common/document/DocumentObject";
import {getItem, setItem} from "../common/utility/StorageHelper";
import {useRouter} from "next/router";
import {loadingPage} from "../common/utility/Utility";

function loadOrCreateKey(setKey: (value: (((prevState: string) => string) | string)) => void) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        let localKey = getItem("main") as unknown as string

        console.log("key: " + localKey)

        // if there is no key assigned
        // generate a new one, and
        // set the main document
        // in storage
        if (localKey == "" || localKey === null || localKey === undefined) {
            localKey = crypto.randomUUID()

            // construct a default document
            setItem(localKey, createDocumentObject("Note Title", ""))

            console.log("key was null! new key: " + localKey)
        }
        setItem("main", localKey)

        console.log("update key " + localKey)

        setKey(localKey)
    }, [])
}

const Home: NextPage = () => {
    const [key, setKey] = useState("")
    const router = useRouter()

    console.log("home " + key)
    loadOrCreateKey(setKey);

    let loadingText
    if (key == "" || key === undefined || key === null) {
        loadingText =  "Loading your information..."
    } else {
        // once the note document is available
        // we will be redirecting the user
        // to the note's document page
        loadingText = "Redirecting you to the note page..."
        router.push("/note/" + key)
    }

    return loadingPage(loadingText)
}

export default Home
