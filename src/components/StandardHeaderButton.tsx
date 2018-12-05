import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import HeaderButtons, { HeaderButton} from 'react-navigation-header-buttons';

export const MaterialHeaderButton = props => {
	return <HeaderButton {...props} IconComponent={MaterialIcons}/>
};

export const MaterialHeaderButtons = props => {
	return <HeaderButtons {...props} HeaderButtonComponent={MaterialHeaderButton} />
};

export const Item = HeaderButtons.Item;