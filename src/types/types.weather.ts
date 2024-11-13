/* eslint-disable @typescript-eslint/no-namespace */
export namespace Weather {
  export namespace Current {
    export interface Request {
      lat?: string;
      lon?: string;
      appid: string;
      mode?: string;
      units?: string;
      lang?: string;
      q?: string;
    }

    export interface Response {
      coord: {
        lon: number;
        lat: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      base: string;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
      };
      visibility: number;
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      rain: {
        '1h': number;
      };
      clouds: {
        all: number;
      };
      dt: number;
      sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
      };
      timezone: number;
      id: number;
      name: string;
      cod: number;
    }
  }

  export namespace Forecast {
    export interface Response {
      cod: string;
      message: number;
      cnt: number;
      list: {
        dt: number;
        main: {
          temp: number;
          feels_like: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
        };
        weather: [
          {
            id: number;
            main: string;
            description: string;
            icon: string;
          },
        ];
        clouds: {
          all: number;
        };
        wind: {
          speed: number;
          deg: number;
          gust: number;
        };
        visibility: number;
        pop: number;
        rain: {
          '3h': number;
        };
        sys: {
          pod: string;
        };
        dt_txt: string;
      }[];
      city: {
        id: number;
        name: string;
        coord: {
          lat: number;
          lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
      };
    }
  }

  export namespace Cities {
    export interface Response {
      name: string;
      local_names: {
        ascii: string;
        feature_name: string;
        [key: string]: string;
      };
      lat: number;
      lon: number;
      country: string;
      state: string;
    }

    export interface Request extends Record<string, any> {
      limit: number;
      q: string;
    }
  }


}
