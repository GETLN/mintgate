import React, { useState } from 'react';
import { Tab, TabPanel, Stack } from '@chakra-ui/react'
import { Input, Button } from '.';


export const DepositTabHeader = (): JSX.Element => {
    return <Tab>Deposit</Tab>
}

interface DepositTabProps {
}

export const DepositTab = React.memo((_: DepositTabProps): JSX.Element => {
    return <TabPanel>
        <Stack spacing='4' maxWidth='md'>
            <Input
                labelName='Federation address:'
                placeHolder='Enter wallet address'
                value='5766898990ddjjdhdh88747'
                onChange={() => {
                    console.log('');
                }}
            />
            <Button label='Deposit' borderRadius='4' onClick={() => console.log('clicked')} />
        </Stack>
    </TabPanel>
});
