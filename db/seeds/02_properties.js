exports.seed = function (knex) {
  return knex("properties")
    .del()
    .then(function () {
      return knex("properties").insert([
        {
          ns: "store:all",
          key: "exchange_rates    ",
          value: {
            AED: 3.6732,
            AFN: 77.191218,
            ALL: 102.13811,
            AMD: 481.616228,
            ANG: 1.799984,
            AOA: 653.565,
            ARS: 81.710511,
            AUD: 1.345616,
            AWG: 1.8,
            AZN: 1.7025,
            BAM: 1.611779,
            BBD: 2,
            BDT: 85.02619,
            BGN: 1.61359,
            BHD: 0.377392,
            BIF: 1943.549715,
            BMD: 1,
            BND: 1.336421,
            BOB: 6.914167,
            BRL: 5.1559,
            BSD: 1,
            BTC: 0.000051991447,
            BTN: 73.939366,
            BWP: 11.007578,
            BYN: 2.576198,
            BZD: 2.021336,
            CAD: 1.278067,
            CDF: 1971.551983,
            CHF: 0.890809,
            CLF: 0.02696,
            CLP: 743.900628,
            CNH: 6.518844,
            CNY: 6.5372,
            COP: 3477.599384,
            CRC: 603.467425,
            CUC: 1.002757,
            CUP: 25.75,
            CVE: 91.2,
            CZK: 21.8134,
            DJF: 178.523271,
            DKK: 6.13321,
            DOP: 58.392773,
            DZD: 129.669427,
            EGP: 15.6511,
            ERN: 14.999905,
            ETB: 38.458204,
            EUR: 0.823955,
            FJD: 2.04715,
            FKP: 0.744558,
            GBP: 0.744558,
            GEL: 3.325,
            GGP: 0.744558,
            GHS: 5.886366,
            GIP: 0.744558,
            GMD: 51.75,
            GNF: 9916.600944,
            GTQ: 7.841727,
            GYD: 210.702443,
            HKD: 7.75086,
            HNL: 24.276138,
            HRK: 6.2227,
            HTG: 68.100033,
            HUF: 295.616,
            IDR: 14126.5,
            ILS: 3.27139,
            IMP: 0.744558,
            INR: 73.75405,
            IQD: 1197.142331,
            IRR: 42105,
            ISK: 125.33,
            JEP: 0.744558,
            JMD: 145.113704,
            JOD: 0.709,
            JPY: 104.00713636,
            KES: 110.9,
            KGS: 84.801901,
            KHR: 4061.265338,
            KMF: 405.299636,
            KPW: 900,
            KRW: 1081.805592,
            KWD: 0.304091,
            KYD: 0.83563,
            KZT: 421.812124,
            LAK: 9299.925675,
            LBP: 1516.248043,
            LKR: 186.167785,
            LRD: 158.75004,
            LSL: 15.223638,
            LYD: 1.350277,
            MAD: 8.9996,
            MDL: 17.348233,
            MGA: 3964.264052,
            MKD: 50.776501,
            MMK: 1326.691598,
            MNT: 2852.698152,
            MOP: 8.005489,
            MRO: 357,
            MRU: 38.436055,
            MUR: 39.76,
            MVR: 15.45,
            MWK: 763.398977,
            MXN: 19.798229,
            MYR: 4.0725,
            MZN: 74.037006,
            NAD: 15.17,
            NGN: 381.563505,
            NIO: 34.947033,
            NOK: 8.806658,
            NPR: 118.304348,
            NZD: 1.419742,
            OMR: 0.384704,
            PAB: 1,
            PEN: 3.604119,
            PGK: 3.528573,
            PHP: 48.048614,
            PKR: 160.496414,
            PLN: 3.67992,
            PYG: 7048.613723,
            QAR: 3.685262,
            RON: 4.0154,
            RSD: 96.99,
            RUB: 74.0909,
            RWF: 992.100232,
            SAR: 3.751,
            SBD: 8.065696,
            SCR: 21.224169,
            SDG: 55.3,
            SEK: 8.449172,
            SGD: 1.33434,
            SHP: 0.744558,
            SLL: 10142.392985,
            SOS: 580.078613,
            SRD: 14.154,
            SSP: 130.26,
            STD: 20900.544238,
            STN: 20.42,
            SVC: 8.77412,
            SYP: 512.82855,
            SZL: 15.223308,
            THB: 30.18,
            TJS: 11.356441,
            TMT: 3.5,
            TND: 2.705,
            TOP: 2.282927,
            TRY: 7.8147,
            TTD: 6.817229,
            TWD: 28.254701,
            TZS: 2325.467,
            UAH: 28.368913,
            UGX: 3690.265685,
            USD: 1,
            UYU: 42.640694,
            UZS: 10456.484197,
            VEF: 248487.642241,
            VES: 933644.735,
            VND: 23190.356425,
            VUV: 111.094398,
            WST: 2.568753,
            XAF: 540.479214,
            XAG: 0.04142762,
            XAU: 0.00054375,
            XCD: 2.70255,
            XDR: 0.695432,
            XOF: 540.479214,
            XPD: 0.00042354,
            XPF: 98.324016,
            XPT: 0.0009648,
            YER: 250.324978,
            ZAR: 15.219233,
            ZMW: 21.091181,
            ZWL: 322,
          },
        },
      ]);
    });
};
