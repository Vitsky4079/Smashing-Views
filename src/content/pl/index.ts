/**
 * Polish copy. To add English: create `src/content/en/index.ts` exporting an object
 * of the same `Content` type and extend `getContent()` in `src/content/index.ts`.
 */

export const pl = {
  meta: {
    title: "Smashing Views — widoczność transmisji LIVE",
    description:
      "Wsparcie widoczności transmisji LIVE i promocji treści w mediach społecznościowych. Pakiety Facebook LIVE z przejrzystym cennikiem i elastycznym czasem trwania.",
    pricingTitle: "Cennik Facebook LIVE — kalkulator pakietów",
    pricingDescription:
      "Skonfiguruj pakiet Facebook LIVE: liczba widzów i czas trwania. Przejrzyste ceny w PLN oraz wycena indywidualna pozostałych usług.",
    contactTitle: "Kontakt — porozmawiajmy o Twojej kampanii",
    contactDescription:
      "Wyślij zapytanie o pakiet lub wycenę. Podaj platformę, liczbę widzów, czas trwania i publiczny link do transmisji.",
  },
  nav: {
    home: "Strona główna",
    pricing: "Cennik",
    contact: "Kontakt",
    cta: "Sprawdź ofertę",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    skip: "Przejdź do treści",
  },
  footer: {
    tagline: "Wsparcie widoczności transmisji LIVE i treści w mediach społecznościowych.",
    navTitle: "Nawigacja",
    contactTitle: "Kontakt",
    legalTitle: "Informacje prawne",
    contactMissing: "Dane kontaktowe są w trakcie uzupełniania. Skorzystaj z formularza.",
    contactFormLink: "Formularz kontaktowy",
    disclaimer:
      "Smashing Views nie jest powiązany z Facebookiem, Meta, YouTube, Instagramem ani TikTokiem i nie jest przez nie wspierany. Nazwy platform należą do ich właścicieli.",
    rights: "Wszelkie prawa zastrzeżone.",
    legal: {
      privacy: "Polityka prywatności",
      terms: "Regulamin",
      platforms: "Informacja o platformach",
    },
  },
  hero: {
    eyebrow: "Smashing Views / Live visibility",
    lines: ["TWOJA TRANSMISJA.", "WIĘKSZA", "WIDOCZNOŚĆ."],
    sub: "Wsparcie widoczności transmisji LIVE i promocji treści w mediach społecznościowych. Wybierz rozwiązanie dopasowane do swojej kampanii.",
    ctaPrimary: "Zobacz ofertę",
    ctaSecondary: "Skontaktuj się",
    demoNote: "Dane na wizualizacji są wyłącznie ilustracyjne",
    scroll: "Przewiń",
    panel: {
      live: "LIVE",
      viewers: "Widzowie (demo)",
      activity: "Aktywność (demo)",
      nodes: "Widownia (demo)",
      card1: "Szczyt sesji",
      card2: "Czas trwania",
      nodesUnit: "widzów",
      card3: "Skala",
    },
  },
  services: {
    eyebrow: "01 / Oferta",
    title: ["WIDOCZNOŚĆ W", "CYFROWYM ŚWIECIE."],
    intro:
      "Cztery obszary usług. Każdy realizowany według jasnej specyfikacji — platforma, ilość, czas.",
    items: [
      {
        id: "fb-live",
        name: "Facebook LIVE",
        short: "Pakiety zależne od liczby jednoczesnych widzów i czasu trwania usługi.",
        detail: "Od 100 do 1000 widzów, od 60 do 150 minut. Ceny w kalkulatorze.",
        cta: "Skonfiguruj pakiet",
        href: "/pricing#kalkulator",
      },
      {
        id: "yt-live",
        name: "YouTube LIVE",
        short: "Zwiększanie licznika widzów podczas transmisji na żywo.",
        detail: "Zakres i warunki ustalane indywidualnie, wycena na zapytanie.",
        cta: "Zapytaj o ofertę",
        href: "/pricing#uslugi",
      },
      {
        id: "video",
        name: "Widoczność wideo",
        short: "Usługi wspierające wyświetlenia materiałów wideo na wybranych platformach.",
        detail: "Dostępność zależy od platformy i aktualnego katalogu usług.",
        cta: "Zapytaj o ofertę",
        href: "/pricing#uslugi",
      },
      {
        id: "social",
        name: "Social media",
        short: "Dodatkowe usługi dla Facebooka, Instagrama, TikToka i YouTube.",
        detail: "Zakres zgodny z aktualnym katalogiem i dostępnością usług.",
        cta: "Zapytaj o ofertę",
        href: "/pricing#uslugi",
      },
    ],
  },
  demo: {
    eyebrow: "02 / Demo usługi",
    title: ["SKONFIGURUJ", "SWÓJ LIVE."],
    label: "Interaktywne demo usługi",
    notice:
      "To symulacja konfiguracji pakietu. Nie jest to prawdziwa transmisja ani odwzorowanie aktywności rzeczywistych użytkowników.",
    selectLabel: "Wybierz ilustracyjną liczbę widzów",
    viewersUnit: "widzów",
    params: {
      platform: "Platforma",
      viewers: "Widzowie",
      duration: "Czas trwania",
      price: "Cena (60 min)",
    },
    timeline: "Oś czasu transmisji",
    cta: "Sprawdź dostępne pakiety",
  },
  process: {
    eyebrow: "03 / Proces",
    title: ["PROSTY PROCES.", "PRZEJRZYSTA OFERTA."],
    steps: [
      {
        n: "01",
        title: "Wybierz usługę",
        text: "Wskaż platformę, liczbę widzów i oczekiwany czas trwania.",
      },
      {
        n: "02",
        title: "Prześlij szczegóły",
        text: "Podaj publiczny link i najważniejsze informacje o transmisji. Nigdy nie prosimy o hasło do konta.",
      },
      {
        n: "03",
        title: "Ustal realizację",
        text: "Otrzymasz potwierdzenie dostępności, ceny i kolejnych kroków.",
      },
    ],
    note: "Nigdy nie prosimy o hasło do Twojego konta.",
  },
  why: {
    eyebrow: "04 / Dlaczego my",
    title: ["PROJEKTUJEMY", "WIDOCZNOŚĆ."],
    items: [
      { title: "Przejrzyste pakiety i ceny", text: "Pełna macierz cen jest publiczna. Widzisz kwotę zanim napiszesz." },
      { title: "Elastyczny czas trwania", text: "Od 60 do 150 minut — dopasowany do długości Twojej transmisji." },
      { title: "Wiele platform", text: "Facebook, YouTube, Instagram i TikTok w jednym miejscu." },
      { title: "Proste zapytanie", text: "Jeden formularz. Konfiguracja z kalkulatora trafia do niego automatycznie." },
      { title: "Jasna specyfikacja", text: "Platforma, ilość, czas i cena — bez ukrytych elementów." },
      { title: "Indywidualne kampanie", text: "Nietypowa liczba widzów lub harmonogram? Omówmy to." },
    ],
  },
  preview: {
    eyebrow: "05 / Cennik",
    title: ["PRZYKŁADOWE", "PAKIETY."],
    note: "Przykłady dla Facebook LIVE przy podanym czasie trwania. Cena zależy od wybranej liczby widzów i czasu — pełna macierz w cenniku.",
    viewers: "widzów",
    minutes: "minut",
    cta: "Pełny cennik",
    pick: "Wybierz ten pakiet",
  },
  finalCta: {
    title: ["GOTOWY NA", "NASTĘPNY LIVE?"],
    text: "Sprawdź dostępne opcje i zaplanuj swoją kampanię.",
    primary: "Zobacz cennik",
    secondary: "Napisz do nas",
  },
  pricing: {
    eyebrow: "Cennik / Facebook LIVE",
    title: ["WYBIERZ", "SWÓJ PAKIET."],
    sub: "Przejrzyste ceny i elastyczne warianty dla Twojej transmisji.",
    calc: {
      title: "Kalkulator pakietu",
      viewers: "Liczba widzów",
      duration: "Czas trwania",
      minutes: "minut",
      viewersUnit: "widzów",
      platform: "FACEBOOK LIVE",
      summary: "Podsumowanie",
      total: "Cena",
      cta: "Zapytaj o pakiet",
      note: "Ostateczną cenę i warunki realizacji potwierdzamy w odpowiedzi na zapytanie.",
      meter: "Wizualizacja konfiguracji",
    },
    matrix: {
      title: "Pełna macierz cen",
      sub: "Wszystkie kombinacje liczby widzów i czasu trwania.",
      corner: "Czas / widzowie",
      select: "Wybierz konfigurację",
    },
    additional: {
      eyebrow: "Pozostałe usługi",
      title: ["INNE", "PLATFORMY."],
      sub: "Zakres i dostępność ustalamy indywidualnie.",
      quote: "Wycena indywidualna",
      cta: "Zapytaj o ofertę",
    },
    faq: {
      eyebrow: "FAQ",
      title: ["CZĘSTE", "PYTANIA."],
      items: [
        {
          q: "Jak wybrać odpowiedni pakiet?",
          a: "Zacznij od planowanej długości transmisji i liczby widzów, która ma być widoczna na liczniku. W kalkulatorze zmieniasz oba parametry i od razu widzisz cenę. Jeśli nie jesteś pewien, opisz kampanię w formularzu — doradzimy.",
        },
        {
          q: "Czy potrzebuję podawać hasło do konta?",
          a: "Nie. Nigdy nie prosimy o hasło ani dostęp do Twojego konta. Do realizacji wystarczy publiczny link do transmisji lub treści.",
        },
        {
          q: "Jakie informacje są potrzebne do realizacji?",
          a: "Platforma, publiczny link do transmisji lub materiału, oczekiwana liczba widzów, czas trwania oraz planowana data i godzina. Resztę ustalamy w odpowiedzi na zapytanie.",
        },
        {
          q: "Czy mogę zamówić niestandardową liczbę widzów?",
          a: "Tak, o ile pozwalają na to ograniczenia usługi. Wybierz „Inna usługa” w formularzu i opisz potrzebę — przygotujemy indywidualną wycenę lub poinformujemy, że wariant jest niedostępny.",
        },
        {
          q: "Czy obsługujecie inne platformy?",
          a: "Poza Facebook LIVE oferujemy zapytania o YouTube LIVE, wideo na Facebooku, Instagram i TikTok. Dostępność zależy od aktualnego katalogu usług, dlatego wycena jest indywidualna.",
        },
        {
          q: "Jak mogę skontaktować się przed zamówieniem?",
          a: "Przez formularz na stronie Kontakt. Zapytanie nie jest zamówieniem ani zobowiązaniem do płatności — to początek rozmowy o szczegółach.",
        },
        {
          q: "Czy usługi gwarantują organicznych odbiorców?",
          a: "Nie. Zamówiona liczba widzów jest parametrem usługi, a nie gwarancją unikalnych, realnie zainteresowanych osób, zaangażowania, sprzedaży ani wzrostu zasięgów organicznych. Licznik widzów to wskaźnik usługi, a nie miara organicznej publiczności. Nie jesteśmy powiązani z żadną z platform, a ich regulaminy mogą ograniczać takie usługi — decyzja o skorzystaniu należy do Ciebie.",
        },
      ],
    },
  },
  contact: {
    eyebrow: "Kontakt",
    title: ["POROZMAWIAJMY", "O TWOJEJ", "KAMPANII."],
    sub: "Opisz, czego potrzebujesz. Odpowiemy z potwierdzeniem dostępności, ceny i kolejnych kroków.",
    form: {
      title: "Formularz zapytania",
      name: "Imię i nazwisko",
      email: "Adres e-mail",
      company: "Nazwa firmy (opcjonalnie)",
      platform: "Platforma / usługa",
      platformPlaceholder: "Wybierz…",
      viewers: "Liczba widzów (opcjonalnie)",
      duration: "Czas trwania (opcjonalnie)",
      date: "Data i godzina transmisji (opcjonalnie)",
      link: "Publiczny link do transmisji lub treści (opcjonalnie)",
      linkHint: "Tylko publiczny link. Nigdy nie podawaj haseł.",
      message: "Wiadomość",
      consent:
        "Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na zapytanie, zgodnie z Polityką prywatności.",
      submit: "Wyślij zapytanie",
      sending: "Wysyłanie…",
      prefill: "Dane pakietu wypełnione z cennika",
      prefillPrice: "Cena z kalkulatora",
      anyOption: "Nie wybrano",
      success: {
        title: "Zapytanie wysłane",
        text: "Dziękujemy. Odpiszemy po zapoznaniu się ze szczegółami.",
        again: "Wyślij kolejne zapytanie",
      },
      failure: "Nie udało się wysłać zapytania. Spróbuj ponownie za chwilę.",
      notConfigured:
        "Wysyłka formularza nie jest jeszcze skonfigurowana po stronie serwera. Zapytanie nie zostało wysłane.",
      rateLimited: "Zbyt wiele prób. Odczekaj chwilę i spróbuj ponownie.",
      errors: {
        name: "Podaj imię i nazwisko (min. 2 znaki).",
        email: "Podaj poprawny adres e-mail.",
        platform: "Wybierz platformę lub usługę.",
        message: "Napisz wiadomość (min. 10 znaków).",
        consent: "Zgoda jest wymagana, aby wysłać zapytanie.",
        link: "Podaj poprawny adres URL zaczynający się od https://",
        viewers: "Podaj liczbę widzów jako liczbę całkowitą.",
      },
    },
    info: {
      title: "Dane kontaktowe",
      missing: "Dodatkowe dane kontaktowe zostaną udostępnione wkrótce. Formularz jest najszybszą drogą kontaktu.",
    },
  },
  intro: { skip: "Pomiń" },
  lang: { label: "Język", pl: "Polski", en: "English", switchTo: "Switch to English" },
  legal: {
    privacy: {
      title: "Polityka prywatności",
      notice:
        "SZABLON ROBOCZY — wymaga weryfikacji prawnej przed publikacją. Ten tekst nie stanowi kompletnej polityki prywatności.",
      sections: [
        {
          h: "Administrator danych",
          p: "[DO UZUPEŁNIENIA: pełna nazwa, adres i dane kontaktowe administratora danych osobowych.]",
        },
        {
          h: "Zakres i cel przetwarzania",
          p: "Dane przesłane w formularzu kontaktowym (imię i nazwisko, e-mail, opcjonalnie nazwa firmy, link, szczegóły zapytania) są przetwarzane w celu odpowiedzi na zapytanie. [DO UZUPEŁNIENIA: podstawa prawna, okres przechowywania, odbiorcy, prawa osób, których dane dotyczą.]",
        },
        {
          h: "Pliki cookies i analityka",
          p: "Strona nie wdraża obecnie narzędzi analitycznych ani reklamowych. Używa jedynie sessionStorage do jednorazowego pokazania animacji powitalnej. [DO UZUPEŁNIENIA po dodaniu analityki.]",
        },
      ],
    },
    terms: {
      title: "Regulamin",
      notice:
        "SZABLON ROBOCZY — wymaga weryfikacji prawnej przed publikacją. Ten tekst nie stanowi kompletnego regulaminu.",
      sections: [
        {
          h: "Charakter usług",
          p: "Usługi dotyczą wsparcia widoczności transmisji i treści. Zamówione wartości (np. liczba widzów) są parametrami usługi i nie oznaczają unikalnych, zainteresowanych osób, zaangażowania, sprzedaży ani wzrostu organicznego.",
        },
        {
          h: "Zapytania",
          p: "Formularz kontaktowy służy wyłącznie do składania zapytań. Wysłanie zapytania nie stanowi zamówienia ani zobowiązania do płatności.",
        },
        {
          h: "Dalsze postanowienia",
          p: "[DO UZUPEŁNIENIA: dane sprzedawcy, zasady płatności, odpowiedzialność, reklamacje, prawo odstąpienia, prawo właściwe.]",
        },
      ],
    },
    platforms: {
      title: "Informacja o platformach",
      notice: "Informacja robocza — wymaga weryfikacji.",
      sections: [
        {
          h: "Brak powiązania",
          p: "Smashing Views nie jest powiązany z Facebookiem, Meta Platforms, Instagramem, TikTokiem ani YouTube (Google) i nie jest przez te podmioty autoryzowany ani wspierany. Wszystkie nazwy i znaki towarowe należą do ich właścicieli.",
        },
        {
          h: "Regulaminy platform",
          p: "Regulaminy platform społecznościowych mogą ograniczać lub zakazywać usług wspierających statystyki widoczności. Klient samodzielnie ocenia zgodność skorzystania z usługi z regulaminem wybranej platformy i ponosi związane z tym ryzyko.",
        },
        {
          h: "Metryki a odbiorcy",
          p: "Liczba widzów w pakiecie jest parametrem usługi. Nie gwarantujemy organicznych odbiorców, zaangażowania, sprzedaży ani konkretnego wpływu na algorytmy platform.",
        },
      ],
    },
  },
  notFound: { title: "Nie znaleziono strony", back: "Wróć na stronę główną" },
};

export type Content = typeof pl;
