"""Sponsorship flyer — 'Hydrographic Quiet'.

Builds a print-ready US Letter PDF from the sponsorship data in
public/data/about.json, so the flyer and the website never drift apart.
"""
import json
import math
import os

import segno
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = "/root/.claude/skills/synced/canvas-design/canvas-fonts"
OUT = os.path.join(ROOT, "design", "9thisland-sponsorship-flyer.pdf")
URL = "https://9thislandoutrigger.com"
EMAIL = "admin@9thislandoutrigger.com"

for name, file in [
    ("Display", "YoungSerif-Regular.ttf"),
    ("Mono", "GeistMono-Regular.ttf"),
    ("MonoBold", "GeistMono-Bold.ttf"),
    ("Sans", "InstrumentSans-Regular.ttf"),
    ("SansBold", "InstrumentSans-Bold.ttf"),
]:
    pdfmetrics.registerFont(TTFont(name, os.path.join(FONTS, file)))

# ── Palette: paper, weather-dark ink, volcanic red, marine teal, struck gold ──
PAPER = HexColor("#F2ECE3")
INK = HexColor("#15181A")
LAVA = HexColor("#B03A20")
TEAL = HexColor("#0E6A67")
GOLD = HexColor("#B08A2E")
SILVER = HexColor("#7A858B")
BRONZE = HexColor("#9C6A45")
CREAM = HexColor("#F2ECE3")


def tint(base, amount, ground=PAPER):
    """Blend `base` toward the ground — for hairlines that must whisper."""
    return Color(
        base.red * amount + ground.red * (1 - amount),
        base.green * amount + ground.green * (1 - amount),
        base.blue * amount + ground.blue * (1 - amount),
    )


W, H = letter  # 612 x 792
M = 52.0  # margin
MEASURE = W - 2 * M  # 508

data = json.load(open(os.path.join(ROOT, "public", "data", "about.json")))
sp = data["sponsorship"]
TIER_COLORS = [GOLD, SILVER, BRONZE, TEAL]

c = pdfcanvas.Canvas(OUT, pagesize=letter)
c.setTitle("9th Island Outrigger Canoe Club — Sponsorship")
c.setAuthor("9th Island Outrigger Canoe Club")
c.setSubject("Sponsorship levels")

# ── Ground ────────────────────────────────────────────────────────────────
c.setFillColor(PAPER)
c.rect(0, 0, W, H, stroke=0, fill=1)


def wrap(text, font, size, width):
    words, lines, line = text.split(), [], ""
    for w_ in words:
        trial = (line + " " + w_).strip()
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            line = trial
        else:
            if line:
                lines.append(line)
            line = w_
    if line:
        lines.append(line)
    return lines


def draw_lines(x, y, lines, font, size, leading, color, align="left", width=0):
    c.setFont(font, size)
    c.setFillColor(color)
    for i, ln in enumerate(lines):
        yy = y - i * leading
        if align == "right":
            c.drawRightString(x + width, yy, ln)
        else:
            c.drawString(x, yy, ln)
    return y - (len(lines) - 1) * leading


# ── Header band: the keel of dark that ballasts the sheet ────────────────
BAND_H = 104.0
band_y = H - BAND_H
c.setFillColor(INK)
c.rect(0, band_y, W, BAND_H, stroke=0, fill=1)

logo = ImageReader(os.path.join(ROOT, "9thislslandlogo.jpg"))
lw, lh = logo.getSize()
logo_h = 62.0
logo_w = logo_h * lw / lh
logo_y = band_y + (BAND_H - logo_h) / 2
c.drawImage(logo, M, logo_y, width=logo_w, height=logo_h, mask=None)
# a hairline keyline so the mark reads as a mounted plate, not a pasted box
c.setStrokeColor(Color(1, 1, 1, alpha=0.30))
c.setLineWidth(0.5)
c.rect(M - 3, logo_y - 3, logo_w + 6, logo_h + 6, stroke=1, fill=0)

# Hairline rule + survey marginalia opposite the mark
c.setStrokeColor(Color(1, 1, 1, alpha=0.22))
c.setLineWidth(0.4)
c.line(M + logo_w + 26, band_y + 22, W - M, band_y + 22)

