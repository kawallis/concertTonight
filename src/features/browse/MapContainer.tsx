import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, color, Icon, Line } from '../../shared'
import MapView, { Marker } from 'react-native-maps';
type Props = {

}

type State = {

}
const locationCoords = {
    latitude: 37.7839326,
    longitude: -122.4144729
}
const earthRadiusInMiles = 3959;
// you can customize these two values based on your needs
const radiusInMiles = 25;
const aspectRatio = 1;
var radiusInRad = radiusInMiles / earthRadiusInMiles;
var longitudeDelta = rad2deg(radiusInRad / Math.cos(deg2rad(locationCoords.latitude)));
var latitudeDelta = aspectRatio * rad2deg(radiusInRad);

function deg2rad(angle) {
    return (angle / 180) * Math.PI;
}
function rad2deg(angle) {
    return angle / Math.PI * 180
}
export class MapContainer extends Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: locationCoords.latitude,
                longitude: locationCoords.longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
            }
        }
    }
    renderMarkers = () => {
        const { events } = this.props
        if (events) {
            console.log(events)
            const markers = events.map((marker) =>
                (<Marker
                    key={`marker-${marker.id}`}
                    coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
                    title={marker.title}
                    description={marker.description}
                />))
            console.log(markers)
            return markers
        } else
            return []
    }

    render() {
        const { region } = this.state;
        return (
            <MapView region={region} style={styles.map}>
                {this.renderMarkers()}
            </MapView>
        )

    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
});
