import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import Select from "react-select";

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    priority: { value: "Medium", label: "Medium" },
    isOutdoor: false,
    weather: null,
  });

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setNote((prevValue) => ({
      ...prevValue,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handlePriorityChange(selectedOption) {
    setNote((prevValue) => ({
      ...prevValue,
      priority: selectedOption,
    }));
  }

  async function fetchWeather(lat, lon) {
    try {
      const apiKey = "3a713c668b88224d3295d120286f31e6";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = response.data;
      return `🌡 ${data.main.temp}°C, ${data.weather[0].description}`;
    } catch (error) {
      return "Weather data unavailable";
    }
  }

  async function getLocationAndFetchWeather() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject("Geolocation not supported");
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const weatherData = await fetchWeather(
            position.coords.latitude,
            position.coords.longitude
          );
          resolve(weatherData);
        },
        () => {
          resolve("Weather data unavailable");
        }
      );
    });
  }

  async function submitNote(event) {
    event.preventDefault();
    if (note.title.trim() === "" || note.content.trim() === "") {
      alert("Note title and content cannot be empty!");
      return;
    }

    let weatherData = null;
    if (note.isOutdoor) {
      weatherData = await getLocationAndFetchWeather();
    }

    props.onAdd({ ...note, priority: note.priority.value, weather: weatherData });
    setNote({
      title: "",
      content: "",
      priority: { value: "Medium", label: "Medium" },
      isOutdoor: false,
      weather: null,
    });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Note it before you forget..."
          rows={4}
          value={note.content}
          onChange={handleChange}
        ></textarea>

        <label>
          Priority:
          <Select
            options={priorityOptions}
            value={note.priority}
            onChange={handlePriorityChange}
            className="priority-select"
            isSearchable={false} // Disable search if not needed
          />
        </label>

        <label>
          Outdoor Activity:
          <input
            type="checkbox"
            name="isOutdoor"
            checked={note.isOutdoor}
            onChange={handleChange}
          />
        </label>

        <button onClick={submitNote}>
          <FiPlus size={24} />
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
