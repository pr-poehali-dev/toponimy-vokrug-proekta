import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/20c700af-4039-4a14-8864-57cd89f0dac2/files/68d90e4b-307b-47d7-bf7d-c944a57d8c05.jpg";
const ETYMOLOGY_IMG = "https://cdn.poehali.dev/projects/20c700af-4039-4a14-8864-57cd89f0dac2/files/187bd94f-aa9c-46b4-907a-a8e4aed4a5d3.jpg";
const GALLERY_IMG3 = "https://cdn.poehali.dev/projects/20c700af-4039-4a14-8864-57cd89f0dac2/files/64c5e9e4-6d8a-4c0f-9d93-70ca1e47ccaf.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "dictionary", label: "Словарь" },
  { id: "map", label: "Карта" },
  { id: "history", label: "История" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

const DICTIONARY_WORDS = [
  { word: "Москва", root: "моск-", origin: "Финно-угорское", meaning: "«Коровья река» или «Мутная вода» — от слова «моска» в мерянском языке", category: "Города", icon: "Building2" },
  { word: "Волга", root: "волг-", origin: "Балтийское", meaning: "От балтийского «ilga» — «долгая, длинная» или от праславянского «влага»", category: "Реки", icon: "Waves" },
  { word: "Байкал", root: "бай-кал", origin: "Тюркское", meaning: "«Богатое озеро» — «бай» (богатый) + «кёл» (озеро) в тюркских языках", category: "Озёра", icon: "Droplets" },
  { word: "Урал", root: "ур-", origin: "Башкирское", meaning: "«Пояс» или «Граница» — горная система как природный рубеж", category: "Горы", icon: "Mountain" },
  { word: "Сибирь", root: "сибир-", origin: "Тюркское", meaning: "Предположительно от «Сипыр» — названия народа или от слова «болото»", category: "Регионы", icon: "Trees" },
  { word: "Ладога", root: "ладог-", origin: "Финское", meaning: "От финского «aaldokas» — «волнующийся» — характеристика бурного озера", category: "Озёра", icon: "Droplets" },
];

const MAP_POINTS = [
  { x: 52, y: 38, name: "Москва", desc: "Финно-угорское происхождение" },
  { x: 35, y: 30, name: "Санкт-Петербург", desc: "Нидерландское название" },
  { x: 68, y: 55, name: "Волга", desc: "Балтийские корни" },
  { x: 80, y: 35, name: "Урал", desc: "Башкирское «пояс»" },
  { x: 72, y: 72, name: "Каспий", desc: "Древнеперсидское" },
  { x: 28, y: 55, name: "Киев", desc: "Славянское от «Кий»" },
];

const HISTORY_ITEMS = [
  {
    era: "Праславянский период",
    years: "до VI века",
    icon: "Leaf",
    gold: false,
    examples: ["Дон — «Река» на иранских языках", "Ока — «Вода» в балтийских языках"],
    desc: "Названия, уходящие корнями в эпоху до образования славянских племён. Многие реки и горы сохранили имена от народов, живших здесь тысячелетия назад.",
  },
  {
    era: "Славянская экспансия",
    years: "VI–X века",
    icon: "Sprout",
    gold: false,
    examples: ["Новгород — «Новый город»", "Белозеро — «Белое озеро»"],
    desc: "Эпоха активного заселения славянами новых территорий. Названия этого периода отличаются прозрачностью: они описывали географические особенности мест.",
  },
  {
    era: "Татаро-монгольское влияние",
    years: "XIII–XV века",
    icon: "Wind",
    gold: true,
    examples: ["Тамбов — «Глубокая вода»", "Пенза — «Пять оврагов»"],
    desc: "Нашествие принесло не только разрушения, но и пласт тюркской топонимики. Особенно богаты тюркскими названиями Поволжье и Урал.",
  },
  {
    era: "Имперский период",
    years: "XVIII–XIX века",
    icon: "Crown",
    gold: false,
    examples: ["Екатеринбург — в честь Екатерины I", "Александровск — от имени Александра"],
    desc: "Россия активно осваивала новые земли, и города получали имена в честь монархов, полководцев и государственных деятелей.",
  },
];

const GALLERY_ITEMS = [
  { title: "Картографические символы", desc: "Как обозначали места на старых картах", tag: "Карты", img: ETYMOLOGY_IMG },
  { title: "Корни слов", desc: "Этимологическое дерево названий", tag: "Этимология", img: GALLERY_IMG3 },
  { title: "Народная топонимика", desc: "Местные названия и их легенды", tag: "Фольклор", img: HERO_IMG },
  { title: "Водные пути", desc: "Реки как природные дороги и имена", tag: "Реки", img: GALLERY_IMG3 },
  { title: "Горная топонимика", desc: "Тайны горных имён и перевалов", tag: "Горы", img: ETYMOLOGY_IMG },
  { title: "Исчезнувшие названия", desc: "Топонимы, стёртые историей", tag: "История", img: HERO_IMG },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Все");
  const [activeMapPin, setActiveMapPin] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useScrollReveal();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }
    setActiveSection(id);
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = ["home", "dictionary", "map", "history", "gallery", "contacts"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filters = ["Все", "Города", "Реки", "Озёра", "Горы", "Регионы"];
  const filtered = DICTIONARY_WORDS.filter((w) => {
    const matchSearch = w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = selectedFilter === "Все" || w.category === selectedFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ===== НАВИГАЦИЯ ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/90 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-parchment text-xs font-display font-bold group-hover:scale-110 transition-transform">Т</div>
            <span className="font-display text-lg font-semibold text-ink hidden sm:block">Топонимы вокруг нас</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-body font-medium transition-colors ${activeSection === item.id ? "text-forest active" : "text-bark hover:text-forest"}`}>
                {item.label}
              </button>
            ))}
          </div>
          <button className="md:hidden text-ink" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-parchment border-t border-gold/20 px-6 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`text-left py-2 text-sm font-medium border-b border-border/50 ${activeSection === item.id ? "text-forest" : "text-bark"}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== ГЛАВНАЯ ===== */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 hero-texture" />
        <div className="absolute inset-0 pattern-dots opacity-40" />
        <div className="absolute top-24 right-12 w-64 h-64 rounded-full bg-forest/5 animate-float blur-2xl" />
        <div className="absolute bottom-32 left-8 w-48 h-48 rounded-full bg-gold/8 animate-float blur-xl" style={{ animationDelay: "2s" }} />

        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-xs font-body font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-up">
              <Icon name="MapPin" size={12} />
              Образовательный проект
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-ink leading-[1.05] mb-4 animate-fade-up delay-100">
              Топонимы
              <span className="block italic text-forest">вокруг нас</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mb-6 animate-fade-up delay-200" />
            <p className="text-bark text-lg leading-relaxed mb-8 animate-fade-up delay-300 max-w-md">
              Каждое название реки, города и горы — это зашифрованная история. Раскрой тайны языка через географические имена.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up delay-400">
              <button onClick={() => scrollTo("dictionary")}
                className="bg-forest text-parchment px-6 py-3 rounded-full font-body font-semibold text-sm hover:bg-forest/90 transition-all hover:scale-105 active:scale-95">
                Открыть словарь
              </button>
              <button onClick={() => scrollTo("map")}
                className="border border-forest text-forest px-6 py-3 rounded-full font-body font-semibold text-sm hover:bg-forest/5 transition-all hover:scale-105">
                Интерактивная карта
              </button>
            </div>
            <div className="flex gap-8 mt-10 animate-fade-up delay-500">
              {[["500+", "Топонимов"], ["12", "Языков-источников"], ["8", "Исторических эпох"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-forest">{num}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up delay-300">
            <div className="relative rounded-2xl overflow-hidden ornate-border shadow-2xl">
              <img src={HERO_IMG} alt="Топонимы" className="w-full h-80 md:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-parchment/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="font-display text-lg font-semibold text-ink">Знаете ли вы?</div>
                  <div className="text-sm text-bark mt-1">Около 30% русских топонимов имеют нерусское происхождение — финно-угорское, тюркское или балтийское.</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 bg-gold text-ink text-xs font-body font-bold px-3 py-1.5 rounded-full shadow-lg animate-float">
              🗺 Исследуй
            </div>
            <div className="absolute -bottom-4 -right-4 bg-forest text-parchment text-xs font-body font-bold px-3 py-1.5 rounded-full shadow-lg animate-float" style={{ animationDelay: "1.5s" }}>
              📚 Узнавай
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft">
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-xs font-body">прокрути вниз</span>
            <Icon name="ChevronDown" size={16} />
          </div>
        </div>
      </section>

      {/* ===== СЛОВАРЬ ===== */}
      <section id="dictionary" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-reveal text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-body font-semibold mb-3">
              <Icon name="BookOpen" size={14} />
              Словарь топонимов
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
              Словарь <em>топонимов</em>
            </h2>
            <p className="text-bark max-w-xl mx-auto">Изучай происхождение географических названий с фильтрами и поиском</p>
          </div>

          <div className="section-reveal mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Поиск топонима..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button key={f} onClick={() => setSelectedFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${selectedFilter === f ? "bg-forest text-parchment" : "bg-secondary text-secondary-foreground hover:bg-forest/10"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div key={item.word}
                className="section-reveal dict-card bg-card border border-border rounded-2xl p-6 cursor-default"
                style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display text-2xl font-bold text-ink">{item.word}</div>
                    <div className="text-xs text-muted-foreground mt-1 font-body">корень: <span className="text-gold font-semibold">{item.root}</span></div>
                  </div>
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center">
                    <Icon name={item.icon as "BookOpen"} size={18} className="text-forest" />
                  </div>
                </div>
                <div className="inline-block bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full font-body mb-3">
                  {item.origin}
                </div>
                <p className="text-sm text-bark leading-relaxed">{item.meaning}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-body text-muted-foreground">{item.category}</span>
                  <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center">
                    <Icon name="Bookmark" size={11} className="text-gold" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-body">По запросу «{searchQuery}» ничего не найдено</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== ИНТЕРАКТИВНАЯ КАРТА ===== */}
      <section id="map" className="py-24 bg-secondary/30 pattern-lines">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-reveal text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-body font-semibold mb-3">
              <Icon name="Map" size={14} />
              Интерактивная карта
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
              Карта <em>топонимов</em>
            </h2>
            <p className="text-bark max-w-xl mx-auto">Нажми на метку, чтобы узнать о происхождении названия</p>
          </div>

          <div className="section-reveal grid md:grid-cols-3 gap-6 items-start">
            {/* SVG карта России */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
              <div className="relative w-full bg-[#e8f0e9]" style={{ paddingBottom: "56%" }}>
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1000 560"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Фон */}
                  <rect width="1000" height="560" fill="#d4e6d4" rx="12" />
                  {/* Сетка */}
                  {[100,200,300,400,500,600,700,800,900].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="560" stroke="#b8d4b8" strokeWidth="0.5" />
                  ))}
                  {[100,200,300,400,500].map(y => (
                    <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#b8d4b8" strokeWidth="0.5" />
                  ))}

                  {/* Упрощённый контур России */}
                  <path
                    d="M 60 180 L 90 160 L 130 155 L 170 145 L 200 130 L 230 120 L 260 115 L 300 110 L 340 100 L 380 95 L 420 90 L 460 88 L 500 85 L 540 83 L 580 80 L 620 78 L 660 75 L 700 73 L 740 72 L 780 70 L 820 68 L 860 67 L 900 68 L 940 72 L 970 80 L 980 95 L 975 115 L 965 135 L 960 160 L 955 185 L 950 210 L 940 235 L 930 255 L 920 270 L 910 285 L 900 295 L 890 305 L 880 315 L 870 325 L 860 335 L 850 345 L 840 360 L 830 370 L 820 380 L 810 385 L 800 390 L 790 395 L 780 400 L 770 405 L 760 410 L 750 415 L 740 420 L 730 425 L 720 428 L 710 430 L 700 432 L 690 434 L 680 436 L 670 438 L 660 440 L 650 442 L 640 443 L 630 444 L 620 445 L 610 445 L 600 444 L 590 442 L 580 440 L 570 437 L 560 433 L 550 430 L 540 428 L 530 427 L 520 427 L 510 428 L 500 430 L 490 432 L 480 433 L 470 432 L 460 430 L 450 425 L 440 418 L 430 410 L 420 400 L 410 390 L 400 382 L 390 376 L 380 372 L 370 368 L 360 366 L 350 365 L 340 365 L 330 367 L 320 370 L 310 374 L 300 378 L 290 382 L 280 385 L 270 387 L 260 388 L 250 388 L 240 385 L 230 380 L 220 373 L 210 365 L 200 357 L 190 350 L 180 345 L 170 342 L 160 340 L 150 340 L 140 342 L 130 345 L 120 350 L 110 356 L 100 362 L 90 367 L 80 370 L 70 370 L 60 368 L 50 363 L 45 355 L 42 344 L 42 330 L 44 315 L 47 300 L 50 285 L 52 270 L 54 255 L 55 240 L 56 225 L 57 210 L 58 195 L 60 180 Z"
                    fill="#3d6b51"
                    fillOpacity="0.25"
                    stroke="#3d6b51"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Полуостров Камчатка */}
                  <path d="M 940 200 L 960 180 L 975 200 L 980 230 L 975 260 L 965 280 L 955 295 L 945 285 L 940 265 L 938 240 L 940 200 Z"
                    fill="#3d6b51" fillOpacity="0.2" stroke="#3d6b51" strokeWidth="1" />

                  {/* Сахалин */}
                  <path d="M 900 260 L 908 250 L 915 265 L 918 285 L 915 305 L 908 315 L 900 305 L 897 285 L 900 260 Z"
                    fill="#3d6b51" fillOpacity="0.2" stroke="#3d6b51" strokeWidth="1" />

                  {/* Крым */}
                  <path d="M 270 345 L 285 338 L 300 340 L 310 348 L 308 358 L 295 365 L 280 362 L 270 355 L 270 345 Z"
                    fill="#3d6b51" fillOpacity="0.3" stroke="#3d6b51" strokeWidth="0.8" />

                  {/* Реки (упрощённо) */}
                  {/* Волга */}
                  <path d="M 380 160 Q 385 220 375 280 Q 368 330 360 370" stroke="#5a8fa0" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Обь */}
                  <path d="M 560 110 Q 565 180 560 250 Q 555 310 545 360" stroke="#5a8fa0" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  {/* Лена */}
                  <path d="M 730 110 Q 740 170 745 230 Q 748 290 740 340" stroke="#5a8fa0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  {/* Енисей */}
                  <path d="M 640 100 Q 648 165 645 230 Q 642 295 635 345" stroke="#5a8fa0" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                  {/* Байкал */}
                  <ellipse cx="700" cy="280" rx="12" ry="28" fill="#5a8fa0" fillOpacity="0.5" stroke="#3d6b51" strokeWidth="0.8" transform="rotate(-15 700 280)" />

                  {/* Каспийское море */}
                  <ellipse cx="395" cy="360" rx="14" ry="30" fill="#5a8fa0" fillOpacity="0.45" stroke="#3d6b51" strokeWidth="0.8" />

                  {/* Уральские горы */}
                  <path d="M 490 115 Q 492 160 490 205 Q 488 245 485 280" stroke="#8B7355" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />

                  {/* Интерактивные точки */}
                  {MAP_POINTS.map((p, i) => {
                    const coords: Record<string, [number, number]> = {
                      "Москва": [330, 240],
                      "Санкт-Петербург": [268, 178],
                      "Волга": [378, 295],
                      "Урал": [490, 215],
                      "Каспий": [398, 358],
                      "Киев": [248, 280],
                    };
                    const [cx, cy] = coords[p.name] || [500, 280];
                    const isActive = activeMapPin === i;
                    return (
                      <g key={i} onClick={() => setActiveMapPin(activeMapPin === i ? null : i)} style={{ cursor: "pointer" }}>
                        <circle cx={cx} cy={cy} r="16" fill={isActive ? "#d4a017" : "#3d6b51"} opacity="0.15" />
                        <circle cx={cx} cy={cy} r="7" fill={isActive ? "#d4a017" : "#3d6b51"} stroke="white" strokeWidth="2" />
                        <text x={cx + 11} y={cy + 4} fontSize="11" fill="#1a1208" fontWeight="600"
                          style={{ fontFamily: "'Golos Text', sans-serif", pointerEvents: "none" }}>
                          {p.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Подписи рек */}
                  <text x="388" y="215" fontSize="9" fill="#3a6080" transform="rotate(-75 388 215)" style={{ fontFamily: "serif" }}>Волга</text>
                  <text x="572" y="175" fontSize="9" fill="#3a6080" transform="rotate(-85 572 175)" style={{ fontFamily: "serif" }}>Обь</text>
                  <text x="655" y="155" fontSize="9" fill="#3a6080" transform="rotate(-85 655 155)" style={{ fontFamily: "serif" }}>Енисей</text>
                  <text x="752" y="150" fontSize="9" fill="#3a6080" transform="rotate(-80 752 150)" style={{ fontFamily: "serif" }}>Лена</text>
                  <text x="718" y="258" fontSize="8" fill="#3a6080" style={{ fontFamily: "serif" }}>Байкал</text>
                  <text x="356" y="395" fontSize="8" fill="#3a6080" style={{ fontFamily: "serif" }}>Каспий</text>
                  <text x="500" y="108" fontSize="8" fill="#7a6045" fontWeight="bold" style={{ fontFamily: "serif" }}>Урал</text>

                  {/* Компас */}
                  <g transform="translate(940, 420)">
                    <circle cx="0" cy="0" r="22" fill="white" fillOpacity="0.8" stroke="#3d6b51" strokeWidth="1" />
                    <polygon points="0,-16 4,0 0,5 -4,0" fill="#3d6b51" />
                    <polygon points="0,16 4,0 0,-5 -4,0" fill="#aaa" />
                    <text x="-3" y="-20" fontSize="8" fill="#3d6b51" fontWeight="bold">С</text>
                  </g>

                  {/* Название */}
                  <text x="50" y="520" fontSize="11" fill="#3d6b51" fontWeight="600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Топонимы России
                  </text>
                </svg>

                {/* Попап активной точки */}
                {activeMapPin !== null && (
                  <div className="absolute bottom-4 left-4 right-4 bg-parchment/95 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-scale-in">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-forest/15 rounded-lg flex items-center justify-center">
                        <Icon name="MapPin" size={16} className="text-forest" />
                      </div>
                      <div>
                        <div className="font-display text-lg font-bold text-ink">{MAP_POINTS[activeMapPin].name}</div>
                        <div className="text-xs text-bark">{MAP_POINTS[activeMapPin].desc}</div>
                      </div>
                      <button className="ml-auto text-muted-foreground hover:text-ink" onClick={() => setActiveMapPin(null)}>
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-display text-xl font-semibold text-ink mb-4">Топонимы на карте</div>
              {MAP_POINTS.map((p, i) => (
                <button key={i} onClick={() => setActiveMapPin(activeMapPin === i ? null : i)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${activeMapPin === i ? "border-forest bg-forest/5 shadow-sm" : "border-border bg-card hover:border-forest/40"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activeMapPin === i ? "bg-gold" : "bg-forest"}`} />
                    <div>
                      <div className="font-body text-sm font-semibold text-ink">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ИСТОРИЯ ПРОИСХОЖДЕНИЯ ===== */}
      <section id="history" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-reveal text-center mb-16">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-body font-semibold mb-3">
              <Icon name="Clock" size={14} />
              История происхождения
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
              Сквозь <em>эпохи</em>
            </h2>
            <p className="text-bark max-w-xl mx-auto">Как менялись названия мест от древности до наших дней</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {HISTORY_ITEMS.map((item, i) => (
              <div key={i}
                className={`section-reveal relative flex gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-card border-2 border-forest -translate-x-2 md:-translate-x-2 mt-7 z-10" />
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.gold ? "bg-gold/15" : "bg-forest/10"}`}>
                        <Icon name={item.icon as "Leaf"} size={18} className={item.gold ? "text-gold" : "text-forest"} />
                      </div>
                      <div>
                        <div className="font-display text-lg font-bold text-ink">{item.era}</div>
                        <div className="text-xs text-muted-foreground">{item.years}</div>
                      </div>
                    </div>
                    <p className="text-sm text-bark leading-relaxed mb-4">{item.desc}</p>
                    <div className="space-y-1.5">
                      {item.examples.map((ex, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                          <span className="text-bark">{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-reveal mt-8 rounded-2xl overflow-hidden relative">
            <img src={ETYMOLOGY_IMG} alt="Этимология" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent flex items-center">
              <div className="p-8 max-w-lg">
                <div className="font-display text-2xl md:text-3xl font-bold text-parchment mb-2">Язык как машина времени</div>
                <p className="text-parchment/80 text-sm leading-relaxed">Топонимика позволяет восстановить языки и культуры народов, которые не оставили письменных источников</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ГАЛЕРЕЯ ===== */}
      <section id="gallery" className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-reveal text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-body font-semibold mb-3">
              <Icon name="Images" size={14} />
              Галерея
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
              Иллюстрации и <em>примеры</em>
            </h2>
            <p className="text-bark max-w-xl mx-auto">Визуальный мир топонимики: карты, схемы и народные образы</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i}
                className="section-reveal group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-parchment/90 text-forest text-xs font-body font-semibold px-2.5 py-1 rounded-full">{item.tag}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-parchment/90 rounded-full flex items-center justify-center">
                      <Icon name="ZoomIn" size={20} className="text-forest" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-display text-lg font-bold text-ink mb-1">{item.title}</div>
                  <div className="text-sm text-bark">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== КОНТАКТЫ ===== */}
      <section id="contacts" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-reveal text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-body font-semibold mb-3">
              <Icon name="MessageSquare" size={14} />
              Контакты
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
              Напишите <em>нам</em>
            </h2>
            <p className="text-bark max-w-xl mx-auto">Есть интересный топоним или хотите предложить материал для проекта?</p>
          </div>

          <div className="section-reveal grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-card border border-border rounded-2xl p-8">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-forest" />
                  </div>
                  <div className="font-display text-2xl font-bold text-ink mb-2">Отправлено!</div>
                  <p className="text-bark text-sm">Спасибо за ваше сообщение. Мы ответим в ближайшее время.</p>
                  <button onClick={() => setFormSent(false)} className="mt-6 text-sm text-forest hover:underline font-body">
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-body font-medium text-ink mb-1.5">Ваше имя</label>
                    <input type="text" required value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Александр Иванов"
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-ink mb-1.5">Email</label>
                    <input type="email" required value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="example@mail.ru"
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-ink mb-1.5">Сообщение</label>
                    <textarea required rows={4} value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Расскажите о своём топониме или вопросе..."
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full bg-forest text-parchment py-3 rounded-xl font-body font-semibold text-sm hover:bg-forest/90 transition-all hover:scale-[1.02] active:scale-95">
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="font-display text-2xl font-bold text-ink">Будем рады услышать вас</div>
              <p className="text-bark leading-relaxed text-sm">Проект «Топонимы вокруг нас» создан для всех, кто интересуется историей языка и географии. Мы принимаем материалы, исправления и предложения.</p>
              {[
                { icon: "Mail", label: "Email", value: "info@toponymy.ru" },
                { icon: "MapPin", label: "Город", value: "Москва, Россия" },
                { icon: "Globe", label: "Сайт", value: "toponymy.ru" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon as "Mail"} size={18} className="text-forest" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-body">{c.label}</div>
                    <div className="text-sm font-body font-medium text-ink">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="bg-forest/5 border border-forest/20 rounded-2xl p-5 mt-6">
                <div className="font-display text-lg font-semibold text-forest mb-2">🗺 Знаете интересный топоним?</div>
                <p className="text-bark text-sm">Поделитесь историей местного названия — мы добавим его в словарь с вашим авторством.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ФУТЕР ===== */}
      <footer className="bg-ink text-parchment py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="font-display text-xl font-bold mb-1">Топонимы вокруг нас</div>
              <div className="text-parchment/50 text-sm font-body">Исследуй историю через названия мест</div>
            </div>
            <div className="flex flex-wrap gap-6">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="text-parchment/60 hover:text-parchment text-sm font-body transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-parchment/10 mt-8 pt-6 text-center text-parchment/40 text-xs font-body">
            © 2024 Топонимы вокруг нас. Образовательный проект.
          </div>
        </div>
      </footer>
    </div>
  );
}