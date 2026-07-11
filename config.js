window.CARECLIQ_CONFIG = {

  API_BASE:
    window.location.hostname ===
    "localhost" ||

    window.location.hostname ===
    "127.0.0.1"

      ? "https://carecliq-redesign.onrender.com"

      : "https://YOUR-RENDER-SERVICE.onrender.com"

};