c.setFont("MonoBold", 8.6)
c.setFillColor(CREAM)
c.drawRightString(W - M, band_y + BAND_H - 40, "9TH ISLAND OUTRIGGER CANOE CLUB")
c.setFont("Mono", 7.2)
c.setFillColor(Color(1, 1, 1, alpha=0.55))
c.drawRightString(W - M, band_y + BAND_H - 54, "LAKE MEAD  ·  LAS VEGAS, NEVADA")
c.setFont("Mono", 6.4)
c.setFillColor(Color(1, 1, 1, alpha=0.38))
c.drawRightString(W - M, band_y + 10, "SPONSORSHIP PROSPECTUS  ·  SHEET 01 OF 01")

# ── Swell field: hundreds of ruled hairlines, nine dominant crests ───────
SWELL_TOP = band_y - 14
SWELL_H = 48.0
c.saveState()
p = c.beginPath()
p.rect(M, SWELL_TOP - SWELL_H, MEASURE, SWELL_H)
c.clipPath(p, stroke=0, fill=0)
c.setLineWidth(0.32)
ROWS = 34
for i in range(ROWS):
    t = i / (ROWS - 1.0)
    base = SWELL_TOP - SWELL_H * t
    amp = 3.4 + 5.2 * math.sin(math.pi * t)
    c.setStrokeColor(tint(INK, 0.10 + 0.34 * (1 - t)))
    path = c.beginPath()
    for step in range(0, 241):
        x = M + MEASURE * step / 240.0
        # nine crests across the measure — the ninth island, counted in water
        y = base + amp * math.sin(9 * math.pi * step / 240.0 + t * 1.9)
        path.moveTo(x, y) if step == 0 else path.lineTo(x, y)
    c.drawPath(path, stroke=1, fill=0)
c.restoreState()

# ── Headline stratum ─────────────────────────────────────────────────────
head_y = SWELL_TOP - SWELL_H - 30
c.setFont("Mono", 7.4)
c.setFillColor(LAVA)
c.drawString(M, head_y, "F O R   B U S I N E S S E S")

HEAD_SIZE, HEAD_LEAD = 27.0, 31.0
HEADLINE = ["Help our team.", "Become a sponsor."]
head_y -= 28
c.setFont("Display", HEAD_SIZE)
c.setFillColor(INK)
for i, ln in enumerate(HEADLINE):
    c.drawString(M, head_y - i * HEAD_LEAD, ln)

headline_right = M + max(
    pdfmetrics.stringWidth(ln, "Display", HEAD_SIZE) for ln in HEADLINE
)
headline_bottom = head_y - HEAD_LEAD - 8  # descender of the last line

intro_w = 206.0
assert W - M - intro_w > headline_right + 24, "intro column crowds the headline"
intro = (
    "Your support puts canoes on the water — equipment, race entries, and travel "
    "for a Las Vegas crew paddling in the Hawaiian tradition. In return, your name "
    "rides with us: on our shirts, and at every event we paddle."
)
intro_lines = wrap(intro, "Sans", 9.2, intro_w)
intro_bottom = draw_lines(
    W - M - intro_w,
    head_y + 4,
    intro_lines,
    "Sans",
    9.2,
    13.4,
    tint(INK, 0.72),
) - 3

# ── Depth strata: one band per level ─────────────────────────────────────
strata_top = min(headline_bottom, intro_bottom) - 30
c.setFont("Mono", 7.0)
c.setFillColor(tint(INK, 0.45))
c.drawString(M, strata_top + 12, "S P O N S O R S H I P   L E V E L S")
c.drawRightString(W - M, strata_top + 12, "SOUNDINGS IN U.S. DOLLARS")

c.setStrokeColor(tint(INK, 0.5))
c.setLineWidth(0.7)
c.line(M, strata_top, W - M, strata_top)

AMOUNT_X = M + 30
BEN_X = M + 184
BEN_COL_W = 155.0
BEN_GUTTER = 16.0

FOOT_H = 128.0
FOOTNOTE_W = 320.0
footnote_lines = wrap(sp["footnote"], "Sans", 8.6, FOOTNOTE_W)
strata_floor = FOOT_H + 24 + len(footnote_lines) * 12.0 + 20

# Measure every row first, then spend the leftover space evenly — the sheet
# should come to rest, not trail off.
metrics = []
for tier in sp["tiers"]:
    benefits = tier["benefits"]
    per_col = math.ceil(len(benefits) / 2)
    wrapped = [wrap("— " + b, "Sans", 8.8, BEN_COL_W) for b in benefits]
    left, right = wrapped[:per_col], wrapped[per_col:]
    tallest = max(
        sum(len(w) for w in left) * 11.6 + (len(left) - 1) * 3.4,
        (sum(len(w) for w in right) * 11.6 + (len(right) - 1) * 3.4) if right else 0,
    )
    stack_h = 52 if tier.get("featured") else 44  # amount + name (+ flag)
    metrics.append((wrapped, per_col, max(tallest, stack_h) + 24))

