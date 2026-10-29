"""
Release data of the Word documents of the AION UX Developer course (same release rules as the Digital Learning documents, October 2026): version, date, named approver, the AI notice and
the playground addresses. Change a value here and rebuild; every document and every figure label follows.
"""

VERSION = "1.0"
RELEASE_DATE = "29.10.2026"
REVIEWER = "Muhammad Muchson"
REVIEWER_ROLE = "Mentor"
SITE = "https://aion-ux-lab.vercel.app/"

# One UE (Unterrichtseinheit) is counted as 45 minutes in the lesson plans of these documents; breaks are not shown.
UE_MINUTES = 45


def day_url(day):
    return f"{SITE}day/{day}/"


AI_NOTICE_EN = (
    "This document was produced with the help of an AI language model (Claude, Anthropic). The AI drafted the text and tables and "
    "built the pictures and working examples of the lab. The content was then read, corrected and approved by the reviewer named below, who is responsible "
    "for its accuracy. Every picture carries an AI label on the image. Check figures and sources before you quote them."
)
AI_NOTICE_DE = (
    "KI-Hinweis: Dieses Dokument wurde mit Unterstützung eines KI-Sprachmodells (Claude, Anthropic) erstellt. Texte und Tabellen "
    "wurden von der KI entworfen, die Abbildungen sind KI-gestützt erstellt und am Bild gekennzeichnet. Die fachliche Prüfung und Freigabe "
    "erfolgte durch die unten genannte Person."
)

FIG_LABEL = f"AI-assisted picture  ·  KI-gestützte Abbildung  ·  reviewed by {REVIEWER}  ·  v{VERSION}"

APPROVAL_LINE = f"{REVIEWER}, {REVIEWER_ROLE} (subject-matter review and approval)"
