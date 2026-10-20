# Certificate Display Portal

This is a static certificate display page served by a small Spring Boot application.

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
