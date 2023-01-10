import React, { useState } from 'react';
import { Tab, TabPanel, Stack, Card, CardBody, CardFooter, Image, Heading, Text, Spacer } from '@chakra-ui/react'
import { Button } from '.';


export const DepositTabHeader = (): JSX.Element => {
    return <Tab>Deposit</Tab>
}

interface DepositTabProps {
}

export const DepositTab = React.memo((_: DepositTabProps): JSX.Element => {
    return <TabPanel>
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='unstyled'
        >
            <Stack>
                <CardBody>
                    <Heading size='md'>Federation deposit address</Heading>

                    <Text py='3'>
                        This bitcoin address allows you <br/> to deposit funds into this federation
                    </Text>
                </CardBody>

                <CardFooter gap='2'>
                    <Button label='Share' onClick={() => { }} />
                    <Button label='Copy' onClick={() => { }} />
                </CardFooter>
            </Stack>
            <Spacer />
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
                alt='Bitcoin Address QR Code'
            />
        </Card>
    </TabPanel >
});
