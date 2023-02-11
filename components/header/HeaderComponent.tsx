import React from "react";
import {Box, Divider, Flex, Heading} from "@chakra-ui/react";

export default class HeaderComponent extends React.Component<any, any> {
    render() {
        return (
            <Box mb={5}>
                <Flex alignItems="center">
                    {/*<Text fontSize="2xl">></Text>*/}
                    <Heading mb={2}>pady</Heading>
                    {/*<Text ml={2} fontSize="2xl">A private, minimal, stylus note-writing system </Text>*/}
                </Flex>
                <Divider/>
            </Box>
        );
    }
}