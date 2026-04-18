# Taal School Project - Fullstack

**Kısa Açıklama**
Bu depo, React (Vite) ile kodlanmış bir ön yüz ve Python FastAPI tabanlı bir backend API içerir. Backend, MySQL veritabanına bağlanarak öğrenci yönetimi, sınavlar ve kurs verilerini yönetir. Proje Docker ile containerize edilmiş olup, kolay kurulumu için `docker-compose` desteklemektedir.

---

## 📋 Gereksinimler

### Option 1: Yerel Kurulum (Kolay)
- **Backend**: Python 3.9+
- **Frontend**: Node.js **LTS** (18.x veya üstü) ve npm
- **Database**: MySQL 8.0
- **Git** (veya GitHub'dan ZIP ile indirme)

> **Not:** Yerel kurulumda backend ve frontend bağımlılıklarını tek komutla yüklemek için `requirements.txt` ve `npm install` kullanılır.

### Option 2: Docker ile çalıştırma (Alternatif) 🐋
- Docker Desktop
- Docker Compose

---

## 🚀 Kurulum ve Çalıştırma

### Option 1: Yerel Kurulum 👨‍💻

1. **Repoyu İndirin:**
```bash
git clone https://github.com/AbdullahMart/Taal_School_Project_Fullstack.git
cd Taal_School_Project_Fullstack
```

2. **Veritabanı Kurulumu:**
   - MySQL'i başlatın (yerel kurulum yapılmış olmalı, veritabanı oluşturulmuş olmalı)
   - Tabloları elle oluşturmanıza gerek yoktur. Backend ilk başlatıldığında eksik tablolar otomatik olarak oluşturulur.

3. **Backend Kurulumu:**
```bash
cd backend-api
python -m venv venv  # (sanal ortam)
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py

# veya
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python main.py
```

4. **Frontend Kurulumu:**
```bash
cd frontend-ui
npm install
npm run dev
```

**Tarayıcıda açın:** http://localhost:5173

---

### Option 2: Docker ile Kurulum (Alternatif) 🐋

1. **Repoyu indirin:**
```bash
git clone https://github.com/AbdullahMart/Taal_School_Project_Fullstack.git
cd Taal_School_Project_Fullstack
```

2. **Environment dosyasını oluşturun** (isteğe bağlı):
```bash
# Backend için .env dosyası (backend-api/.env)
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=career_academy
```

3. **Docker Compose ile çalıştırın:**
```bash
docker-compose up --build
```

4. **Uygulamaya erişin:**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3001
   - **MySQL**: localhost:3307 (host machine'den)

> Tüm servisler otomatik olarak başlatılacak ve birbirine bağlanacaktır.

---

## 📁 Proje Yapısı

```
Taal_School_Project_Fullstack/
├── backend-api/              # Python FastAPI Backend
│   ├── main.py              # FastAPI uygulaması
│   ├── db.py                # SQLAlchemy database config
│   ├── requirements.txt      # Python bağımlılıkları
│   ├── Dockerfile
│   ├── core/
│   │   ├── config.py        # Yapılandırma
│   │   └── security.py      # JWT & Auth
│   ├── models/
│   │   └── models.py        # SQLAlchemy models
│   ├── routers/
│   │   ├── auth.py          # Auth API endpoints
│   │   └── data.py          # Data API endpoints
│   ├── schemas/
│   │   └── student.py       # Pydantic schemas
│   └── services/
│       └── data_service.py  # Business logic
├── frontend-ui/             # React + TypeScript + Vite
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── types.ts
│   │   └── components/
│   │       ├── LoginPage.tsx
│   │       ├── HomePage.tsx
│   │       ├── StudentPage.tsx
│   │       ├── CoursePage.tsx
│   │       ├── ExamPage.tsx
│   │       ├── DashboardStats.tsx
│   │       └── ...
├── docker-compose.yml       # Docker Compose configuration
├── students_table.sql       # Veritabanı şeması
└── README.md
```

---

## 📊 Veritabanı Tabloları

### `students` - Öğrenci Bilgileri
```sql
- student_id (INT, Primary Key)
- first_name (VARCHAR)
- last_name (VARCHAR)
- country (VARCHAR)
- age (INT)
- gender (VARCHAR)
- education_level (VARCHAR)
- field_of_study (VARCHAR)
```

### `app_question_body` - Sınav Soruları
```sql
question_id (INT, Primary Key)
student_id (INT, Foreign Key)
created_at (DATETIME)
level (VARCHAR)
skill (VARCHAR)
code (VARCHAR)
title (VARCHAR)
paragraphs (INT)
question_count (INT)
status (VARCHAR)
```

### `student_stats` - Öğrenci İstatistikleri
```sql
student_stats_id (INT, Primary Key, Auto Increment)
student_id (INT, Foreign Key)
country (VARCHAR)
field_of_study (VARCHAR)
platform_used (VARCHAR)
device_used (VARCHAR)
learning_mode (VARCHAR)
enrollment_date (VARCHAR)
daily_learning_hours (VARCHAR)
quizzes_attempted (INT)
assignments_submitted (INT)
course_completion_rate (VARCHAR)
satisfaction_score (INT)
```

---

## 🔐 API Endpoints

### Authentication (Auth)
```bash
POST /api/login
# Body: { "email": "user@example.com", "password": "password" }
# Response: { "access_token": "...", "token_type": "bearer", "user": {...} }
```

### Data (Students, Questions, Stats)
```bash
GET /api/students              # Tüm öğrencileri listele
POST /api/students             # Yeni öğrenci ekle
GET /api/students/{id}         # Öğrenci detayları
PUT /api/students/{id}         # Öğrenci güncelle
DELETE /api/students/{id}      # Öğrenci sil

GET /api/questions             # Tüm soruları listele
GET /api/questions/{id}        # Soru detayları
```

---

## ⚙️ Environment Variables (bu dosyalari yerelde bilgisayrinizda olustrmaniz gerekiyor)

**Backend (.env dosyası - backend-api/.env):**
```env
DB_USER=root
DB_PASSWORD=!@#123qwert (kendi sifrenizi yazin)
DB_HOST=localhost
DB_NAME=career_academy
DB_PORT=3306

# Auth Credentials
AUTH_EMAIL=johndoe@careeracademy.com
AUTH_PASSWORD=password123

# Security
SECRET_KEY=9a2f6b8c4d2e1f0a3b5c7d9e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200
```

**Frontend (.env dosyası - frontend-ui/.env):**
```env
# Auth Credentials
AUTH_EMAIL=johndoe@careeracademy.com
AUTH_PASSWORD=password123
```

---

## ⚠️ Yaygın Sorunlar ve Çözümleri

### 1. "Port already in use" Hatası
```bash
# 3001 portunu kullanan işlemi bulun ve durdurun
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3001
kill -9 <PID>
```

### 2. "MySQL connection refused"
- MySQL servisi çalışıyor mu? (Services'te kontrol edin)
- Kullanıcı adı/parola doğru mu?
- Port 3306 (yerel) veya 3307 (Docker) açık mı?

### 3. "ModuleNotFoundError: No module named 'fastapi'"
```bash
# Virtual environment aktif mi?
# Değilse aktif edin ve pip install -r requirements.txt çalıştırın
pip install -r requirements.txt
```

### 4. "npm ERR! code ERESOLVE"
```bash
# node_modules sil ve yeniden kur
rm -r node_modules package-lock.json
npm install
```

### 5. Docker Compose Hatası
```bash
# Logları görüntüle
docker-compose logs -f

# Container'ları temizle ve yeniden başlat
docker-compose down
docker-compose up --build
```

---

## 📚 Kullanılan Teknolojiler

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM database management
- **Uvicorn** - ASGI server
- **Python-jose** - JWT authentication
- **Passlib** - Password hashing
- **mysql-connector-python** - MySQL driver

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

---

## 🤝 Katkıda Bulunma

Projeden yararlandıysanız, lütfen bir ⭐ bırakınız!

---

## 📝 Lisans

Bu proje eğitim amaçlıdır.

---

**Geliştirici**: Abdullah Mart

Basarilar dilerim... 🎓

