module.exports = {
  debug(obj = {}) {
    return JSON.stringify(obj, null, 4);
  },

  getChatId(msg) {
    return msg.chat.id;
  },

  getTelegramId(msg) {
    return msg.from.id;
  },
  getDataText(data) {
    const { feeds } = data;
    const {
      field1: temperature,
      field2: humidity,
      field3: pressure,
      field4: pm25,
      field5: pm10,
      field6: co,
      field7: so2,
      field8: no2,
    } = feeds[0];

    const text = `Температура воздуха ${temperature}С

Влажность ${humidity}%

Давление ${pressure}

Содержание CO - ${co}ppm (Норма не выше 20ppm)

Содержание NO2 - ${no2}ppm (Норма не более 5ppm)

Содержание SO2 - ${so2}ppm (Норма не более 5ppm)

Содержание O3 -  ${temperature}ppm (Норма не более 10ppm)

Содержание твердых частиц  PM2,5 - ${pm25}ppm (Норма не более 5ppm)

Содержание твердых частиц  PM10 - ${pm10}ppm (Норма не более 5ppm)`;
    return text;
  },
};
