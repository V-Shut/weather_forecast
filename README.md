# Weather Forecast App

A React application for fetching and displaying weather data using the [OpenWeather API](https://openweathermap.org/).

## Features

- **City Search**: Search for current weather conditions by city name.
- **Current Weather**: View real-time weather data such as temperature, humidity, wind speed, and conditions.
- **5-Day Forecast**: Display weather predictions with daily minimum and maximum temperatures, as well as weather conditions.
- **Redux State Management**: City search and weather data managed efficiently with Redux.
- **Favorites**: Add cities to favorites for easy future reference.

## Tech Stack

- **React**: Component-based UI development.
- **Redux Toolkit**: State management.
- **TypeScript**: Type safety and scalability.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Vite**: Fast development environment.
- **OpenWeather API**: Provides weather data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm start
    ```

2. Build for production:
    ```bash
    npm run build
    ```

3. Preview the production build:
    ```bash
    npm run preview
    ```

## Deploy

To deploy the application on GitHub Pages:

1. Add the following in your `package.json` under `scripts`:
    ```json
    "deploy": "gh-pages -d dist"
    ```

2. Run the following commands:
    ```bash
    npm run build
    npm run deploy
    ```

Ensure that the repository has GitHub Pages enabled and is set to serve from the `gh-pages` branch.

## Contributing

Feel free to open a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
