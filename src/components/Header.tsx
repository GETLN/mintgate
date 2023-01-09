import React, { useState } from 'react';
import { HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Button as ChakraButton } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { Federation, Filter, Sort } from '../federation.types';
import { Button } from './Button';

export type HeaderProps = {
    data: Federation[];
    filterCallback: (filter: Filter) => void;
    sortCallback: (sort: Sort) => void;
    toggleShowConnectFed: () => void;
};

export const Header = (props: HeaderProps): JSX.Element => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { value } = event.target;
        setSearchValue(value);
        console.log(searchValue);
    };

    return (
        <HStack>
            <Button label='Connect Federation' onClick={props.toggleShowConnectFed} />
            <HStack flexDirection='row' alignItems={'center'}>
                {/* sort menu button */}
                <Menu>
                    <MenuButton as={ChakraButton} rightIcon={<FiChevronDown />}>
                        Sort
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => props.sortCallback(Sort.Ascending)}>Ascending</MenuItem>
                        <MenuItem onClick={() => props.sortCallback(Sort.Descending)}>Descending</MenuItem>
                        <MenuItem onClick={() => props.sortCallback(Sort.Date)}>Date Created</MenuItem>
                    </MenuList>
                </Menu>
                {/* filter menu button */}
                <Menu>
                    <MenuButton as={ChakraButton} rightIcon={<FiChevronDown />}>
                        Filter
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => props.filterCallback(true)}>Active</MenuItem>
                        <MenuItem onClick={() => props.filterCallback(false)}>Archived</MenuItem>
                        <MenuItem onClick={() => props.filterCallback(undefined)}>All</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </HStack>
    );
};
