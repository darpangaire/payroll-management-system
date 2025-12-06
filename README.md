# Payroll Management System

A full‑stack Payroll Management System built with **Django**, **Django REST Framework**, **React (TSX)**, and **Tailwind CSS**. This system provides role‑based functionality for **Admins** and **Employees**, enabling efficient payroll management, salary slip generation, expense tracking, and data visualization.

---

## 🚀 Tech Stack

### **Backend**

* **Django** – Core backend framework
* **Django REST Framework (DRF)** – API development
* **PostgreSQL / SQLite** – Database
* **JWT Authentication** – Secure access control

### **Frontend**

* **React + TypeScript** – Component-based UI
* **Tailwind CSS** – Modern utility-first styling
* **React Query** – API state management
* **Recharts** – Data visualization (pie chart)

---

## 🔐 Features Overview

### **Role-Based Authentication**

* Secure login/signup with JWT
* Two distinct roles: **Admin** and **Employee**
* Smart route protection in React

---

## 👨‍💼 Admin Features

* **Create Salary Slip** for any employee
* **Update Salary Slip** when adjustments are necessary
* Full control over payroll data

---

## 👨‍💻 Employee Features

* View **personal salary slips** only
* Dashboard with **Pie Chart** visualizing salary breakdown
* **Submit monthly expenses**

---

## 📊 Visualizations

* Dynamic **pie chart** for salary distribution

  * Base salary
  * Bonus
  * Deductions
  * Net salary

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── payroll_app/
│   ├── api/
│   └── ...
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
└── README.md
```

---

## 🛠️ Installation & Setup

### **Backend Setup**

```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### **Backend (.env)**

```
SECRET_KEY=your_secret_key
DATABASE_URL=your_db_url
DEBUG=True
```

### **Frontend (.env)**

```
VITE_API_URL=http://localhost:8000/api
```

---

## 📬 API Endpoints Summary

### **Admin**

* POST `/salary-slip/create/`
* PUT `/salary-slip/update/<id>/`

### **Employee**

* GET `/salary-slip/my/`
* POST `/expenses/create/`

---

## 🤝 Contribution

Contributions, issues, and suggestions are welcome!
Feel free to open a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🌟 Acknowledgements

Thanks to modern web technologies for enabling seamless full‑stack development.

---
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/912b93ff-fea2-4cb6-a635-f16aa28b19e8" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/baf85ec0-2cde-497f-b8cc-10203e4ccc55" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/6b9a019d-7426-4afa-ac91-6564b2249393" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/53a4ca99-7809-4dea-91bb-de0f3ded73e1" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/3c71e8e3-1296-4586-85f3-ae3f330a959b" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/e518a39b-cc40-4188-bd2a-92db638a39ce" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/0dc9ffa1-b3a8-46cf-bd63-09a69de1c241" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/044baab3-5942-4856-9b38-1b5a3c2c3137" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/6e1a0933-8202-4690-8bf2-486f8f8f6419" />

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/59f5cac6-f706-4468-9193-a59d04e1309f" />
