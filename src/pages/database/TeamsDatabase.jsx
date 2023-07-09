import React from 'react'
import MainLayout from '../../components/MainLayout'
import { MapContainer, GeoJSON } from 'react-leaflet'
import mapData from '../../data/countries/countries.json'
import "leaflet/dist/leaflet.css";
import '../../pages/database/TeamsDatabase.css';
const TeamsDatabase = () => {
  const countryStyle = {
    fillColor: '#90EE90',
    color: 'green',
    weight: 1
  };
  const onEachCountry = (feature, layer) => {
    const countryName = feature.properties.ADMIN;
    layer.on({
      mouseover: (event) => {
        layer.openPopup();
      },
      mouseout: (event) => {
        layer.closePopup();
      }
    });
    layer.bindPopup(countryName);
  };
  return (
      <MainLayout>
        <h1 className='font-roboto text-3xl text-center font-bold text-primary mb-4 md:text-5xl lg:text-4xl xl:text-5xl lg:max-w-[540]"'>Un mondo di nazionali!</h1>
        <MapContainer style={{height:"80vh"}} zoom={2} center={[20, 100]}>
            <GeoJSON style={countryStyle} data={mapData} onEachFeature={onEachCountry}/>
        </MapContainer>
      </MainLayout>
  )
}

export default TeamsDatabase
