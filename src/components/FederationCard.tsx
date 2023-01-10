import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Divider, Collapse } from '@chakra-ui/react'
import { Federation } from '../federation.types';
import { Button, InfoTabHeader, InfoTab, DepositTab, DepositTabHeader } from '.';

interface FederationProps {
    federation: Federation;
    onClick: () => void;
}

enum OpenTab {
    Off = -1,
    InfoTab = 0,
    DepositTab = 1,
}

export const FederationCard = (props: FederationProps): JSX.Element => {
    const { mint_pubkey, details } = props.federation;

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [tab, setOpenTab] = useState<{ open: OpenTab, mru: OpenTab }>({ open: OpenTab.Off, mru: OpenTab.Off });

    const tabControl = (openTab: number) => {
        setOpenTab({ open: openTab, mru: openTab });
        setShowDetails(true);
    };

    const detailsControl = () => {
        let nextState = !showDetails;
        if (nextState) {
            // If we are going to show details and there is no open tab,
            // start off with the InfoTab, otherwise, open the most recently open tab
            tab.mru < 0 ?
                setOpenTab({ open: OpenTab.InfoTab, mru: OpenTab.InfoTab }) :
                setOpenTab({ open: tab.mru, mru: tab.mru });
        } else {
            setOpenTab({ open: OpenTab.Off, mru: tab.mru });
        }
        setShowDetails(nextState);
    };

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
                        <Button label='details' onClick={detailsControl} />
                    </section>
                </div>
                <Tabs index={tab.open} onChange={tabControl} pt={3} variant="unstyled">
                    <TabList gap={2}>
                        <InfoTabHeader />
                        <DepositTabHeader />
                    </TabList>
                    <Collapse in={showDetails} animateOpacity>
                        <Divider />
                        <TabPanels>
                            <InfoTab {...details} />
                            <DepositTab {...details} />
                        </TabPanels>
                    </Collapse>
                </Tabs>
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
