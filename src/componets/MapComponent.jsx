import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Loading from './Loading';
import './MapComponent.css';
import errorGif from "../assets/error.gif"
import { Button, createStandaloneToast } from '@chakra-ui/react'
import PostalInput from './PostalInput';

const { ToastContainer, toast } = createStandaloneToast()
const MapComponent = ({ postalCode }) => {
  const [loading, setLoading] = useState(true);
  const [locationData, setLocationData] = useState(null);
  const [isData, setIsData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.zippopotam.us/IN/${postalCode}`);
        setLocationData(response.data);
        setIsData(true);
        setLoading(false);
        toast({
          title: 'Data Fetched Successfully',
          description: `Data has been retrieved successfully for ${postalCode}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
        setIsData(false);
        setError('Error fetching data. Please check the postal code.');
        toast({
          title: 'Error Fetching Data',
          description: 'Error fetching data. Please check the postal code.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [postalCode]);

  let position = [22.3511148, 78.6677428];

  if (locationData && locationData.places && locationData.places.length > 0) {
    const { latitude, longitude } = locationData.places[0];
    position = [latitude, longitude];
  }

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : isData ? (
        <div className="map">
          <MapContainer center={position} zoom={23} style={{ height: '350px', width: '40%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

              
attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            />
            {locationData && (
              <Marker position={position}>
                <Popup>
                  <div>
                    <p>Place Name: {locationData.places[0]['place name']}</p>
                    <p>State: {locationData.places[0].state}</p>
                    <p>Country: {locationData.country}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
          <div className="glass">
            <p>Place Name : {locationData.places[0]['place name']}</p>
            <p>State: {locationData.places[0].state}</p>
            <p>Country: {locationData.country}</p>
          </div>
          
        </div>
      ) : (
        <div className="error">
          <img src={errorGif} alt="" />
        </div>
      )}
    </>
  );
};


export default MapComponent;
