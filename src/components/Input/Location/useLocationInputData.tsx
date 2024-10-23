import { useCallback, useState } from 'react';
import { ErrorNotification } from '../../toast/toastMessages';
import { debounce, DebouncedFunc } from 'lodash';

export type CityState = {
  city: string;
  state: string;
};

export const useLocationInputData = (onChange: (val: string) => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getLocation: DebouncedFunc<() => void> = useCallback(
    debounce(
      !loading
        ? () => {
            setLoading(true);

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showCity);
            } else {
              ErrorNotification(
                'Geolocation is not supported by this browser.'
              );
              setLoading(false);
            }

            function showCity(position: any) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              var myHeaders = new Headers();
              myHeaders.append('content-type', 'application/json');

              var requestOptions = {
                method: 'GET',
                headers: myHeaders,
              };
              // Make a request to a Geocoding API (e.g. Open Street Map Geocoding API)
              const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

              fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                  // Parse the city/state name from the API response

                  const {
                    address: { city, town, ['ISO3166-2-lvl4']: rawState },
                  } = data;

                  const [_, state] = rawState.split('-');

                  onChange(`${city || town}, ${state}`);
                  setLoading(false);
                })
                .catch((error) => {
                  ErrorNotification('Unable to get current location.');
                  setLoading(false);
                });
            }
          }
        : () => {},
      500
    ),
    [setLoading]
  );

  return { getLocation, loading };
};
