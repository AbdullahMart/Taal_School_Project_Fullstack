# Taal_School_Sql_Fullstack_Project

**Kısa Açıklama**
Bu depo, basit bir React (Vite) ön yüzü ve Node.js (Express) tabanlı bir backend API içerir. Backend MySQL veritabanına bağlanır ve `app_question_body` tablosundan soruları döner. Bu rehber, Git ve Node deneyimi sınırlı öğrencilerin projeyi yerel makinelerine indirip çalıştırabilmesi için adım adım anlatır.

---

## Gereksinimler ✅
- Git (veya GitHub'dan ZIP ile indirme)
- Node.js **LTS** (18.x veya üstü) ve npm
- MySQL (yerel kurulum) 
- VS Code veya başka bir kod editörü

---

## 1) Repoyu İndirme
1. Git ile (tercih edilir):

```bash
git clone https://github.com/AbdullahMart/Taal_School_Project_Fullstack.git
cd Taal_School_Project_Fullstack
```

> Öneri: Repo'yu kendi GitHub hesabınıza almak isterseniz, GitHub sayfasından **Fork** yapın, sonra fork'unuzu klonlayın.

Not: Git bilginiz yoksa GitHub sayfasından **Code → Download ZIP** ile indirebilirsiniz; zip'i açıp aynı klasöre gelin.

---
2. MySQL veritabanını oluşturun ve örnek tablo ekleyin (MySQL komut satırında veya bir GUI ile çalıştırın):

### MySQL Workbench veya CLI ile SQL dosyalarını yükleme 📥
Aşağıdaki adımları izleyerek `app_db-schema.sql` (şema) ve `app_db-data.sql` (örnek veriler) dosyalarını yükleyin. **Önce şema**, sonra **veri** dosyasını çalıştırın.

A. MySQL Workbench ile (grafiksel):
1. MySQL Workbench'i açın ve yerel MySQL bağlantınıza çift tıklayarak bağlanın.
2. Üst menüden **File → Open SQL Script** ile `app_db-schema.sql` dosyasını açın.
3. Sağ üstteki ⚡ (Execute) butonuna veya Ctrl+Shift+Enter ile script'i çalıştırın. `Schemas` bölümünde `app_db` görünmelidir.
4. Aynı şekilde **File → Open SQL Script** ile `app_db-data.sql` dosyasını açın ve çalıştırın. Veriler `app_question_body` tablosuna eklenecektir.


B. Kontrol
- Workbench'te `Schemas → app_db → Tables → app_question_body` altında kayıtları görebilirsiniz.
- Workbanch SQL Query (Test için):

---Query icine Test icin yazabilirsin.---

select * 
from app_db.app_question_body;

-------------------------------------------

3. MySQL bağlantı bilgilerini kontrol edin:
- Varsayılan `backend-api/index.js` içindeki bağlantı bilgileri örnektir; kendi MySQL kullanıcı/parolanızı kullanın. `backend-api/index.js` dosyasini açıp şu bölümü bulun ve düzenleyin:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!@#123qwert', // -> burayı kendi parolanızla değiştirin
  database: 'app_db'
});
```

> İpucu: Güvenlik için gerçek projelerde **şifreleri repoya koymayın**; `.env` kullanın.


## 3) Backend (API) kurulumu ve çalıştırma 🔧

A. backend-api dizinine gidin:
- Kökten (kısa):

```bash
cd backend-api
```



B. API'yi başlatın:

```bash
node index.js
```

> Not: Eğer `Error: Cannot find module '...\index.js'` gibi bir hata görürseniz, muhtemelen `node index.js` komutunu yanlış klasörden çalıştırdınız; ya `cd backend-api` ile doğru klasöre geçin ya da tam dosya yolunu kullanarak çalıştırın:



- Başarılıysa: `🚀 API çalışıyor: http://localhost:3001` ve `✅ MySQL bağlantısı başarılı!` göreceksiniz.

- Sql server'dan verilerin gelip gelmedigini test etmek icin :

```web browser (Chrome veya edge vs.)

Url: http://localhost:3001/api/questions
```

---

## 4) Frontend (React + Vite) kurulumu ve çalıştırma 🌐
A. Vs Code ile yeni Terminal acin. Backen-api terminalini kapatmayin. Acilan yeni terminalde Frontend dizinine gidin:

- Repo kökünden (kısa):

```bash
cd app_db/App_db
```



B. Bağımlılıkları yükleyin:

```bash
npm install
```

> İpucu: Eğer `npm install` komutunu yanlış üst klasörde çalıştırırsanız, bağımlılıklar `app_db` kökünde ya da başka bir yerde kurulabilir; doğru klasörde (`app_db/App_db`) olduğunuzdan emin olun.

C. Geliştirme sunucusunu başlatın:

- Kısa yol:

```bash
npm run dev
```


- Vite genellikle `http://localhost:5173/` adresini verecektir. Tarayıcıda açın.
- Frontend otomatik olarak backend API'sine `http://localhost:3001/api/questions` endpoint'inden istek atarak verileri çekmelidir (CORS zaten etkin).

---



## 4) Yaygın Sorunlar ve Çözümleri ⚠️
- "MySQL bağlantı hatası": MySQL servisi çalışıyor mu? Kullanıcı/parola/host doğru mu? 3306 portu başka bir uygulama tarafından mı kullanılıyor?
- "Port already in use": 3001 veya 5173 portlarını başka uygulamalar kullanıyor olabilir. Farklı port deneyin veya o uygulamayı kapatın.
- Eksik paketler: `npm install` komutunu ilgili dizinde çalıştırdığınızdan emin olun.
- Node sürümü uyuşmazlığı: LTS (18.x/20.x) kullanın.

Abdullah Mart

Balarilar dilerim...

