const countrySelect = document.getElementById('countrySelect');
const mobileNoInput = document.getElementById('mobileNo');
const sendBtn = document.getElementById('sendBtn');
const send = document.getElementById('send')
const sent = document.getElementById('sent')
const copyBtn = document.getElementById('copyBtn')
const card = document.getElementById('card')
const copyLink = document.getElementById('copyLink')

const copyURL = "https://icodethis.com/submissions/17314"
copyLink.innerHTML = copyURL


var flag = document.getElementById('flag')
var pais = document.getElementById('pais')
countrySelect.selectedIndex = 2;  // Selects the second option (index 1)



// Map of country codes and STD dialing codes
const dialingCodes = {
    AD: "+376",
    AE: "+971",
    AF: "+93",
    AG: "+1-268",
    AI: "+1-264",
    AL: "+355",
    AM: "+374",
    AO: "+244",
    AQ: "+672",
    AR: "+54",
    AS: "+1-684",
    AT: "+43",
    AU: "+61",
    AW: "+297",
    AX: "+358-18",
    AZ: "+994",
    BA: "+387",
    BB: "+1-246",
    BD: "+880",
    BE: "+32",
    BF: "+226",
    BG: "+359",
    BH: "+973",
    BI: "+257",
    BJ: "+229",
    BL: "+590",
    BM: "+1-441",
    BN: "+673",
    BO: "+591",
    BQ: "+599",
    BR: "+55",
    BS: "+1-242",
    BT: "+975",
    BV: "+47",
    BW: "+267",
    BY: "+375",
    BZ: "+501",
    CA: "+1",
    CC: "+61",
    CD: "+243",
    CF: "+236",
    CG: "+242",
    CH: "+41",
    CI: "+225",
    CK: "+682",
    CL: "+56",
    CM: "+237",
    CN: "+86",
    CO: "+57",
    CR: "+506",
    CU: "+53",
    CV: "+238",
    CW: "+599",
    CX: "+61",
    CY: "+357",
    CZ: "+420",
    DE: "+49",
    DJ: "+253",
    DK: "+45",
    DM: "+1-767",
    DO: "+1-809, +1-829, +1-849",
    DZ: "+213",
    EC: "+593",
    EE: "+372",
    EG: "+20",
    EH: "+212",
    ER: "+291",
    ES: "+34",
    ET: "+251",
    FI: "+358",
    FJ: "+679",
    FK: "+500",
    FM: "+691",
    FO: "+298",
    FR: "+33",
    GA: "+241",
    GB: "+44",
    GD: "+1-473",
    GE: "+995",
    GF: "+594",
    GG: "+44-1481",
    GH: "+233",
    GI: "+350",
    GL: "+299",
    GM: "+220",
    GN: "+224",
    GP: "+590",
    GQ: "+240",
    GR: "+30",
    GS: "+500",
    GT: "+502",
    GU: "+1-671",
    GW: "+245",
    GY: "+592",
    HK: "+852",
    HM: "+672",
    HN: "+504",
    HR: "+385",
    HT: "+509",
    HU: "+36",
    ID: "+62",
    IE: "+353",
    IL: "+972",
    IM: "+44-1624",
    IN: "+91",
    IO: "+246",
    IQ: "+964",
    IR: "+98",
    IS: "+354",
    IT: "+39",
    JE: "+44-1534",
    JM: "+1-876",
    JO: "+962",
    JP: "+81",
    KE: "+254",
    KG: "+996",
    KH: "+855",
    KI: "+686",
    KM: "+269",
    KN: "+1-869",
    KP: "+850",
    KR: "+82",
    KW: "+965",
    KY: "+1-345",
    KZ: "+7",
    LA: "+856",
    LB: "+961",
    LC: "+1-758",
    LI: "+423",
    LK: "+94",
    LR: "+231",
    LS: "+266",
    LT: "+370",
    LU: "+352",
    LV: "+371",
    LY: "+218",
    MA: "+212",
    MC: "+377",
    MD: "+373",
    ME: "+382",
    MF: "+590",
    MG: "+261",
    MH: "+692",
    MK: "+389",
    ML: "+223",
    MM: "+95",
    MN: "+976",
    MO: "+853",
    MP: "+1-670",
    MQ: "+596",
    MR: "+222",
    MS: "+1-664",
    MT: "+356",
    MU: "+230",
    MV: "+960",
    MW: "+265",
    MX: "+52",
    MY: "+60",
    MZ: "+258",
    NA: "+264",
    NC: "+687",
    NE: "+227",
    NF: "+672",
    NG: "+234",
    NI: "+505",
    NL: "+31",
    NO: "+47",
    NP: "+977",
    NR: "+674",
    NU: "+683",
    NZ: "+64",
    OM: "+968",
    PA: "+507",
    PE: "+51",
    PF: "+689",
    PG: "+675",
    PH: "+63",
    PK: "+92",
    PL: "+48",
    PM: "+508",
    PN: "+64",
    PR: "+1-787, +1-939",
    PS: "+970",
    PT: "+351",
    PW: "+680",
    PY: "+595",
    QA: "+974",
    RE: "+262",
    RO: "+40",
    RS: "+381",
    RU: "+7",
    RW: "+250",
    SA: "+966",
    SB: "+677",
    SC: "+248",
    SD: "+249",
    SE: "+46",
    SG: "+65",
    SH: "+290",
    SI: "+386",
    SJ: "+47",
    SK: "+421",
    SL: "+232",
    SM: "+378",
    SN: "+221",
    SO: "+252",
    SR: "+597",
    SS: "+211",
    ST: "+239",
    SV: "+503",
    SX: "+1-721",
    SY: "+963",
    SZ: "+268",
    TC: "+1-649",
    TD: "+235",
    TF: "+262",
    TG: "+228",
    TH: "+66",
    TJ: "+992",
    TK: "+690",
    TL: "+670",
    TM: "+993",
    TN: "+216",
    TO: "+676",
    TR: "+90",
    TT: "+1-868",
    TV: "+688",
    TW: "+886",
    TZ: "+255",
    UA: "+380",
    UG: "+256",
    UM: "+1",
    US: "+1",
    UY: "+598",
    UZ: "+998",
    VA: "+379",
    VC: "+1-784",
    VE: "+58",
    VG: "+1-284",
    VI: "+1-340",
    VN: "+84",
    VU: "+678",
    WF: "+681",
    WS: "+685",
    YE: "+967",
    YT: "+262",
    ZA: "+27",
    ZM: "+260",
    ZW: "+263",
};


