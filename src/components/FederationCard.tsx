import React, { useState } from 'react';
import { Tabs, TabList, TabPanels } from '@chakra-ui/react'
import { Button} from './Button';
import { Federation } from '../federation.types';

interface FederationProps {
    federation: Federation;
    onClick: () => void;
}

export const FederationCard = (props: FederationProps): JSX.Element => {
    const { mint_pubkey, details } = props.federation;

    const [information, setInformation] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const getFederationName = (name: string): string => {
        return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    };

    return (
        <>
            <main style={cardMainWrapper}>
                <div style={cardMajorProps}>
                    <div style={cardMajorProps}>
                        <section style={nameWrapper}>
                            <h3 style={nameStyle}>{getFederationName(details.name)}</h3>
                        </section>
                        <section>
                            <p>{details.description}</p>
                            <p>{mint_pubkey}</p>
                        </section>
                    </div>
                    <section>
                        <Button label='more info' onClick={() => setInformation(!information)} />
                        <Button label='details' onClick={() => setShowDetails(!showDetails)} />
                    </section>
                </div>
                {showDetails && <Tabs>
                    <TabList>
                        TabHeader
                    </TabList>

                    <TabPanels>
                        Tab
                    </TabPanels>
                </Tabs>}

                {information && (
                    <div className='more-information'>
                        <p>
                            <span>Federation Description: </span>
                            {details.description}
                        </p>
                        <section>
                            <p>
                                <span>Date Created: </span>
                                {details.date_created}
                            </p>
                            <Button label='More Action' onClick={props.onClick} />
                        </section>
                    </div>
                )}
            </main>
        </>
    );
};

const cardMainWrapper = {
    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
    padding: 16,
    borderRadius: 8,
};

const cardMajorProps = {
    display: 'flex',
    FlexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
};

const nameWrapper = {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: '50%',
};

const nameStyle = {
    color: 'white',
    margin: 0,
};
