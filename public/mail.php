<?php
header('Content-Type: application/json; charset=utf-8');

// Nur POST-Anfragen erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Nur POST erlaubt']);
    exit;
}

// JSON-Body auslesen
$rohdaten = file_get_contents('php://input');
$daten = json_decode($rohdaten, true);

if (!$daten) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Ungültige Daten']);
    exit;
}

/* -------------------------------------------------------------
 * 1. UNSICHTBARER BOT-SCHUTZ (Honeypot & Time-Gate)
 * ------------------------------------------------------------- */

// Honeypot: Unsichtbares Feld. Wenn ausgefüllt -> Bot!
$honeypot = trim($daten['website_check'] ?? '');
if (!empty($honeypot)) {
    // Erfolgreiche Antwort vorgaukeln, damit Bots die Sperre nicht umgehen
    echo json_encode(['success' => true, 'message' => 'Nachricht gesendet']);
    exit;
}

// Time-Gate: Mindestens 2,5 Sekunden Ausfüllzeit für Menschen
$formTimestamp = intval($daten['_ts'] ?? 0);
$jetzt = round(microtime(true) * 1000);
if ($formTimestamp > 0 && ($jetzt - $formTimestamp < 2200)) {
    // Zu schnell ausgefüllt -> Bot!
    echo json_encode(['success' => true, 'message' => 'Nachricht gesendet']);
    exit;
}

/* -------------------------------------------------------------
 * 2. EINGABEN BEREINIGEN & VALIDIEREN
 * ------------------------------------------------------------- */
$name = trim($daten['name'] ?? '');
$email = trim($daten['email'] ?? '');
$nachricht = trim($daten['nachricht'] ?? '');

// Einfache Validierung
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Bitte eine gültige E-Mail-Adresse angeben']);
    exit;
}

if (empty($nachricht) || strlen($nachricht) < 5) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Die Nachricht darf nicht leer sein']);
    exit;
}

// Absender & Empfänger
$empfaengerSemir = 'borogovacsemir@gmail.com'; // Geht direkt an dein Gmail-Postfach
$absenderSystem = 'kontakt@semirborogovac.de';
$sichererName = htmlspecialchars($name ?: 'Besucher', ENT_QUOTES, 'UTF-8');
$sichereNachricht = nl2br(htmlspecialchars($nachricht, ENT_QUOTES, 'UTF-8'));
$datum = date('d.m.Y H:i');

/* -------------------------------------------------------------
 * 3. E-Mail an Semir (Benachrichtigung über neue Nachricht)
 * ------------------------------------------------------------- */
$betreffSemir = "Neue Nachricht über Portfolio von " . ($name ?: $email);

$htmlSemir = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Neue Portfolio-Nachricht</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #14110F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E7ECEF;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #1D1815; border: 1px solid #332B26; padding: 32px; border-radius: 4px;">
    <div style="font-family: ui-monospace, 'Cascadia Code', monospace; font-size: 11px; letter-spacing: 0.12em; color: #FF9A3C; margin-bottom: 12px;">
      [ NEUE NACHRICHT · PORTFOLIO ]
    </div>
    <h2 style="margin: 0 0 20px 0; font-size: 22px; color: #FFFFFF; font-weight: 600;">
      Kontaktanfrage von {$sichererName}
    </h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr>
        <td style="padding: 6px 0; color: #8F857D; width: 90px;">Name:</td>
        <td style="padding: 6px 0; color: #E7ECEF; font-weight: 500;">{$sichererName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #8F857D;">E-Mail:</td>
        <td style="padding: 6px 0;"><a href="mailto:{$email}" style="color: #FF9A3C; text-decoration: none;">{$email}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #8F857D;">Datum:</td>
        <td style="padding: 6px 0; color: #B3AAA2;">{$datum} Uhr</td>
      </tr>
    </table>
    <div style="border-top: 1px solid #332B26; padding-top: 20px;">
      <div style="font-family: ui-monospace, monospace; font-size: 11px; color: #8F857D; text-transform: uppercase; margin-bottom: 10px;">Nachricht:</div>
      <div style="background-color: #14110F; border: 1px solid #2B2420; padding: 18px; border-radius: 3px; font-size: 15px; line-height: 1.6; color: #E7ECEF;">
        {$sichereNachricht}
      </div>
    </div>
    <div style="margin-top: 28px; text-align: right;">
      <a href="mailto:{$email}?subject=Re:%20Deine%20Nachricht%20an%20Semir%20Borogovac" style="display: inline-block; background-color: #FF9A3C; color: #120A03; font-weight: 600; padding: 10px 20px; text-decoration: none; font-size: 13px; font-family: ui-monospace, monospace;">
        Direkt antworten →
      </a>
    </div>
  </div>
</body>
</html>
HTML;

$headerSemir = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Portfolio Kontaktformular <' . $absenderSystem . '>',
    'Reply-To: ' . ($name ? "{$name} <{$email}>" : $email),
    'X-Mailer: PHP/' . phpversion()
];

$gesendetSemir = @mail($empfaengerSemir, $betreffSemir, $htmlSemir, implode("\r\n", $headerSemir));

if ($gesendetSemir) {
    echo json_encode(['success' => true, 'message' => 'Nachricht erfolgreich versendet!']);
} else {
    // Bei PHP-Mail Fehler auf Live-Servern
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server konnte E-Mail nicht versenden']);
}
