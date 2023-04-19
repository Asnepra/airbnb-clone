import countries  from 'world-countries';

//Format to use for countries

const formattedCountries = countries.map((country) =>({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}));

const useCountrySelectProperty = ()=> {
  const getAll =()=> formattedCountries;
  const getByValue =(value:string)=> {
    return formattedCountries.find((item)=>item.value===value);

  }
  return{
    getAll,
    getByValue
  }
};


export default useCountrySelectProperty;
