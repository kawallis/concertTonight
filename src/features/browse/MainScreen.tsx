import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ViewStyle } from 'react-native';
import { Button, color, Icon, Line } from '../../shared'
import listData from '../../dummy.json'
import { FlatGrid } from 'react-native-super-grid';
import { MapContainer } from './MapContainer';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase'

type Props = {

}

type State = {

}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export class MainScreen extends Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			events: [],
			viewStyle: 'grid'
		}
	}
	componentDidMount = () => {
		const { event } = listData.events
		this.setState({ events: event })
	}

	toggleViewStyle = viewStyle => {
		if (viewStyle !== this.state.viewStyle)
			this.setState({ viewStyle })
	}
	renderList = () => {
		const { viewStyle, events } = this.state
		return (
			<FlatGrid
				itemDimension={viewStyle === 'grid' ? 130 : 1000}
				items={events}
				style={styles.gridView}
				// staticDimension={300}
				// fixed
				// spacing={20}
				renderItem={({ item }) => (
					//add image, do something with background, add list view
					<View style={[styles.itemContainer, { backgroundColor: getRandomColor() }]}>
						<Text style={styles.itemName}>{item.title}</Text>
						<Text style={styles.venueName}>{item.venue_name}</Text>
					</View>

				)}
			/>
		);
	}

	render() {
		const { events } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.mapContainer}>
					<MapContainer events={events} />
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.headerContainer}>
						<Ionicons name="md-grid" size={20} color="black" onPress={() => this.toggleViewStyle('grid')} />
						<Text style={{ marginLeft: 10, marginRight: 10 }}>||</Text>
						<Ionicons name="md-list" size={20} color="black" onPress={() => this.toggleViewStyle('list')} />
					</View>
					<View>
						{this.renderList()}
					</View>
				</View>

			</View >
		)

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.offWhite,
		padding: 10,
		paddingTop: 20
	},
	mapContainer: {
		...StyleSheet.absoluteFillObject,
		height: screenHeight / 3
	},
	contentContainer: {
		position: "relative",
		// top: (screenHeight / 3) + -(screenHeight / 8)
		top: (screenHeight / 3)

	},
	headerContainer: {
		alignItems: 'center',
		justifyContent: "center",
		paddingTop: 0,
		width: "100%",
		flexDirection: "row"
	},
	gridView: {
		marginTop: 10,
		flex: 1,
		marginBottom: 79,
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 5,
		padding: 10,
		height: 150,
	},
	itemName: {
		fontSize: 14,
		color: '#fff',
		fontWeight: '600',
	},
	venueName: {
		fontWeight: '600',
		fontSize: 11,
		color: '#fff',
		fontStyle: "italic"
	},
	tabImageStyle: {
		width: 15,
		height: 15,
	}
});
