import React, { useState } from 'react';
import { Tab, TabPanel } from '@chakra-ui/react'

interface InfoTabHeaderProps {
}

interface InfoTabProps {
    date_created: string;
    description: string;
}

export const InfoTabHeader = (props: InfoTabHeaderProps): JSX.Element => {
    return <Tab>Info</Tab>
}

export const InfoTab = React.memo((props: InfoTabProps): JSX.Element => {
    let { description, date_created } = props;
    return <TabPanel>
        <p>
            <span>Federation Description: </span>
            {description}
        </p>
        <section>
            <p>
                <span>Date Created: </span>
                {date_created}
            </p>
        </section>
    </TabPanel>
});
