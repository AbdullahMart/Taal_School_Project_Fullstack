# Taal School Project - Fullstack

**Kısa Açıklama**
Bu depo, React (Vite) ile kodlanmış bir ön yüz ve Python FastAPI tabanlı bir backend API içerir. Backend, MySQL veritabanına bağlanarak öğrenci yönetimi, sınavlar ve kurs verilerini yönetir. Proje Docker ile containerize edilmiş olup, kolay kurulumu için `docker-compose` desteklemektedir.

---

## 📋 Gereksinimler

### Option 1: Docker ile çalıştırma (Önerilen) 🐋
- Docker Desktop
- Docker Compose

### Option 2: Yerel kurulum
- **Backend**: Python 3.9+
- **Frontend**: Node.js **LTS** (18.x veya üstü) ve npm
- **Database**: MySQL 8.0
- **Git** (veya GitHub'dan ZIP ile indirme)

---

## 🚀 Kurulum ve Çalıştırma

### Option 1: Docker ile Kurulum (En Hızlı) 🐋

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
DB_NAME=app_db
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

### Option 2: Yerel Kurulum 👨‍💻

#### 1️⃣ Repoyu İndirme
```bash
git clone https://github.com/AbdullahMart/Taal_School_Project_Fullstack.git
cd Taal_School_Project_Fullstack
```

#### 2️⃣ Veritabanı Kurulumu

1. **MySQL'i başlatın** (yerel kurulum yapılmış olmalı)
2. **Veritabanını oluşturun:**
```bash
mysql -u root -p < students_table.sql
```

3. **MySQL Workbench ile (Alternatif):**
   - MySQL Workbench'i açın
   - File → Open SQL Script
   - `students_table.sql` dosyasını seçin
   - Execute butonuna (⚡) basın

#### 3️⃣ Backend (Python FastAPI) Kurulumu

```bash
cd backend-api

# Python virtual environment oluşturun (önerilen)
python -m venv venv

# Virtual environment'i aktif edin
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Bağımlılıkları yükleyin
pip install -r requirements.txt

# Backend'i çalıştırın
python main.py
```

**Başarılı ise göreceksiniz:**
```
INFO:     Uvicorn running on http://0.0.0.0:3001
INFO:     Application startup complete
```

#### 4️⃣ Frontend (React + Vite) Kurulumu

**Yeni terminal açın** (backend'i açık bırakın):
```bash
cd frontend-ui

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

**Tarayıcıda açın:** http://localhost:5173

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
- id (INT, Primary Key)
- created_at (DATETIME)
- level (VARCHAR)
- skill (VARCHAR)
- code (VARCHAR)
- title (VARCHAR)
- paragraphs (INT)
- question_count (INT)
- status (VARCHAR)
```

### `student_stats` - Öğrenci İstatistikleri
```sql
- student_id (INT, Primary Key)
- country, field_of_study, platform_used, device_used
- learning_mode, enrollment_date, daily_learning_hours
- quizzes_attempted, assignments_submitted
- course_completion_rate, satisfaction_score
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

## ⚙️ Environment Variables

**Backend (.env dosyası - backend-api/.env):**
```env
DB_HOST=localhost           # veya Docker'da 'db'
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=app_db

AUTH_EMAIL=test@example.com
AUTH_PASSWORD=password123
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Frontend (.env dosyası - frontend-ui/.env):**
```env
VITE_API_URL=http://localhost:3001
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

Baliarilar dilerim... 🎓

