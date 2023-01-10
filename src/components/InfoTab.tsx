import React from 'react';
import { TabPanel } from '@chakra-ui/react'
import { TabHeader } from '.';

export const InfoTabHeader = (): JSX.Element => {
    return (
        <TabHeader>
            Info
        </TabHeader>
    )
}

interface InfoTabProps {
    date_created: string;
    description: string;
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
