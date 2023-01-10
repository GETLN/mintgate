import React, { useState } from 'react';
import { Tabs, TabList, TabPanels } from '@chakra-ui/react'
import { Federation } from '../federation.types';
import { Button, InfoTabHeader, InfoTab, DepositTab, DepositTabHeader } from '.';

interface FederationProps {
    federation: Federation;
    onClick: () => void;
}

export const FederationCard = (props: FederationProps): JSX.Element => {
    const { mint_pubkey, details } = props.federation;

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
                        <Button label='details' onClick={() => setShowDetails(!showDetails)} />
                    </section>
                </div>
                {showDetails && <Tabs>
                    <TabList>
                        <InfoTabHeader />
                        <DepositTabHeader />
                    </TabList>

                    <TabPanels>
                        <InfoTab {...details} />
                        <DepositTab {...details} />
                    </TabPanels>
                </Tabs>}
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
