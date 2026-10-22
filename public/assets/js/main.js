/* ==========================================================
   SETTINGS — the only part you normally need to change.
   formEndpoint: where quote requests are sent.
     'netlify'                           -> Netlify Forms (form "offerte" in index.html)
     ''                                  -> nothing is sent, the visitor only sees the summary
     'https://formspree.io/f/XXXXXXXX'   -> Formspree (JSON)
     'https://api.web3forms.com/submit'  -> Web3Forms (JSON, put your key in formExtra.access_key)
   formExtra: extra fields added to every request.
   ========================================================== */
var SITE_CONFIG = {
  formEndpoint: 'netlify',
  formExtra: {}
};

(function () {
  /* ---------- Language ---------- */
  var dict = {
    nl: {
      logoSub: 'DAKWERKEN', cta: 'Offerte aanvragen',
      eyebrowL: 'Dakwerken · België', sheet: 'Blad 01 — Stadhuis 3D', building: 'Bouwen',
      alt: 'Technische 3D-tekening van een Belgisch stadhuis met steigers',
      tagline: 'Elk dak begint als een tekening. <em>Wij bouwen het tot op de millimeter.</em>',
      t1: 'Hellende daken', t2: 'Platte daken', t3: 'Zinkwerk', t4: 'Renovatie & isolatie',
      scroll: 'Scroll', next: '02 — Wat zit erin · volgt',
      ridge: 'NOK', dormer: 'DAKKAPEL', scaffold: 'STELLING', scale: 'SCHAAL 1:100'
    },
    fr: {
      logoSub: 'TOITURES', cta: 'Demander un devis',
      eyebrowL: 'Toitures · Belgique', sheet: 'Planche 01 — Hôtel de ville 3D', building: 'Construction',
      alt: 'Dessin technique 3D d’un hôtel de ville belge avec échafaudages',
      tagline: 'Chaque toit commence par un dessin. <em>Nous le construisons au millimètre près.</em>',
      t1: 'Toits inclinés', t2: 'Toits plats', t3: 'Zinguerie', t4: 'Rénovation & isolation',
      scroll: 'Défiler', next: '02 — Ce qu’il y a dedans · à suivre',
      ridge: 'FAÎTAGE', dormer: 'LUCARNE', scaffold: 'ÉCHAFAUDAGE', scale: 'ÉCHELLE 1:100'
    },
    en: {
      logoSub: 'ROOFING', cta: 'Request a quote',
      eyebrowL: 'Roofing · Belgium', sheet: 'Sheet 01 — Town hall 3D', building: 'Building',
      alt: 'Technical 3D drawing of a Belgian town hall with scaffolding',
      tagline: 'Every roof starts as a drawing. <em>We build it to the millimetre.</em>',
      t1: 'Pitched roofs', t2: 'Flat roofs', t3: 'Zinc work', t4: 'Renovation & insulation',
      scroll: 'Scroll', next: '02 — What’s inside · coming next',
      ridge: 'RIDGE', dormer: 'DORMER', scaffold: 'SCAFFOLDING', scale: 'SCALE 1:100'
    }
  };
  // roof plan + quote request texts
  Object.assign(dict.nl, {
    sheet2: 'Blad 02 — Dakplan', tower: 'TOREN', hip: 'HOEKKEPER',
    o_sheet: 'Blad 03 — Aanvraagformulier', o_title: 'Offerte aanvragen', o_close: 'Sluiten',
    o_intro: 'Vertel ons kort over uw dak. Hoe meer we weten, hoe nauwkeuriger onze offerte.',
    o_free: 'Gratis en vrijblijvend',
    st1: 'Werken', st2: 'Uw dak', st3: 'Adres & planning', st4: 'Contactgegevens', step: 'Stap',
    next: 'Volgende', back: 'Vorige', submit: 'Aanvraag versturen', choose: 'Maak een keuze', optional: '(optioneel)',
    f_work: 'Welke werken heeft u nodig?', h_work: 'Meerdere keuzes mogelijk',
    o_new: 'Nieuw dak', o_reno: 'Dakrenovatie', o_repair: 'Herstelling / lek', o_insul: 'Dakisolatie', o_flat: 'Plat dak', o_zinc: 'Zinkwerk & dakgoten', o_windows: 'Dakramen', o_asbestos: 'Asbestverwijdering',
    f_urgency: 'Wanneer moeten de werken starten?', o_urgent: 'Dringend (lekkage)', o_month: 'Binnen 1 maand', o_quarter: 'Binnen 3 maanden', o_flex: 'Flexibel',
    f_roofType: 'Type dak', o_gable: 'Zadeldak', o_hip: 'Schilddak', o_flatRoof: 'Plat dak', o_mansard: 'Mansardedak', o_shed: 'Lessenaarsdak', o_other: 'Anders / weet niet',
    f_building: 'Type gebouw', o_house: 'Woning', o_apartment: 'Appartementsgebouw', o_commercial: 'Handelspand / kantoor', o_industrial: 'Industriegebouw', o_heritage: 'Erfgoed / monument',
    f_cover: 'Huidige dakbedekking', o_tiles: 'Dakpannen', o_slate: 'Leien', o_epdm: 'EPDM', o_bitumen: 'Bitumen / roofing', o_zincCover: 'Zink', o_corrugated: 'Golfplaten', o_unknown: 'Weet ik niet',
    f_area: 'Geschatte dakoppervlakte', h_area: 'Een schatting is voldoende',
    f_floors: 'Aantal bouwlagen', o_f1: '1', o_f2: '2', o_f3: '3', o_f4: '4 of meer',
    f_year: 'Bouwjaar', o_y1: 'Voor 1950', o_y2: '1950 – 1980', o_y3: '1980 – 2000', o_y4: 'Na 2000',
    f_street: 'Straat en huisnummer', f_zip: 'Postcode', f_city: 'Gemeente', f_start: 'Gewenste startdatum',
    f_photos: 'Foto’s van het dak', photosBtn: 'Foto’s toevoegen', photosN: '{n} foto(’s) gekozen',
    f_desc: 'Beschrijving', ph_desc: 'Bv. lek boven de badkamer, dakgoot komt los, …',
    f_first: 'Voornaam', f_last: 'Naam', f_email: 'E-mail', f_phone: 'Telefoon',
    f_contactPref: 'Hoe mogen we u contacteren?', o_phone: 'Telefoon', o_email: 'E-mail', o_whatsapp: 'WhatsApp',
    f_company: 'Bedrijf / btw-nummer',
    f_gdpr: 'Ik ga akkoord dat A.C. Projects mijn gegevens gebruikt om deze aanvraag te behandelen.',
    err_req: 'Dit veld is verplicht', err_choice: 'Kies minstens één optie', err_zip: 'Geef een geldige Belgische postcode (4 cijfers)',
    err_email: 'Geef een geldig e-mailadres', err_phone: 'Geef een geldig telefoonnummer', err_gdpr: 'Uw akkoord is nodig om te versturen',
    ok_title: 'Aanvraag ontvangen', ok_text: 'Bedankt! We bekijken uw aanvraag en nemen zo snel mogelijk contact met u op.',
    ok_ref: 'Referentie', ok_back: 'Terug naar de site', s_address: 'Adres', s_name: 'Naam',
    sending: 'Bezig met versturen…', err_send: 'Versturen is niet gelukt. Probeer het opnieuw of bel ons.'
  });
  Object.assign(dict.fr, {
    sheet2: 'Planche 02 — Plan de toiture', tower: 'BEFFROI', hip: 'ARÊTIER',
    o_sheet: 'Planche 03 — Formulaire de demande', o_title: 'Demander un devis', o_close: 'Fermer',
    o_intro: 'Parlez-nous brièvement de votre toiture. Plus nous en savons, plus notre devis sera précis.',
    o_free: 'Gratuit et sans engagement',
    st1: 'Travaux', st2: 'Votre toiture', st3: 'Adresse & planning', st4: 'Coordonnées', step: 'Étape',
    next: 'Suivant', back: 'Précédent', submit: 'Envoyer la demande', choose: 'Faites un choix', optional: '(facultatif)',
    f_work: 'De quels travaux avez-vous besoin ?', h_work: 'Plusieurs choix possibles',
    o_new: 'Nouvelle toiture', o_reno: 'Rénovation de toiture', o_repair: 'Réparation / fuite', o_insul: 'Isolation de toiture', o_flat: 'Toit plat', o_zinc: 'Zinguerie & gouttières', o_windows: 'Fenêtres de toit', o_asbestos: 'Désamiantage',
    f_urgency: 'Quand les travaux doivent-ils commencer ?', o_urgent: 'Urgent (fuite)', o_month: 'Dans le mois', o_quarter: 'Dans les 3 mois', o_flex: 'Flexible',
    f_roofType: 'Type de toiture', o_gable: 'Toit à deux pans', o_hip: 'Toit en croupe', o_flatRoof: 'Toit plat', o_mansard: 'Toit mansardé', o_shed: 'Toit en appentis', o_other: 'Autre / je ne sais pas',
    f_building: 'Type de bâtiment', o_house: 'Maison', o_apartment: 'Immeuble à appartements', o_commercial: 'Commerce / bureau', o_industrial: 'Bâtiment industriel', o_heritage: 'Patrimoine / monument',
    f_cover: 'Couverture actuelle', o_tiles: 'Tuiles', o_slate: 'Ardoises', o_epdm: 'EPDM', o_bitumen: 'Bitume / roofing', o_zincCover: 'Zinc', o_corrugated: 'Plaques ondulées', o_unknown: 'Je ne sais pas',
    f_area: 'Surface de toiture estimée', h_area: 'Une estimation suffit',
    f_floors: 'Nombre de niveaux', o_f1: '1', o_f2: '2', o_f3: '3', o_f4: '4 ou plus',
    f_year: 'Année de construction', o_y1: 'Avant 1950', o_y2: '1950 – 1980', o_y3: '1980 – 2000', o_y4: 'Après 2000',
    f_street: 'Rue et numéro', f_zip: 'Code postal', f_city: 'Commune', f_start: 'Date de début souhaitée',
    f_photos: 'Photos de la toiture', photosBtn: 'Ajouter des photos', photosN: '{n} photo(s) sélectionnée(s)',
    f_desc: 'Description', ph_desc: 'Ex. fuite au-dessus de la salle de bain, gouttière qui se détache, …',
    f_first: 'Prénom', f_last: 'Nom', f_email: 'E-mail', f_phone: 'Téléphone',
    f_contactPref: 'Comment pouvons-nous vous contacter ?', o_phone: 'Téléphone', o_email: 'E-mail', o_whatsapp: 'WhatsApp',
    f_company: 'Entreprise / n° de TVA',
    f_gdpr: 'J’accepte qu’A.C. Projects utilise mes données pour traiter cette demande.',
    err_req: 'Ce champ est obligatoire', err_choice: 'Choisissez au moins une option', err_zip: 'Indiquez un code postal belge valide (4 chiffres)',
    err_email: 'Indiquez une adresse e-mail valide', err_phone: 'Indiquez un numéro de téléphone valide', err_gdpr: 'Votre accord est nécessaire pour envoyer',
    ok_title: 'Demande reçue', ok_text: 'Merci ! Nous examinons votre demande et vous contactons dès que possible.',
    ok_ref: 'Référence', ok_back: 'Retour au site', s_address: 'Adresse', s_name: 'Nom',
    sending: 'Envoi en cours…', err_send: 'L’envoi a échoué. Réessayez ou appelez-nous.'
  });
  Object.assign(dict.en, {
    sheet2: 'Sheet 02 — Roof plan', tower: 'BELFRY', hip: 'HIP',
    o_sheet: 'Sheet 03 — Request form', o_title: 'Request a quote', o_close: 'Close',
    o_intro: 'Tell us briefly about your roof. The more we know, the more accurate our quote.',
    o_free: 'Free and without obligation',
    st1: 'Work', st2: 'Your roof', st3: 'Address & timing', st4: 'Contact details', step: 'Step',
    next: 'Next', back: 'Back', submit: 'Send request', choose: 'Choose…', optional: '(optional)',
    f_work: 'What work do you need?', h_work: 'Multiple choices possible',
    o_new: 'New roof', o_reno: 'Roof renovation', o_repair: 'Repair / leak', o_insul: 'Roof insulation', o_flat: 'Flat roof', o_zinc: 'Zinc work & gutters', o_windows: 'Roof windows', o_asbestos: 'Asbestos removal',
    f_urgency: 'When should the work start?', o_urgent: 'Urgent (leak)', o_month: 'Within 1 month', o_quarter: 'Within 3 months', o_flex: 'Flexible',
    f_roofType: 'Roof type', o_gable: 'Gable roof', o_hip: 'Hip roof', o_flatRoof: 'Flat roof', o_mansard: 'Mansard roof', o_shed: 'Lean-to roof', o_other: 'Other / don’t know',
    f_building: 'Building type', o_house: 'House', o_apartment: 'Apartment building', o_commercial: 'Shop / office', o_industrial: 'Industrial building', o_heritage: 'Heritage / monument',
    f_cover: 'Current roof covering', o_tiles: 'Tiles', o_slate: 'Slate', o_epdm: 'EPDM', o_bitumen: 'Bitumen / roofing felt', o_zincCover: 'Zinc', o_corrugated: 'Corrugated sheets', o_unknown: 'I don’t know',
    f_area: 'Estimated roof area', h_area: 'An estimate is fine',
    f_floors: 'Number of storeys', o_f1: '1', o_f2: '2', o_f3: '3', o_f4: '4 or more',
    f_year: 'Year built', o_y1: 'Before 1950', o_y2: '1950 – 1980', o_y3: '1980 – 2000', o_y4: 'After 2000',
    f_street: 'Street and number', f_zip: 'Postcode', f_city: 'Municipality', f_start: 'Preferred start date',
    f_photos: 'Photos of the roof', photosBtn: 'Add photos', photosN: '{n} photo(s) selected',
    f_desc: 'Description', ph_desc: 'E.g. leak above the bathroom, gutter coming loose, …',
    f_first: 'First name', f_last: 'Last name', f_email: 'Email', f_phone: 'Phone',
    f_contactPref: 'How may we contact you?', o_phone: 'Phone', o_email: 'Email', o_whatsapp: 'WhatsApp',
    f_company: 'Company / VAT number',
    f_gdpr: 'I agree that A.C. Projects may use my details to handle this request.',
    err_req: 'This field is required', err_choice: 'Choose at least one option', err_zip: 'Enter a valid Belgian postcode (4 digits)',
    err_email: 'Enter a valid email address', err_phone: 'Enter a valid phone number', err_gdpr: 'Your consent is needed to send',
    ok_title: 'Request received', ok_text: 'Thank you! We will review your request and get back to you as soon as possible.',
    ok_ref: 'Reference', ok_back: 'Back to the site', s_address: 'Address', s_name: 'Name',
    sending: 'Sending…', err_send: 'Sending failed. Please try again or call us.'
  });

  var lang = 'nl', sheetShown = '';
  var sheetEl = document.getElementById('sheetTxt');
  var buttons = document.querySelectorAll('.lang button');
  function setLang(l) {
    lang = dict[l] ? l : 'nl';
    var t = dict[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t[el.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t[el.dataset.i18nHtml]; });
    document.getElementById('scene').setAttribute('aria-label', t.alt);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    sheetShown = '';
    renderOrder();
    try { localStorage.setItem('acp-lang', lang); } catch (e) {}
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });
  var saved = null;
  try { saved = localStorage.getItem('acp-lang'); } catch (e) {}
  /* ---------- Quote request wizard ---------- */
  var orderOpen = false, step = 0, state = {}, doneRef = '', lastFocus = null;
  var panel = document.getElementById('offerte');
  var form = document.getElementById('orderForm');
  var stepBody = document.getElementById('stepBody');
  var doneEl = document.getElementById('orderDone');
  var STEPS = [
    [
      { id: 'work', type: 'chips', multi: 1, req: 1, hint: 'h_work', opts: ['new', 'reno', 'repair', 'insul', 'flat', 'zinc', 'windows', 'asbestos'] },
      { id: 'urgency', type: 'chips', req: 1, opts: ['urgent', 'month', 'quarter', 'flex'] }
    ],
    [
      { id: 'roofType', type: 'cards', req: 1, opts: ['gable', 'hip', 'flatRoof', 'mansard', 'shed', 'other'] },
      { id: 'building', type: 'select', req: 1, half: 1, opts: ['house', 'apartment', 'commercial', 'industrial', 'heritage'] },
      { id: 'cover', type: 'select', half: 1, opts: ['tiles', 'slate', 'epdm', 'bitumen', 'zincCover', 'corrugated', 'unknown'] },
      { id: 'area', type: 'number', half: 1, suffix: 'm²', im: 'numeric', hint: 'h_area' },
      { id: 'floors', type: 'select', half: 1, opts: ['f1', 'f2', 'f3', 'f4'] },
      { id: 'year', type: 'select', half: 1, opts: ['y1', 'y2', 'y3', 'y4'] }
    ],
    [
      { id: 'street', type: 'text', req: 1, ac: 'street-address' },
      { id: 'zip', type: 'text', req: 1, half: 1, ac: 'postal-code', im: 'numeric' },
      { id: 'city', type: 'text', req: 1, half: 1, ac: 'address-level2' },
      { id: 'start', type: 'date', half: 1 },
      { id: 'photos', type: 'file', half: 1 },
      { id: 'desc', type: 'textarea' }
    ],
    [
      { id: 'first', type: 'text', req: 1, half: 1, ac: 'given-name' },
      { id: 'last', type: 'text', req: 1, half: 1, ac: 'family-name' },
      { id: 'email', type: 'email', req: 1, half: 1, ac: 'email' },
      { id: 'phone', type: 'tel', req: 1, half: 1, ac: 'tel' },
      { id: 'contactPref', type: 'chips', opts: ['phone', 'email', 'whatsapp'] },
      { id: 'company', type: 'text', ac: 'organization' },
      { id: 'gdpr', type: 'check', req: 1 }
    ]
  ];
  // small elevation sketches for the roof type cards
  var ROOF_ICONS = {
    gable: 'M4 38 H60 M10 38 V24 M54 38 V24 M6 26 L32 6 L58 26',
    hip: 'M4 38 H60 M10 38 V24 M54 38 V24 M6 26 L20 10 H44 L58 26 Z',
    flatRoof: 'M4 38 H60 M10 38 V20 M54 38 V20 M7 16 H57 V20 H7 Z',
    mansard: 'M4 38 H60 M10 38 V26 M54 38 V26 M7 26 L13 13 L24 6 H40 L51 13 L57 26 M13 13 H51',
    shed: 'M4 38 H60 M10 38 V26 M54 38 V12 M6 28 L58 10',
    other: 'M4 38 H60 M10 38 V22 H54 V38 M22 14 H42 M32 4 V24'
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function allFields() { return STEPS.reduce(function (a, s) { return a.concat(s); }, []); }
  function fieldById(id) { return allFields().filter(function (f) { return f.id === id; })[0]; }

  function fieldHTML(f, t, i) {
    var lbl = '<b>' + (i < 10 ? '0' : '') + i + '</b>' + esc(t['f_' + f.id]) + (f.req ? '' : ' <em>' + esc(t.optional) + '</em>');
    var v = state[f.id], cls = 'field' + (f.half ? ' half' : '');
    var err = '<p class="err" id="err-' + f.id + '" aria-live="polite"></p>';
    var hint = f.hint ? '<p class="hint">' + esc(t[f.hint]) + '</p>' : '';
    if (f.type === 'chips' || f.type === 'cards') {
      var type = f.multi ? 'checkbox' : 'radio';
      return '<fieldset class="' + cls + '" id="fld-' + f.id + '"><legend class="lbl">' + lbl + '</legend>' + hint +
        '<div class="' + f.type + '">' + f.opts.map(function (o) {
          var on = f.multi ? (v || []).indexOf(o) >= 0 : v === o;
          var icon = f.type === 'cards' ? '<svg viewBox="0 0 64 42" aria-hidden="true"><path d="' + ROOF_ICONS[o] + '"/></svg>' : '';
          return '<label class="chip"><input type="' + type + '" name="' + f.id + '" value="' + o + '"' + (on ? ' checked' : '') + '><span>' + icon + '<i>' + esc(t['o_' + o]) + '</i></span></label>';
        }).join('') + '</div>' + err + '</fieldset>';
    }
    if (f.type === 'check') {
      return '<div class="' + cls + '" id="fld-' + f.id + '"><label class="check"><input type="checkbox" name="' + f.id + '"' + (v ? ' checked' : '') + '><span>' + esc(t['f_' + f.id]) + '</span></label>' + err + '</div>';
    }
    if (f.type === 'file') {
      var n = v && v.length ? esc(t.photosN.replace('{n}', v.length)) : '';
      return '<div class="' + cls + '" id="fld-' + f.id + '"><span class="lbl">' + lbl + '</span><label class="file-btn"><input type="file" name="' + f.id + '" accept="image/*" multiple><span>' + esc(t.photosBtn) + '</span></label><span class="file-n mono">' + n + '</span>' + err + '</div>';
    }
    var id = 'i-' + f.id, ctl;
    if (f.type === 'select') {
      ctl = '<select id="' + id + '" name="' + f.id + '"><option value="">' + esc(t.choose) + '</option>' + f.opts.map(function (o) {
        return '<option value="' + o + '"' + (v === o ? ' selected' : '') + '>' + esc(t['o_' + o]) + '</option>';
      }).join('') + '</select>';
    } else if (f.type === 'textarea') {
      ctl = '<textarea id="' + id + '" name="' + f.id + '" rows="4" placeholder="' + esc(t['ph_' + f.id] || '') + '">' + esc(v || '') + '</textarea>';
    } else {
      ctl = '<div class="inp"><input id="' + id + '" name="' + f.id + '" type="' + f.type + '" value="' + esc(v || '') + '"' +
        (f.ac ? ' autocomplete="' + f.ac + '"' : '') + (f.im ? ' inputmode="' + f.im + '"' : '') + (f.type === 'number' ? ' min="1" step="1"' : '') + '>' +
        (f.suffix ? '<span class="suffix mono">' + f.suffix + '</span>' : '') + '</div>';
    }
    return '<div class="' + cls + '" id="fld-' + f.id + '"><label class="lbl" for="' + id + '">' + lbl + '</label>' + ctl + hint + err + '</div>';
  }

  function renderStep() {
    var t = dict[lang];
    stepBody.innerHTML = '<h3 class="step-h" tabindex="-1"><span class="mono">' + esc(t.step) + ' ' + (step + 1) + ' / ' + STEPS.length + '</span>' + esc(t['st' + (step + 1)]) + '</h3>' +
      '<div class="grid">' + STEPS[step].map(function (f, i) { return fieldHTML(f, t, i + 1); }).join('') + '</div>';
    document.getElementById('btnBack').style.visibility = step ? 'visible' : 'hidden';
    document.getElementById('btnNextTxt').textContent = step === STEPS.length - 1 ? t.submit : t.next;
    setProgress(step, false);
  }
  function setProgress(s, finished) {
    document.getElementById('progBar').style.width = (finished ? 100 : (s + 1) / STEPS.length * 100) + '%';
    document.querySelectorAll('#steps li').forEach(function (li, i) {
      li.classList.toggle('done', finished || i < s);
      li.classList.toggle('active', !finished && i === s);
      if (!finished && i === s) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
  }
  function renderDone() {
    var t = dict[lang];
    function opt(k) { return state[k] ? t['o_' + state[k]] : '—'; }
    var rows = [
      [t.f_work, (state.work || []).map(function (o) { return t['o_' + o]; }).join(', ')],
      [t.f_urgency, opt('urgency')],
      [t.f_roofType, opt('roofType')],
      [t.f_building, opt('building')],
      [t.f_area, state.area ? state.area + ' m²' : '—'],
      [t.s_address, [state.street, [state.zip, state.city].join(' ')].join(', ')],
      [t.s_name, (state.first || '') + ' ' + (state.last || '')],
      [t.f_email, state.email], [t.f_phone, state.phone]
    ];
    doneEl.innerHTML = '<svg viewBox="0 0 72 72" aria-hidden="true"><path pathLength="1" d="M36 4 L68 36 L36 68 L4 36 Z"/><path pathLength="1" d="M22 37 L32 47 L51 27"/></svg>' +
      '<h3 tabindex="-1">' + esc(t.ok_title) + '</h3><p>' + esc(t.ok_text) + '</p>' +
      '<p class="ref mono">' + esc(t.ok_ref) + ' · <b>' + doneRef + '</b></p>' +
      '<dl>' + rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1] || '—') + '</dd>'; }).join('') + '</dl>' +
      '<button type="button" class="btn-gold mono" data-close>' + esc(t.ok_back) + ' <b aria-hidden="true">→</b></button>';
    setProgress(STEPS.length, true);
  }
  function renderOrder() {
    if (!panel || !orderOpen) return;
    if (doneRef) renderDone(); else renderStep();
  }

  function check(f) {
    var t = dict[lang], v = state[f.id], msg = '';
    var empty = v === undefined || v === '' || v === false || (Array.isArray(v) && !v.length);
    if (f.req && empty) msg = f.type === 'chips' || f.type === 'cards' ? t.err_choice : f.type === 'check' ? t.err_gdpr : t.err_req;
    else if (!empty && f.id === 'zip' && !/^[1-9]\d{3}$/.test(String(v).trim())) msg = t.err_zip;
    else if (!empty && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim())) msg = t.err_email;
    else if (!empty && f.type === 'tel' && (!/^[+\d\s().\/-]+$/.test(v) || String(v).replace(/\D/g, '').length < 9)) msg = t.err_phone;
    var errEl = document.getElementById('err-' + f.id), fld = document.getElementById('fld-' + f.id);
    if (errEl) errEl.textContent = msg;
    if (fld) {
      fld.classList.toggle('invalid', !!msg);
      var ctl = fld.querySelector('input, select, textarea');
      if (ctl) { if (msg) { ctl.setAttribute('aria-invalid', 'true'); ctl.setAttribute('aria-describedby', 'err-' + f.id); } else ctl.removeAttribute('aria-invalid'); }
    }
    return !msg;
  }

  function onFieldChange(ev) {
    var el = ev.target, name = el.name, f = name && fieldById(name);
    if (!f) return;
    if (f.multi) state[name] = Array.prototype.map.call(form.querySelectorAll('input[name="' + name + '"]:checked'), function (x) { return x.value; });
    else if (f.type === 'check') state[name] = el.checked;
    else if (f.type === 'file') {
      state[name] = Array.prototype.map.call(el.files, function (x) { return x.name; });
      el.closest('.field').querySelector('.file-n').textContent = state[name].length ? dict[lang].photosN.replace('{n}', state[name].length) : '';
    } else state[name] = el.value;
    if (document.getElementById('fld-' + name).classList.contains('invalid')) check(f);
  }
  form.addEventListener('input', onFieldChange);
  form.addEventListener('change', onFieldChange);

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var ok = STEPS[step].map(check).every(Boolean);
    if (!ok) {
      var bad = form.querySelector('.invalid input, .invalid select, .invalid textarea');
      if (bad) bad.focus();
      return;
    }
    if (step < STEPS.length - 1) {
      step++;
      renderStep();
      panel.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      stepBody.querySelector('.step-h').focus({ preventScroll: true });
    } else {
      var ref = 'AC-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
      sendRequest(ref).then(function () {
        doneRef = ref;
        form.hidden = true; doneEl.hidden = false;
        renderDone();
        panel.scrollTo({ top: 0 });
        doneEl.querySelector('h3').focus({ preventScroll: true });
      }, function () {
        var errEl = document.getElementById('err-gdpr');
        errEl.textContent = dict[lang].err_send;
      });
    }
  });

  // posts the request to SITE_CONFIG.formEndpoint; without an endpoint it resolves right away
  function sendRequest(ref) {
    var netlify = SITE_CONFIG.formEndpoint === 'netlify';
    // opened from disk (double-click): there is no server to post to
    if (!SITE_CONFIG.formEndpoint || (netlify && location.protocol === 'file:')) return Promise.resolve();
    var btn = document.getElementById('btnNext'), txt = document.getElementById('btnNextTxt');
    btn.disabled = true; txt.textContent = dict[lang].sending;
    // values go out in Dutch; Netlify needs the field ids (they match the hidden form in index.html)
    var t = dict.nl, data = netlify ? { 'form-name': 'offerte', referentie: ref, taal: lang } : { referentie: ref, taal: lang, subject: 'Offerte-aanvraag ' + ref, from_name: 'A.C. Projects website' };
    allFields().forEach(function (f) {
      var v = state[f.id];
      if (v === undefined || v === '') return;
      if (Array.isArray(v)) v = f.type === 'file' ? v.join(', ') : v.map(function (o) { return t['o_' + o] || o; }).join(', ');
      else if (f.opts) v = t['o_' + v] || v;
      else if (v === true) v = 'ja';
      data[netlify ? f.id : (t['f_' + f.id] || f.id)] = v;
    });
    Object.assign(data, SITE_CONFIG.formExtra);
    return fetch(netlify ? '/' : SITE_CONFIG.formEndpoint, netlify ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString()
    } : {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
    }).finally(function () {
      btn.disabled = false; txt.textContent = dict[lang].submit;
    });
  }
  document.getElementById('btnBack').addEventListener('click', function () {
    if (step > 0) { step--; renderStep(); stepBody.querySelector('.step-h').focus({ preventScroll: true }); }
  });

  function openOrder() {
    if (orderOpen) return;
    lastFocus = document.activeElement;
    orderOpen = true;
    panel.hidden = false;
    document.documentElement.classList.add('locked');
    renderOrder();
    panel.scrollTop = 0;
    requestAnimationFrame(function () { panel.classList.add('open'); });
    setTimeout(function () { var first = stepBody.querySelector('input, select, textarea'); if (first) first.focus({ preventScroll: true }); }, 60);
  }
  function closeOrder() {
    if (!orderOpen) return;
    orderOpen = false;
    panel.classList.remove('open');
    document.documentElement.classList.remove('locked');
    setTimeout(function () {
      panel.hidden = true;
      if (doneRef) { doneRef = ''; state = {}; step = 0; form.hidden = false; doneEl.hidden = true; }
    }, reduce ? 0 : 450);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', function (ev) {
    if (ev.target.closest('[data-order]')) { ev.preventDefault(); openOrder(); }
    else if (ev.target.closest('[data-close]')) closeOrder();
  });
  document.addEventListener('keydown', function (ev) {
    if (!orderOpen) return;
    if (ev.key === 'Escape') { closeOrder(); return; }
    if (ev.key !== 'Tab') return;
    // keep keyboard focus inside the panel
    var items = Array.prototype.filter.call(panel.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'), function (x) { return !x.disabled && x.offsetParent !== null && x.style.visibility !== 'hidden'; });
    if (!items.length) return;
    var first = items[0], lastEl = items[items.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); lastEl.focus(); }
    else if (!ev.shiftKey && document.activeElement === lastEl) { ev.preventDefault(); first.focus(); }
  });

  setLang(saved || 'nl');

  /* ---------- Vector helpers ---------- */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function lerp(a, b, t) { return add(a, mul(sub(b, a), t)); }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function len(a) { return Math.hypot(a[0], a[1], a[2]); }
  function norm(a) { return mul(a, 1 / len(a)); }
  function clamp(v) { return Math.max(0, Math.min(1, v)); }

  // a planar face with an outward normal (pointing away from `center`)
  function F(pts, center) {
    var n = norm(cross(sub(pts[1], pts[0]), sub(pts[2], pts[0])));
    var c = mul(pts.reduce(add, [0, 0, 0]), 1 / pts.length);
    if (dot(n, sub(c, center)) < 0) n = mul(n, -1);
    return { pts: pts, n: n, c: c };
  }
  function box(x0, x1, y0, y1, z0, z1) {
    var c = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    return [
      F([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], c),
      F([[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], c),
      F([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], c),
      F([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], c),
      F([[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], c)
    ];
  }
  function ring(cx, cz, r, n, y, rot) {
    var p = [];
    for (var i = 0; i < n; i++) { var a = rot + i * 2 * Math.PI / n; p.push([cx + Math.cos(a) * r, y, cz + Math.sin(a) * r]); }
    return p;
  }
  function prism(cx, cz, r, n, y0, y1, rot) {
    var b = ring(cx, cz, r, n, y0, rot), t = ring(cx, cz, r, n, y1, rot), c = [cx, (y0 + y1) / 2, cz], fs = [];
    for (var i = 0; i < n; i++) { var j = (i + 1) % n; fs.push(F([b[i], b[j], t[j], t[i]], c)); }
    fs.push(F(t, c));
    return fs;
  }
  function pyramid(cx, cz, r, n, y0, y1, rot) {
    var b = ring(cx, cz, r, n, y0, rot), apex = [cx, y1, cz], c = [cx, y0 + (y1 - y0) / 4, cz], fs = [];
    for (var i = 0; i < n; i++) fs.push(F([b[i], b[(i + 1) % n], apex], c));
    return fs;
  }

  /* ---------- Town hall model (metres) ---------- */
  var L = 7, W = 2.6, H = 4.2, R = L - W, GROUND = -4.5, CORN = .3;
  var BC = [0, -1, 0];
  function roofZ(y) { return W * (1 - y / H); } // front roof plane: depth at height y

  var walls = box(-(L - .25), L - .25, GROUND, -CORN, -(W - .25), W - .25).slice(0, 4);
  var cornice = box(-L, L, -CORN, 0, -W, W).slice(0, 4);
  var RC = [0, 1, 0];
  function roofFace(pts, eA, eB, tA, tB) { var f = F(pts, RC); f.eA = eA; f.eB = eB; f.tA = tA; f.tB = tB; return f; }
  var roofFaces = [
    roofFace([[-L, 0, W], [L, 0, W], [R, H, 0], [-R, H, 0]], [-L, 0, W], [L, 0, W], [-R, H, 0], [R, H, 0]),
    roofFace([[L, 0, -W], [-L, 0, -W], [-R, H, 0], [R, H, 0]], [L, 0, -W], [-L, 0, -W], [R, H, 0], [-R, H, 0]),
    roofFace([[-L, 0, -W], [-L, 0, W], [-R, H, 0]], [-L, 0, -W], [-L, 0, W], [-R, H, 0], [-R, H, 0]),
    roofFace([[L, 0, W], [L, 0, -W], [R, H, 0]], [L, 0, W], [L, 0, -W], [R, H, 0], [R, H, 0])
  ];
  // slate courses + channels, precomputed per plane
  roofFaces.forEach(function (f) {
    var N = 24, eaveLen = len(sub(f.eB, f.eA)), eDir = norm(sub(f.eB, f.eA));
    var inset = dot(sub(f.tA, f.eA), eDir);
    var up = sub(lerp(f.tA, f.tB, .5), lerp(f.eA, f.eB, .5));
    f.courses = [];
    for (var k = 1; k < N; k++) {
      var s = k / N;
      f.courses.push({ s: s, a: lerp(f.eA, f.tA, s), b: lerp(f.eB, f.tB, s), a2: lerp(f.eA, f.tA, s - .012), b2: lerp(f.eB, f.tB, s - .012) });
    }
    f.joints = [];
    var count = Math.round(eaveLen / .34);
    for (var j = 1; j < count; j++) {
      var t = j / count, sMax = Math.min(1, eaveLen * Math.min(t, 1 - t) / inset), p0 = lerp(f.eA, f.eB, t);
      f.joints.push([p0, add(p0, mul(up, sMax))]);
    }
  });

  // dormers on the front roof plane: rows from top (drawn first) to bottom
  var dormers = [];
  [[3.05, .22, .34, .3, [-2.5, 2.5]], [1.85, .28, .42, .36, [-3.5, -2.1, 2.1, 3.5]], [.55, .32, .48, .4, [-5.6, -4.2, -2.8, 2.8, 4.2, 5.6]]].forEach(function (row) {
    var y0 = row[0], dw = row[1], hw = row[2], hg = row[3];
    row[4].forEach(function (xc) {
      var zf = roofZ(y0) + .05, yt = y0 + hw, ya = yt + hg, c = [xc, y0 + hw / 2, zf - .3];
      dormers.push({
        xc: xc, y0: y0, dw: dw, hw: hw, zf: zf,
        front: F([[xc - dw, y0, zf], [xc + dw, y0, zf], [xc + dw, yt, zf], [xc, ya, zf], [xc - dw, yt, zf]], c),
        cheeks: [F([[xc - dw, y0, zf], [xc - dw, yt, zf], [xc - dw, yt, roofZ(yt)]], c), F([[xc + dw, y0, zf], [xc + dw, yt, zf], [xc + dw, yt, roofZ(yt)]], c)],
        roofs: [
          F([[xc - dw - .06, yt - .04, zf + .06], [xc, ya + .02, zf + .06], [xc, ya + .02, roofZ(ya)], [xc - dw - .06, yt - .04, roofZ(yt)]], c),
          F([[xc + dw + .06, yt - .04, zf + .06], [xc, ya + .02, zf + .06], [xc, ya + .02, roofZ(ya)], [xc + dw + .06, yt - .04, roofZ(yt)]], c)
        ]
      });
    });
  });

  // belfry tower, standing out of the middle of the front facade
  var TZ0 = W - .6, TZ1 = W + 1.0, TC = (TZ0 + TZ1) / 2, TOP = 5.2;
  var tower = {
    shaft: box(-1, 1, GROUND, TOP, TZ0, TZ1),
    balcony: box(-1.12, 1.12, TOP, TOP + .25, TZ0 - .12, TZ1 + .12),
    pinnacles: [[-1, TZ0], [1, TZ0], [-1, TZ1], [1, TZ1]].map(function (p) { return { c: [p[0], TOP + .8, p[1]], faces: pyramid(p[0], p[1], .15, 4, TOP + .25, TOP + 1.35, Math.PI / 4) }; }),
    oct1: prism(0, TC, .82, 8, TOP + .25, TOP + 2.2, Math.PI / 8),
    oct2: prism(0, TC, .58, 8, TOP + 2.2, TOP + 3.4, Math.PI / 8),
    spire: pyramid(0, TC, .62, 8, TOP + 3.4, TOP + 5.7, Math.PI / 8),
    tip: TOP + 6.3
  };
  // slender corner turrets
  var turrets = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(function (s) {
    var x = s[0] * (L - .12), z = s[1] * (W - .12);
    return { c: [x, 0, z], body: prism(x, z, .3, 8, -1.3, .9, Math.PI / 8), cap: pyramid(x, z, .34, 8, .9, 2.4, Math.PI / 8), tip: [x, 2.75, z] };
  });

  // scaffolding (stelling) along both gable ends
  function scaffold(side) {
    var xi = side * (L + .35), xo = side * (L + 1.45), zs = [-2.4, -.8, .8, 2.4], lifts = [GROUND, -3, -1.5, 0], lines = [], braces = [], decks = [];
    zs.forEach(function (z) { [xi, xo].forEach(function (x) { lines.push([[x, GROUND, z], [x, 1.3, z]]); }); });
    lifts.concat([.65, 1.3]).forEach(function (y, i) {
      lines.push([[xo, y, -2.4], [xo, y, 2.4]]);
      if (i < lifts.length) { lines.push([[xi, y, -2.4], [xi, y, 2.4]]); zs.forEach(function (z) { lines.push([[xi, y, z], [xo, y, z]]); }); }
    });
    for (var i = 0; i < lifts.length - 1; i++) {
      for (var j = 0; j < zs.length - 1; j++) {
        var up = (i + j) % 2 === 0;
        braces.push([[xo, lifts[i], zs[up ? j : j + 1]], [xo, lifts[i + 1], zs[up ? j + 1 : j]]]);
      }
    }
    lifts.slice(1).forEach(function (y) { decks.push({ y: y, face: F([[xi, y, -2.4], [xo, y, -2.4], [xo, y, 2.4], [xi, y, 2.4]], [side * L, y - 1, 0]), planks: [.2, .4, .6, .8].map(function (t) { var x = xi + (xo - xi) * t; return [[x, y, -2.4], [x, y, 2.4]]; }) }); });
    return { c: [side * (L + .9), -1.6, 0], lines: lines, braces: braces, decks: decks, top: [xo, 1.3, 2.4] };
  }
  var scaffolds = [scaffold(-1), scaffold(1)];

  /* ---------- Camera ---------- */
  var cvs = document.getElementById('scene');
  var ctx = cvs.getContext('2d');
  var cw = 0, ch = 0, mobile = false;
  var cam = { th: 0, ph: 0, D: 36, f: 1, cx: 0, cy: 0, py: 0 };
  function resize() {
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cw = cvs.clientWidth; ch = cvs.clientHeight;
    cvs.width = Math.round(cw * dpr); cvs.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    mobile = cw < 640;
  }
  function P(p) {
    var x = p[0], y = p[1] - cam.py, z = p[2];
    var c = Math.cos(cam.th), s = Math.sin(cam.th);
    var x1 = x * c - z * s, z1 = x * s + z * c;
    var cp = Math.cos(cam.ph), sp = Math.sin(cam.ph);
    var y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    var d = cam.D - z2;
    return [cam.cx + cam.f * x1 / d, cam.cy - cam.f * y2 / d, d, x1, y2, z2];
  }
  function rot(n) {
    var c = Math.cos(cam.th), s = Math.sin(cam.th);
    var x1 = n[0] * c - n[2] * s, z1 = n[0] * s + n[2] * c;
    var cp = Math.cos(cam.ph), sp = Math.sin(cam.ph);
    return [x1, n[1] * cp - z1 * sp, n[1] * sp + z1 * cp];
  }
  function facing(f) { var p = P(f.pts[0]); return dot(rot(f.n), [-p[3], -p[4], cam.D - p[5]]) > 0; }
  function depth(p) { return P(p)[2]; }

  /* ---------- Drawing helpers ---------- */
  var GOLD = '201,169,97', HI = '236,212,151', light = [0, 1, 0], now = 0;
  function seg(a, b, frac) {
    var pa = P(a), pb = P(b), k = frac === undefined ? 1 : frac;
    ctx.moveTo(pa[0], pa[1]);
    ctx.lineTo(pa[0] + (pb[0] - pa[0]) * k, pa[1] + (pb[1] - pa[1]) * k);
  }
  function stroke(color, width, glow) {
    ctx.strokeStyle = color; ctx.lineWidth = width;
    if (glow) { ctx.shadowColor = 'rgba(' + HI + ',.8)'; ctx.shadowBlur = glow; }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  function poly(pts) {
    ctx.beginPath();
    pts.forEach(function (p, i) { var q = P(p); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
    ctx.closePath();
  }
  // filled, lit face with a gold outline (only when it faces the camera)
  function solidFace(f, a, lineA, lw) {
    if (a <= 0 || !facing(f)) return false;
    var sh = Math.max(0, dot(f.n, light));
    poly(f.pts);
    ctx.fillStyle = 'rgba(14,12,9,' + a + ')'; ctx.fill();
    ctx.fillStyle = 'rgba(' + HI + ',' + ((.025 + .14 * sh) * a) + ')'; ctx.fill();
    stroke('rgba(' + GOLD + ',' + ((lineA === undefined ? .9 : lineA) * a) + ')', lw || 1.1);
    return true;
  }
  function solid(faces, a, lineA, lw) { faces.forEach(function (f) { solidFace(f, a, lineA, lw); }); }
  // pointed gothic window on a wall plane; pt(u, y) maps wall coords to 3D
  function arch(pt, u, hw, y0, y1, ya, glowA) {
    poly([pt(u - hw, y0), pt(u - hw, y1), pt(u - hw * .55, y1 + (ya - y1) * .72), pt(u, ya), pt(u + hw * .55, y1 + (ya - y1) * .72), pt(u + hw, y1), pt(u + hw, y0)]);
    ctx.fillStyle = 'rgba(' + HI + ',' + glowA + ')'; ctx.fill();
    stroke('rgba(' + GOLD + ',.7)', .8);
  }
  function label(p, text, dx, dy, alpha) {
    var q = P(p);
    ctx.font = '500 10px "IBM Plex Mono", monospace';
    var tw = ctx.measureText(text).width + 16;
    var bx = q[0] + dx + (dx < 0 ? -12 - tw : 12);
    if (bx + tw > cw - 24 || bx < 24) { dx = -dx; bx = q[0] + dx + (dx < 0 ? -12 - tw : 12); }
    var x = q[0] + dx, y = q[1] + dy;
    ctx.globalAlpha = alpha;
    ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(x, y); ctx.lineTo(x + (dx < 0 ? -12 : 12), y);
    stroke('rgba(' + GOLD + ',.9)', 1);
    ctx.beginPath(); ctx.arc(q[0], q[1], 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(' + HI + ')'; ctx.shadowColor = 'rgba(' + HI + ',.9)'; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgb(' + GOLD + ')'; ctx.shadowColor = 'rgba(' + HI + ',.5)'; ctx.shadowBlur = 16;
    ctx.fillRect(bx, y - 11, tw, 22);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#0a0907'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    ctx.fillText(text, bx + 8, y + 1);
    ctx.globalAlpha = 1;
  }
  function dimension(a, b, off, text, alpha, textDx) {
    var on = norm(off), a2 = add(a, off), b2 = add(b, off), ext = mul(on, .25);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    seg(add(a, mul(on, .15)), add(a2, ext)); seg(add(b, mul(on, .15)), add(b2, ext));
    stroke('rgba(' + GOLD + ',.35)', .8);
    ctx.beginPath(); seg(a2, b2);
    var dir = mul(norm(sub(b, a)), .25), o = mul(on, .25);
    seg(sub(a2, add(dir, o)), add(a2, add(dir, o))); seg(sub(b2, add(dir, o)), add(b2, add(dir, o)));
    stroke('rgba(' + GOLD + ',.8)', 1);
    var m = P(lerp(a2, b2, .5));
    ctx.font = '400 11px "IBM Plex Mono", monospace'; ctx.fillStyle = 'rgb(' + GOLD + ')';
    if (textDx) { ctx.textAlign = textDx < 0 ? 'right' : 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, m[0] + textDx, m[1]); }
    else { ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText(text, m[0], m[1] - 5); }
    ctx.globalAlpha = 1;
  }

  /* ---------- Scene parts ---------- */
  function drawBuilding(b) {
    var wf = 1 - clamp((planT - .05) / .45); // walls dissolve as the view turns into a roof plan
    var wa = clamp((b - .1) / .3) * wf, winA = clamp((b - .3) / .25) * wf;
    // walls with gothic windows and a ground-floor arcade
    walls.forEach(function (f, wi) {
      if (!solidFace(f, wa, .85, 1.1)) return;
      if (winA <= 0) return;
      ctx.globalAlpha = winA;
      var front = wi < 2, fixed = wi === 0 ? W - .25 : wi === 1 ? -(W - .25) : wi === 2 ? -(L - .25) : L - .25;
      var pt = front ? function (u, y) { return [u, y, fixed]; } : function (u, y) { return [fixed, y, u]; };
      var us = front ? [-5.6, -4.2, -2.8, -1.4, 1.4, 2.8, 4.2, 5.6] : [-1.2, 0, 1.2];
      us.forEach(function (u, i) {
        if (front && Math.abs(u) < 1.5) return;
        var g = .06 + .07 * (.5 + .5 * Math.sin(now * .0016 + i * 1.9 + wi));
        arch(pt, u, .3, -2.45, -1.2, -.65, g);
        ctx.beginPath(); var a1 = pt(u, -2.45), a2 = pt(u, -.8); seg(a1, a2); stroke('rgba(' + GOLD + ',.35)', .6);
        arch(pt, u, .5, GROUND, -3.55, -3.05, .03);
      });
      // string course between the floors
      var s0 = front ? pt(-(L - .25), -2.9) : pt(-(W - .25), -2.9), s1 = front ? pt(L - .25, -2.9) : pt(W - .25, -2.9);
      ctx.beginPath(); seg(s0, s1); stroke('rgba(' + GOLD + ',.6)', 1);
      ctx.globalAlpha = 1;
    });
    solid(cornice, clamp((b - .2) / .25), .9, 1.1);

    // roof planes
    var fa = clamp((b - .3) / .25), ob = clamp((b - .25) / .3), cr = clamp((b - .38) / .4), ja = clamp((b - .5) / .3);
    roofFaces.forEach(function (f) {
      if (!facing(f)) return;
      var sh = Math.max(0, dot(f.n, light));
      if (fa > 0) {
        poly(f.pts); ctx.fillStyle = 'rgba(14,12,9,' + fa + ')'; ctx.fill();
        var e0 = P(lerp(f.eA, f.eB, .5)), t0 = P(lerp(f.tA, f.tB, .5));
        var lg = ctx.createLinearGradient(e0[0], e0[1], t0[0], t0[1]);
        lg.addColorStop(0, 'rgba(' + GOLD + ',' + ((.03 + .07 * sh) * fa) + ')');
        lg.addColorStop(1, 'rgba(' + HI + ',' + ((.08 + .26 * sh) * fa) + ')');
        poly(f.pts); ctx.fillStyle = lg; ctx.fill();
      }
      if (ja > 0) { ctx.beginPath(); f.joints.forEach(function (j) { seg(j[0], j[1]); }); stroke('rgba(' + GOLD + ',' + ((.14 + .2 * sh) * ja) + ')', .55); }
      ctx.beginPath(); f.courses.forEach(function (c) { if (c.s <= cr) seg(c.a, c.b); }); stroke('rgba(' + GOLD + ',' + (.42 + .38 * sh) + ')', .85);
      ctx.beginPath(); f.courses.forEach(function (c) { if (c.s <= cr) seg(c.a2, c.b2); }); stroke('rgba(' + GOLD + ',.16)', .55);
      ctx.beginPath(); for (var i = 0; i < f.pts.length; i++) seg(f.pts[i], f.pts[(i + 1) % f.pts.length], ob); stroke('rgba(' + GOLD + ',.95)', 1.4);
      // sparks fly where the current slate course is being laid
      if (f === roofFaces[0] && cr > 0 && cr < 1 && !reduce) {
        var c0 = lerp(lerp(f.eA, f.tA, cr), lerp(f.eB, f.tB, cr), Math.random());
        var q = P(c0);
        for (var s = 0; s < 2; s++) sparks.push({ x: q[0], y: q[1], vx: (Math.random() - .5) * 2.4, vy: -Math.random() * 2.2 - .6, life: 1, d: .02 + Math.random() * .03 });
      }
    });

    // dormers pop in row by row
    if (facing(roofFaces[0])) dormers.forEach(function (d, i) {
      var a = clamp((b - .62 - (dormers.length - i) * .012) / .12);
      if (a <= 0) return;
      ctx.globalAlpha = a;
      d.cheeks.forEach(function (f) { solidFace(f, 1, .7, .8); });
      d.roofs.forEach(function (f) { solidFace(f, 1, .9, 1); });
      solidFace(d.front, 1, .95, 1);
      var g = .14 + .12 * (.5 + .5 * Math.sin(now * .002 + i * 2.3));
      var w0 = d.y0 + .07, w1 = d.y0 + d.hw * .92, x0 = d.xc - d.dw * .55, x1 = d.xc + d.dw * .55, z = d.zf + .01;
      poly([[x0, w0, z], [x1, w0, z], [x1, w1, z], [x0, w1, z]]);
      ctx.fillStyle = 'rgba(' + HI + ',' + g + ')'; ctx.fill();
      stroke('rgba(' + GOLD + ',.8)', .7);
      ctx.globalAlpha = 1;
    });

    // ridge + hips glow, with gothic cresting along the ridge
    var hips = [[[-R, H, 0], [R, H, 0]], [[-R, H, 0], [-L, 0, W]], [[R, H, 0], [L, 0, W]], [[-R, H, 0], [-L, 0, -W]], [[R, H, 0], [L, 0, -W]]];
    var adj = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]];
    var hb = clamp((b - .3) / .35);
    hips.forEach(function (h, idx) {
      if (!facing(roofFaces[adj[idx][0]]) && !facing(roofFaces[adj[idx][1]])) return;
      ctx.beginPath(); seg(h[0], h[1], hb); stroke('rgba(' + HI + ',1)', 1.9, 14);
    });
    if (cr >= 1) {
      ctx.beginPath();
      for (var x = -R; x <= R + .01; x += .55) seg([x, H, 0], [x, H + .32, 0]);
      stroke('rgba(' + HI + ',.85)', 1);
    }
  }

  function drawTower(b) {
    var tb = clamp((b - .45) / .42);
    function part(t0) { return clamp((tb - t0) / .14); }
    var a = part(0);
    if (a <= 0) return;
    solid(tower.shaft, a, .95, 1.2);
    // windows on the visible shaft faces
    [0, 2, 3].forEach(function (fi) {
      var f = tower.shaft[fi];
      if (!facing(f)) return;
      ctx.globalAlpha = a;
      var pt = fi === 0 ? function (u, y) { return [u, y, TZ1]; } : function (u, y) { return [fi === 2 ? -1 : 1, y, TC + u]; };
      arch(pt, 0, .42, GROUND, -3.4, -2.8, .05);
      arch(pt, 0, .32, -2.3, -1.0, -.5, .12);
      arch(pt, 0, .3, .5, 1.7, 2.15, .1);
      arch(pt, 0, .36, 2.9, 4.2, 4.7, .16 + .1 * Math.sin(now * .0021));
      [-.25, .5, 2.6].forEach(function (y) { ctx.beginPath(); seg(pt(-1.1, y), pt(1.1, y)); stroke('rgba(' + GOLD + ',.45)', .7); });
      ctx.globalAlpha = 1;
    });
    solid(tower.balcony, part(.28), .9, 1);
    var oc = depth([0, TOP + 1, TC]);
    var pa = part(.4);
    tower.pinnacles.forEach(function (p) { if (depth(p.c) > oc) solid(p.faces, pa, .9, .9); });
    var o1 = part(.5);
    solid(tower.oct1, o1, .95, 1.1);
    tower.oct1.slice(0, 8).forEach(function (f) {
      if (o1 <= 0 || !facing(f)) return;
      var m = lerp(f.pts[0], f.pts[1], .5);
      ctx.globalAlpha = o1;
      ctx.beginPath(); seg([m[0], TOP + .6, m[2]], [m[0], TOP + 1.85, m[2]]); stroke('rgba(' + HI + ',.55)', 1.4);
      ctx.globalAlpha = 1;
    });
    tower.pinnacles.forEach(function (p) { if (depth(p.c) <= oc) solid(p.faces, pa, .9, .9); });
    solid(tower.oct2, part(.64), .95, 1);
    var sa = part(.76);
    solid(tower.spire, sa, 1, 1.2);
    // glowing spire edges
    if (sa > 0) {
      ctx.globalAlpha = sa;
      ctx.beginPath();
      tower.spire.forEach(function (f) { if (facing(f)) seg(f.pts[0], f.pts[2]); });
      stroke('rgba(' + HI + ',.9)', 1.3, 12);
      ctx.globalAlpha = 1;
    }
    // finial with a flash when the tower completes
    var fa = part(.88);
    if (fa > 0) {
      var t0 = P([0, TOP + 5.7, TC]), t1 = P([0, tower.tip, TC]);
      ctx.globalAlpha = fa;
      ctx.beginPath(); ctx.moveTo(t0[0], t0[1]); ctx.lineTo(t1[0], t1[1]);
      ctx.moveTo(t1[0] - 5, t1[1] + 6); ctx.lineTo(t1[0] + 5, t1[1] + 6);
      stroke('rgba(' + HI + ',1)', 1.4, 10);
      var flash = Math.exp(-Math.pow((tb - .97) / .05, 2));
      var r = 10 + 60 * flash;
      var rg = ctx.createRadialGradient(t1[0], t1[1], 0, t1[0], t1[1], r);
      rg.addColorStop(0, 'rgba(255,240,200,' + (.5 + .5 * flash) + ')');
      rg.addColorStop(1, 'rgba(' + HI + ',0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(t1[0], t1[1], r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawTurret(t, b) {
    var a = clamp((b - .55) / .2);
    if (a <= 0) return;
    solid(t.body, a, .9, .9);
    solid(t.cap, a, 1, 1);
    var q = P(t.tip), q0 = P([t.tip[0], 2.4, t.tip[2]]);
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.moveTo(q0[0], q0[1]); ctx.lineTo(q[0], q[1]); stroke('rgba(' + HI + ',.9)', 1.1, 8);
    ctx.globalAlpha = 1;
  }

  function drawScaffold(sc, b, e) {
    var top = 1.3, yl = GROUND + (top - GROUND) * clamp((b - .03) / .42);
    var a = 1 - clamp(e * 1.8);
    if (b <= .03 || a <= 0) return;
    ctx.globalAlpha = a;
    function draw(list) {
      list.forEach(function (l) {
        var p = l[0], q = l[1];
        if (p[1] > q[1]) { var t = p; p = q; q = t; }
        if (p[1] > yl) return;
        seg(p, q, q[1] > yl && q[1] !== p[1] ? (yl - p[1]) / (q[1] - p[1]) : 1);
      });
    }
    sc.decks.forEach(function (d) {
      if (d.y > yl) return;
      poly(d.face.pts); ctx.fillStyle = 'rgba(' + HI + ',.08)'; ctx.fill();
      ctx.beginPath(); d.planks.forEach(function (p) { seg(p[0], p[1]); }); stroke('rgba(' + GOLD + ',.4)', .6);
    });
    ctx.beginPath(); draw(sc.braces); stroke('rgba(' + GOLD + ',.38)', .7);
    ctx.beginPath(); draw(sc.lines); stroke('rgba(' + GOLD + ',.85)', 1);
    // the leading edge of the rising scaffold glows
    if (b < .45) {
      ctx.beginPath();
      sc.lines.forEach(function (l) { if (l[0][0] === l[1][0] && l[0][2] === l[1][2] && l[0][1] !== l[1][1]) { var q = P([l[0][0], yl, l[0][2]]); ctx.moveTo(q[0] + 2.2, q[1]); ctx.arc(q[0], q[1], 2.2, 0, Math.PI * 2); } });
      ctx.fillStyle = 'rgba(' + HI + ',.95)'; ctx.shadowColor = 'rgba(' + HI + ',.9)'; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
  }

  function drawPlanNotes(a) {
    var tx = dict[lang];
    dimension([-L, 0, W], [L, 0, W], [0, 0, 1.9], '14 000', a);
    dimension([L, 0, -W], [L, 0, W], [1.3, 0, 0], '5 200', a);
    dimension([-R, 0, -W], [R, 0, -W], [0, 0, -1.2], '8 800', a);
    // fall arrows (downhill) on each roof plane
    ctx.globalAlpha = a;
    ctx.font = '400 10px "IBM Plex Mono", monospace'; ctx.fillStyle = 'rgb(' + HI + ')';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    roofFaces.forEach(function (f, i) {
      var tri = i > 1, u = tri ? .5 : .28;
      var top = lerp(lerp(f.eA, f.tA, .62), lerp(f.eB, f.tB, .62), u), eave = lerp(lerp(f.eA, f.tA, .12), lerp(f.eB, f.tB, .12), u);
      var p = P(top), q = P(eave), ang = Math.atan2(q[1] - p[1], q[0] - p[0]);
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]);
      ctx.moveTo(q[0], q[1]); ctx.lineTo(q[0] - 8 * Math.cos(ang - .45), q[1] - 8 * Math.sin(ang - .45));
      ctx.moveTo(q[0], q[1]); ctx.lineTo(q[0] - 8 * Math.cos(ang + .45), q[1] - 8 * Math.sin(ang + .45));
      stroke('rgba(' + HI + ',.9)', 1.1, 6);
      ctx.fillText('58°', p[0] + 14 * Math.sin(ang), p[1] - 14 * Math.cos(ang));
    });
    ctx.globalAlpha = 1;
    label([-R + .6, H, 0], tx.ridge, -40, -44, a);
    label(lerp([R, H, 0], [L, 0, -W], .5), tx.hip, 46, -40, a);
    label([0, tower.tip, TC], tx.tower, 90, 14, a);
    var d0 = dormers[dormers.length - 6];
    label([d0.xc, d0.y0 + d0.hw, d0.zf], tx.dormer, -30, 52, a);
    // north arrow
    var n = P(mobile ? [-L - .4, 0, -W - 1.6] : [L + 2.6, 0, -W - .6]);
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(n[0], n[1], 16, 0, Math.PI * 2); stroke('rgba(' + GOLD + ',.8)', 1);
    ctx.beginPath(); ctx.moveTo(n[0], n[1] + 12); ctx.lineTo(n[0], n[1] - 12); ctx.lineTo(n[0] - 5, n[1] - 4); ctx.moveTo(n[0], n[1] - 12); ctx.lineTo(n[0] + 5, n[1] - 4);
    stroke('rgba(' + HI + ',1)', 1.3, 8);
    ctx.font = '500 11px "IBM Plex Mono", monospace'; ctx.fillStyle = 'rgb(' + HI + ')'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('N', n[0], n[1] - 20);
    ctx.globalAlpha = 1;
  }

  /* ---------- Particles ---------- */
  var sparks = [], dust = [];
  for (var i = 0; i < 46; i++) dust.push({ x: Math.random(), y: Math.random(), r: .5 + Math.random() * 1.4, v: .00003 + Math.random() * .00006, ph: Math.random() * 6.28 });
  function drawParticles(dt) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    dust.forEach(function (d) {
      d.y -= d.v * dt; if (d.y < -.02) { d.y = 1.02; d.x = Math.random(); }
      var a = .12 + .18 * (.5 + .5 * Math.sin(now * .002 + d.ph));
      ctx.fillStyle = 'rgba(' + HI + ',' + a + ')';
      ctx.beginPath(); ctx.arc(d.x * cw + Math.sin(now * .0005 + d.ph) * 14, d.y * ch, d.r, 0, Math.PI * 2); ctx.fill();
    });
    for (var i = sparks.length - 1; i >= 0; i--) {
      var s = sparks[i];
      s.x += s.vx; s.y += s.vy; s.vy += .08; s.life -= s.d;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.strokeStyle = 'rgba(255,236,190,' + s.life + ')'; ctx.lineWidth = 1.4 * s.life + .3;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 2.5, s.y - s.vy * 2.5); ctx.stroke();
    }
    ctx.restore();
  }

  /* ---------- Frame ---------- */
  var scanY = 1, planT = 0;
  function mix(a, b, t) { return a + (b - a) * t; }
  function draw(e, b, dt) {
    var span = 2 * (L + 1.6);
    var S = Math.min(cw, ch * 1.1);
    // first part of the scroll: approach in 3D; second part: swing up into a flat top view (roof plan)
    var ex = clamp(e / .35), pl = clamp((e - .3) / .7);
    pl = pl * pl * (3 - 2 * pl);
    planT = pl;
    var s0 = S * (mobile ? 1.0 : .78) / span, s1 = s0 * 1.18;
    var s2 = mobile ? Math.min(cw * .8 / 10.5, ch * .62 / 17) : Math.min(cw * .8 / 19, ch * .62 / 11.5);
    var px = pl > 0 ? mix(s1, s2, pl) : mix(s0, s1, ex);
    cam.D = mix(36, 320, pl);               // camera pulls far away -> perspective flattens into a plan
    cam.f = px * cam.D;
    cam.th = mix(-.42 + ex * .32, mobile ? Math.PI / 2 : 0, pl) + (reduce ? 0 : Math.sin(now * .00032) * .035 * (1 - pl));
    cam.ph = mix(.2 + ex * .16, Math.PI / 2 - .001, pl);
    cam.py = mix(2 + ex * .8, 0, pl);
    cam.cx = cw / 2;
    cam.cy = mix(ch * .68 - ex * ch * .02, ch * (mobile ? .56 : .55), pl);

    ctx.clearRect(0, 0, cw, ch);
    var la = now * .00022 + e * 1.6;
    light = norm([Math.cos(la) * .6, .85, Math.sin(la) * .6]);

    // ground: glow pool + grid
    var g = P([0, GROUND, 0]);
    ctx.save();
    ctx.translate(g[0], g[1]); ctx.scale(1, .32);
    var gr = cam.f * 12 / g[2];
    var rg = ctx.createRadialGradient(0, 0, 0, 0, 0, gr);
    rg.addColorStop(0, 'rgba(' + HI + ',' + (.18 * clamp(b * 2)) + ')');
    rg.addColorStop(1, 'rgba(' + HI + ',0)');
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(0, 0, gr, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    var ga = clamp(b * 3);
    for (var i = -12; i <= 12; i++) {
      ctx.beginPath(); seg([i, GROUND, -8], [i, GROUND, 8]); stroke('rgba(' + GOLD + ',' + (.11 * (1 - Math.abs(i) / 13) * ga) + ')', .6);
    }
    for (var k = -8; k <= 8; k++) {
      ctx.beginPath(); seg([-12, GROUND, k], [12, GROUND, k]); stroke('rgba(' + GOLD + ',' + (.11 * (1 - Math.abs(k) / 9) * ga) + ')', .6);
    }

    // painter's order: farthest object first
    var objs = [{ c: BC, fn: function () { drawBuilding(b); } }, { c: [0, 2, TC], fn: function () { drawTower(b); } }];
    turrets.forEach(function (t) { objs.push({ c: t.c, fn: function () { drawTurret(t, b); } }); });
    scaffolds.forEach(function (s) { objs.push({ c: s.c, fn: function () { drawScaffold(s, b, e); } }); });
    objs.forEach(function (o) { o.d = depth(o.c); });
    objs.sort(function (x, y) { return y.d - x.d; });
    objs.forEach(function (o) { o.fn(); });

    // annotations
    var an = clamp((b - .86) / .14) * (1 - clamp(e * 1.6));
    if (an > 0) {
      var tx = dict[lang];
      dimension([-L, GROUND, W], [L, GROUND, W], [0, 0, 2.2], '14 000', an);
      dimension([L, GROUND, W], [L, GROUND, -W], [2.6, 0, 0], '5 200', an);
      if (!mobile) dimension([-1, GROUND, TZ1], [-1, tower.tip, TZ1], [-1.2, 0, 0], '16 000', an, -10);
      label([-3.4, H, 0], tx.ridge, -60, -46, an);
      var d0 = dormers[dormers.length - 1];
      label([d0.xc, d0.y0 + d0.hw + .2, d0.zf], tx.dormer, 50, 52, an);
      label(scaffolds[0].top, tx.scaffold, -40, -46, an);
      if (cw > 1000) {
        var c1 = P([L + 1.45, GROUND, -W]);
        ctx.globalAlpha = an * .7;
        ctx.font = '400 10px "IBM Plex Mono", monospace'; ctx.fillStyle = 'rgb(' + GOLD + ')';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText('X:14000  Z:5200', c1[0] + 14, c1[1] - 8);
        ctx.fillText('Y:16000  ' + tx.scale, c1[0] + 14, c1[1] + 6);
        ctx.globalAlpha = 1;
      }
    }

    // roof plan notes: dimensions, fall arrows, labels, north arrow
    var pn = clamp((planT - .75) / .25);
    if (pn > 0) drawPlanNotes(pn);

    // build scan line sweeping up the drawing
    var sb = clamp((b - .02) / .9);
    scanY = 1 - sb;
    if (b > .02 && b < 1) {
      var y = ch * (.94 - sb * .84), a = Math.min(1, sb * 8, (1 - sb) * 8);
      var band = ctx.createLinearGradient(0, y, 0, y + 70);
      band.addColorStop(0, 'rgba(' + HI + ',' + (.1 * a) + ')'); band.addColorStop(1, 'rgba(' + HI + ',0)');
      ctx.fillStyle = band; ctx.fillRect(0, y, cw, 70);
      var hl = ctx.createLinearGradient(0, 0, cw, 0);
      hl.addColorStop(0, 'rgba(' + HI + ',0)'); hl.addColorStop(.5, 'rgba(255,240,200,' + a + ')'); hl.addColorStop(1, 'rgba(' + HI + ',0)');
      ctx.fillStyle = hl; ctx.shadowColor = 'rgba(' + HI + ',.9)'; ctx.shadowBlur = 14;
      ctx.fillRect(0, y - .75, cw, 1.5); ctx.shadowBlur = 0;
    }

    drawParticles(dt);
  }

  /* ---------- Scroll-driven motion (lerped) ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.getElementById('top');
  var title = document.getElementById('title');
  var titleLayer = title.parentNode;
  var foot = document.getElementById('heroFoot');
  var hint = document.getElementById('scrollHint');
  var rulers = document.querySelectorAll('.ruler');
  var target = 0, current = 0, t0 = 0, last = 0;

  function progress() {
    var rect = hero.getBoundingClientRect();
    var span = rect.height - window.innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
  }
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function frame(t) {
    now = t;
    if (!t0) { t0 = t; last = t; }
    var dt = Math.min(64, t - last); last = t;
    target = progress();
    current = reduce ? target : current + (target - current) * .09;
    if (Math.abs(target - current) < .0005) current = target;
    var e = ease(current);
    var b = reduce ? 1 : clamp((t - t0 - 300) / 4200);
    if (hero.getBoundingClientRect().bottom > 0) {
      title.style.transform = 'translate3d(0,' + (-e * 8) + 'vh,' + (-e * 900) + 'px)';
      title.style.opacity = String(1 - e);
      // the name reads in front of the tower, then slips behind the building as it recedes
      titleLayer.style.zIndex = e > .22 ? '1' : '3';
      var f = Math.min(1, current / .35);
      foot.style.opacity = String(1 - f);
      foot.style.transform = 'translate3d(0,' + (f * 24) + 'px,0)';
      foot.style.pointerEvents = f > .9 ? 'none' : '';
      hint.style.opacity = String(1 - Math.min(1, current / .1));
      if (!orderOpen) draw(e, b, dt);
      // ruler markers: follow the scan during the build, then the scroll
      var m = b < 1 ? scanY : current;
      rulers.forEach(function (r) { r.style.setProperty('--m', (m * 100).toFixed(2) + '%'); });
      var txt = b < 1 ? dict[lang].building + ' ' + String(Math.round(b * 100)).padStart(3, '0') + '%' : planT > .7 ? dict[lang].sheet2 : dict[lang].sheet;
      if (txt !== sheetShown) { sheetEl.textContent = txt; sheetShown = txt; }
    }
    requestAnimationFrame(frame);
  }
  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
})();
