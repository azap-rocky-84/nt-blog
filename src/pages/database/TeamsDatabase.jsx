import React from 'react'
import MainLayout from '../../components/MainLayout'
import { MapContainer, GeoJSON } from 'react-leaflet'
import mapData from '../../data/countries/countries.json'
import "leaflet/dist/leaflet.css";
import '../../pages/database/TeamsDatabase.css';
const TeamsDatabase = () => {
    countryStyle = {
        fillColor: "#c1f5ca",

    }
  return (
      <MainLayout>
        <h1 className='text-center font-roboto'>Un mondo di nazionali!</h1>
        <MapContainer style={{height:"80vh"}} zoom={2} center={[20, 100]}>
            <GeoJSON style={this.countryStyle} data={mapData.features}/>
        </MapContainer>
      </MainLayout>
  )
}

export default TeamsDatabase
