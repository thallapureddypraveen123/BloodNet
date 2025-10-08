# 🩸 BloodNet — Smart Blood Donor & Request Management System  

> A full-stack platform connecting **blood donors**, **patients**, and **admins** — built with **Spring Boot**, **React**, and **PostgreSQL**.  

---

## 🌟 Overview  
**BloodNet** is a civic-minded application that streamlines blood donation management.  
It enables patients to raise urgent or scheduled blood requests, automatically matches and notifies nearby donors, and provides a full-featured admin dashboard to manage donors and requests in real time.

---

## 🚀 Features  

✅ Donor registration & management  
✅ Create blood requests (urgent/scheduled)  
✅ Automatic email notifications to matching donors  
✅ Admin dashboard with statistics  
✅ City & blood group filtering  
✅ Inline editing & record management in admin panel  
✅ Secure backend API with Spring Boot  

---

## 🏗️ System Architecture  

Frontend (React + Axios) ↓ Backend (Spring Boot REST APIs) ↓ Database (PostgreSQL) ↓ Email Notification Service (JavaMailSender)
---

## ⚙️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, Tailwind CSS, Axios |
| **Backend** | Spring Boot, JPA/Hibernate |
| **Database** | PostgreSQL |
| **Tools** | IntelliJ IDEA, VS Code, Postman, GitHub |
| **Notifications** | JavaMailSender (SMTP) |

---

## 🧩 Modules  

### 🩸 Donor Module
- Register donors with name, city, and blood group  
- Filter and search donors dynamically  
- Real-time email notifications to donors  

### 🏥 Request Module
- Submit new blood requests  
- Mark requests as urgent or scheduled  
- Auto-match donors by city & blood group  

### ✉️ Notification Module
- Sends personalized donor emails  
- Tracks total number of emails sent  

### 🧑‍💼 Admin Module
- Manage all donors and requests  
- Inline editing (no pop-ups)  
- View accepted donors per request  
- Dashboard with total counts and summary  

---

## ⚡ Installation & Setup  

### 🧩 Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
Runs on: http://localhost:8080
💻 Frontend (React)
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

📨 Email Configuration
Add your Gmail credentials inside application.properties:
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
⚠️ Use a Gmail App Password instead of your real password for security.

📊 Dashboard Summary
Metric
Description
🧍 Total Donors
Count of all registered donors
🏥 Total Requests
Number of all patient blood requests
🚨 Urgent Requests
Requests marked as urgent
❤️ Accepted Donors
Donors who accepted a request

📸 Screenshots
Page
Description
🏠 Home
Welcome and overview
🩸 Donors
Donor list with search & filters
🧾 Requests
Create and manage requests
🧑‍💼 Admin Panel
Manage data efficiently
📊 Dashboard
Summary of system status

🔮 Future Enhancements
	•	📍 Google Maps integration for nearest donors
	•	📱 SMS notifications using Twilio
	•	🧾 Donor verification & donation history
	•	🏥 Multi-hospital management system
	•	🌐 Cloud deployment (Render / Railway / AWS)

🧠 Project Structure
BloodNet/
 ┣ backend/
 ┃ ┣ src/
 ┃ ┣ pom.xml
 ┃ ┗ ...
 ┣ frontend/
 ┃ ┣ src/
 ┃ ┣ package.json
 ┃ ┗ ...
 ┣ .gitignore
 ┗ README.md

👨‍💻 Author
Praveen Thallapureddy 🎓 Master’s in Computer Science — Missouri S&T 💼 Java Full-Stack Developer 📧 thallapureddypraveen123@gmail.com 🔗 LinkedIn

🏁 License
This project is open-source and available under the MIT License.

💖 Acknowledgements
Special thanks to mentors and peers who helped shape this project!
“Donate blood, save lives — technology can make it faster.”
---


