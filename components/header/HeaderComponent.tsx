import React from "react";
import {Box, Divider, Flex, Heading} from "@chakra-ui/react";

export default class HeaderComponent extends React.Component<any, any> {
    render() {
        return (
            <Box mb={5}>
                <Flex alignItems="center">
                    <Heading mb={2}>pady</Heading>
                </Flex>
                <Divider/>
            </Box>
        );
    }
}