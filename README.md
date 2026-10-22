# Certificate Display Portal

This repository contains both a Spring Boot version and a fully static version of the certificate display page.

## Static website

The `static-site` folder can be deployed directly to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static hosting service. It does not require Java, Maven, Docker, or a database.

Static certificate URL:

```text
/verify/NOC-E9RC-8P2V-TJ807/
```

The static site displays `static-site/finalimage.png`. Clicking the image downloads:

```text
/verify/NOC-E9RC-8P2V-TJ807/certificate.pdf
```

To deploy with GitHub Pages, configure Pages to publish from the `static-site` folder, or copy the contents of `static-site` to a dedicated Pages branch.

## Run locally

```powershell
java -jar ".\target\certificate-verification-0.0.1-SNAPSHOT.jar"
```

Open:

```text
http://localhost:8080/verify/NOC-E9RC-8P2V-TJ807
```

The page displays `src/main/resources/static/finalimage.png`. Clicking the image downloads the PDF through:

```text
/verify/NOC-E9RC-8P2V-TJ807/certificate.pdf
```

The application uses no database. To change the displayed certificate, replace `src/main/resources/static/finalimage.png` and `src/main/resources/static/finalpdf.pdf`, rebuild the JAR, and redeploy.
