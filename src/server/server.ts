import { Reader, CountryRecord } from '@maxmind/geoip2-node';
import axios from 'axios';

const resourcePath = GetResourcePath(GetCurrentResourceName());
const endpointCache = {};

const getEndpointCountry = (endpoint: string) => {
    const defaultIsoCode = 'us';

    return new Promise((resolve, reject) => {
        Reader.open(`${resourcePath}/db/GeoLite2-Country.mmdb`).then(reader => {
            const response = reader.country(endpoint);

             // @ts-ignore
            if (response && response.country && response.country.isoCode) {
                const country = response.country as CountryRecord;
                resolve(country.isoCode.toLocaleLowerCase());
            } else {
                axios.get(`https://freegeoip.app/json/${endpoint.replace("[", "").replace("]", "")}`)
                    .then((res: any) => resolve(res.data.country_code.toLocaleLowerCase()))
                    .catch(() => resolve(defaultIsoCode));
            }
        })
        .catch(() => resolve(defaultIsoCode));
    });
};

const formatCountry = async (endpoint: string) => {
    if (!endpointCache[endpoint]) {
        endpointCache[endpoint] = await getEndpointCountry(endpoint);
    }

    return endpointCache[endpoint];
};

addEventListener('getCountryFromEndpoint', async (endpoint: string, cb: (country: string) => void) => cb(await formatCountry(endpoint)));