import React, { Component } from 'react';
import { StyleSheet, View, Text as RNText, Dimensions, AsyncStorage, ActivityIndicator } from 'react-native';
import { Button, color, Icon, Line, Text, typography, size } from '../../shared'
import { FlatGrid } from 'react-native-super-grid';
import { MapContainer } from './MapContainer';
import { Ionicons } from '@expo/vector-icons';
const queryString = require('query-string');

const API_KEY = "dMDG9fX9tbrqqXgL"

const EVENT_URL = "https://v88wb2hjx8.execute-api.us-west-2.amazonaws.com/dev/listConcerts"
const BASE_URL = "http://api.eventful.com/json/events/search"
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
			viewStyle: 'grid',
			listPref: 'all',
			loading: true,
			artists: [],
			genres: []
		}
	}
	componentDidMount = async () => {
		this.fetchEvents();
		this.fetchSpotify();

	}
	fetchEvents = async () => {
		const params = queryString.stringify({
			app_key: API_KEY,
			date: "TODAY",
			category: "music",
			page_size: 250,
			location: "San Francisco"
		})
		fetch(`${BASE_URL}?${params}`).then(res => res.json()).then(result => {
			this.setState({ events: result.events.event, loading: false })
		}).catch(e => {
			console.log(e)
		})
	}

	fetchSpotify = async () => {
		const access_token = await AsyncStorage.getItem("accessToken");
		fetch("https://api.spotify.com/v1/me/top/artists?limit=50", {
			headers: {
				Authorization: `Bearer ${access_token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		}).then(res => res.json()).then(result => {
			this.setState({ artists: result.items, loading: false })
		}).catch(e => {
			console.log(e)
		})
	}

	toggleViewStyle = viewStyle => {
		if (viewStyle !== this.state.viewStyle)
			this.setState({ viewStyle })
	}
	toggleListPref = () => {
		
			this.setState({ listPref:this.state.listPref == 'all' ? 'curated' : 'all' })
	}

	filterEvents = () => {
		const { events, artists } = this.state;

		let spotifyArtistNames = artists.reduce((acc, item) => {
			acc.push(item.name)
			return acc
		}, [])

		let spotifyGenres = artists.reduce((acc, item) => {
			acc.push(item.name)
			return acc
		}, [])

		let selectedEvents = events.reduce((acc, item) => {
			if (spotifyArtistNames.includes(item.performer))
				acc.push(item)
			else if (this.checkIfTitleIncludes(spotifyArtistNames, item.title)) {
				acc.push(item)
			}
			return acc
		}, [])
		return selectedEvents
	}

	checkIfTitleIncludes = (arr, str) => {
		return arr.some(artist => str.includes(artist))
	}
	renderList = () => {
		const { viewStyle, events, listPref } = this.state
		const selectedEvents = this.filterEvents()

		return (
			<FlatGrid
				itemDimension={viewStyle === 'grid' ? 130 : 1000}
				items={listPref == 'all' ? events : selectedEvents}
				style={styles.gridView}
				// staticDimension={300}
				// fixed
				// spacing={20}
				renderItem={({ item }) => {
					const color = getRandomColor();
					return (
						<View style={[styles.itemContainer, { backgroundColor: color }]} >
							<RNText style={styles.itemName}>{item.title}</RNText>
							<RNText style={styles.venueName}>{item.venue_name}</RNText>
						</View>
					)
				}}
			/>
		);
	}

	render() {
		const { events, artists, loading,listPref } = this.state
		if (loading || (!Array.isArray(events) || !events.length) || (!Array.isArray(artists) || !artists.length))
			return (<View style={styles.container} ><ActivityIndicator size="large" color="#0000ff" /></View>)
		else {
			return (
				<View style={styles.container} >
					<View style={styles.mapContainer}>
						<MapContainer events={events} />
					</View>
					<View style={styles.contentContainer}>
						<View style={styles.headerContainer}>
							<View style={{
								marginRight: 20, alignItems: 'center',
								justifyContent: "center",
								flexDirection: "row"
							}}>
							</View>
							<View style={{
								width: '100%',
								alignItems: 'center',
								justifyContent: "space-around",
								flexDirection: "row"
							}}>
								<View style={{
									alignItems: 'center',
									justifyContent: "space-around",
									flexDirection: "row"
								}}>
									<Ionicons name="md-grid" size={20} color="black" onPress={() => this.toggleViewStyle('grid')} />
									<Text
										text='common.grid'
										style={{
											...typography.header_1,
											fontSize: size.large,
											alignSelf: 'center'
										}}
										onPress={() => this.toggleViewStyle('grid')}
									/>
								</View>
								<View style={{
									alignItems: 'center',
									justifyContent: "space-around",
									flexDirection: "row"
								}}>
									<Ionicons name="md-list" size={20} color="black" onPress={() => this.toggleViewStyle('list')} />
									<Text
										text='common.list'
										style={{
											...typography.header_1,
											fontSize: size.large,
											alignSelf: 'center'
										}}
										onPress={() => this.toggleViewStyle('list')}
									/>
								</View>
								<View style={{
									alignItems: 'center',
									justifyContent: "space-around",
									flexDirection: "row"
								}}>
									<Ionicons name="md-grid" size={20} color="black" onPress={() => this.toggleViewStyle('curated')} />
									<Text
										text={listPref === 'all' ? 'common.curated' : 'common.all'}
										style={{
											...typography.header_1,
											fontSize: size.large,
											alignSelf: 'center'
										}}
										onPress={() => this.toggleListPref()}
									/>
								</View>

							</View>
						</View>
						<View>
							{this.renderList()}
						</View>
					</View>

				</View >
			)
		}
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
