# Pandoba Augsburg – Bubble Tea Shop Webseite

Dieses Repository enthält die Webseite für **Pandoba Augsburg**, einen Bubble-Tea-Shop in Augsburg.

Im Rahmen einer Aufgabe an der TH Augsburg im Modul **"Grundlagen betrieblicher Informationssysteme"** sollten wir eine Webseite für ein Unternehmen unserer Wahl gestalten.

Wir haben uns für Pandoba entschieden und dabei folgende Seiten und Funktionen umgesetzt:

## Seiten

| Seite | Datei | Beschreibung |
|---|---|---|
| Menü | `index.html` | Übersicht aller Getränkekategorien mit Preisen und Allergeninformationen |
| Über Uns | `ueber-uns.html` | Geschichte des Shops und Kundenbewertungen |
| Kontakt | `kontakt.html` | Bestellformular, Standortkarte und Bildergalerie |

## Features

- Responsive Navigation mit Dropdown-Menüs (Desktop & Mobile)
- Dark / Light Mode per Toggle
- Detaillierte Menükarte mit Allergenkennzeichnung (`<details>`-Element)
- SCSS-basiertes Stylesheet mit Variablen, Komponenten und Breakpoints
- Remixicons als Icon-Bibliothek

## Projektstruktur

```
assets/
  css/        Kompiliertes CSS
  img/        Bilder und Logo
  js/         JavaScript (Navigation, Theme-Toggle)
  scss/       SCSS-Quelldateien
    base/     Reset & Basisstile
    components/  Header, Footer, Modal, Breakpoints
    config/   Variablen
    layout/   Seitenlayout
index.html
ueber-uns.html
kontakt.html
```

## Technologien

- HTML5, CSS3 (SCSS)
- Vanilla JavaScript
- [Remixicon](https://remixicon.com/) `v4.9.1`