slack = (strata_top - strata_floor) - sum(m[2] for m in metrics)
assert slack >= 0, "levels overrun the footer by %.1fpt" % -slack
pad = slack / len(metrics)

row_y = strata_top
for idx, tier in enumerate(sp["tiers"]):
    color = TIER_COLORS[idx % len(TIER_COLORS)]
    wrapped, per_col, natural_h = metrics[idx]
    row_h = natural_h + pad

    top = row_y
    bottom = row_y - row_h

    # station index + accent tick, ruled in the left gutter
    c.setFont("Mono", 6.6)
    c.setFillColor(tint(INK, 0.42))
    c.drawString(M, top - 17, "0%d" % (idx + 1))
    c.setFillColor(color)
    c.rect(M, top - 30, 3.2, 8.5, stroke=0, fill=1)

    # amount, cut large — the one number that matters
    c.setFont("Display", 23)
    c.setFillColor(color)
    c.drawString(AMOUNT_X, top - 26, tier["amount"])
    c.setFont("MonoBold", 7.6)
    c.setFillColor(INK)
    c.drawString(AMOUNT_X, top - 42, tier["name"].upper())
    if tier.get("featured"):
        c.setFont("Mono", 6.2)
        c.setFillColor(LAVA)
        c.drawString(AMOUNT_X, top - 55, "TOP LEVEL")

    # benefits, set in two measured columns
    for col in range(2):
        items = wrapped[:per_col] if col == 0 else wrapped[per_col:]
        x = BEN_X + col * (BEN_COL_W + BEN_GUTTER)
        y = top - 20
        for item in items:
            y = draw_lines(x, y, item, "Sans", 8.8, 11.6, tint(INK, 0.78))
            y -= 11.6 + 3.4

    c.setStrokeColor(tint(INK, 0.22))
    c.setLineWidth(0.4)
    c.line(M, bottom, W - M, bottom)
    row_y = bottom

# ── Footnote ─────────────────────────────────────────────────────────────
draw_lines(M, row_y - 22, footnote_lines, "Sans", 8.6, 12.0, tint(INK, 0.62))
c.setFont("Mono", 6.4)
c.setFillColor(tint(INK, 0.4))
c.drawRightString(W - M, row_y - 22, "ALL LEVELS RENEWABLE ANNUALLY")

# ── Footer band: the station marker ──────────────────────────────────────
c.setFillColor(INK)
c.rect(0, 0, W, FOOT_H, stroke=0, fill=1)

qr = segno.make(URL, error="h")
matrix = [list(row) for row in qr.matrix]
n = len(matrix)
QR_SIZE = 84.0
QR_PAD = 8.0
qr_x, qr_y = M, (FOOT_H - QR_SIZE - 2 * QR_PAD) / 2
c.setFillColor(CREAM)
c.rect(qr_x, qr_y, QR_SIZE + 2 * QR_PAD, QR_SIZE + 2 * QR_PAD, stroke=0, fill=1)
mod = QR_SIZE / n
c.setFillColor(INK)
for r in range(n):
    for col in range(n):
        if matrix[r][col]:
            c.rect(
                qr_x + QR_PAD + col * mod,
                qr_y + QR_PAD + (n - 1 - r) * mod,
                mod + 0.12,
                mod + 0.12,
                stroke=0,
                fill=1,
            )

tx = qr_x + QR_SIZE + 2 * QR_PAD + 26
c.setFont("Mono", 6.8)
c.setFillColor(Color(1, 1, 1, alpha=0.5))
c.drawString(tx, FOOT_H - 44, "S C A N   T O   V I S I T")
c.setFont("Display", 17)
c.setFillColor(CREAM)
c.drawString(tx, FOOT_H - 66, "9thislandoutrigger.com")
c.setFont("Mono", 7.6)
c.setFillColor(Color(1, 1, 1, alpha=0.62))
c.drawString(tx, FOOT_H - 82, EMAIL)
c.setFont("Mono", 6.4)
c.setFillColor(Color(1, 1, 1, alpha=0.38))
c.drawRightString(W - M, 20, "PADDLING TOGETHER  ·  BUILDING OHANA")

c.showPage()
c.save()
print("wrote", OUT)
