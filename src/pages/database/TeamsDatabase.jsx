import React from "react";
import MainLayout from "../../components/MainLayout";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../../data/countries/countries.json";
import "leaflet/dist/leaflet.css";
import "../../pages/database/TeamsDatabase.css";
import { useQuery } from "@tanstack/react-query";
import { getAllNt } from "../../services/index/nt";
import { images, stables } from "../../constants";
const TeamsDatabase = () => {
  const { data } = useQuery({
    queryFn: () => getAllNt(),
    queryKey: ["nt"],
  });
  const excludedCountries = [
    "ATA",
    "-99",
    "ATF",
    "HMD",
    "IOT",
    "PCN",
    "UMI",
    "WLF",
    "GBR",
  ];
  const filteredMapData = mapData.features.filter(
    (country) => !excludedCountries.includes(country.properties.ISO_A3)
  );
  const countryStyle = {
    fillColor: "#90EE90",
    color: "green",
    weight: 1,
  };
  const onEachCountry = (feature, layer) => {
    const countryName = feature.properties.ADMIN;
    const fifaCode = feature.properties.ISO_A3;
    const countryFlag = data?.flag;
    console.log(countryFlag);
    layer.on({
      mouseover: (event) => {
        layer.openPopup();
      },
      mouseout: (event) => {
        layer.closePopup();
      },
      click: (event) => {
        window.location.href = `/detail/${fifaCode}`;
      },
    });
    const popupContent = `
    <div style="text-align: center;">
      <h3 style="font-weight: bold; font-family: 'Roboto', sans-serif; color: #0078d4;">${countryName}</h3>
      <img src=${countryFlag ? stables.UPLOAD_FOLDER_BASE_URL + data?.flag : images.noImagePost}/>
    </div>`;
    layer.bindPopup(popupContent);
  };
  return (
    <MainLayout>
      <h1 className='lg:max-w-[540]" mb-4 text-center font-roboto text-3xl font-bold text-primary md:text-5xl lg:text-4xl xl:text-5xl'>
        Un mondo di nazionali!
      </h1>
      <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
        <GeoJSON
          style={countryStyle}
          data={{ type: "FeatureCollection", features: filteredMapData }}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </MainLayout>
  );
};

export default TeamsDatabase;
