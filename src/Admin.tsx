import React, { useState } from 'react';
import { Header, FederationCard } from './components';
import { Federation } from './federation.types';
import { data } from './federation.data';
import { Stack } from '@chakra-ui/react';

export const Admin = React.memo(() => {
    const [fedlist, setFedlist] = useState<Federation[]>(data.federations);

    const filterFederations = (filter: undefined | boolean) => {
        let federations = filter === undefined ? data.federations : data.federations.filter((federation) => federation.details.active === filter);
        setFedlist(federations);
    };

    enum Sort {
        Ascending,
        Descending,
        Date,
    }

    const sortFederations = (sort: Sort) => {
        const fedListCopy = [...fedlist];

        switch (sort) {
            case Sort.Ascending: {
                const result = fedListCopy.sort((a, b) => (a.details.name < b.details.name ? -1 : a.details.name > b.details.name ? 1 : 0));

                return setFedlist(result);
            }

            case Sort.Descending: {
                const result = fedListCopy.sort((a, b) => (a.details.name < b.details.name ? 1 : a.details.name > b.details.name ? -1 : 0));

                return setFedlist(result);
            }

            case Sort.Date: {
                const result = fedListCopy.sort((a, b) =>
                    a.details.date_created < b.details.date_created ? 1 : a.details.date_created > b.details.date_created ? -1 : 0
                );

                return setFedlist(result);
            }

            default: {
                return setFedlist(data.federations);
            }
        }
    };

    return (
        <div className='App'>
            <div style={wrapperStyles}>
                <Header
                    data={data.federations}
                    ascending={() => {
                        sortFederations(Sort.Ascending);
                    }}
                    descending={() => {
                        sortFederations(Sort.Descending);
                    }}
                    datecCreated={() => {
                        sortFederations(Sort.Date);
                    }}
                    isActive={() => {
                        filterFederations(true);
                    }}
                    isArchived={() => {
                        filterFederations(false);
                    }}
                    isAll={() => {
                        filterFederations(undefined);
                    }}
                />
                <Stack spacing={6} marginTop={6}>
                    {fedlist.map((federation: Federation) => {
                        return <FederationCard key={federation.mint_pubkey} federation={federation} onClick={() => console.log('clicked')} />;
                    })}
                </Stack>
            </div>
        </div>
    );
});

const wrapperStyles = {
    margin: 32,
};
