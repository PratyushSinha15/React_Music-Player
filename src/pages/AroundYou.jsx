import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
  const [country, setCountry] = useState('');
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`);
        const countryName = response?.data?.location.country;
        if (countryName) {
          setCountry(countryName);
        }
      } catch (err) {
        console.error('Failed to fetch country data:', err);
      }
    };

    fetchCountryData();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (country) {
      const fetchData = async () => {
        try {
          await useGetSongsByCountryQuery(country).unwrap();
        } catch (error) {
          console.error('Failed to fetch songs by country:', error);
        }
      };

      fetchData();
    }
  }, [country]); // Fetch songs whenever the country state changes

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around you <span className="font-black">{country}</span></h2>

      {(isFetching || !data) && <Loader title="Loading Songs around you..." />}

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
