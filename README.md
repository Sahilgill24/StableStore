<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Sahilgill24/StableStore">
    <img src="frontend/ui/src/assets/logo.svg" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">StableStore</h3>

  <p align="center" style="width:76ch;">
Welcome to StableStore, the all in one solution for stable coin checkouts in filecoin.
Designed to streamline your operations and finances, StableStore offers a comprehensive suite of tools to manage your storage deals and monitor your performance.</p>
    <a href="https://stablestore.gitbook.io/stablestore">View Docs</a>
    ·
    <a href="https://github.com/Sahilgill24/StableStore/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Sahilgill24/StableStore/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

## Get Started
<a href="https://stablestore.gitbook.io/stablestore"><strong>Explore the docs »</strong></a>
1.  Clone the repo
    ```sh
    git clone https://github.com/Sahilgill24/StableStore.git && cd StableStore
    ```
2.  Setup the environment files.
    ```sh
    # frontend/ui/.env
    VITE_BACKEND_URI=http://localhost:8080/api
    VITE_DATA_BACKEND_URI=http://localhost:3000
    ```
    ```sh
    # services/core/.env.development.local
    # PORT
    PORT=8080
    DATABASE_URL=

    # TOKEN

    SECRET_KEY=developemtn_secret_key

    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_MAIL=
    SMTP_APP_PASS=

    LOG_FORMAT = dev
    LOG_DIR = ../logs

    # CORS

    ORIGIN = 'http://localhost:5174'
    CREDENTIALS = true

    ```
3. Build and deploy
    ```sh
    cd backend && npm i && cd controllers && node apiserver.js && cd ../ # running our API server
    cd frontend/ui && yarn && yarn dev --port 5174 && cd ../../ # running our frontend 
    cd services/core && npm i && npm run dev
    ````

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Sahil Gill <br />
Twitter: [@SahilGill24](https://x.com/SahilGill24) <br />
Email: gursahilgill24@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Sahilgill24/StableStore.svg?style=for-the-badge
[contributors-url]: https://github.com/Sahilgill24/StableStore/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Sahilgill24/StableStore.svg?style=for-the-badge
[forks-url]: https://github.com/Sahilgill24/StableStore/network/members
[stars-shield]: https://img.shields.io/github/stars/Sahilgill24/StableStore.svg?style=for-the-badge
[stars-url]: https://github.com/Sahilgill24/StableStore/stargazers
[issues-shield]: https://img.shields.io/github/issues/Sahilgill24/StableStore.svg?style=for-the-badge
[issues-url]: https://github.com/Sahilgill24/StableStore/issues
[license-shield]: https://img.shields.io/github/license/Sahilgill24/StableStore.svg?style=for-the-badge
[license-url]: https://github.com/Sahilgill24/StableStore/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/image.png
[frost-screenshot]: images/frost.png
[architecture]: images/architecture.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com