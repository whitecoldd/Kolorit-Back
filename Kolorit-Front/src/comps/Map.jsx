import { YMaps, Map } from "react-yandex-maps"

import React, { Component } from 'react'

const mapState = {
    center: [46.306178, 28.659699],
    zoom: 17
};


export default class MapContainer extends Component {
  render() {
    return (
        <>
        <YMaps>
            <Map defaultState={mapState} width='100%'
                height='400px'>
            </Map>
        </YMaps>
    </>
    )
  }
}


