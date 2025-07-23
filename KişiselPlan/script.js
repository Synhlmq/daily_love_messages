document.addEventListener('DOMContentLoaded', () => {
    // HTML elementlerini alıyoruz
    const heartContainer = document.getElementById('heartContainer');
    const heartIcon = document.getElementById('heartIcon');
    const envelope = document.getElementById('envelope');
    const messageCard = document.getElementById('messageCard');
    const dailyMessage = document.getElementById('dailyMessage');
    const closeMessageButton = document.getElementById('closeMessage');

    // Her gün için mesajlarımızı buraya yazıyoruz
    // Mesajlar 1'den 12'ye kadar gidecek
    const messages = [
        "Sana olan sevgim, her yeni günde daha da büyüyor. Bunu sana göstermenin ilk adımını atıyorum.", // Day 1
        "Gülüşün, en karanlık günümü aydınlatan güneşim. Bende artık geçmiş karanlıklarımızı bitireceğim",     // Day 2
        "Tek kişilik miydi bu şehir, sen gidince bomboş kaldı. Ne içimi ısıtan bir güneş ne de o meltemli rüzgar. ",      // Day 3
        "Yanımda olmasan da kalbim her zaman seninle atıyor. Kokunsa burnumda kalıcı bir iksir gibi", // Day 4
        "Hayatımın en güzel yılları en güzel anılarısın sen benim.",       // Day 5
        "Mesafeler sadece geri sayımdan ibaret, hislerimiz sonsuz.",       // Day 6
        "Seninle kurduğum hayaller, gerçeğe dönüşecek en güzel rüyalarım. Beraber nice günlere yavrum.", // Day 7
        "Dünler özlenir, yarınar beklenir, bugünler heba edilir. Affet beni sevgilim bugünlerimizi heba etmeyelim artık.", // Day 8
        "Seninle olmak, hayatımdaki en güzel macera. Bitmesini istemediğim tek macera.",       // Day 9
        "Bugün de seni çok özledim, her zamankinden daha çok. Gel artık dayanamıyorum sensizliğe.",  // Day 10
        "Birlikte geçireceğimiz her anı sabırsızlıkla bekliyorum. Gözümü saatten alamıyorum geçmiyor vakit.", // Day 11
        "Küçük detayların bile beni sana hayran bırakıyor. Oysaki sen kocaman bi detaysın."           // Day 12
    ];

    const startDate = new Date('2025-07-23T00:00:00'); // Projenin başlangıç tarihi (kendi başlangıç tarihinizi yazın)

    let currentDay = 0; // O anki günün mesajını tutacak değişken

    // Tarih kontrolünü ve mesajı ayarlayan fonksiyon
    function updateMessageBasedOnDate() {
        const today = new Date();
        // Sadece tarih kısmını karşılaştırmak için saat, dakika, saniye sıfırlanır.
        today.setHours(0, 0, 0, 0); 
        startDate.setHours(0, 0, 0, 0);

        // Başlangıç tarihi ile bugünün arasındaki gün farkını hesapla
        // +1 eklememizin nedeni, başlangıç gününü "Gün 1" olarak saymak istememiz.
        const timeDiff = today.getTime() - startDate.getTime();
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
        
        // Eğer diffDays 1'den küçükse (yani henüz başlangıç tarihi gelmediyse) 1 yap
        // Bu, zarfın açılmaması gerektiği durumu yönetir.
        currentDay = Math.max(1, diffDays);

        // Eğer gün sayısı mesajlarımızın sayısından fazlaysa, son mesajı göster.
        if (currentDay > messages.length) {
            dailyMessage.textContent = "Tüm mesajları açtın! Yeni mesajlar için beni bekle :)";
            heartContainer.style.pointerEvents = 'none'; // Kalbe tıklamayı devre dışı bırak
            heartIcon.style.animation = 'none'; // Kalp atışı animasyonunu durdur
            heartIcon.style.color = '#ccc'; // Kalp rengini soluklaştır
            heartContainer.querySelector('p').textContent = "Tüm mesajlar açıldı!";
            return; // Fonksiyondan çık
        } else if (currentDay < diffDays) { // Bu kısım teorik olarak diffDays her zaman >= currentDay olacağı için gereksiz.
                                            // Asıl önemli olan currentDay'in startDate'e göre ilerlemesidir.
                                            // Yine de bir emniyet kemeri olarak kalabilir.
            dailyMessage.textContent = "Henüz bu mesaj açılmadı. Biraz daha bekle :)";
            heartContainer.style.pointerEvents = 'none'; // Kalbe tıklamayı devre dışı bırak
            heartIcon.style.animation = 'none'; // Kalp atışı animasyonunu durdur
            heartIcon.style.color = '#ccc'; // Kalp rengini soluklaştır
            return; // Fonksiyondan çık
        }

        // Eğer bugün için mesaj varsa, kalbi aktif et
        heartContainer.style.pointerEvents = 'auto'; // Kalbe tıklamayı etkinleştir
        heartIcon.style.animation = 'pulse 1.5s infinite'; // Kalp atışı animasyonunu başlat
        heartIcon.style.color = '#e74c3c'; // Kalp rengini normale döndür
        heartContainer.querySelector('p').textContent = "Bugünün mesajını açmak için kalbe tıkla!";

        // Mesajı `dailyMessage` elementine yükle (ancak henüz gösterme)
        dailyMessage.textContent = messages[currentDay - 1]; // Diziler 0'dan başladığı için -1
    }

    // Sayfa yüklendiğinde mesajı güncelle
    updateMessageBasedOnDate();

    // Kalp konteynerine tıklama olayı ekliyoruz
    heartContainer.addEventListener('click', () => {
        const today = new Date();
        today.setHours(0,0,0,0);
        startDate.setHours(0,0,0,0);
        const timeDiff = today.getTime() - startDate.getTime();
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 

        // Sadece ilgili günün mesajı açılabilir
        if (diffDays < currentDay) { // Henüz gün gelmediyse
             alert("Bu mesaj henüz açılmadı. Lütfen doğru tarihi bekle :)");
             return;
        }
        if (diffDays > currentDay) { // Geçmiş günlere erişim (opsiyonel, şu an açmaya izin veriyoruz ama mesajı değiştirebiliriz)
            // Bu kısım şu an için gerekli değil, çünkü currentDay zaten doğru değeri tutuyor
            // Ama eğer geçmiş mesajların farklı bir şey göstermesini istersen burayı düzenleyebilirsin.
            // Örneğin: alert("Bu mesaj zaten açıldı!");
        }


        // Zarfı görünür yap ve animasyonu başlat
        envelope.classList.add('active'); // Zarfı görünür yap
        heartContainer.style.display = 'none'; // Kalbi gizle

        // Küçük bir gecikme ile zarf açılma animasyonunu tetikle
        // Bu, zarfın görünür olmasını bekler ve sonra açılma sınıfını ekler.
        setTimeout(() => {
            envelope.classList.add('opened'); // Zarf açılma animasyonunu başlat
        }, 50); // 50ms gecikme
    });

    // Mesajı kapatma butonuna tıklama olayı ekliyoruz
    closeMessageButton.addEventListener('click', () => {
        envelope.classList.remove('opened'); // Zarfı kapatma animasyonunu başlat
        // Zarf kapanma animasyonundan sonra gizle
        setTimeout(() => {
            envelope.classList.remove('active'); // Zarfı gizle
            heartContainer.style.display = 'block'; // Kalbi tekrar göster
            updateMessageBasedOnDate(); // Tekrar tarih kontrolü yapıp kalbin durumunu güncelleriz
        }, 800); // CSS geçiş süresi kadar (0.8s) bekleriz
    });

    // Başlangıçta mesajı güncelle
    updateMessageBasedOnDate();
});