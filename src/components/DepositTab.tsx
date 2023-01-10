import React, { useState } from 'react';
import { Tab, TabPanel, Stack, Card, CardBody, CardFooter, Image, Heading, Text, Spacer, Flex, Link, Progress } from '@chakra-ui/react'
import { Button } from '.';


interface DepositTabProps {
}

enum DepositStatus {
    Address,
    Pending,
    Complete
}

export const DepositTabHeader = (): JSX.Element => {
    return <Tab>Deposit</Tab>
}

interface DepositTabProps {
}

export const DepositTab = React.memo((_: DepositTabProps): JSX.Element => {
    const [depositStatus, setDepositStatus] = useState<DepositStatus>(DepositStatus.Address);

    const getDepositCardProps = (): DepositCardProps => {
        switch (depositStatus) {
            case DepositStatus.Address:
                return {
                    content: <ShowDepositAddress />,
                    actions: [
                        {
                            label: 'Share Address',
                            onClick: () => setDepositStatus(DepositStatus.Pending)
                        },
                        {
                            label: 'Copy Address',
                            onClick: () => setDepositStatus(DepositStatus.Pending)
                        }
                    ],
                    infographic: {
                        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
                        altText: 'Bitcoin Address QR Code'
                    }
                }
            case DepositStatus.Pending:
                let pendingTxProps: ShowTransactionProps = {
                    txid: 'de3d5bf1e3c1b3be2a1e025825f751629390ad60c8f91723e330f2356d99c59b',
                    address: 'bc1qgf60crqtlxn7279tgh8lsxzagmu97cyuwtykxwv026s9hwg427fsjvw7uz',
                    amount_btc: 0.00013813,
                    confirmations: 1,
                    confirmationsRequired: 3,
                }
                return {
                    content: <ShowTransaction {...pendingTxProps} />,
                    actions: [
                        {
                            label: 'Copy Transaction ID',
                            onClick: () => setDepositStatus(DepositStatus.Complete)
                        },
                        {
                            label: 'Complete',
                            onClick: () => setDepositStatus(DepositStatus.Complete)
                        },
                    ],
                    infographic: {
                        imgUrl: 'https://www.maxpixel.net/static/photo/1x/Bitcoin-Logo-Bitcoin-Icon-Bitcoin-Btc-Icon-Currency-6219384.png',
                        altText: 'Pending bitcoin transaction'
                    }
                }
            case DepositStatus.Complete:
                return {
                    content: <ShowDepositAddress />,
                }
        }
    }

    return <TabPanel>
        <DepositCard {...getDepositCardProps()} />
    </TabPanel >
});

interface DepositCardProps {
    content: JSX.Element,
    actions?: DepositCardAction[],
    infographic?: DepositCardInfographic,
}

interface DepositCardAction {
    label: string,
    onClick: () => void,
}

interface DepositCardInfographic {
    imgUrl: string,
    altText: string,
}

export const DepositCard = React.memo((props: DepositCardProps): JSX.Element => {
    const { content, actions, infographic } = props;

    return <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='unstyled'
    >
        <Stack>
            <CardBody>
                {content}
            </CardBody>

            <CardFooter gap='2'>
                {actions?.map((action: DepositCardAction) => {
                    return <Button label={action.label} onClick={action.onClick} />
                })}
            </CardFooter>
        </Stack>
        {infographic && <>
            <Spacer />
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={infographic.imgUrl}
                alt={infographic.altText}
            />
        </>}
    </Card>
});


const ShowDepositAddress = (): JSX.Element => {
    let address = "1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX";

    return <>
        <Heading size='md'>Bitcoin Deposit to Federation</Heading>

        <Text py='3'>
            Please pay to the address address shown <br /> to deposit funds into this federation <br /> You can scan the QR code to pay.
        </Text>
        <Text py='1'>

        </Text>
        <Flex align="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold" mr={2}>
                Address:
            </Text>
            <Text fontSize="lg">{address}</Text>
        </Flex>
    </>
}

interface ShowTransactionProps {
    txid: string,
    address: string,
    amount_btc: number,
    confirmations: number,
    confirmationsRequired: number,
}

const ShowTransaction = (props: ShowTransactionProps) => {
    const { txid, address, amount_btc, confirmations, confirmationsRequired } = props;

    const computeProgress = () => {
        return 100 * confirmations / confirmationsRequired;
    }

    return (
        <>
            <Heading size="md">
                Bitcoin Deposit
            </Heading>
            <Flex align="center" mt={3}>
                <Text fontSize="lg" mr={2}>Amount:</Text>
                <Text fontSize="lg" fontWeight="bold">{amount_btc} BTC</Text>
            </Flex>
            <Text mt={4}>
                Confirmations: {confirmations} / {confirmationsRequired} required
            </Text>
            <Progress value={computeProgress()} size='xs' colorScheme='orange' hasStripe />
            <Text mt={2}>
                Sent to address: {address}
            </Text>
            <Text mt={2}>
                Transaction id: <Link href={`https://mempool.space/tx/${txid}`}>{txid}</Link>
            </Text></>
    );
};
