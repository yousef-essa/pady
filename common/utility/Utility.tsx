import {Box, Button, Center, Flex} from "@chakra-ui/react";
import React from "react";
import HeaderComponent from "../../components/header/HeaderComponent";

export function loadingPage(text: string) {
    return <Box h="100vh" ml="2em" overflow="hidden">
        <HeaderComponent/>

        <Flex h="70%" justifyContent="center" alignContent="center">
            {loadingSection(text)}
        </Flex>
    </Box>
}

export function loadingSection(text: string) {
    return <Flex justifyContent="center" alignItems="center">
    <Center>
        <Button p={8} fontSize="4xl" isLoading loadingText={text}/>
    </Center>
    </Flex>
}
