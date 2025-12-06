# Payroll Management System

A full-stack Payroll Management System built with **Django**, **Django REST Framework**, **React (TSX)**, and **Tailwind CSS**. This system provides role-based functionality for **Admins** and **Employees**, enabling efficient payroll management, salary slip generation, expense tracking, and data visualization.

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



### **Frontend (.env)**

```
VITE_API_URL=http://localhost:8000/api
```

---

## 📬 API Endpoints Summary

### **Admin**

* POST `/salarySlip/api/create`
* PUT `/salarySlip/api/<id>/`

### **Employee**

* GET `/salarySlip/api/<id>`
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

Thanks to modern web technologies for enabling seamless full-stack development.

---

<!-- Uploading "Screenshot from 2025-12-06 17-11-10.png"... -->

