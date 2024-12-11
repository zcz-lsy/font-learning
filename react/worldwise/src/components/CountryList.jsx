import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const { cities: cityList, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cityList.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cityList.reduce((oldList, city) => {
    if (!oldList.map((el) => el.cityName).includes(city.country)) {
      return [
        ...oldList,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    } else return oldList;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
