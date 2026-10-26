# AION UX (Day 9–16): hasil belajar dan audit terhadap standar Digital Learning

Tanggal: 2026-10-25. Isi laporan ini belum mengubah repo apa pun. Sumber: folder Drive "UX developer", Strukturplan (sheet kurikulum), 8 repo di `AION-HABMANN`, dan standar di `aion-digital-learning` (`CLAUDE.md` #1–#62, `DL-STANDARD.md` v1.8, `CURRICULUM-GUIDE.md`, `DOCX-EXPORT-GUIDE.md`).

Cara kerja: audit statis (baca file, hitung pola di kode) plus `npm ci`, typecheck, dan build tiap repo. Belum ada yang dimainkan di browser dan belum ada tes layar-baca atau keyboard. Angka seperti "skip link" atau "prefers-reduced-motion" adalah **indikator** dari pencarian teks, bukan bukti lolos atau gagal WCAG.

---

## 1. Yang saya pelajari

### Kursusnya
Folder Drive "UX developer" memuat Strukturplan 16 hari. Hari 9–16 adalah Modul 4 sampai 7 dari kursus psikologi UX / neuro-design (sumber: sheet "hanya kurikulum Strukturplan_DE_EN_ID"):

| Hari | Modul | Topik (rencana) | Kasus di rencana (Aufgabe 1 / Aufgabe 2 / Fallstudie) |
|---|---|---|---|
| 9 | M4 (3/3) | Gamification, integrasi storytelling | SkillRise / HealthJourney / MoveWell |
| 10 | M5 (1/2) | Intelligent interfaces, KI-gestützte Interaktion | SmartAssist / CareerNavigator / CareGuide |
| 11 | M5 (2/2) | Voice UI, adaptive journeys, prototyping dan testing KI | HomeAssist Voice / CareVoice / CityHelp Voice |
| 12 | M6 (1/2) | Aksesibilitas, standar, neurodiversitas | PublicAccess / LearnAccess / CitizenConnect |
| 13 | M6 (2/2) | Inclusive design patterns, teknologi bantu | StudyPath / JobAccess / LifeGuide |
| 14 | M7 (1/3) | Teknologi imersif, dasar neurosains UX | BuildVision / HealthSpace / IndustryXR |
| 15 | M7 (2/3) | Eye-tracking, neurofeedback, BCI | FocusSense / LearningPulse / VisionMind Lab |
| 16 | M7 (3/3) | Prototyping imersif, strategi masa depan, etika | RealityFlow / FutureInteraction Hub / NextWorld UX |

Rangka tiap hari sama dengan rencana Digital Learning: 8 baris (Wissen → Arbeitsauftrag 1 → Arbeitsauftrag 2 → Coaching → Fallstudie → Feedbackrunde → Transferprojekt). Hari 1–8 ada di rencana tetapi belum ada repo atau materinya di tempat yang saya cek.

Sheet "List Materi" di workbook Strukturplan adalah matriks deliverable per hari: **PPT, Github, Playground, Task 1–4**. Itu sudah mirip standar "satu hari = satu paket".

### Dua model yang berbeda
| | Seri AION UX (Day 9–16, yang ada sekarang) | Digital Learning (Habmann) |
|---|---|---|
| Situs | satu halaman playground per hari, kasus "frozen" | satu proyek Next.js, `/day/{n}/route-1\|2/` |
| Tugas dijawab di | **dokumen Word/Google Docs** (worksheet Task 1–4) | **di situs** (kotak jawaban teks bebas), diekspor |
| Repo | satu repo per hari | satu repo, `playground-dl/` memuat semua hari |
| Deploy | campur Netlify dan Vercel | satu proyek Vercel `aion-dl` dari `main` |
| Standar | tidak tertulis di repo | `CLAUDE.md` + `DL-STANDARD.md` v1.8 + skrip `verify:*` |

Prinsip DL v1.8 yang menentukan (ringkas): pertanyaan bernomor dari rencana adalah tugasnya; jawaban teks bebas; semua blok Core; tidak ada angka yang tidak dicetak rencana; cek hanya untuk kelengkapan, bukan benar-salah; WCAG 2.2 AA dengan tes keyboard, zoom, axe, layar-baca; EN | DE; glosarium, "In plain words", kotak "How to build the answer", jawaban mentor; ekspor dokumen; satu glosarium dan satu store untuk seluruh kursus.

---

## 2. Audit per hari

Kolom "kasus rencana" = nama kasus dari rencana yang muncul di kode repo atau worksheet Drive.

| Hari | Repo | Stack | Kasus rencana dipakai? | Isi yang ada | Catatan |
|---|---|---|---|---|---|
| 9 | `aion-ux-day09-gamification` | Next 15.5, React 19, `src/`, Zustand, framer-motion, recharts, ada skrip typecheck | ya (SkillRise, HealthJourney, MoveWell, capstone) | halaman learn, playground per kasus, capstone, inspector, progress, ekspor | paling matang; layout `src/` beda dari konvensi DL (`app/` di root); memakai library animasi dan grafik yang dilarang DL #9 |
| 10 | `aion-ux-day10-intelligent-interfaces` | satu file HTML + docx | **tidak** (pakai tool nyata: Claude, Gemini, v0, CapCut, Duolingo, BelajarCepat) | companion HTML, 4 worksheet, materi utama | tidak ada aplikasi; artifact publik = `aion_day10_companion.html` (judul tab artifact sama dengan file itu) |
| 11 | `aion-ux-day11-ui-voice` | Next 14.2.5, React 18 | sebagian (CityHelp Voice = Fallstudie; HomeAssist dan CareVoice tidak ada) | 6 perhentian: meet-cityhelp, three-ways, six-lenses, why-your-brain-reacts, six-moments, prove-it-works | README bilang "Module 5"; tidak ada layar untuk Task 1–2 versi rencana; belum ada skip link |
| 12 | `aion-ux-day12-accessibility-neurodiversity` | Next 16.2, React 19, static export | ya (PublicAccess, LearnAccess, CitizenConnect) | satu halaman: Learn (13 widget), Training Ground, kasus Task 1–3, TaskMap | Drive punya 2 situs Netlify lama untuk hari ini |
| 13 | `aion-ux-day13-inclusive-design-patterns` | Next 14.2.15, React 18, static export | ya (StudyPath, JobAccess, LifeGuide + EnterpriseContext) | Learn L1/L2/L3, Training Ground, 4 kasus, TaskMap | **berisi CV pribadi** (lihat bagian 4) |
| 14 | `aion-ux-day14-immersive-tech-neuroscience` | Next 16.2, React 19, three.js, model-viewer | ya (BuildVision, HealthSpace, IndustryXR) + transfer | Learn W1–W10, 3 kasus (ada scene 3D), transfer, ekspor | tidak ada skip link; 3D punya alasan genuine, tapi perlu fallback aksesibel (ada `StaticFallback` untuk IndustryXR) |
| 15 | `aion-ux-day15-tracking` | **Vite 5**, React 18, framer-motion | ya (FocusSense, LearningPulse, VisionMind) | aplikasi single-page: assign, checker, meter, charts, debrief | satu-satunya yang bukan Next.js |
| 16 | `aion-ux-day16-immersive-prototyping` | Next 15.5, React 19 | sebagian (NextWorld dan FutureInteraction ada; RealityFlow tidak ada) | 3 instrumen (bench, ladder, assessment) + produk CityPass AR; dokumen FLAW_INDEX, LADDER_MATRIX, PORTFOLIO_OUTCOMES | README memakai nama `maturity-lab`; Drive hanya punya 1 worksheet |

### Hasil install dan build
Dijalankan `npm ci --ignore-scripts`, lalu `typecheck` (bila ada) dan `npm run build`, di salinan bersih tiap repo.

| Hari | npm ci | typecheck | build | waktu build |
|---|---|---|---|---|
| 9 | lulus | lulus | lulus | 79 dtk |
| 11 | lulus | tidak ada skripnya | lulus | 47 dtk |
| 12 | lulus | lulus | lulus | 29 dtk |
| 13 | lulus | tidak ada skripnya | lulus | 33 dtk |
| 14 | lulus | tidak ada skripnya | lulus | 37 dtk |
| 15 | lulus | lulus | lulus | 19 dtk |
| 16 | lulus | lulus | lulus | 40 dtk |

Ketujuh repo bisa di-build. Basis kodenya sehat; masalahnya ada di keseragaman dan standar, bukan di kerusakan.

### Indikator aksesibilitas dan standar (pencarian teks, bukan bukti)

| Indikator | 9 | 11 | 12 | 13 | 14 | 15 | 16 |
|---|---|---|---|---|---|---|---|
| `lang` di `<html>` | ada | ada | ada | ada | ada | ada | ada |
| skip link | ada | **tidak** | ada | ada | **tidak** | ada | **tidak** |
| `prefers-reduced-motion` | ada | **tidak** | ada | ada | ada | ada | ada |
| `:focus-visible` | ada | 1 | banyak | 1 | 1 | ada | 1 |
| tes otomatis / skrip verifikasi | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** |
| EN \| DE | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** |
| label "Case assumption" | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** |
| mentor bar dan kunci jawaban di situs | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** | **tidak** |
| ekspor jawaban | ada | **tidak** | **tidak** | **tidak** | ada | ada | **tidak** |

(Day 10 tidak dihitung: bukan aplikasi.)

---

## 3. Selisih terhadap standar Digital Learning

1. **Model jawaban.** Di DL jawaban ditulis dan diekspor dari situs; di seri UX jawaban ada di worksheet Word. Ini keputusan terbesar (bagian 6).
2. **Stack tidak seragam.** Tujuh repo memakai enam versi berbeda: Next 14.2.5, 14.2.15, 15.5.21, 15.5.23, 16.2.12 (dua repo), dan Vite untuk Day 15. React 18 dan 19 bercampur. DL #9 mensyaratkan satu stack (Next App Router, TypeScript, Tailwind, static export, Zustand persist, tanpa library animasi/DnD/PDF).
3. **Tata letak.** DL: `app/ components/ lib/ data/ store/` di root. Day 9 dan Day 15 memakai `src/`.
4. **Static export.** Hanya Day 12, 13, 14 yang `output: 'export'`. DL mewajibkannya (dan `trailingSlash`, `basePath`).
5. **Tidak ada pengaman kualitas.** Tidak ada satu pun tes atau skrip `verify:*`. DL punya `verify:dayN`, `verify:free`, `verify:gen`.
6. **Konten.** Tidak ada glosarium bersama, tidak ada "In plain words", tidak ada jawaban mentor, tidak ada EN | DE.
7. **Kepatuhan rencana.** DL: tiap butir bernomor di rencana menjadi satu pertanyaan, berurutan. Di UX, kasus rencana dipakai di Day 9, 12, 13, 14, 15, tetapi urutan butir dan jumlah butir belum dicek satu per satu (saya belum membandingkan per pertanyaan).
8. **Deploy.** Daftar playground di sheet "List Materi" menunjuk ke Netlify untuk Day 9, 11, 12, dan Vercel untuk sisanya; satu proyek Vercel per hari.

---

## 4. Temuan yang perlu perhatian

1. **CV pribadi di repo publik.** `aion-ux-day13-inclusive-design-patterns` berisi `CV-Muhammad-Muchson-Attoyibi.docx`, `.md`, dan `build-cv.js` yang memuat email, nomor telepon, dan LinkedIn. Repo itu publik. Saya belum menghapus apa pun. Menghapus file saja tidak menghilangkan data dari riwayat commit; untuk itu perlu penulisan ulang riwayat.
2. **Day 10 menyimpang dari rencana.** Rencana: SmartAssist, CareerNavigator, CareGuide. Materimu: observasi tool nyata (Claude, Gemini, v0, Duolingo). Day 10 juga satu-satunya tanpa aplikasi.
3. **Day 11 dan Day 16 hanya sebagian.** Day 11 tidak punya layar untuk HomeAssist Voice dan CareVoice. Day 16 tidak punya RealityFlow.
4. **Day 15 dan 16 kekurangan worksheet.** Folder Drive Day 15 berisi satu file Task dan satu file jawaban bernama terpotong (`TASK_M~1.docx`, `ANSWER~1.DOC`) plus folder "un use"; Task 4 ada di luar folder (`TASK_4_VisionMind_Lab_Transfer_Project`). Day 16 hanya `AION_Day16_Worksheet.docx`. Sheet "List Materi" kosong untuk Task 2–4 Day 15 dan 16.
5. **PPT hanya ada di sebagian hari.** Sheet menunjuk PPT untuk Day 12 dan 13 saja; ada juga `Strategic_Digital_Accessibility.pptx` (10,9 MB) di folder Day 12.
6. **Kunci jawaban ada di Drive.** Yang terlihat: `ANSWER_KEY_*` untuk Day 10, 14, 16 (dan file jawaban Day 15); daftar folder Day 9, 11, 12, 13 mungkin belum lengkap. File `ANSWER_KEY_*` itu tidak ada di repo. **Koreksi (2026-10-25):** repo Day 16 yang publik memuat tiga file berlabel "INSTRUCTOR ONLY. Do not distribute to learners": `FLAW_INDEX.md`, `LADDER_MATRIX.md`, `PORTFOLIO_OUTCOMES.md` (tabel hasil kuartal lengkap untuk Portfolio Room). Pemeriksaan awal saya hanya mencari nama file `answer`/`key`, jadi file ini terlewat. Saya belum memindahkan atau menghapusnya.
7. **Nama repo Day 16 vs isi.** README menyebut `aion-ux-day16-maturity-lab`.

---

## 5. Yang bisa diambil (di-upgrade, bukan dibuat ulang)

| Hari | Aset yang layak dipakai ulang sebagai instrumen / bahan |
|---|---|
| 9 | tiga kasus (SkillRise, HealthJourney, MoveWell), `HotspotCanvas`, `BudgetAllocator`, `TradeoffCompass`, `DecisionReceipt`, `DarkPatternLayer`, capstone, ekspor |
| 10 | companion HTML (observasi pola AI), 4 worksheet; perlu kasus rencana (SmartAssist, CareerNavigator, CareGuide) atau keputusan memakai tool nyata |
| 11 | `ChatMock`, `MicButton`, `ResponseEngine`, enam lensa, enam momen, "prove it works" |
| 12 | 13 widget belajar (kontras, alt-text, urutan fokus, toleransi kesalahan, dll.), Training Ground, tiga kasus |
| 13 | L1/L2/L3 learn, Training Ground, kasus StudyPath, JobAccess, LifeGuide |
| 14 | W1–W10 (termasuk AR overlay, beban kognitif, etika), tiga kasus + scene 3D + fallback, transfer |
| 15 | meter, constraint HUD, element checker, charts, debrief (gagasan "measurable vs reliable") |
| 16 | bench (6 kriteria), ladder (gerbang Go/No-Go), assessment console, mesin kuartal, CityPass AR, NextWorld |

---

## 6. Usulan: satu repo utama seperti Digital Learning

Satu repo (mis. `aion-ux`), satu proyek Next.js, `/day/{n}/` seperti `playground-dl`. Setiap hari yang ada menjadi folder `components/dayN`, `data/dayN`, `lib/dayN`; instrumen dari repo lama dipindahkan ke sana. Satu glosarium, satu store, satu Vercel. Standar ditulis sebagai `UX-STANDARD.md` yang mewarisi `DL-STANDARD.md` v1.8, dengan skrip `verify:dayN`.

Urutan yang aman: (1) putuskan model jawaban, (2) kerangka satu proyek dengan satu hari dulu (Day 9, yang paling matang) sebagai acuan, (3) pindahkan hari satu per satu dengan riwayat commit, (4) arsipkan repo lama setelah setiap hari lolos verifikasi.

### Keputusan yang diperlukan darimu
1. **Jawaban di situs (gaya DL) atau tetap di worksheet Word?** DL menaruh pertanyaan rencana di situs, dengan ekspor.
2. **Kasus rencana atau kasusmu?** Day 10 memakai tool nyata; Day 11 dan 16 memakai sebagian kasus. DL mengikuti kasus rencana dan memberi label "Case assumption" pada tambahan.
3. **Hari 1–8 ikut dalam repo utama?** Rencana mencakup 16 hari; yang ada hanya 9–16.
4. **Bahasa:** EN | DE seperti DL, atau EN saja dulu?
5. **Library:** 3D (Day 14) dan animasi (Day 9, 15) dipertahankan sebagai pengecualian, atau diganti?
6. **CV di Day 13:** hapus dari repo dan riwayat?

---

## 7. Batasan audit ini
- Tidak membandingkan tiap pertanyaan rencana dengan tiap layar; hanya nama kasus, struktur halaman, dan indikator kode.
- Tidak menjalankan situs di browser; tidak menguji keyboard, zoom, layar-baca, atau kontras.
- Artifact Day 10 tidak bisa dirender di panel browser (kosong), jadi isinya dinilai dari file `companion` yang sama.
- Isi dokumen Word/Google Docs Day 9–16 belum dibaca satu per satu (hanya daftar, judul, dan potongan awal Day 10).
