# simple-geoip

Get the country code from any endpoint.

# Setup
- Put [GeoLite2-Country databse](https://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.tar.gz) in the `db` folder.

# Building
- yarn
- yarn build

# Usage
```lua
TriggerEvent('getCountryFromEndpoint', '217.182.183.158', function(code)
    print(code)
    -- Output: 'fr'
end)
```

# Nice to have
- GeoLite DB auto-download