// Recorre las propiedades del objeto dialingCodes
for (const code in dialingCodes) {
    // Crea un elemento option
    const option = document.createElement("option");

    // Establece el valor y el texto de la opción
    option.value = code;
    option.text = code;

    // Agrega la opción al select
    countrySelect.appendChild(option);
} 


console.log("Cargados")


closeBtn.addEventListener("click", () => {
    card.classList.add("hidden")
})

countrySelect.addEventListener('change', function () {
    const countryCode = this.value;
    const dialingCode = dialingCodes[countryCode];

    console.log("countryCode");
    console.log(countryCode);
    console.log("dialingCodes");
    console.log(dialingCodes);

    flag.classList.add('hidden')


    if (countryCode.length > 1)
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            .then(response => response.json())
            .then(data => {
                console.log(data[0]);
                // pais.textContent  = data[0].name.common;

                pais.innerText = data[0].name.common;
                flag.src = `${data[0].flags.svg}`;
                flag.classList.remove('hidden')



            });

    // Set the dialing code in the input field
    mobileNoInput.value = dialingCode;
});

sendBtn.addEventListener("click", () => {
    if (mobileNo.value.length < 1) {
        alert("Please enter a mobile number")
    } else {
        setTimeout(() => {
            send.classList.add('hidden');
            sent.classList.remove('hidden')
        }, 500)
    }

    setTimeout(() => {
        send.classList.remove('hidden')
        sent.classList.add('hidden')
    }, 5000)
})

copyBtn.addEventListener("click", () => {
    copyBtn.textContent = 'Copied!';
    navigator.clipboard.writeText(copyURL)

    setTimeout(() => {
        copyBtn.textContent = 'Copy';
    }, 2000);
});




// Trigger the onchange event
countrySelect.dispatchEvent(new Event("change"));